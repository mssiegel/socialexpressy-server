import { Request, Response } from 'express';
import prisma from './db.js';
import { BadRequestError, NotFoundError } from './errors/index.js';

async function createUser(req: Request, res: Response) {
  const { firstName, lastName } = req.body;
  if (!firstName)
    throw new BadRequestError({ code: 400, message: 'First name is required' });

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
    },
  });
  res.json({ userId: user.id });
}

async function getStreak(req: Request, res: Response) {
  const userId = Number(req.params.userid);
  const dateParams = req.query.date as string;
  const date = new Date(dateParams);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError({ code: 404, message: 'User not found' });

  const daysSinceLastJournaled = calculateDaysSinceLastJournaled(
    date,
    user.last_journaled,
  );
  let streak: number;
  // Calculate streak based on how many days its been since user last journaled
  if (daysSinceLastJournaled === 1 || daysSinceLastJournaled === 0)
    streak = user.streak;
  else streak = 0;

  res.json({ streak });
}

async function updateStreak(req: Request, res: Response) {
  // we get our dates from the front end so all comparisons are based on the client's time zone
  const userId = Number(req.params.userid);
  const dateParams = req.body.date;
  const date = new Date(dateParams);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError({ code: 404, message: 'User not found' });

  const daysSinceLastJournaled = calculateDaysSinceLastJournaled(
    date,
    user.last_journaled,
  );

  // Update streak based on how many days its been since user last journaled
  let updatedStreak: number;
  if (daysSinceLastJournaled === 1) updatedStreak = user.streak + 1;
  else if (daysSinceLastJournaled === 0) updatedStreak = user.streak;
  else updatedStreak = 1;

  if (updatedStreak !== user.streak) {
    await prisma.user.update({
      where: { id: userId },
      data: { streak: updatedStreak, last_journaled: date },
    });
  }

  res.json({ streak: updatedStreak });
}

function calculateDaysSinceLastJournaled(
  date1: Date,
  date2: Date | null,
): number {
  if (date2 === null) return Infinity;
  // Calculate the difference in days between two dates
  const d1Copy = new Date(date1.getTime());
  const d2Copy = new Date(date2.getTime());
  // Set both dates to start of day (midnight)
  d1Copy.setHours(0, 0, 0, 0);
  d2Copy.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const differenceInMS = Math.abs(d1Copy.getTime() - d2Copy.getTime());
  return differenceInMS / msPerDay;
}

export { createUser, getStreak, updateStreak };
