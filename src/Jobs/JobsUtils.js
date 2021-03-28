export function getDaysUntilDate(date) {
  let futureDate = new Date(date);
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(futureDate - new Date());

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}
