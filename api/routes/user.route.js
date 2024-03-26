const express = require('express');
const {
  loginUser,
  getAdminAndManagers,
  addUser,
  deleteUser,
  updateUser,
  resetPassword,
  getJudgesAndTabulators,
  logoutUser,
  getJudgeStatus,
  getCurrentUser,
} = require('../controllers/user.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

router.get('/current-user', verifyToken, getCurrentUser);
router.get('/admin-managers', verifyToken, getAdminAndManagers);
router.get('/judges-tabulators', verifyToken, getJudgesAndTabulators);
router.get('/judge-status/:id', verifyToken, getJudgeStatus);

router.post('/login', loginUser);
router.post('/add', verifyToken, addUser);
router.post('/logout', logoutUser);

router.put('/update', verifyToken, updateUser);
router.put('/reset-password', verifyToken, resetPassword);

router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
