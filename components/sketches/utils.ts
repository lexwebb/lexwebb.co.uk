export const getRandomIntRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloatRange = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min;
};

export const getRandomBoundedDistribution = (
  min: number,
  max: number,
  n: number
) => {
  return Array.from({ length: n }, () => getRandomIntRange(min, max));
};
