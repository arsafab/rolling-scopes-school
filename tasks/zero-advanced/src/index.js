module.exports = function getZerosCount(number, base) {
  if(number <= 1) return 0;

  const base_primes = factorize(base);
  let min = -1;
  
  for(let div in base_primes) {
    let zeroes = 0;
    for(let pow = div; pow <= number; pow *= div)
      zeroes += Math.floor(number / pow);
    zeroes = Math.floor(zeroes / base_primes[div]);
    min = min < 0 ? zeroes : Math.min(min, zeroes);
  }
  
  return min < 0 ? 0 : min;
}

const factorize = (x) => {
  if(x < 3)
    return {[x]: 1};
  
  const res = {};
  
  for(let d = 2; d < Math.sqrt(x) + 2; d += 1 + (d > 2)) {
    while(x % d === 0) {
      res[d] || (res[d] = 0);
      res[d]++; x = Math.floor(x/d);
    }
  }

  if(x > 2)
    res[x] = 1
  
  return res;
};
