const cards = [
    "janIIIsobieski.png",
    "kazimierz_wielki.png",
    "przemyslII.png",
    "stefan_batory.png",
    "wladyslaw_jagiello.png",
    "kazimierz_jagiellonczyk.png",
    "kazimierz_wielki.png",
    "przemyslII.png",
    "stefan_batory.png",
    "wladyslaw_jagiello.png",
    "janIIIsobieski.png",
    "kazimierz_jagiellonczyk.png"
];

const boardHTML = document.querySelector(".board");
let howManyCards = 0;
let oneVisible = false;
let turnCounter = 0;
let visibleNr;
let lock = false;
let pairsLeft = 6;
boardHTML.childNodes.forEach((card) => {
    if (card.id) {
        card.addEventListener("click", () => {
            revealCard(card.id);
        });
    }
});
const revealCard = id => {
    let nr = id.substr(1)
    let opacityValue = isTransparent(nr);
    if (opacityValue !== 0 && !lock) {
        lock = true;
        let obraz = `url(img/${cards[nr]})`;
        $("#c" + nr).css("background-image", obraz);
        $("#c" + nr).addClass("cardA");
        $("#c" + nr).removeClass("card");
        if (!oneVisible) {
            oneVisible = true;
            visibleNr = nr;
            lock = false;
        } else {
            checkIfCardsImageAreTheSame(nr);
            increaseTurnCounterValue();
            oneVisible = false;
        }
    }

}
const hide2Cards = (nr1, nr2) => {
    $(`#c${nr1}`).css("opacity", 0);
    $(`#c${nr2}`).css("opacity", 0);
    pairsLeft--;
    if (pairsLeft === 0) {
        $(".board").html(`<h1>You won!</br>Done in ${turnCounter}turns</h1>`);
    }
    lock = false;
}
const setDefaultBackground = (nr1, nr2) => {
    setCSS(nr1, nr2);
    lock = false;
}
const checkIfCardsImageAreTheSame = nr => {
    if (cards[visibleNr] === cards[nr]) {
        setTimeout(() => {
            hide2Cards(nr, visibleNr);
        }, 750);
    } else {
        setTimeout(() => {
            setDefaultBackground(nr, visibleNr);
        }, 1000);
    }
}
const increaseTurnCounterValue = () => {
    turnCounter++;
    $(".score").html(`Turn counter: ${turnCounter}`);
}
const isTransparent = (nr) => {
    return $(`#c${nr}`).css("opacity");
}
setCSS = (nr1, nr2) => {
    $("#c" + nr1)
        .css("background-image", 'url("img/karta.png")')
        .addClass("card")
        .removeClass("cardA");
    $("#c" + nr2)
        .css("background-image", 'url("img/karta.png")')
        .addClass("card")
        .removeClass("cardA");
}