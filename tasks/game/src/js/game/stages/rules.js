import Background from './../painting/background';
import Text from './../painting/text';
import Element from './../painting/element';

import { collisionBtn } from './../static';

export default class Rules {
    constructor(context, assets, input) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'rules';
        this.input = input;

        // BUTTON COORDINATES
        this.x = (window.innerWidth / 2) - 60;
        this.y = (window.innerHeight / 2) + 150;

        this.btnHover = false;
    }

    render() {
        this.drawBg();
        this.drawTitle();
        this.drawRule('1. Left-click to shoot with the weapon in falling meteorits.', 60);
        this.drawRule('2. Don\'t let them fall. One meteorit reduce one life!', 100);
        this.drawRule('3. Acid-green meteor is the most dangerous. It reduces two lives!', 140);
        this.drawRule('4. But the acid-green\'s explosion gives twice as much points!', 180);

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
        const title = new Text(this.context, 'HOW TO PLAY', '#fff', 100, 'Teko');
        title.draw(window.innerWidth / 2, window.innerHeight / 3);
    }

    drawRule(str, margin) {
        const rule = new Text(this.context, str, '#fff', 24, 'Lato');
        rule.draw(window.innerWidth / 2, (window.innerHeight / 3) + margin);
    }

    drawBtn() {
        const btn = new Element(this.context, 'LET\'S GO', '');
        btn.create(this.assets.getAsset('bg-start.svg'), this.x, this.y, 110, 50);
    }

    drawHoverBtn() {
        const btn = new Element(this.context, 'LET\'S GO', '');
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
