if (typeof $ === "undefined") {
    var flag = 0,a = document.createElement("script"), b = document.createElement("script");
    a.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
    document.body.appendChild(a);
    b.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";document.body.appendChild(b);
    a.onload = b.onload = () => {
        flag++;
        if (flag == 2) main();
    }
}

function checkCheat(event, status) {
    console.log(status);
    if (status.startArea[0][0] <= event.offsetX && event.offsetX <= status.startArea[0][1] && status.startArea[1][0] <= event.offsetY && event.offsetY <= status.startArea[1][1])  status.startStatus = true;
    if (status.endArea[0][0] <= event.offsetX && event.offsetX <= status.endArea[0][1] && status.endArea[1][0] <= event.offsetY && event.offsetY <= status.endArea[1][1]) {
        if (!status.startStatus) $("#warning").text(status.cheat);
        else $("#warning").text("You Win");
    }
}

function moveCheck(event,status) {

    console.log(status);
    if (poom(event.offsetX, event.offsetY) && !status.startStatus) {
        $("#tar").css("background-color", "red");
        $("#warning").text("You Lose!");
        status.lose = true;
    }
    else $("#tar").css("background-color", "#eeeeee");
    if (!status.lose) checkCheat(event, status);
}

function mouseOut(status) {
    status.startStatus = status.lose = false;
    $("#warning").text(status.startString);
    $("#tar").css("background-color", "#eeeeee");
}

function maze() {
    let status = {outmap : false, startString : "Move your mouse over the \"S\" to begin", cheat : "Don\'t cheat, you should start form the \'S\' and move to the \'E\' inside the maze!", startStatus : false, startArea : [[1, 42], [206, 246]], endArea : [[459, 500], [206, 246]]};
    $("#tar").on("mousemove", function(event) {moveCheck(event, status);});
    $("#tar").on("mouseout", function() {mouseOut(status);});
}

function poom(x, y) {
    // 当鼠标的 ClientX ClientY 都在灰色区域，则返回ture
    if ((0 < x && x <= 152) && !(201 < y && y <= 251)) return true;
    else if ((152 < x && x <= 201) && !(52 < y && y <= 251)) return true;
    else if ((202 < x && x <= 300) && !(52 < y && y <= 100)) return true;
    else if ((301 < x && x <= 349) && !(52 < y && y <= 251)) return true;
    else if ((350 < x && x <= 500) && !(201 < y && y <= 251)) return true;
    return false;
}

function main() {
    maze();
}