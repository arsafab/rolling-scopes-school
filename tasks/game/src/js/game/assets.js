import bgStartGame from './../../img/game/bg-start-game.svg';
import bgStart from './../../img/game/bg-start.svg';
import bgGame from './../../img/game/bg-game.svg';
import bgInfo from './../../img/game/bg-info.svg';
import bgWarning from './../../img/game/bg-warning.svg';
import bgGameOver from '././../../img/game/bg-game-over.svg';
import meteor1 from './../../img/game/meteors/meteor1.svg';
import meteor2 from './../../img/game/meteors/meteor2.svg';
import meteor3 from './../../img/game/meteors/meteor3.svg';
import explosion from './../../img/game/meteors/explosion.svg';

export default class Assets {
    constructor() {
        this.list = [];
        this.cache = {};
        this.done = 0;
    }

    addRessource() {
        this.list.push(bgStartGame);
        this.list.push(bgStart);
        this.list.push(bgGame);
        this.list.push(bgInfo);
        this.list.push(bgWarning);
        this.list.push(bgGameOver);
        this.list.push(meteor1);
        this.list.push(meteor2);
        this.list.push(meteor3);
        this.list.push(explosion);
    }

    download() {
        this.list.forEach((item, i) => {
            const img = new Image();
            const url = this.list[i].replace(/images\//, '');

            img.addEventListener('load', () => {
                this.done += 1;
            });

            img.src = item;

            this.cache[url] = img;
        });
    }

    isDone() {
        return this.done === this.list.length;
    }

    getAsset(url) {
        return this.cache[url];
    }
}
