const { prisma } = require('../lib/utils/prismaClient');

async function getAllCompetitionsByEvent(req, res, next) {
  try {
    const allCompetitions = await prisma.competition.findMany({
      where: {
        eventId: req.params.id,
      },
      include: {
        users: {
          where: {
            role: 'judge',
          },
          select: {
            id: true,
            judgeNumber: true,
            isLock: true,
          },
        },
      },
    });

    res.json(allCompetitions);
  } catch (err) {
    err.title = 'Fetch All Competitions By Event';
    next(err);
  }
}

async function getSingleCompetition(req, res, next) {
  try {
    const competition = await prisma.competition.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        scoresheet: {
          where: { userId: req.body.userId },
        },
      },
    });

    res.json(competition);
  } catch (err) {
    err.title = 'Fetch Single Competition';
    next(err);
  }
}

async function getActiveCompetition(req, res, next) {
  try {
    const competition = await prisma.competition.findMany({
      where: {
        AND: [{ eventId: req.params.id }, { status: 'true' }],
      },
      select: {
        id: true,
      },
    });

    res.json(competition);
  } catch (err) {
    err.title = 'Fetch Single Competition';
    next(err);
  }
}

async function getMajorCompetitions(req, res, next) {
  try {
    const majorCompetitions = await prisma.competition.findMany({
      where: {
        AND: [{ eventId: req.query.eventId }, { isFinalist: 'true' }],
      },
      select: {
        name: true,
        finalists: true,
        number: true,
      },
      orderBy: {
        number: 'asc',
      },
    });

    res.json(majorCompetitions);
  } catch (err) {
    err.title = 'Fetch Major Competition';
    next(err);
  }
}

async function getMinorCompetitions(req, res, next) {
  try {
    const minorCompetitions = await prisma.competition.findMany({
      where: {
        AND: [{ eventId: req.query.eventId }, { isFinalist: 'false' }],
      },
      include: {
        scoresheet: {
          include: {
            candidate: {
              select: {
                fullName: true,
                number: true,
                photo: true,
                course: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            fullName: true,
            judgeNumber: true,
            photo: true,
          },
        },
      },
    });

    // Filter and Sort the competitions
    const filteredData = minorCompetitions
      .map((item) => {
        const {
          createAt,
          criteria,
          finalistList,
          finalists,
          status,
          scoresheet,
          users,
          ...rest
        } = item;

        // Filter and Sort the scoresheets
        const sortedScoresheet = scoresheet
          .map((item) => {
            const {
              candidate,
              createdAt,
              userId,
              competitionId,
              candidateId,
              scores,
              total,
              ...rest
            } = item;
            return {
              ...rest,
              fullName: candidate.fullName,
              number: candidate.number,
              photo: candidate.photo,
              course: candidate.course,
            };
          })
          .sort((a, b) => a.number - b.number);

        return {
          judges: users,
          scoresheet: sortedScoresheet,
          competition: rest,
        };
      })
      .sort((a, b) => a.competition.number - b.competition.number);

    res.json(filteredData);
  } catch (err) {
    err.title = 'Fetch Minor Competitions';
    next(err);
  }
}

async function addCompetition(req, res, next) {
  const { number, name, eventId } = req.body;

  try {
    const foundCompetitionByName = await prisma.competition.findFirst({
      where: {
        AND: [{ name }, { eventId }],
      },
    });

    if (foundCompetitionByName && foundCompetitionByName.length > 0) {
      return res
        .status(409)
        .send('Competition name already exists for this event.');
    }

    const foundCompetitionByNumber = await prisma.competition.findFirst({
      where: {
        AND: [{ number }, { eventId }],
      },
    });

    if (foundCompetitionByName && foundCompetitionByNumber.length > 0) {
      return res
        .status(409)
        .send('Competition number already exists for this event.');
    }

    // If no errors proceed to create the competition
    await prisma.competition.create({
      data: req.body,
    });

    res.status(200).send('Competition successfully added.');
  } catch (err) {
    err.title = 'Error adding new competition';
    next(err);
  }
}

async function updateCompetition(req, res, next) {
  const { number, name, id, eventId } = req.body;

  try {
    const foundCompetitionByName = await prisma.competition.findFirst({
      where: {
        AND: [{ name }, { eventId }],
      },
    });

    if (foundCompetitionByName.length > 0)
      if (foundCompetitionByName.id !== id)
        return res
          .status(409)
          .send('Competition name already exists for this event.');

    const foundCompetitionByNumber = await prisma.competition.findFirst({
      where: {
        AND: [{ number }, { eventId }],
      },
    });

    if (foundCompetitionByNumber.length > 0)
      if (foundCompetitionByNumber.id !== id)
        return res
          .status(409)
          .send('Competition number already exists for this event.');

    // If no errors proceed to create the competition
    await prisma.competition.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });

    res.status(200).send('Competition successfully updated.');
  } catch (err) {
    err.title = 'Update Competition';
    next(err);
  }
}

async function compStatusUpdate(req, res, next) {
  try {
    await prisma.$transaction([
      prisma.competition.update({
        where: {
          id: req.body.id,
        },
        data: req.body,
      }),

      prisma.competition.updateMany({
        where: {
          NOT: {
            id: req.body.id,
          },
        },
        data: {
          status: 'false',
        },
      }),

      prisma.user.updateMany({
        where: {
          eventId: req.body.eventId,
        },
        data: {
          isLock: 'false',
        },
      }),
    ]);

    res.status(200).send('Competition status successfully updated.');
  } catch (err) {
    err.title = 'Update Competition Status ';
    next(err);
  }
}

async function addFinalists(req, res, next) {
  try {
    await prisma.competition.update({
      where: {
        id: req.body.id,
      },
      data: {
        finalistList: {
          push: req.body.candidateId,
        },
      },
    });

    res.status(200).send('Candidate successfully added');
  } catch (err) {
    err.title = 'Add Competition Finalists';
    next(err);
  }
}

async function removeFinalists(req, res, next) {
  try {
    await prisma.$transaction(async (tx) => {
      const competitionFinalist = await prisma.competition.findUnique({
        where: {
          id: req.body.id,
        },
        select: {
          finalistList: true,
        },
      });

      const filteredList = competitionFinalist.finalistList.filter(
        (finalist) => finalist !== req.body.candidateId
      );

      await prisma.competition.update({
        where: {
          id: req.body.id,
        },
        data: {
          finalistList: {
            set: filteredList,
          },
        },
      });

      res.status(200).send('Candidate successfully removed');
    });
  } catch (err) {
    err.title = 'Add Competition Finalists';
    next(err);
  }
}

async function deleteCompetition(req, res, next) {
  try {
    const deletedCompetition = await prisma.competition.delete({
      where: {
        id: req.params.id,
      },
      include: {
        scoresheet: true,
      },
    });

    console.log(
      `Competition ${deletedCompetition.name} has been removed from database.`
    );
    res.status(200).send('Competition successfully removed.');
  } catch (err) {
    err.title = 'Delete Competition';
    next(err);
  }
}

exports.getAllCompetitionsByEvent = getAllCompetitionsByEvent;
exports.getActiveCompetition = getActiveCompetition;
exports.getSingleCompetition = getSingleCompetition;
exports.getMajorCompetitions = getMajorCompetitions;
exports.getMinorCompetitions = getMinorCompetitions;
exports.addCompetition = addCompetition;
exports.updateCompetition = updateCompetition;
exports.compStatusUpdate = compStatusUpdate;
exports.addFinalists = addFinalists;
exports.removeFinalists = removeFinalists;
exports.deleteCompetition = deleteCompetition;
