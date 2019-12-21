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

function addLis(obj, event) {
    if ($("#game").text() === "Stop Game" && scoreChange(obj.data("isChecked"))) {
        randomSelect();
        obj.data("isChecked", false);
    }
    else event.preventDefault();
}

function createRadio(i) {
    let radio = $("<input type=\"radio\" class=\"hole\" name=\"hole\">")
    radio.data({isChecked : false, value : i});
    radio.click(function(event) { addLis($(this), event) });
    $("#map").append(radio);
}

function initial() { //初始化
    for (var i = 0; i < 60; i++) createRadio(i);
}

function getRandomInt(min, max) { // 获得随机整数
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function randomSelect() { // 随机选择一个非当前洞
    var num = getRandomInt(0, 60);
    while ($(".hole").eq(num).data("isChecked") == true) num = getRandomInt(0, 60);
    $(".hole").eq(num).data({isChecked : true});
    $(".hole").eq(num).prop("checked", true);
}

function scoreChange(a) { // 判断是否打地鼠
    if (a === true) { // 打到地鼠了
        $("#score").val(parseInt($("#score").val()) + 1);
        return true;
    }
    else if (parseInt($("#score").val()) > 0) $("#score").val(parseInt($("#score").val()) - 1); // 没打到
    return false;
}

function radioClear() { // 清除地图
    $(".hole").data({isChecked : false});
    $(".hole").prop("checked", false);
}

function timeRun(obj, clear) {
    $("score").val("0");
    randomSelect();
    obj.text("Stop Game");
    clear.sign = setTimeout(function() {timeSub(clear);}, 1000);
}

function timeEnd(obj, clear) {
    clearTimeout(clear.sign);
    obj.text("Start Game");
    $("#time").val("30");
    radioClear();
}


function mole() { // 主函数
    let clear = {};
    $("#game").click(function() {
        if ($(this).text() === "Start Game") timeRun($(this), clear);
        else timeEnd($(this), clear);
    });
}

function timeSub(clear) {
    $("#time").val(parseInt($("#time").val() - 1));
    if (parseInt($("#time").val) != 0) clear.sign = setTimeout(function() {timeSub(clear)}, 1000);
    else {
        $("#game").text("Start Game");
        $("#time").val("30");
        radioClear();
    }
}

function main() {
    initial();
    mole();
}