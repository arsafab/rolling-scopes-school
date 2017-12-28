import explosion from './../../audio/explode.mp3';
import { randomize } from './static';

export default class Meteor {
    constructor(img, type) {
        this.img = img;
        this.type = type;
        this.audio = new Audio();

        // COORDINATES and SIZE
        this.x = 0;
        this.y = -200;
        this.width = 20;
        this.height = 20;
        this.radius = 20;

        // PROPERTIES
        this.explode = false;
        this.remove = false;
        this.failure = false;
        this.speed = 1;
        this.index = 0;
        this.points = 0;
    }

    init() {
        this.defineX();
        this.defineSize();
        this.defineSpeed();
    }

    update() {
        this.y += this.speed;

        if (this.isOutside() || this.remove) {
            this.remove = true;
            this.failure = true;
            this.speed = 0;
        }
    }

    defineX() {
        const max = window.innerWidth - 50;
        const min = 1;

        this.x = randomize(max, min);
    }

    defineSize() {
        const max = 100;
        const min = 20;
        const random = randomize(max, min);

        this.width = random;
        this.height = random;
        this.radius = Math.round(random / 2);

        this.definePoints(random);
    }

    definePoints(num) {
        this.points = (this.type === 1) ? (110 - num) * 2 : 110 - num;
    }

    defineSpeed() {
        const max = 4;
        const min = 1;

        this.speed = randomize(max, min);
    }

    changeRemoveState() {
        this.remove = !this.remove;
    }

    changeExplodeState() {
        this.explode = !this.explode;
    }

    changeImg(elem) {
        this.img = elem;
    }

    resize(width, height) {
        this.width -= width;
        this.height -= height;
        this.radius = 0;
    }

    changeX() {
        const half = this.x / 2;

        if (half <= this.x) this.x += 2;
    }

    isOutside() {
        return this.y >= window.innerHeight + 110;
    }

    playAudio() {
        this.audio.src = explosion;
        this.audio.play();
    }
}
