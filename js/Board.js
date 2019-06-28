import { boardSize } from './data.js';
const board = {
    create() {
        const $board = $('.board');
        for (let i = 0; i < boardSize; i++) {
            $board.append(`<div class="card" id="c${i}"></div>`);
            if (i === boardSize - 1) {
                this.createTurnCounter($board);
            }
        }
    },
    createTurnCounter($board) {
        $board.append(`<div class="score">Turn counter: 0</div>`);
    }
}

export default board;