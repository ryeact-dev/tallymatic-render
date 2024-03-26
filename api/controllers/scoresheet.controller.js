const { candidateReranking } = require('../lib/helpers/candidateReranking');
const { prisma } = require('../lib/utils/prismaClient');

async function getAllScoresheetsByComp(req, res, next) {
  try {
    const allScoresheets = await prisma.scoresheet.findMany({
      where: {
        competitionId: req.params.id,
      },
      include: {
        competition: true,
        candidate: true,
      },
    });
    res.json(allScoresheets);
  } catch (err) {
    err.title = 'Fetch Scoresheets';
    next(err);
  }
}

async function getScoresheetByJudge(req, res, next) {
  try {
    const competition = await prisma.competition.findUnique({
      where: {
        id: req.query.compId,
      },
      include: {
        scoresheet: {
          where: {
            userId: req.query.userId,
          },
          include: {
            candidate: true,
          },
        },
        users: {
          where: {
            id: req.query.userId,
          },
          select: {
            id: true,
            fullName: true,
            judgeNumber: true,
          },
        },
      },
    });

    const { scoresheet, users, isFinalist, criteria } = competition;
    res.json({ scoresheet, users, isFinalist, criteria });
  } catch (err) {
    err.title = 'Fetch Scoresheet By Judge';
    next(err);
  }
}

async function getScoresheetByCompetition(req, res, next) {
  try {
    const competition = await prisma.competition.findUnique({
      where: {
        id: req.query.compId,
      },
      include: {
        scoresheet: {
          where: {
            competitionId: req.query.compId,
          },
          include: {
            candidate: true,
          },
        },
        users: {
          select: {
            id: true,
            fullName: true,
            judgeNumber: true,
          },
        },
      },
    });

    const { scoresheet, users, criteria, isFinalist } = competition;

    res.json({ scoresheet, judges: users, criteria, isFinalist });
  } catch (err) {
    err.title = 'Fetch Scoresheet By Competition';
    next(err);
  }
}

async function addScoresheet(req, res, next) {
  try {
    await prisma.scoresheet.create({
      data: req.body,
    });

    res.status(200).send('Candidate Scoresheet successfully added.');
  } catch (err) {
    err.title = 'Add New Scoresheet';
    next(err);
  }
}

async function updateScoresheet(req, res, next) {
  try {
    await prisma.scoresheet.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });

    res.status(200).send('Candidate Scoresheet successfully updated.');
  } catch (err) {
    err.title = 'Update Scoresheet';
    next(err);
  }
}

async function submitFinalScores(req, res, next) {
  try {
    prisma.$transaction(async (tx) => {
      const candidatesTotalScores = await tx.scoresheet.findMany({
        where: {
          AND: [
            { competitionId: req.body.competitionId },
            { userId: req.body.userId },
          ],
        },
        select: {
          id: true,
          total: true,
          rank: true,
        },
      });

      // Candidates reranking goes here after a candidate scores is added or updated
      const rankedScoresheet = candidateReranking(candidatesTotalScores);

      await Promise.all(
        rankedScoresheet.map(async (scoresheet) => {
          await tx.scoresheet.update({
            where: {
              id: scoresheet.id,
            },
            data: { rank: scoresheet.rank },
          });
        })
      );

      // Add the userId to judgesSubmitted array
      const competitionUpdate = tx.competition.update({
        where: {
          id: req.body.competitionId,
        },
        data: {
          judgesSubmitted: {
            push: req.body.userId,
          },
        },
      });

      // Update the user to lock his page after score submission
      const userUpdate = tx.user.update({
        where: {
          id: req.body.userId,
        },
        data: {
          isLock: 'true',
        },
      });

      await Promise.all([competitionUpdate, userUpdate]);

      res.status(200).send('Candidate Scoresheets successfully submitted.');
    });
  } catch (err) {
    err.title = 'Submit Final Scores';
    next(err);
  }
}

async function deleteScoresheet(req, res, next) {
  try {
    await prisma.scoresheet.deleteMany({
      where: {
        competitionId: req.params.id,
      },
    });
    res.json();
  } catch (err) {
    err.title = 'Delete Scoreshet';
    next(err);
  }
}

exports.getAllScoresheetsByComp = getAllScoresheetsByComp;
exports.getScoresheetByJudge = getScoresheetByJudge;
exports.getScoresheetByCompetition = getScoresheetByCompetition;
exports.addScoresheet = addScoresheet;
exports.updateScoresheet = updateScoresheet;
exports.submitFinalScores = submitFinalScores;
exports.deleteScoresheet = deleteScoresheet;
