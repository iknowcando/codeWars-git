const n = 933555431;

const cb = (acc, v) => {
  let temp = 2;
  let power = 0;
  while (n % Math.pow(v, temp) === 0) {
    power = temp;
    temp++;
  }
  if (power === 0) {
    acc.push(`(${v})`);
  } else {
    acc.push(`(${v}**${power})`);
  }
  return acc;
};

//console.log(getArrayPrime(n).reduce(cb,[]).join(""))
/*
const isPrime=(num)=>{
    for(let i = 2;i<num;i++){
        if(num%i===0){
            return false
        }
    }
    return true
}
*/
const nod = (num) => {
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
//console.log(Math.sqrt(933555431))
console.log([...new Set(nod(n))].reduce(cb, []).join(""));
