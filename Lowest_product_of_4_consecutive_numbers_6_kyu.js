/*
Create a function that returns the lowest product of 4 consecutive digits in a number given as a string.

This should only work if the number has 4 digits or more. If not, return "Number is too small".

Example
lowestProduct("123456789") --> 24 (1x2x3x4)
lowestProduct("35") --> "Number is too small"
*/

export default (input) => {
  if (input.length < 4) {
    return 'Number is too small';
  }
  const findSubString = (str) =>{
    return str
    .split('')
    .map(Number)
    .map((_, step, digitsArray) => digitsArray.slice(step, 4 + step))
    .filter((subString) => subString.length === 4)
  }
  const multipliedSubString =(array)=>{
    return array.map((subString) => subString.reduce((acc, elemSubString) => acc * elemSubString))
  }

  return Math.min(
    ...multipliedSubString(findSubString(input))
  );
};
