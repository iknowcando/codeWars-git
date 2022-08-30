/*
ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.

Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special characters included in the string, they should be returned as they are. 
Only letters from the latin/english alphabet should be shifted, like in the original Rot13 "implementation".
*/

export default (message) => {
  const getRot13BigChar = (char) => {
    const res = char.charCodeAt() + 13;
    return res <= 90 ? res : 64 + (res - 90);
  };
  const getRot13SmallChar = (char) => {
    const res = char.charCodeAt() + 13;
    return res <= 122 ? res : 96 + (res - 122);
  };
  const getRot13Array = (message) => {
    return message
      .split('')
      .map((elem) =>
        elem.match(/[a-z]/i)
          ? elem === elem.toUpperCase()
            ? getRot13BigChar(elem)
            : getRot13SmallChar(elem)
          : elem
      );
  };
  const getEncryptedMessage = (array) => {
    return array
      .map((elem) =>
        typeof elem === 'number' ? String.fromCharCode(elem) : elem
      )
      .join('');
  };
  return getEncryptedMessage(getRot13Array(message));
};
