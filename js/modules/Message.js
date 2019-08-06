const message = {
    showVictory(counter) {
        $(".board").html(`<h2>You won!</br>Done in ${counter} turns</h2>`);
    }
}

export default message;