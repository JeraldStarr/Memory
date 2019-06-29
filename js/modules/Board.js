import { cards } from '../data.js';
import { boardSize } from '../data.js';
const board = {
    create() {
        const $board = $('.board');
        for (let i = 0; i < boardSize; i++) {
            $board.append(`<div class="card" id="c${i}"></div>`);
            if (i === boardSize - 1) {
                this.createTurnCounter($board);
            }
        }
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

export default board;