/*
1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246. Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681.
 The sum of these squares is 84100 which is 290 * 290.

Task
Find all integers between m and n (m and n integers with 1 <= m <= n) such that the sum of their squared divisors is itself a square.

We will return an array of subarrays or of tuples (in C an array of Pair) or a string. 
The subarrays (or tuples or Pairs) will have two elements: first the number the squared divisors of which is a square and then the sum of the squared divisors.

Example:
list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
list_squared(42, 250) --> [[42, 2500], [246, 84100]]
*/
export default (m, n) => {
  const getPair = (num) => {
    const getDivisors = (num) => {
      const arr = [];
      for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
          arr.push(i);
        }
      }
      return arr;
    };
    const sumDivisors = (arr) => {
      return arr.map((el) => el * el).reduce((acc, value) => acc + value, 0);
    };

    return [num, sumDivisors(getDivisors(num))];
  };
  const getRawArr = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };
  const getSquareArr = (arr) => {
    return arr
      .map((el) => getPair(el))
      .filter((el) => Math.sqrt(el[1]) % 1 === 0);
  };
  return getSquareArr(getRawArr(m, n));
};
