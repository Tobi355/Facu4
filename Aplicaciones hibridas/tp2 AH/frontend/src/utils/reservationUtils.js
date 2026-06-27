export const buildReservationDate = (schedule, referenceDate = new Date()) => {
  if (!schedule) return null;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const targetDate = new Date(referenceDate);
  const currentDayIndex = targetDate.getDay();
  const selectedDayIndex = days.indexOf(schedule.day);
  const diff = (selectedDayIndex - currentDayIndex + 7) % 7;
  const offset = diff === 0 ? 7 : diff;

  targetDate.setDate(targetDate.getDate() + offset);

  if (schedule.startTime) {
    const [hours, minutes] = schedule.startTime.split(':').map(Number);
    targetDate.setHours(hours, minutes, 0, 0);
  }

  return targetDate.toISOString();
};
