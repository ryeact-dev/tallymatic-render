const express = require('express');

const {
  deleteScoresheet,
  getAllScoresheetsByComp,
  addScoresheet,
  updateScoresheet,
  submitFinalScores,
  getScoresheetByJudge,
  getScoresheetByCompetition,
} = require('../controllers/scoresheet.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

router.get('/:id', verifyToken, getAllScoresheetsByComp);

router.post('/judge', verifyToken, getScoresheetByJudge);
router.post('/competition', verifyToken, getScoresheetByCompetition);
router.post('/add', verifyToken, addScoresheet);
router.post('/submit-scores', verifyToken, submitFinalScores);

router.put('/update', verifyToken, updateScoresheet);

router.delete('/delete/:id', verifyToken, deleteScoresheet);

module.exports = router;
