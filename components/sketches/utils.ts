import P5 from "p5";

export type WeightedRandom<T = any> = { value: T; weight: number };

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

  return weights[0].value;
};

export const getExpoWeightedRandom = (
  p5: P5,
  min: number,
  max: number,
  reverse = false
) => {
  return getWeightedRandom(
    p5,
    sequence(min, max).map((i) => ({
      value: i,
      weight: reverse ? p5.exp(max - i) : p5.exp(i),
    }))
  );
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

export const jiggle = (p5: P5, value: number, jiggleAmount = 0.5) => {
  return value + p5.random(-jiggleAmount, jiggleAmount);
};

export const hashString = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};
