const message = {
    showVictory(pairsLeft, counter) {
        if (pairsLeft === 0) {
            $(".board").html(`<h1>You won!</br>Done in ${counter}turns</h1>`);
        }
    }
}

export default message;