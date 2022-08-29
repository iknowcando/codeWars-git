/*
Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :

 "(p1**n1)(p2**n2)...(pk**nk)"
with the p(i) in increasing order and n(i) empty if n(i) is 1.

Example: n = 86240 should return "(2**5)(5)(7**2)(11)"
*/

export default (n) => {
  const createStrWithPower = (acc, value) => {
    let temp = 2;
    let power = 0;
    while (n % Math.pow(value, temp) === 0) {
      power = temp;
      temp++;
    }
    if (power === 0) {
      acc.push(`(${value})`);
    } else {
      acc.push(`(${value}**${power})`);
    }
    return acc;
  };

  const findDivisors = (num) => {
    const res = [];
    let del = 2;
    while (num !== 1) {
      if (num % del === 0) {
        res.push(del);
        num = num / del;
      } else {
        del++;
      }
    }
    return res;
  };
  const getUniqAr = (array) => {
    return [...new Set(array)];
  };

  return getUniqAr(findDivisors(n)).reduce(createStrWithPower, []).join('');
};
