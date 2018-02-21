module.exports = function getZerosCount(number) {
  let res = 0;
  for (let i = 1; Math.pow(5, i) < number; i++) {
    res += ~~(number / Math.pow(5, i))
  }
  return res;
}