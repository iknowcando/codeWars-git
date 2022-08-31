/*
Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.

s1 = "A aaaa bb c"

s2 = "& aaa bbb c d"

s1 has 4 'a', 2 'b', 1 'c'

s2 has 3 'a', 3 'b', 1 'c', 1 'd'

So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.

We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.

The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.

In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".

Hopefully other examples can make this clearer.

s1 = "my&friend&Paul has heavy hats! &"
s2 = "my friend John has many many friends &"
mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

s1="Are the kids at home? aaaaa fffff"
s2="Yes they are here! aaaaa fffff"
mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"
*/

export default (s1, s2) => {
  const strNormalized = (str) => {
    return str.match(/[a-z]/g).join('');
  };
  const getCharCollection = (str) => {
    const callBackCount = (acc, value) => {
      if (!acc[value]) {
        acc[value] = 0;
      }
      acc[value] += 1;
      return acc;
    };
    return Object.entries(str.split('').reduce(callBackCount, {}));
  };
  const clearArr = (array) => {
    return array.filter((value) => value[1] > 1).map((i) => i[0].repeat(i[1]));
  };

  const str1 = clearArr(getCharCollection(strNormalized(s1)));
  const str2 = clearArr(getCharCollection(strNormalized(s2)));

  const uniqEntries = [
    ...new Set([...str1.map((i) => i[0]), ...str2.map((i) => i[0])]),
  ];

  const mergeCollectionWithoutRepeat = (s1, s2, uniq) => {
    const str1 = s1.join('');
    const str2 = s2.join('');
    const res = [];

    for (let i of uniq) {
      const len1 = (str1.match(new RegExp(i, 'g')) || []).length;
      const len2 = (str2.match(new RegExp(i, 'g')) || []).length;
      if (len1 === len2) {
        res.push([3, i.repeat(len1)]);
      } else if (len1 > len2) {
        res.push([1, i.repeat(len1)]);
      } else {
        res.push([2, i.repeat(len2)]);
      }
    }
    return res.sort((a, b) => b[1].length - a[1].length);
  };

  const mergeCollection = mergeCollectionWithoutRepeat(str1, str2, uniqEntries);

  const groupByLenChar = (acc, v) => {
    if (!acc[v[1].length]) {
      acc[v[1].length] = [];
    }
    acc[v[1].length].push(v);
    return acc;
  };

  const doubleSort = Object.values(mergeCollection.reduce(groupByLenChar, {}))
    .map((i) => i.sort())
    .sort((a, b) => b[0][1].length - a[0][1].length);
  const result = [];
  for (let lvl1Nested of doubleSort) {
    for (let i of lvl1Nested) {
      result.push(i);
    }
  }

  return result
    .map((i) => [`${i[0]}:${i[1]}`])
    .join('/')
    .replace(/3/g, () => {
      return '=';
    });
};

