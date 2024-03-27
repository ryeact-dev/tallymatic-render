const { prisma } = require('../lib/utils/prismaClient');

const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

const currentDate = new Date();
const expirationDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  currentDate.getDate()
);

async function getCurrentUser(req, res, next) {
  const listOfCompetitions = req.user.competitions.map(
    (competition) => competition.id
  );

  console.log(req.user);

  let userInfo = {
    userId: req.user.id,
    fullName: req.user.fullName,
    role: req.user.role,
    isLock: req.user.isLock,
    judgeNumber: req.user.judgeNumber,
    listOfCompetitions,
    eventId: null,
    eventName: null,
  };

  if (req.user.role !== 'Admin') {
    userInfo = {
      ...userInfo,
      eventId: req.user.event.id,
      eventName: req.user.event.name,
    };
  }

  res.status(200).json(userInfo);
}

async function getAdminAndManagers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ role: 'admin' }, { role: 'event-manager' }],
      },
      include: {
        event: true,
      },
    });

    const allUsers = users.map((user) => {
      const { password, createAt, event, ...rest } = user;
      return { ...rest, eventName: user.event ? user.event.name : '' };
    });

    res.json(allUsers);
  } catch (err) {
    err.title = 'Fetch Admins and Managers';
    next(err);
  }
}

async function getJudgesAndTabulators(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ role: 'judge' }, { role: 'tabulator' }],
      },
      include: {
        event: true,
        competitions: true,
      },
    });

    const allUsers = users.map((user) => {
      const { password, createAt, event, ...rest } = user;
      return {
        ...rest,

        eventName: user.event ? user.event.name : '',
      };
    });

    res.status(200).json(allUsers);
  } catch (err) {
    err.title = 'Fetch Judges and Tabulators';
    next(err);
  }
}

async function getJudgeStatus(req, res, next) {
  try {
    const judgeStatus = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        isLock: true,
      },
    });

    res.json(judgeStatus);
  } catch (err) {
    err.title = 'Fetch Judge Status';
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  const users = await prisma.user.findMany();

  const allUsers = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  res.status(200).json(allUsers);
}

async function addUser(req, res, next) {
  const { judgeNumber, eventId, username } = req.body;

  try {
    const foundUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (foundUserByUsername)
      return res.status(409).send('Username already exists.');

    const foundJudgeNumber = await prisma.user.findFirst({
      where: {
        AND: [{ judgeNumber }, { eventId }, { role: 'judge' }],
      },
      include: { competitions: true },
    });

    if (foundJudgeNumber) {
      const foundJudgeCompetitions = foundJudgeNumber.competitions;
      const newJudgeCompetitions = req.body.competitions;

      const conflict = foundJudgeCompetitions.filter((competition) =>
        newJudgeCompetitions.some((item) => item.id === competition.id)
      );

      if (conflict.length > 0)
        return res
          .status(409)
          .send('Judge number already exists with the same competition.');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, bcryptSalt);
    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
        competitions: {
          connect: req.body.competitions,
        },
      },
    });

    res.status(200).json(newUser);
  } catch (err) {
    // Prisma contraint error code
    if (err.code === 'P2002') {
      return res.status(409).send('Email already taken.');
    }

    err.title = 'Add user error';
    next(err);
  }
}

async function updateUser(req, res, next) {
  const { judgeNumber, eventId, username } = req.body;

  try {
    const foundJudgeNumber = await prisma.user.findFirst({
      where: {
        AND: [{ judgeNumber }, { eventId }, { role: 'judge' }],
      },
      include: { competitions: true },
    });

    if (foundJudgeNumber) {
      const foundJudgeCompetitions = foundJudgeNumber.competitions;
      const newJudgeCompetitions = req.body.competitions;

      const conflict = foundJudgeCompetitions.filter((competition) =>
        newJudgeCompetitions.some((item) => item.id === competition.id)
      );

      if (conflict.length > 0)
        if (foundJudgeNumber.id !== req.body.id)
          return res
            .status(409)
            .send('Judge number already exists with the same competition.');
    }

    const foundUser = await prisma.user.findUnique({
      where: { username },
    });

    if (foundUser)
      if (foundUser.id !== req.body.id)
        return res.status(409).send('Username already exists.');

    await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        ...req.body,
        competitions: {
          set: req.body.competitions,
        },
      },
    }),
      res.status(200).json();
  } catch (err) {
    // Prisma contraint error code
    if (err.code === 'P2002') {
      return res.status(409).send('Email already taken.');
    }

    err.title = 'Update user error';
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        password: req.body.newPassword,
      },
    });

    res.status(200).json();
  } catch (err) {
    err.title = 'Reset password error';
    next(err);
  }
}

async function loginUser(req, res, next) {
  const { username, password } = req.body;

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        event: true,
        competitions: true,
      },
    });

    if (foundUser === null) return res.status(404).send('User not found');

    // const passOk = bcrypt.compareSync(password, foundUser.password);
    const passOk = password === foundUser.password;

    if (passOk) {
      const token = jwt.sign({ id: foundUser.id }, jwtSecret);

      res.cookie('tallymatic_token', token, {
        sameSite: 'none',
        secure: true,
      });
      res.status(200).json({ message: 'Cookie has been set' });
    } else return res.status(401).send('Wrong password');
  } catch (err) {
    err.title = 'Login error';
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    console.log(`${deletedUser.fullName} successfully removed from database`);

    res.status(200).json();
  } catch (err) {
    err.title = 'Delete User';
    next(err);
  }
}

async function logoutUser(req, res, next) {
  try {
    res.status(200).clearCookie('tallymatic_token');
    res.status(200).send('User logged out successfully.');
  } catch (err) {
    err.title = 'Add user error';
    next(err);
  }
}

exports.getCurrentUser = getCurrentUser;
exports.getAllUsers = getAllUsers;
exports.getJudgeStatus = getJudgeStatus;
exports.getAdminAndManagers = getAdminAndManagers;
exports.getJudgesAndTabulators = getJudgesAndTabulators;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.resetPassword = resetPassword;
exports.deleteUser = deleteUser;
