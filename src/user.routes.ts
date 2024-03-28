import express from 'express';

import { createUser, getStreak, updateStreak } from './user.controllers.js';

const router = express.Router();

// TODO: add error handling middleware

// @desc      Creates a new user
// @route     POST /api/v1/users/signup
router.post('/signup', createUser);

// @desc      Gets a user's journaling streak
// @route     GET /api/v1/users/:userid/streak
router.get('/:userid/streak', getStreak);

// @desc      Updates a user's journaling streak
// @route     POST /api/v1/users/:userid/update-streak
router.patch('/:userid/update-streak', updateStreak);

export default router;
