const nbDig = (n, d) => {
  return [...new Array(n + 1).keys()]
    .map((i) => ("" + i * i).match(new RegExp(d, "g")))
    .flat()
    .filter((i) => i !== null).length;
};
nbDig(5750, 0);
