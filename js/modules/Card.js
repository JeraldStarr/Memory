import board from './Board.js';
import message from './Message.js';

const card = {
    cards: board.create(),
    lock: false,
    oneVisible: false,
    visibleNr: null,
    turnCounter: 0,
    pairsLeft: 6,
    notRevealedCardAppereance: 'url("img/card.png")',
    revealCard(id) {
        let nr = id.substr(1)
        let opacityValue = this.isTransparent(nr);
        if (opacityValue !== 0 && !this.lock) {
            this.lock = true;
            let picture = `url(img/${this.cards[nr]})`;
            $("#c" + nr).css("background-image", picture);
            $("#c" + nr).addClass("cardA");
            $("#c" + nr).removeClass("card");
            if (!this.oneVisible) {
                this.oneVisible = true;
                this.visibleNr = nr;
                this.lock = false;
            } else {
                this.checkIfCardsImageAreTheSame(nr);
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
    checkIfCardsImageAreTheSame(nr) {
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
        this.setCSS(nr1, nr2);
        this.lock = false;
    },
    setCSS(nr1, nr2) {
        $("#c" + nr1)
            .css("background-image", 'url("img/card.png")')
            .addClass("card")
            .removeClass("cardA");
        $("#c" + nr2)
            .css("background-image", 'url("img/card.png")')
            .addClass("card")
            .removeClass("cardA");
    },
    hide2Cards(nr1, nr2) {
        $(`#c${nr1}`).css("opacity", 0);
        $(`#c${nr2}`).css("opacity", 0);
        this.pairsLeft--;
        message.showVictory(this.pairsLeft, this.turnCounter);
        this.lock = false;
    }
}
export default card;