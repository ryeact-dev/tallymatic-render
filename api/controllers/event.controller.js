const { prisma } = require('../lib/utils/prismaClient');

async function getAllEvents(req, res, next) {
  try {
    const allEvents = await prisma.event.findMany();
    res.json(allEvents);
  } catch (err) {
    err.title = 'Fetch Events';
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    const newEvent = await prisma.event.create({
      data: req.body,
    });
    res.json(newEvent);
  } catch (err) {
    err.title = 'Create Event';
    next(err);
  }
}

exports.getAllEvents = getAllEvents;
exports.createEvent = createEvent;
