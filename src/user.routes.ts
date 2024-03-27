import express from 'express';

import { createUser, updateStreak } from './user.controllers.js';

const router = express.Router();

// TODO: add error handling middleware

// @desc      Creates a new user
// @route     POST /api/v1/users
router.post('/', async (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = await createUser(firstName, lastName);
  res.json({ userId });
});

// @desc      Updates a user's journaling streak
// @route     POST /api/v1/users/:userid/update-streak
router.patch('/:userid/update-streak', async (req, res) => {
  const userid = Number(req.params.userid);
  const dateParams = req.body.date;
  const date = new Date(dateParams);
  const updatedStreak = await updateStreak(userid, date);
  res.status(200).json({ streak: updatedStreak });
});

export default router;
