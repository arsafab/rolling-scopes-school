module.exports = function count(s, pairs) {
  const divisors = {};
  let N = pairs.reduce((a, b) => a * Math.pow(b[0], b[1]), 1);

  if(N > 100000000) return 0;
  
  let k = new Set();

  for(let i = 1; i <= N ; i++) {
    for(let j = 0; j < s.length; j++) {
        const GreatestCommonDiviser = getGreatestCommonDiviser(i + j, N);
        if(Number(s[j]) === 1) {
          if(GreatestCommonDiviser === 1) k.add(i);
          else break;
        } else {
          if(GreatestCommonDiviser !== 1) k.add(i);
          else break;
        }
    }    
  }

  return k.size % 1000000007;
}

function getGreatestCommonDiviser(x, y) {
  while(y) {
    const t = y;
    y = x % y;
    x = t;
  }

  return x;
}
