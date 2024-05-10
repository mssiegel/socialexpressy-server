import express from 'express';

import {
  createUser,
  loginUser,
  getJournal,
  updateJournal,
} from './user.controllers.js';

const router = express.Router();

// @desc      Creates a new user
// @route     POST /api/v1/users/signup
router.post('/signup', createUser);

// @desc      logins a user
// @route     POST /api/v1/users/login
router.post('/login', loginUser);

// @desc      Gets a user's journal. A journal is the users streak count and their last journal entry
// @route     GET /api/v1/users/:userid/journal
router.get('/:userid/journal', getJournal);

// @desc      Updates a user's journal
// @route     PATCH /api/v1/users/:userid/journal
router.patch('/:userid/journal', updateJournal);

export default router;
