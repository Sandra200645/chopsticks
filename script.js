var p1 = [1,1];
var p2 = [1,1];
var turn = 1;
var selected = -1;
var playing = false;

var p1l = document.getElementById("p1l");
var p1r = document.getElementById("p1r");
var p2l = document.getElementById("p2l");
var p2r = document.getElementById("p2r");
var message = document.getElementById("message");
var result = document.getElementById("result");


function show() {
    p1l.src = p1[0] + ".png";
    p1r.src = p1[1] + ".png";
    p2l.src = p2[0] + ".png";
    p2r.src = p2[1] + ".png";

    p1l.style.display = p1[0] == 0 ? "none" : "block";
    p1r.style.display = p1[1] == 0 ? "none" : "block";
    p2l.style.display = p2[0] == 0 ? "none" : "block";
    p2r.style.display = p2[1] == 0 ? "none" : "block";
}


function startGame() {
    p1 = [1,1];
    p2 = [1,1];
    turn = 1;
    selected = -1;
    playing = true;
    result.textContent = "";
    message.textContent = "Player 1's turn";
    show();
}


function attack(hand) {
    if (turn == 1)
        p2[hand] = (p2[hand] + p1[selected]) % 5;
    else
        p1[hand] = (p1[hand] + p2[selected]) % 5;

    turn = turn == 1 ? 2 : 1;
    selected = -1;
    show();
    winner();
}
function winner() {
    if (p1[0] == 0 && p1[1] == 0) {
        result.textContent = "Player 2 wins";
        playing = false;
    }

    if (p2[0] == 0 && p2[1] == 0) {
        result.textContent = "Player 1 wins";
        playing = false;
    }

    if (playing)
        message.textContent = "Player " + turn + "'s turn";
}


start.addEventListener("click", startGame);

p1l.addEventListener("click", function() {
    if (playing && p1[0] > 0) {
        if (turn == 1) {
            selected = 0;
            message.textContent = "Select Player 2's hand";
        } else if (selected != -1)
            attack(0);
    }
});


p1r.addEventListener("click", function() {
    if (playing && p1[1] > 0) {
        if (turn == 1) {
            selected = 1;
            message.textContent = "Select Player 2's hand";
        } else if (selected != -1)
            attack(1);
    }
});

p2l.addEventListener("click", function() {
    if (playing && p2[0] > 0) {
        if (turn == 2) {
            selected = 0;
            message.textContent = "Select Player 1's hand";
        } else if (selected != -1)
            attack(0);
    }
});


p2r.addEventListener("click", function() {
    if (playing && p2[1] > 0) {
        if (turn == 2) {
            selected = 1;
            message.textContent = "Select Player 1's hand";
        } else if (selected != -1)
            attack(1);
    }
});


split.addEventListener("click", function() {

    if (!playing)
        return;

    var p = turn == 1 ? p1 : p2;

    if (p[0] == 4 && p[1] == 0 ||
        p[0] == 0 && p[1] == 4) {

        p[0] = 2;
        p[1] = 2;

    } else if (p[0] == 2 && p[1] == 0 ||
               p[0] == 0 && p[1] == 2) {

        p[0] = 1;
        p[1] = 1;

    } else {
        message.textContent = "Split is not possible";
        return;
    }

    turn = turn == 1 ? 2 : 1;
    selected = -1;
    show();
    message.textContent = "Player " + turn + "'s turn";
});