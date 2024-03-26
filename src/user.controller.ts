import User from './user.model.js';

async function updateStreak(userId: number, date: Date) {
  // we get the date from the front end client so it will be the client's local time zone
  try {
    const user: any = await User.findOne({ where: { id: userId } });
    if (!user) return console.log(`User with ID ${userId} not found.`);

    const daysSinceLastJournaled =
      user.last_journaled === null
        ? Infinity
        : calculateDaysDiff(date, user.last_journaled);

    // Update streak based on how many days its been since user last journaled
    let updatedStreak: number;
    if (daysSinceLastJournaled === 1) updatedStreak = user.streak + 1;
    else if (daysSinceLastJournaled === 0) updatedStreak = user.streak;
    else updatedStreak = 1;

    await user.update({
      streak: updatedStreak,
      last_journaled: date,
    });

    console.log(`Streak of ${updateStreak} was saved for user ${userId}.`);
  } catch (error) {
    console.error('Error updating streak count:', error);
  }
}

function calculateDaysDiff(date1: Date, date2: Date): number {
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

export { updateStreak };
