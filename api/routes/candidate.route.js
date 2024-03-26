const express = require('express');
const multer = require('multer');

const {
  addCandidate,
  getAllCandidatesByEvent,
  deleteCandidate,
  updateCandidate,
  getAllCandidatesByEventWithMajorCompetitions,
} = require('../controllers/candidate.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

const upload = multer({ dest: 'uploads/img' });

router.get('/event/:id', verifyToken, getAllCandidatesByEvent);
router.get(
  '/event/major-competitions/:id',
  verifyToken,
  getAllCandidatesByEventWithMajorCompetitions
);

router.post('/add', verifyToken, upload.single('photo'), addCandidate);

router.put('/update', verifyToken, upload.single('photo'), updateCandidate);

router.delete('/:id', verifyToken, deleteCandidate);

module.exports = router;
