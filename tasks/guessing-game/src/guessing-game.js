class GuessingGame {
    constructor() {
        this.num = Math.ceil(this.max / 2);
        this.min;
        this.max;
    }

    setRange(min, max) {
        this.min = min;
        this.max = max;
    }

    guess() {
        this.num = Math.ceil((this.max - this.min) / 2 + this.min);
        return this.num;
    }

    lower() {
        this.setRange(this.min, this.num);
    }

    greater() {
       this.setRange(this.num, this.max);
    }
}

module.exports = GuessingGame;
