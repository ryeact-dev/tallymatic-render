const express = require('express');
const {
  addCompetition,
  deleteCompetition,
  getAllCompetitionsByEvent,
  updateCompetition,
  compStatusUpdate,
  getSingleCompetition,
  getActiveCompetition,
  getMinorCompetitions,
  addFinalists,
  removeFinalists,
  getMajorCompetitions,
} = require('../controllers/competition.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();
router.get('/event/:id', verifyToken, getAllCompetitionsByEvent);
router.get('/active/:id', verifyToken, getActiveCompetition);
router.get('/minor-competitions', verifyToken, getMinorCompetitions);
router.get('/major-competitions', verifyToken, getMajorCompetitions);

router.post('/single', verifyToken, getSingleCompetition);
router.post('/add', verifyToken, addCompetition);

router.put('/update', verifyToken, updateCompetition);
router.put('/add-finalist', verifyToken, addFinalists);
router.put('/remove-finalist', verifyToken, removeFinalists);
router.put('/status', verifyToken, compStatusUpdate);

router.delete('/:id', verifyToken, deleteCompetition);

module.exports = router;
