const message = {
    showVictory(counter) {
        $(".board").html(`<h1>You won!</br>Done in ${counter} turns</h1>`);
    }
}

export default message;