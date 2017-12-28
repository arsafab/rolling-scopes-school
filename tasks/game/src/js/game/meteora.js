import Stage from './stages/stage';
import Input from './input';

export default class Meteora {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.input = new Input();
        this.stage = new Stage(this.ctx, this.input);
    }

    start() {
        this.resize();
        this.stage.downloadAssets();
        this.stage.playAudio();
        this.loop();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    render() {
        switch (this.stage.current) {
            case 'loading': this.stage.loading.render();
            break;

            case 'start': this.stage.startGame.render();
            break;

            case 'rules': this.stage.rules.render();
            break;

            case 'game': this.stage.game.render();
            break;

            case 'over': this.stage.gameOver.render();
            break;

            default:
            throw new Error('No stage is choosen');
        }
    }

    update() {
        switch (this.stage.current) {
            case 'loading':
                this.stage.loading.update();
                this.stage.current = this.stage.loading.nextStage;
            break;

            case 'start':
                this.stage.startGame.update();
                this.stage.current = this.stage.startGame.nextStage;
            break;

            case 'rules':
                this.stage.rules.update();
                this.stage.current = this.stage.rules.nextStage;
            break;

            case 'game':
                this.stage.game.update();
                this.stage.current = this.stage.game.nextStage;
                this.stage.game.nextStage = 'game';
                this.stage.gameOver.currentScore = this.stage.game.score.value;
            break;

            case 'over':
                this.stage.gameOver.update();
                this.stage.game.restartGame();

                this.stage.game.bestScore.value = this.stage.gameOver.bestScore;
                this.stage.current = this.stage.gameOver.nextStage;
                this.stage.gameOver.nextStage = 'over';
            break;

            default:
            throw new Error('No stage is choosen');
        }
    }

    loop() {
        this.update();
        this.render();

        window.requestAnimationFrame(this.loop.bind(this));
    }

    click(e) {
        e.preventDefault();

        this.input.x = e.x;
        this.input.y = e.y;
        this.input.clicked = true;
    }

    hover(e) {
        this.input.x = e.x;
        this.input.y = e.y;
        this.input.hovered = true;
    }
}
