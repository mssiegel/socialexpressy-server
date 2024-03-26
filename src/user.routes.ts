import express from 'express';

import { createUser, updateStreak } from './user.controllers.js';

const router = express.Router();

// @desc      Creates a new user
// @route     POST /api/v1/users
router.post('/', (req, res) => {
  const { firstName, lastName } = req.body;
  createUser(firstName, lastName);
  res.status(200);
});

// @desc      Updates a user's journaling streak
// @route     POST /api/v1/users/:userid/update-streak
router.patch('/:userid/update-streak', (req, res) => {
  const userid = Number(req.params.userid);
  const dateParams = req.body.date;
  const date = new Date(dateParams);
  updateStreak(userid, date);
  res.status(200);
});

export default router;
