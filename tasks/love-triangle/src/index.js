/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
module.exports = function getLoveTrianglesCount(preferences = []) {
  let triangles = 0;

  preferences.forEach((item, i, arr) => {
    const secondItem = arr[item - 1];
    const thirdItem = arr[secondItem - 1]
    const firstItem = arr[thirdItem - 1];

    if (
      firstItem === item 
      && secondItem !== firstItem 
      && secondItem !== thirdItem
    ) {
      triangles += 1;
      arr[item - 1] = null;
      arr[secondItem - 1] = null;
      arr[thirdItem - 1] = null;
    }
  });

  return triangles;
};
