module.exports = function solveSudoku(matrix) {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (matrix[row][column] === 0) {      
        // find candidates for this cell
        const br = Math.floor(row / 3) * 3; // first row index of current block
        const bc = Math.floor(column / 3) * 3; // first column index of current block
        const solved = [
                      matrix[row][0], matrix[row][1], matrix[row][2], matrix[row][3], 
                      matrix[row][4], matrix[row][5], matrix[row][6], matrix[row][7], matrix[row][8],
                      matrix[0][column], matrix[1][column], matrix[2][column], matrix[3][column], 
                      matrix[4][column], matrix[5][column], matrix[6][column], matrix[7][column], matrix[8][column],
                      matrix[br + 0][bc + 0], matrix[br + 0][bc + 1], matrix[br + 0][bc + 2],
                      matrix[br + 1][bc + 0], matrix[br + 1][bc + 1], matrix[br + 1][bc + 2],
                      matrix[br + 2][bc + 0], matrix[br + 2][bc + 1], matrix[br + 2][bc + 2]
                    ].filter(e=>e>0);

        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(e => solved.indexOf(e) < 0);
        
        // recursive loop through candidates
        if (candidates.length > 0) {
          for (let i = 0; i < candidates.length; i++) {
            matrix[row][column] = candidates[i];
            const result = solveSudoku(matrix);

            if (result !== false) return result; // correct result found (else: keep looping..)
          }

          matrix[row][column] = 0;
          
          return false; // no correct result
        } else {
          return false; // no candidates
        }
      }
    }
  }

  return matrix;
}