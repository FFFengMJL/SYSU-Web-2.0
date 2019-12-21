// 米家龙 18342075
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

function isSymbol(a) {
    return (a == '*' || a == '/' || a == '+' || a == '-');
}

function isNum(a) {
    return (a == 0|| a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 6 || a == 7 || a == 8 || a == 9)
}

function initial(status) {
    $("#input").text(status.up);
    $("#output").text(status.down);    
    $("button").click(function(event){
        if (event.target.innerText != "=") funcChange(event, status);
        else getAns(event, status);
    });      
}

function getAns(event, status) {
    try {
        if (isSymbol(status.down.charAt(status.down.length - 1))) status.up = status.down.substr(0, down.length - 1);// 最后一个是运算符
        else if (status.down.charAt(status.down.length - 1) == ".") status.up = status.down + "0"; // 最后一个是小数点
        else status.up = status.down;
        status.down = eval(status.up)
        status.down = (Math.floor(eval(status.up) * Math.pow(10, status.ROUND))/Math.pow(10, status.ROUND)).toString();
        $("#output").text(status.down.toString())
        $("#input").text(status.up);
        Object.assign(status, {hist : true, pair_left : 0});
    } catch (e) {
        Object.assign(status, {up : "0", down : "0"});
        $("#output").text(status.down);
        $("#input").text(status.up);
        alert("输入有误");
    }
}

function numAdd(event, status) {
    if (status.hist) {
        Object.assign(status, {up : status.down, down : event.target.innerText, hist : false});
        $("#input").text(status.up);
    }
    else if (status.down == "0") status.down = event.target.innerText;
    else if (status.down.charAt(status.down.length - 1) == 0 && isSymbol(status.down.charAt(status.down.length - 2))) status.down = status.down.substr(0, status.down.length - 1) + s;
    else if (status.down.charAt(status.down.length - 1) != ")")  status.down += event.target.innerText;

}

function funcDel(status) {
    if (status.hist) Object.assign(status, {down : "0", hist : false});
    else if (status.down.length == 1) status.down = "0";
    else status.down = status.down.substr(0, status.down.length - 1);
}

function funcDot (event, status) {
    // if (dot); // 如果小数点已经存在，就不在有效
    // else {
    if (status.hist) Object.assign(status, {down : "0.", hist : false});
    else if (isNum(status.down.charAt(status.down.length - 1))) status.down = status.down + event.target.innerText;
    else status.down = status.down + "0.";
    //     dot = true;
    // }
}

function clearAll(status) {
    Object.assign(status, {hist : false, down : "0", up : "0"});
    $("#input").text(status.up);
}

function funcSym(event, status) {
    if (status.hist) status.hist = false;
    if (isNum(status.down.charAt(status.down.length - 1)) || 
        status.down.charAt(status.down.length - 1) == ")") 
        status.down += event.target.innerText;
    else if (isSymbol(status.down.charAt(status.down.length - 1))) 
        status.down = status.down.substr(0, status.down.length - 1) + event.target.innerText;
}

function leftPair(event, status) {
    if (isSymbol(status.down.charAt(status.down.length - 1))) Object.assign(status, {down : status.down + event.target.innerText, pair_left : status.pair_left + 1});
}

function rightPair(event, status) {
    if (status.hist || status.pair_left == 0);
    else if (isNum(status.down.charAt(status.down.length - 1))) status.down += event.target.innerText;
    else if (status.down.charAt(status.down.length - 1) == "(") {
        status.down += "0)";
        status.pair_left = status.pair_left - 1; 
    }               
}

function funcChange(event, status) {
    if (event.target.className != "symb" && isNum(event.target.innerText)) numAdd(event, status);
    else if (event.target.innerText == "←") funcDel(status);
    else if (event.target.innerText == ".") funcDot(event, status);
    else if (event.target.innerText == "C") clearAll(status);
    else if (event.target.className == "symb" &&  isSymbol(event.target.innerText)) funcSym(event, status);
    else if (event.target.innerText == "(") leftPair(event, status);
    else if (event.target.innerText == ")") rightPair(event, status);
    $("#output").text(status.down);
}

function main() {
    let status = {up : "", down : "0", ROUND : 4, hist : false, pair_left : 0};
    initial(status);
}