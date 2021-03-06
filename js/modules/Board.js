import game from './Game.js';
import message from './Message.js';

const board = {
    cards: game.createGameView(),
    lock: false,
    oneCardIsVisible: false,
    visibleCardPictureIndex: null,
    revealCard(id) {
        let nr = id.substr(1)
        let opacityValue = this.getOpacityValue(nr);
        if (opacityValue !== 0 && !this.lock) {
            this.lock = true;
            this.showRevealedCard(nr, `url(img/${this.cards[nr]})`);
            if (!this.oneCardIsVisible) {
                this.oneCardIsVisible = true;
                this.visibleCardPictureIndex = nr;
                this.lock = false;
            } else {
                if (this.isClickedTheSameCard(nr)) {
                    this.lock = false;
                } else {
                    if (this.AreCardsImagesTheSame(nr)) {
                        setTimeout(() => {
                            this.hide2Cards(nr, this.visibleCardPictureIndex);
                            game.decrementPairsNumber();
                            if (this.noCardsLeft()) {
                                message.showVictory(game.turnCounter);
                            };
                            this.lock = false;
                        }, 750);
                    } else {
                        setTimeout(() => {
                            this.returnCardPictureDown(nr, this.visibleCardPictureIndex);
                        }, 1000);
                    }
                    this.increaseTurnCounterValue();
                    this.oneCardIsVisible = false;
                }
            }
        }

    },
    handleClick() {
        let global = this;
        $(".card").on("click", function() {
            global.revealCard(this.id);
        })
    },
    getOpacityValue(nr) {
        return $(this.getCard(nr)).css("opacity");
    },
    AreCardsImagesTheSame(nr) {
        return this.cards[this.visibleCardPictureIndex] === this.cards[nr]
    },
    increaseTurnCounterValue() {
        game.turnCounter++;
        game.showTurnCounterValue();
    },
    returnCardPictureDown(nr1, nr2) {
        this.handleTwoNotSameCardsReveal(nr1, nr2);
        this.lock = false;
    },
    handleTwoNotSameCardsReveal(nr1, nr2) {
        this.restoreReverse(nr1);
        this.restoreReverse(nr2);
    },
    showRevealedCard(nr, picture) {
        this.showCardPicture(nr, picture);
        this.changeCardBorder(nr);
    },
    hide2Cards(nr1, nr2) {
        $(this.getCard(nr1)).css("opacity", 0);
        $(this.getCard(nr2)).css("opacity", 0);
    },
    showCardPicture(nr, picture) {
        $(this.getCard(nr)).css("background-image", picture);
    },
    changeCardBorder(card) {
        $(this.getCard(card)).toggleClass("activeCard card");
    },
    restoreReverse(nr) {
        $(this.getCard(nr))
            .css("background-image", 'url("img/card.png")')
            .addClass("card")
            .removeClass("activeCard");
    },
    noCardsLeft() {
        return game.pairsLeft === 0;
    },
    getCard(idNumber) {
        return `#c${idNumber}`;
    },
    isClickedTheSameCard(nr) {
        return this.visibleCardPictureIndex === nr;
    }
}
export default board;