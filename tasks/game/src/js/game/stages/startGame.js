import Background from './../painting/background';
import Text from './../painting/text';
import Element from './../painting/element';

import { collisionBtn } from './../static';

export default class StartGame {
    constructor(context, assets, input) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'start';
        this.input = input;

        // BUTTON COORDINATES
        this.x = (window.innerWidth / 2) - 50;
        this.y = (window.innerHeight / 2) + 50;

        this.btnHover = false;
    }

    render() {
        this.drawBg();
        this.drawTitle();
        this.drawSubTitle();

        if (this.btnHover) this.drawHoverBtn();
        else this.drawBtn();
    }

    update() {
        this.checkHoverOnButton();
        this.checkClickOnButton();
    }

    drawBg() {
        const img = this.assets.getAsset('bg-start-game.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    drawTitle() {
        const title = new Text(this.context, 'METEORA', '#fff', 100, 'Teko');
        title.draw(window.innerWidth / 2, window.innerHeight / 2);
    }

    drawSubTitle() {
        const subTitle = new Text(this.context, 'It will blow up your planet!', '#fff', 18, 'Lato');
        subTitle.draw(window.innerWidth / 2, (window.innerHeight / 2) + 30);
    }

    drawBtn() {
        const btn = new Element(this.context, 'START', '');
        btn.create(this.assets.getAsset('bg-start.svg'), this.x, this.y, 110, 50);
    }

    drawHoverBtn() {
        const btn = new Element(this.context, 'START', '');
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
        this.nextStage = 'rules';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
