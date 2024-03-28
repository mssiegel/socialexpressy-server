import express from 'express';

import { createUser, getStreak, updateStreak } from './user.controllers.js';

const router = express.Router();

// TODO: add error handling middleware

// @desc      Creates a new user
// @route     POST /api/v1/users/signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = await createUser(firstName, lastName);
  res.json({ userId });
});

// @desc      Gets a user's journaling streak
// @route     GET /api/v1/users/:userid/streak
router.get('/:userid/streak', async (req, res) => {
  const userid = Number(req.params.userid);
  const dateParams = req.query.date as string;
  const date = new Date(dateParams);
  const streak = await getStreak(userid, date);
  res.json({ streak });
});

// @desc      Updates a user's journaling streak
// @route     POST /api/v1/users/:userid/update-streak
router.patch('/:userid/update-streak', async (req, res) => {
  const userid = Number(req.params.userid);
  const dateParams = req.body.date;
  const date = new Date(dateParams);
  const updatedStreak = await updateStreak(userid, date);
  res.json({ streak: updatedStreak });
});

export default router;
