import prisma from './db.js';

async function createUser(firstName: string, lastName?: string) {
  try {
    if (!firstName) throw Error('First name is required');
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
    return user.id;
  } catch (error) {
    console.error('Error creating user: ', error);
  }
}

async function getStreak(userId: number, date: Date) {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const daysSinceLastJournaled = calculateDaysSinceLastJournaled(
      date,
      user.last_journaled,
    );

    // Calculate streak based on how many days its been since user last journaled
    if (daysSinceLastJournaled === 1 || daysSinceLastJournaled === 0)
      return user.streak;
    else return 0;
  } catch (error) {
    console.error('Error getting streak count: ', error);
  }
}

async function updateStreak(userId: number, date: Date) {
  // we get the date from the front end client so it will be the client's local time zone
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const daysSinceLastJournaled = calculateDaysSinceLastJournaled(
      date,
      user.last_journaled,
    );

    // Update streak based on how many days its been since user last journaled
    let updatedStreak: number;
    if (daysSinceLastJournaled === 1) updatedStreak = user.streak + 1;
    else if (daysSinceLastJournaled === 0) return user.streak;
    else updatedStreak = 1;

    await prisma.user.update({
      where: { id: userId },
      data: { streak: updatedStreak, last_journaled: date },
    });

    return updatedStreak;
  } catch (error) {
    console.error('Error updating streak count: ', error);
  }
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
