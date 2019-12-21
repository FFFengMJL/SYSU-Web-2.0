function clickNum(number){
    if(document.getElementById("result").value.length < 20 && document.getElementById("result").value != "0"){
        document.getElementById("result").value += number;
    }
    else if(document.getElementById("result").value === "0"){
        document.getElementById("result").value = number;
    }
}

function op(symbol){
    var last = document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1);
    if(last == "+" || last == "-" || last == "*" || last == "/" || last == "." || last == "("){
        alert("请不要连续输入运算符");
        document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
    }
    if(document.getElementById("result").value.length < 20){
        document.getElementById("result").value += symbol;
    }
}

function clearOne() {
    if(document.getElementById("result").value.length > 1){
        document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
    }
    else if(document.getElementById("result").value != "0"){
        document.getElementById("result").value = "0";
    }
}

function clearAll(){
    document.getElementById("result").value = "0";
}

function eq(){
    try{
        var result = eval(document.getElementById("result").value);
    }
    catch(e){
        alert("输入非法");
        return ;
    }
    if(isNaN(result) || result == "Infinity" || result == "undefined"){
        alert("输入非法");
        }
    else{
        document.getElementById("result").value = "" + result;
    }
}

