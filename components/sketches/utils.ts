import P5 from "p5";

export const getRandomIntRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export type WeightedRandom = { value: number; weight: number };

export const getWeightedRandom = (p5: P5, weights: WeightedRandom[]) => {
  // get sum of all the weights.
  let sum = 0;
  // eslint-disable-next-line no-var
  for (var i = 0; i < weights.length; i++) {
    sum += weights[i].weight;
  }

  // now pick a random number between 0 and the sum of the weights
  let ran = p5.random(sum);

  // loop through all the options until you find a weight that is greater
  // or equal to the random number. Subtract weight from random num every time.
  for (let i = 0; i < weights.length; i++) {
    const opt = weights[i];

    if (opt.weight >= ran) {
      return opt.value;
    }

    ran -= opt.weight;
  }

  return 0;
};

export const sequence = (startOrEnd: number, end?: number) => {
  if (end === undefined) {
    return Array.from(Array(startOrEnd).keys());
  }

  return Array.from(Array(end - startOrEnd).keys()).map((i) => i + startOrEnd);
};

export const getBellCurveRandom = (
  p5: P5,
  min: number,
  max: number,
  skew = 1
) => {
  let u = 0,
    v = 0;
  while (u === 0) u = p5.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = p5.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = getBellCurveRandom(p5, min, max, skew);
  // resample between 0 and 1 if out of range
  else {
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
  }
  return num;
};
