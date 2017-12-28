class TicTacToe {
    constructor() {
        this.symb = 'x';
        this.matrix = [ [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                      ];
    }

    getCurrentPlayerSymbol() {
        return this.symb;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.matrix[rowIndex][columnIndex] === 0){
            this.matrix[rowIndex][columnIndex] = this.symb;
            this.symb = (this.symb === 'x') ? 'o' : 'x';
        }               
    }

    isFinished() {
        if (this.getWinner()) return true;
        if (this.isDraw()) return true;
        
        return false;
    }

    getWinner() {
        let top = this.matrix[0].join('');
        let bottom = this.matrix[2].join('');

        let left = this.matrix.map(item => item.filter((key, i) => i === 0)).join('');
        let right = this.matrix.map(item => item.filter((key, i) => i === 2)).join('');

        let vertical = this.matrix.map(item => item[1]).join('');
        let horizontal = this.matrix[1].join('');

        let leftDiag = this.matrix[0][0] + this.matrix[1][1] + this.matrix[2][2];
        let rightDiag = this.matrix[0][2] + this.matrix[1][1] + this.matrix[2][0];

        let arr = [top, 
                   bottom, 
                   left, 
                   right, 
                   vertical, 
                   horizontal, 
                   leftDiag, 
                   rightDiag
                   ];
        
        let winner = arr.filter(item => /ooo|xxx/.test(item)).join('');

        return winner[0] || null;
    }

    noMoreTurns() {
        let str = this.matrix.reduce((prev, cur) => prev.concat(cur)).join('');
        return !(/0/.test(str));
    }

    isDraw() {
        return (this.noMoreTurns() && !(this.getWinner()));
    }

    getFieldValue(rowIndex, colIndex) {
        return this.matrix[rowIndex][colIndex] || null;
    }
}

module.exports = TicTacToe;

