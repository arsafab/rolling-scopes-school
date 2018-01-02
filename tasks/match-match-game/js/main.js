'use strict';

// DEFAULTS VALUES
const DEFAULT_DIFFICULTY = [5, 2];
const DEFAULT_SKIRT = `Smile`;

// GAME INITIALIZATION 
const game = new Game();

// MENU BUTTONS
const skirtBtn = document.querySelector(`#skirt`);
const difficultyBtn = document.querySelector(`#difficulty`);
const startBtn = document.querySelector(`#start`);

skirtBtn.onclick = function(e) {
    if(e.target.tagName === 'BUTTON') return;

    const btn = skirtBtn.querySelector(`button`);
    const target = e.target;    
    let value;

    if(target.tagName === `LI`) {
        value = target.firstElementChild.getAttribute(`alt`);
        btn.innerText = value;
    } else if(target.tagName === `IMG`) {
        value = target.getAttribute(`alt`);
        btn.innerText = value;
    }; 
    
    game.skirt = value;
};

difficultyBtn.onclick = function(e) {

    if(e.target.tagName !== 'LI') return;

    const target = e.target;
    const col = target.innerText.match(/\d/g)[0];
    const row = target.innerText.match(/\d/g)[1];    

    difficultyBtn.querySelector(`button`).innerText = target.innerText;
    
    game.difficulty = [col, row];
};

startBtn.onclick = function() {
    game.startGame();
};


// CLASS GAME and LOGIC OF THE GAME 
function Game() {
    this.board = document.querySelector(`#board`);
    this.skirt = DEFAULT_SKIRT;
    this.difficulty = DEFAULT_DIFFICULTY;
    this.timer = new Timer(document.querySelector('#timer'));
    this.cards = [];
    this.selectedCards = [];
};

Game.prototype.startGame = function() {
    this.clearBoard();
    this.fillCards(this.skirt, this.difficulty);
    this.shuffleCards();
    this.fillBoard(this.difficulty);
    this.timer.startTimer();

    this.board.addEventListener('click', this.openCards.bind(this));
};

Game.prototype.clearBoard = function() {
    const gameRules = Array.from(this.board.children);

    gameRules.forEach(item => item.remove());
};

Game.prototype.fillCards = function(folder, [col, row]) {
    this.cards = [];

    let limit = (col * row) / 2;
    let index = 0;

    while(limit) {
        this.cards.push(new Card(folder.toLowerCase(), index));

        index += 1;
        limit -= 1;
    };

    this.cards = this.cards.concat(this.cards);
};

Game.prototype.shuffleCards = function() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
};

Game.prototype.fillBoard = function([col, row]) { 
    this.board.classList.remove(`wrapper`);
    this.board.classList.add(`game`);

    let index = 0;

    for(let i = 0; i < row; i++) {
        const div = document.createElement(`div`);
    
        div.classList.add(`row`);
    
        for(let j = 0; j < col; j++) { 
            let card = this.cards[index];

            div.append(card.createCard());

            index += 1;
        };
    
        this.board.append(div);
    };
};

Game.prototype.openCards = function(e) {  
    if(this.selectedCards.length === 2) return;

    let target = e.target;    
    
    while(target !== this.board) {
        if(target.className === `flipper`) {
            target.classList.add(`show-card`);
            this.selectedCards.push(target);    

            break;                    
        };
        
        target = target.parentNode;
    };

    if(this.selectedCards.length === 2){
        setTimeout(this.compareCards.bind(this), 1000);  
    };
};

Game.prototype.closeCards = function() {
    this.selectedCards[0].classList.remove(`show-card`);
    this.selectedCards[1].classList.remove(`show-card`);  
};

Game.prototype.compareCards = function() {    
    if(this.selectedCards.length === 1) return;

    const firstCard = this.selectedCards[0].querySelector(`.back img`).src;
    const secondCard = this.selectedCards[1].querySelector(`.back img`).src;

    if(firstCard === secondCard) this.removeCards();
    else this.closeCards();        

    this.selectedCards.length = 0;

    setTimeout(this.isFinished.bind(this), 1000);    
};

Game.prototype.removeCards = function() {
    this.selectedCards[0].classList.add(`remove-card`);
    this.selectedCards[1].classList.add(`remove-card`);
};

Game.prototype.isFinished = function() {
    const removedCards = this.board.querySelectorAll(`.remove-card`);
    const numberOfCards = this.difficulty[0] * this.difficulty[1];

    if(removedCards.length === numberOfCards) {
        this.clearBoard();

        let h1 = document.createElement(`h1`);
        h1.innerText = `Congratulations!`;

        let p = document.createElement(`p`);
        p.innerText = `You are the winner of the game! If you want to try again click button "New Game"`;

        this.board.appendChild(h1);
        this.board.appendChild(p);

        this.timer.stopTimer();
    };
};


// CLASS CARD
function Card(frontSide, backSide){
    this.frontSide = frontSide;
    this.backSide = backSide;
};

Card.prototype.createCard = function() {
    const flipContainer = document.createElement(`div`);
    const flipper = document.createElement(`div`);
    const front = document.createElement(`figure`);
    const back = document.createElement(`figure`);
    const frontImg = document.createElement(`img`);
    const backImg = document.createElement(`img`);

    flipContainer.classList.add(`flip-container`);
    flipper.classList.add(`flipper`);
    front.classList.add(`front`);    
    back.classList.add(`back`);   
    
    frontImg.setAttribute(`src`, `./images/skirt-${this.frontSide}.jpg`);
    backImg.setAttribute(`src`, `./images/${this.frontSide}/${this.backSide}.jpg`);
    
    flipContainer.appendChild(flipper);
    flipper.appendChild(front);
    front.appendChild(frontImg);
    flipper.appendChild(back);
    back.appendChild(backImg);

    return flipContainer;
};


// CLASS TIMER
function Timer(elem) {
    this.elem = elem;
};

Timer.prototype.startTimer = function() {
    const beginTime = new Date().getTime();

    this.stopTimer();

    this.elem.innerText = `00:00`;
    this.interval = setInterval(this.updateTimer.bind(this, beginTime), 1000); 
};

Timer.prototype.updateTimer = function(time) {
    let now = new Date().getTime();
    let difference = now - time;
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if(seconds < 10) seconds = `0${seconds}`;
    if(minutes < 10) minutes = `0${minutes}`;

    this.elem.innerText = `${minutes}:${seconds}`;
};

Timer.prototype.stopTimer = function() {
    clearInterval(this.interval);
};
