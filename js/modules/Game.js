import { picturesNames } from '../data.js';
const game = {
    boardSize: picturesNames.length,
    pairsLeft: picturesNames.length / 2,
    turnCounter: 0,
    createCardsView() {
        const $board = $('.board');
        for (let i = 0; i < this.boardSize; i++) {
            $board.append(`<div class="card" id="c${i}"></div>`);
        }
        this.createTurnCounter($board);
        return this.mixImages();
    },
    createTurnCounter($board) {
        $board.append(`<div class="score">Turn counter: 0</div>`);
    },
    mixImages() {
        const drawnCards = [];
        while (picturesNames.length > 0) {
            const splicedCard = picturesNames.splice(Math.floor(Math.random() * picturesNames.length), 1);
            drawnCards.push(splicedCard[0]);
        }
        return drawnCards;
    },
    decrementPairsNumber() {
        this.pairsLeft--;
    },
    showTurnCounterValue() {
        $(".score").html(`Turn counter: ${this.turnCounter}`);
    },
}

export default game;