function initial() { //初始化
    var map = document.getElementById("map");
    for (var i = 0; i < 60; i++) {
        var radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("class", "hole");
        radio.setAttribute("name", "hole");
        radio.isChecked = false;
        radio.value = i;
        radio.addEventListener("click", function(event) { // 添加监听器
            console.log(this.isChecked);
            if (document.getElementById("game").innerText === "Stop Game" && scoreChange(this.isChecked)) {
                randomSelect();
                this.isChecked = false;
            }
            else event.preventDefault();
        });
        map.appendChild(radio);
    }
}

function getRandomInt(min, max) { // 获得随机整数
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function randomSelect() { // 随机选择一个非当前洞
    var radios = document.getElementsByName("hole");
    var num = getRandomInt(0, 60);
    while (radios[num].isChecked == true) num = getRandomInt(0, 60);
    radios[num].checked = true;
    radios[num].isChecked = true;
}

function scoreChange(a) { // 判断是否打地鼠
    var score =  document.getElementById("score");
    if (a === true) { // 打到地鼠了
        score.value++;
        return true;
    }
    else if (score.value > 0) score.value--; // 没打到
    return false;
}

function radioClear() { // 清除地图
    var radios = document.getElementsByName("hole");
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = radios[i].isChecked = false;
    }
}


function mole() { // 主函数
    var clear = {};
    var score = document.getElementById("score");
    document.getElementById("game").onclick = function() {
        if (this.innerText === "Start Game") {
            score.value = 0;
            randomSelect();
            this.innerText = "Stop Game"
            clear.sign = setTimeout(function() {
                timeSub(clear);
            }, 1000);
        }
        else {
            clearTimeout(clear.sign);
            this.innerText = "Start Game";
            document.getElementById("time").value = 30;
            radioClear();
        }
    }
}

// time counter
function timeSub(clear) {
    var game = document.getElementById("time");
    game.value--;
    console.log(game.value);
    if (game.value != 0)
        clear.sign = setTimeout(function() {
            timeSub(clear);
        }, 1000);
    else {
        document.getElementById("game").innerText = "Start Game";
        document.getElementById("time").value = 30;
        radioClear();
    }
}


initial();
mole();