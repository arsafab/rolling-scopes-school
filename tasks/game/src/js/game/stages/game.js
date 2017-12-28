import Background from './../painting/background';
import Meteor from './../meteor';
import Element from './../painting/element';

import { collisionMeteor, randomize } from './../static';

export default class Game {
    constructor(context, assets, input) {
        this.context = context;
        this.assets = assets;
        this.input = input;
        this.nextStage = 'game';

        // METEORS on the SCREEN
        this.meteors = [];
        this.count = 0;
        this.maxOnScreen = 3;
        this.exploded = 0;

        // SCORE and LIVES
        this.score = new Element(this.context, 'SCORE:', 0);
        this.bestScore = new Element(this.context, 'BEST:', 0);
        this.lives = new Element(this.context, 'LIVES:', 3);
    }

    render() {
        this.drawBg();
        this.drawScore();
        this.drawBestScore();
        this.drawLives();

        this.meteors.forEach((item) => {
            const {
                    img,
                    x,
                    y,
                    width,
                    height,
                } = item;

            this.context.drawImage(img, x, y, width, height);
        });
    }

    update() {
        if (this.count <= this.maxOnScreen) {
            this.meteors.push(this.createMeteor());
            this.count += 1;
            this.makeMoreOnScreen();
        }

        this.meteors.forEach((item, i) => {
            item.update();

            if (this.input.clicked) {
                this.meteors.forEach((elem) => {
                    this.checkMeteorClick(elem);
                });
            }

            if (item.explode) {
                this.explodeMeteor(item);

                if (item.width <= 0) item.changeRemoveState();
            }

            if (item.failure) {
                this.removeLive(item);
            }

            if (item.remove && !item.failure) {
                this.changeScore(item);
            }

            if (item.remove) {
                item.changeRemoveState();

                this.removeMeteor(i);
                this.count -= 1;
            }
        });

        if (this.lives.value < 0) {
            this.changeStage();
            this.clearStage();
        }
    }

    // PAINTING
    drawBg() {
        const img = this.assets.getAsset('bg-game.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    drawScore() {
        this.score.create(this.assets.getAsset('bg-info.svg'), 20, 20, 150, 50);
    }

    drawBestScore() {
        this.bestScore.create(this.assets.getAsset('bg-info.svg'), 190, 20, 120, 50);
    }

    drawLives() {
        this.lives.create(this.assets.getAsset('bg-warning.svg'), window.innerWidth - 130, 20, 110, 50);
    }

    // OPERATIONS with METEORS
    createMeteor() {
        const max = 3;
        const min = 1;
        const random = randomize(max, min);

        const img = this.assets.getAsset(`meteor${random}.svg`);
        const meteor = new Meteor(img, random);

        meteor.index = this.count;
        meteor.init();

        return meteor;
    }

    removeMeteor(index) {
        this.meteors.splice(index, 1);
    }

    explodeMeteor(elem) {
        elem.playAudio();
        elem.changeImg(this.assets.getAsset('explosion.svg'));
        elem.resize(4, 4);
        elem.changeX();
    }

    checkMeteorClick(elem) {
        if (collisionMeteor(this.input, elem)) {
            elem.changeExplodeState();
            this.exploded += 1;
        }

        this.input.clicked = false;
    }

    // OPERATIONS with STAGE
    makeMoreOnScreen() {
        if (this.exploded > 15) {
            this.maxOnScreen += 1;
            this.exploded = 0;
        }
    }

    changeStage() {
        this.nextStage = 'over';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    // SCORE and LIVES
    changeScore(meteor) {
        this.score.value += meteor.points;
    }

    removeLive(elem) {
        this.lives.value -= (elem.type === 1) ? 2 : 1;
    }

    restartGame() {
        this.lives.value = 3;
        this.score.value = 0;
        this.meteors.length = 0;
        this.count = 0;
        this.maxOnScreen = 3;
        this.exploded = 0;
    }
}
