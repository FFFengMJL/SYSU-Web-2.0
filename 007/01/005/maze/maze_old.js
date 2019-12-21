function maze() {
    var mazemap = document.getElementById("tar")
    var warning = document.getElementById("warning");
    var outmap = false; // 代表是否出了地图，如果出了为 true，回到则为false
    var lose = false;
    var startString = "Move your mouse over the \"S\" to begin";
    var cheat = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
    var startStatus = false;
    var startArea = [[1, 42], [206, 246]];
    var endArea = [[459, 500], [206, 246]];
    // document.getElementById("tar").onmousemove = function() {
    mazemap.addEventListener("mousemove",function(event) {
        if (poom(event.offsetX, event.offsetY) && !startStatus) {
            this.style.backgroundColor = "red";
            warning.innerText = "You Lose!";
            lose = true;
        }
        else this.style.backgroundColor = "#eeeeee";
        if (!lose) {
            if (startArea[0][0] <= event.offsetX && event.offsetX <= startArea[0][1] && startArea[1][0] <= event.offsetY && event.offsetY <= startArea[1][1])  
                startStatus = true;
            if (endArea[0][0] <= event.offsetX && event.offsetX <= endArea[0][1] && endArea[1][0] <= event.offsetY && event.offsetY <= endArea[1][1]) {
                if (!startStatus) warning.innerText = cheat;
                else warning.innerText =  "You Win";
            }
        }
    });
    mazemap.addEventListener("mouseout", function(event) {
        startStatus = lose = false;
        warning.innerText = startString;
        this.style.backgroundColor = "#eeeeee";
    });
    // }
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

maze();