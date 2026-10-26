/**
 * Calculates the percentage of a value based on the total.
 */
const Percentage = (current: number, total: number) => {
  if (current <= 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
};

export default { Percentage };
