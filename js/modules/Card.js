import board from './Board.js';
import message from './Message.js';

const card = {
    cards: board.create(),
    lock: false,
    oneVisible: false,
    visibleNr: null,
    turnCounter: 0,
    pairsLeft: 6,
    revealCard(id) {
        let nr = id.substr(1)
        let opacityValue = this.isTransparent(nr);
        if (opacityValue !== 0 && !this.lock) {
            this.lock = true;
            this.checkReveal(nr, `url(img/${this.cards[nr]})`);
            if (!this.oneVisible) {
                this.oneVisible = true;
                this.visibleNr = nr;
                this.lock = false;
            } else {
                this.checkIfCardsImagesAreTheSame(nr);
                this.increaseTurnCounterValue();
                this.oneVisible = false;
            }
        }

    },
    handleClick() {
        const boardHTML = document.querySelector(".board");
        boardHTML.childNodes.forEach((card) => {
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
    checkIfCardsImagesAreTheSame(nr) {
        if (this.cards[this.visibleNr] === this.cards[nr]) {
            setTimeout(() => {
                this.hide2Cards(nr, this.visibleNr);
            }, 750);
        } else {
            setTimeout(() => {
                this.setDefaultBackground(nr, this.visibleNr);
            }, 1000);
        }
    },
    increaseTurnCounterValue() {
        this.turnCounter++;
        $(".score").html(`Turn counter: ${this.turnCounter}`);
    },
    setDefaultBackground(nr1, nr2) {
        this.handleNotCorrectReveal(nr1, nr2);
        this.lock = false;
    },
    handleNotCorrectReveal(nr1, nr2) {
        this.restoreReverse($(`#c${nr1}`));
        this.restoreReverse($(`#c${nr2}`));
    },
    checkReveal(nr, picture) {
        $("#c" + nr).css("background-image", picture);
        this.changeBorder(nr);
    },
    hide2Cards(nr1, nr2) {
        $(`#c${nr1}`).css("opacity", 0);
        $(`#c${nr2}`).css("opacity", 0);
        this.pairsLeft--;
        if (this.pairsLeft === 0) {
            message.showVictory(this.turnCounter);
        }
        this.lock = false;
    },
    changeBorder(card) {
        $(`#c${card}`).toggleClass("cardA card");
    },
    restoreReverse(card) {
        card
            .css("background-image", 'url("img/card.png")')
            .addClass("card")
            .removeClass("cardA");
    }
}
export default card;