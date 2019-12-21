if (typeof $ === "undefined") {
    var flag = 0,a = document.createElement("script"), b = document.createElement("script");
    a.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";document.body.appendChild(a);
    b.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";document.body.appendChild(b);
    a.onload = b.onload = () => {
        flag++;
        if (flag == 2) main();
    }
}


function initial(status) {
    $("#map").css("background-image", "url(" + status.bgList[status.bgId] + ")");
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++) {
            createBlocks(status, i, j)
        }
    }
    $(".block").click(function() { addLis($(this), status); });
}

function createBlocks(status, i, j) {
    var block = $("<div class=\"block\"></div>");
    block.css(blockInitial(status, i, j));
    block.data({"id" : i * 4 + j, "mapId" : i * 4 + j});
    $("#map").append(block);
}

function blockInitial(status, i, j) {
    return {width : `${status.blockSize}px`,
        height : `${status.blockSize}px`,
        left : `${j * (status.blockSize + status.borderSize) + status.topPx}px`,
        top : `${i * (status.blockSize + status.borderSize) + status.topPx}px`,
        backgroundImage : "url(" + status.bgList[status.bgId] + ")",
        backgroundPositionX : `-${j * (status.blockSize + status.borderSize) + status.topPx}px`,
        backgroundPositionY : `-${i * (status.blockSize + status.borderSize) + status.topPx}px`,
        backgroundSize : "365px 365px",
    };
}

function changePos(obj, status) {
    var hiddenUsedPos = $(".block").eq(status.hidden).data("mapId");
    var thisUsedPos = obj.data("mapId");
    obj.data("mapId", hiddenUsedPos);
    $(".block").eq(status.hidden).data("mapId", thisUsedPos);
    obj.css({left : `${Math.floor(hiddenUsedPos / 4) * (status.blockSize + status.borderSize) + status.topPx}px`, top : `${(hiddenUsedPos % 4) * (status.blockSize + status.borderSize) + status.topPx}px`});
    $(".block").eq(status.hidden).css ({left : `${Math.floor(thisUsedPos / 4) * (status.blockSize + status.borderSize) + status.topPx}px`, top : `${(thisUsedPos % 4) * (status.blockSize + status.borderSize) + status.topPx}px`});
    checkWin(status);
}

function checkWin(status) {
    for (var i = 0; i < status.gameMap.length; i++) {
        if (status.gameMap[i] != i) return;
    }
    alert("你赢了");
}

function addLis(obj, status) {
    if (status.win == true || status.hidden == -1 || obj.css("visibility") == "hidden") return;
    else if (surroundHidden(obj.data("id"), status.hidden) == true) changePos(obj, status);
}

Array.prototype.shuffle = function() { // 打乱数组
    var array = this, m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function solvability(order, size){ // 判断能够还原
    var a, count = 0, m = 0, n = 0, len = order.length;
    size = size || 3;
    for(var i=0; i<len; i++){
        m = order[i] == size*size-1 ? parseInt(i/size) : 0;
        n = order[i] == size*size-1 ? parseInt(i%size) : 0;
        for(var j=i+1; j<len; j++) {if(order[j]<a) count++;}
    }
    return (count + m + n)%2 == 0;
}


function getRandomInt(min, max) { // 获得随机整数
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function surroundHidden(id, hiddenId) {
    var thisPos = $(".block").eq(id).data("mapId");
    var hiddenPos = $(".block").eq(hiddenId).data("mapId");
    return (Math.abs(thisPos % 4 - hiddenPos % 4) == 1 && Math.floor(thisPos / 4) == Math.floor(hiddenPos / 4) || 
    (Math.abs(Math.floor(thisPos / 4) - Math.floor(hiddenPos / 4) ) == 1 && (thisPos % 4) == (hiddenPos % 4)));
}

function randomSelect(status) {
    $(".block").eq(status.gameMap[status.gameMap.length - 1]).css("visibility", "hidden");
    status.hidden = status.gameMap[status.gameMap.length - 1];
}

function newGameMap(num) {
    var arr = new Array();
    for (var i = 0; i < num; i++) arr[i] = i;
    return arr;
}

function startGame(obj, status) {
    obj.text("停止游戏");
    status.win = false;
    loopToShu(status);
    while(!solvability(status.gameMap, 4)) loopToShu(status);
}

function loopToShu(status) {
    $(".block").each(function() { $(this).css("visibility", "visible"); });
    status.gameMap.shuffle();
    randomSelect(status);
    for (var i = 0; i < status.gameMap.length; i++){
        $(".block").eq(status.gameMap[i]).css({top : `${i % 4 * (status.blockSize + status.borderSize) + status.topPx}px`, left : `${Math.floor(i / 4) * (status.blockSize + status.borderSize) + status.topPx}px`});
        $(".block").eq(status.gameMap[i]).data("mapId", i);
    }
}

function endGame(obj, status) {
    obj.text("开始游戏");
    Object.assign(status, {hidden : -1, gameMap:newGameMap(16)});
    $(".block").each(function() {
        let thisPos = {X: $(this).data("id") % 4, Y: Math.floor($(this).data("id") / 4)};
        $(this).css({left : `${thisPos.X * (status.blockSize + status.borderSize) + status.topPx}px`, top : `${thisPos.Y * (status.blockSize + status.borderSize) + status.topPx}px`});
    });
    $(".block").css("visibility", "visible");
}

function start(status) {
    $("#restart").click(function() {
        switch($(this).text()) {
            case "开始游戏": startGame($(this), status); break;
            case "停止游戏": endGame($(this), status); break;
        }
    });
}

function lookPic(status) {
    $("#pic").on("mousemove", () => {
        if (status.hidden == -1) return;
        $(".block").css("opacity", "0.3");
    });
    $("#pic").on("mouseout", () => {
        if (status.hidden == -1) return;
        $(".block").css("opacity", "1");
    });
}

function changeMap(status) {
    $("#changeMap").click(() => {
        if(status.hidden != -1) alert("请先停止游戏");
        else {
            status.bgId = (status.bgId + 1) % status.bgList.length;
            $("#map").css({backgroundImage : "url(" + status.bgList[status.bgId] + ")"});
            $(".block").css({backgroundImage : "url(" + status.bgList[status.bgId] + ")"});
        }
    });
}


function main() {
    let status = {gameMap : newGameMap(16), win : true, bgId : 0, hidden : -1, blockSize : 87, borderSize : 2, topPx : 5.5, bgList : ["./panda.jpg", "./cba.jpg", "./you.jpg", "./cat.jpg", "./kkdy.jpg", "./ya.jpg"]};
    // var gameMap = {pos:newGameMap(16), win:true, bgId:0};
    // var hidden = {id:-1};
    // var blockSize = 87;
    // var borderSize = 2;
    // var topPx = 5.5;
    // var bgList = ["./panda.jpg", "./cba.jpg", "./you.jpg", "./cat.jpg", "./kkdy.jpg", "./ya.jpg"]

    initial(status);
    start(status);
    changeMap(status);
    lookPic(status)
}