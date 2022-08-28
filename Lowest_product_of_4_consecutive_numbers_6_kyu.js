/*
Create a function that returns the lowest product of 4 consecutive digits in a number given as a string.

This should only work if the number has 4 digits or more. If not, return "Number is too small".

Example
lowestProduct("123456789") --> 24 (1x2x3x4)
lowestProduct("35") --> "Number is too small"
*/

export default (input) => {
  if (input.length < 4) {
    return "Number is too small";
  }

  return Math.min(
    ...input
      .split("")
      .map(Number)
      .map((v, i, ar) => ar.slice(i, 4 + i))
      .filter((k) => k.length === 4)
      .map((x) => x.reduce((a, b) => a * b))
  );
};
