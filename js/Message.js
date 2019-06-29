const message = {
    showVictory(pairsLeft, turnCounter) {
        if (pairsLeft === 0) {
            $(".board").html(`<h1>You won!</br>Done in ${turnCounter}turns</h1>`);
        }
    }
}

export default message;