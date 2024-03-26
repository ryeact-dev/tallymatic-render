const express = require('express');

const {
  addCandidate,
  getAllCandidatesByEvent,
  deleteCandidate,
  updateCandidate,
  getAllCandidatesByEventWithMajorCompetitions,
} = require('../controllers/candidate.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

router.get('/event/:id', verifyToken, getAllCandidatesByEvent);
router.get(
  '/event/major-competitions/:id',
  verifyToken,
  getAllCandidatesByEventWithMajorCompetitions
);

router.post('/add', verifyToken, addCandidate);

router.put('/update', verifyToken, updateCandidate);

router.delete('/:id', verifyToken, deleteCandidate);

module.exports = router;
