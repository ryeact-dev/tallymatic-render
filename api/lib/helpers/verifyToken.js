const { prisma } = require('../utils/prismaClient');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

function verifyToken(req, res, next) {
  const token = req.cookies.tallymatic_token;

  if (!token) return res.json();

  jwt.verify(token, jwtSecret, async (err, { id }) => {
    if (err) next(err);

    const userInfo = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        event: true,
        competitions: true,
      },
    });

    req.user = userInfo;
    next();
  });
}

exports.verifyToken = verifyToken;
