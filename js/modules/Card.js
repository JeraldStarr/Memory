import table from './Table.js';
import message from './Message.js';

const board = {
    cards: table.createCardsView(),
    lock: false,
    oneVisible: false,
    visibleNr: null,
    pairsLeft: table.boardSize / 2,
    revealCard(id) {
        let nr = id.substr(1)
        let opacityValue = this.isTransparent(nr);
        if (opacityValue !== 0 && !this.lock) {
            this.lock = true;
            this.showRevealedCard(nr, `url(img/${this.cards[nr]})`);
            if (!this.oneVisible) {
                this.oneVisible = true;
                this.visibleNr = nr;
                this.lock = false;
            } else {
                if (this.AreCardsImagesTheSame(nr)) {
                    setTimeout(() => {
                        this.hide2Cards(nr, this.visibleNr);
                        this.decrementPairsNumber();
                        if (this.noCardsLeft()) {
                            message.showVictory(table.turnCounter);
                        };
                        this.lock = false;
                    }, 750);
                } else {
                    setTimeout(() => {
                        this.setDefaultBackground(nr, this.visibleNr);
                    }, 1000);
                }
                this.increaseTurnCounterValue();
                this.oneVisible = false;
            }
        }

    },
    handleClick() {
        const boardHTML = document.querySelector(".board");
        boardHTML.childNodes.forEach(card => {
            if (card.id) {
                card.addEventListener("click", () => {
                    this.revealCard(card.id);
                });
            }
        });
    },
    isTransparent(nr) {
        return $(`#c${nr}`).css("opacity");
    },
    AreCardsImagesTheSame(nr) {
        return this.cards[this.visibleNr] === this.cards[nr]
    },
    increaseTurnCounterValue() {
        table.turnCounter++;
        this.showTurnCounterValue();
    },
    showTurnCounterValue() {
        $(".score").html(`Turn counter: ${table.turnCounter}`);
    },
    setDefaultBackground(nr1, nr2) {
        this.handleNotCorrectReveal(nr1, nr2);
        this.lock = false;
    },
    handleNotCorrectReveal(nr1, nr2) {
        this.restoreReverse(nr1);
        this.restoreReverse(nr2);
    },
    showRevealedCard(nr, picture) {
        this.showCardPicture(nr, picture);
        this.changeBorder(nr);
    },
    hide2Cards(nr1, nr2) {
        $(`#c${nr1}`).css("opacity", 0);
        $(`#c${nr2}`).css("opacity", 0);
    },
    showCardPicture(nr, picture) {
        $(`#c${nr}`).css("background-image", picture);
    },
    changeBorder(card) {
        $(`#c${card}`).toggleClass("cardA card");
    },
    restoreReverse(nr) {
        $(`#c${nr}`)
            .css("background-image", 'url("img/card.png")')
            .addClass("card")
            .removeClass("cardA");
    },
    noCardsLeft() {
        return this.pairsLeft === 0;
    },
    decrementPairsNumber() {
        this.pairsLeft--;
    }
}
export default board;