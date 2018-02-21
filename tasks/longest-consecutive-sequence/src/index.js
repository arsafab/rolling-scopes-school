module.exports = function longestConsecutiveLength(array) {
  if(!array.length) return 0;
  if (array.length === 1) return 1;

  array.sort((prev, curr) => {
    if (curr >= prev) return -1;
    return 1;
  });

  const length = array.length;
  let max = 1;
  let counter = 1;
  
  for (let i = 1, l = length; i <= l - 1; ++i) {
    if (array[i] === array[i - 1]) continue;
    if (array[i] - 1 === array[i - 1]) counter += 1;
    else {
        diff = array[i] - i;
        counter = 1;
    }

    max = Math.max(counter, max);
  }
  
  return max;
}
