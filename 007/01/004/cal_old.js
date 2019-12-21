// 米家龙 18342075

var up = ""; // 用于显示上面的式子
var down = "0"; // 显示下面的数字
var ROUND = 4;
var hist = false;
var pair_left = 0;
var dot = false;

// alert("未完成");
document.getElementById("input").innerText = "0";
document.getElementById("output").innerText = "0";

// 判断是数字还是运算符
function isSymbol(a) {
    return (a == '*' || a == '/' || a == '+' || a == '-');
}

function isNum(a) {
    return (a == 0|| a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 6 || a == 7 || a == 8 || a == 9)
}

Array.from(document.getElementsByTagName("button")).forEach(function(button) {
    button.addEventListener("click", function(event) {
        var s = event.target.innerText;
        var cls = event.target.className;
        // alert(s);
        if (s != "=") {
            if (cls != "symb" && isNum(s)) {
                if (hist) {
                    up = down;
                    document.getElementById("input").innerText = up;
                    down = s;
                    hist = false;
                }
                else if (down == "0") down = s;
                else if (down.charAt(down.length - 1) == 0 && isSymbol(down.charAt(down.length - 2)))
                    down = down.substr(0, down.length - 1) + s;
                else if (down.charAt(down.length - 1) != ")")  down += s;
            }
            else if (s == "←") {
                if (hist) {
                    down = "0";
                    hist = false;
                }
                else if (down.length == 1) down = "0";
                else down = down.substr(0, down.length - 1);
            }
            else if (s == ".") {
                // if (dot); // 如果小数点已经存在，就不在有效
                // else {
                if (hist) {
                    down = "0.";
                    hist = false;
                }
                else if (isNum(down.charAt(down.length - 1))) down = down + s;
                else down = down + "0.";
                //     dot = true;
                // }
            }
            else if (s == "C") {
                hist = false;
                down = "0";
                up = "0";
                // dot = false;
                document.getElementById("input").innerText = up;
            }
            else if (cls == "symb" &&  isSymbol(s)) {
                if (hist) hist = false;
                if (isNum(down.charAt(down.length - 1)) || 
                    down.charAt(down.length - 1) == ")") 
                    down += s;
                else if (isSymbol(down.charAt(down.length - 1))) 
                    down = down.substr(0, down.length - 1) + s;
            }
            else if (s == "(") {
                if (isSymbol(down.charAt(down.length - 1))) {
                    down += s;
                    pair_left++;
                }
            }
            else if (s == ")") {
                if (hist);
                else if (pair_left == 0);
                else {
                    if (isNum(down.charAt(down.length - 1))) down += s;
                    else if (down.charAt(down.length - 1) == "(") down += "0)";
                    pair_left--;                
                }
            }
            document.getElementById("output").innerText = down;
        }
        else {
            try {
                if (isSymbol(down.charAt(down.length - 1))) // 最后一个是运算符
                    up = down.substr(0, down.length - 1);
                else if (down.charAt(down.length - 1) == ".") // 最后一个是小数点
                    up = down + "0";
                else up = down;
                down = eval(up);
                down = (Math.floor(down * Math.pow(10, ROUND))/Math.pow(10, ROUND)).toString();
                document.getElementById("output").innerText = down.toString();
                document.getElementById("input").innerText = up;
                hist = true;
                pair_left = 0;
            } catch (e) {
                console.error(e);
                up = "0";
                down = "0";
                document.getElementById("output").innerText = down;
                document.getElementById("input").innerText = up;
                alert("输入有误");
            }
        }
    });
});