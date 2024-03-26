const { uploadedPhoto } = require('../lib/helpers/photos');
const { prisma } = require('../lib/utils/prismaClient');

async function getAllCandidatesByEvent(req, res, next) {
  try {
    const candidates = await prisma.candidate.findMany({
      where: {
        eventId: req.params.id,
      },
      include: {
        scoresheet: true,
        event: true,
      },
    });
    res.json(candidates);
  } catch (err) {
    err.title = 'Fetch Candidates';
    next(err);
  }
}

async function getAllCandidatesByEventWithMajorCompetitions(req, res, next) {
  try {
    const candidates = await prisma.candidate.findMany({
      where: {
        eventId: req.params.id,
      },
    });

    res.json(candidates);
  } catch (err) {
    err.title = 'Fetch Candidates For Finalists';
    next(err);
  }
}

async function addCandidate(req, res, next) {
  const { fullName, event, number } = req.body;

  try {
    const foundCandidateByName = await prisma.candidate.findMany({
      where: {
        AND: [{ fullName }, { eventId: event }],
      },
    });

    if (foundCandidateByName)
      if (foundCandidateByName.length > 0)
        return res
          .status(409)
          .send('Candidate name already exists for this event.');

    const foundCandidateByNumber = await prisma.candidate.findMany({
      where: {
        AND: [{ number: +number }, { eventId: event }],
      },
    });

    if (foundCandidateByNumber)
      if (foundCandidateByNumber.length > 0)
        return res
          .status(409)
          .send('Candidate number already exists for this event.');

    const photoUrl = req.file
      ? await uploadedPhoto(req.file, null, `_candidate_${number}`)
      : req.body.photo;

    await prisma.candidate.create({
      data: {
        ...req.body,
        photo: photoUrl,
        number: +number,
        event: {
          connect: { id: req.body.event },
        },
      },
    });

    res.status(200).send('Candidate successfully added.');
  } catch (err) {
    err.title = 'Error adding new competition';
    next(err);
  }
}

async function updateCandidate(req, res, next) {
  const { id, fullName, event, number } = req.body;

  try {
    const foundCandidateByName = await prisma.candidate.findMany({
      where: {
        AND: [{ fullName }, { eventId: event }],
      },
    });

    if (foundCandidateByName.length > 0) {
      if (foundCandidateByName[0].id !== id)
        return res
          .status(409)
          .send('Candidate name already exists for this event.');
    }

    const foundCandidateByNumber = await prisma.candidate.findMany({
      where: {
        AND: [{ number: +number }, { eventId: event }],
      },
    });

    if (foundCandidateByNumber.length > 0)
      if (foundCandidateByNumber[0].id !== id)
        return res
          .status(400)
          .send('Candidate number already exists for this event.');

    const photoUrl = req.file
      ? await uploadedPhoto(req.file, `_candidate_${number}`)
      : req.body.photo;

    await prisma.candidate.update({
      where: {
        id,
      },
      data: {
        ...req.body,
        photo: photoUrl,
        number: +number,
        event: {
          connect: { id: req.body.event },
        },
      },
    });

    res.status(200).send('Candidate successfully updated.');
  } catch (err) {
    err.title = 'Error adding new competition';
    next(err);
  }
}

async function deleteCandidate(req, res, next) {
  try {
    await prisma.candidate.delete({
      where: {
        id: req.params.id,
      },
      include: {
        scoresheet: true,
      },
    });
    res.status(200).send('Candidate successfully removed.');
  } catch (err) {
    err.title = 'Delete Candidate';
  }
}

exports.getAllCandidatesByEvent = getAllCandidatesByEvent;
exports.getAllCandidatesByEventWithMajorCompetitions =
  getAllCandidatesByEventWithMajorCompetitions;
exports.addCandidate = addCandidate;
exports.updateCandidate = updateCandidate;
exports.deleteCandidate = deleteCandidate;
