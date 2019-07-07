import { cards } from '../data.js';
const table = {
    boardSize: 12,
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
        while (cards.length > 0) {
            const splicedCard = cards.splice(Math.floor(Math.random() * cards.length), 1);
            drawnCards.push(splicedCard[0]);
        }
        return drawnCards;
    }
}

export default table;