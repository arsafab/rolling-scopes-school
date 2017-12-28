import Background from './../painting/background';
import Text from './../painting/text';
import Element from './../painting/element';

import { collisionBtn } from './../static';

export default class GameOver {
    constructor(context, assets, input) {
        this.context = context;
        this.assets = assets;
        this.input = input;
        this.nextStage = 'over';

        // SCORE for GAME STAGE
        this.currentScore = 0;
        this.bestScore = 0;

        // BUTTON'S COORDINATES
        this.x = (window.innerWidth / 2) - 43;
        this.y = (window.innerHeight / 3) + 190;

        this.btnHover = false;
    }

    render() {
        this.drawBg();
        this.drawTitle();
        this.defineBestScore();
        this.drawCurrentScore();
        this.drawBestScore();

        if (this.btnHover) this.drawHoverBtn();
        else this.drawBtn();
    }

    update() {
        this.checkHoverOnButton();
        this.checkClickOnButton();
    }

    drawBg() {
        const img = this.assets.getAsset('bg-game-over.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    drawTitle() {
        const title = new Text(this.context, 'GAME OVER', '#fff', 60, 'Teko');
        title.draw((window.innerWidth / 2) + 10, window.innerHeight / 3);
    }

    defineBestScore() {
        if (this.currentScore > this.bestScore) {
            this.bestScore = this.currentScore;
        }
    }

    drawCurrentScore() {
        const current = new Element(this.context, 'SCORE:', this.currentScore);
        const x = (window.innerWidth / 2) - 90;
        const y = (window.innerHeight / 3) + 40;

        current.create(this.assets.getAsset('bg-info.svg'), x, y, 200, 60);
    }

    drawBestScore() {
        const best = new Element(this.context, 'BEST SCORE:', this.bestScore);
        const x = (window.innerWidth / 2) - 90;
        const y = (window.innerHeight / 3) + 110;

        best.create(this.assets.getAsset('bg-info.svg'), x, y, 200, 60);
    }

    drawBtn() {
        const btn = new Element(this.context, 'RESTART', '');
        btn.create(this.assets.getAsset('bg-start.svg'), this.x, this.y, 110, 50);
    }

    drawHoverBtn() {
        const btn = new Element(this.context, 'RESTART', '');
        btn.create(this.assets.getAsset('bg-warning.svg'), this.x, this.y, 110, 50);
    }

    checkHoverOnButton() {
        if (this.input.hovered) {
            if (collisionBtn(this.input, { x: this.x, y: this.y })) {
                this.btnHover = true;
            } else {
                this.input.hovered = false;
                this.btnHover = false;
            }
        }
    }

    checkClickOnButton() {
        if (this.input.clicked) {
            if (collisionBtn(this.input, { x: this.x, y: this.y })) {
                this.changeStage();
                this.clearStage();
            }

            this.input.clicked = false;
        }
    }

    changeStage() {
        this.nextStage = 'game';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
