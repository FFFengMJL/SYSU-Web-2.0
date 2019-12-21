document.oncontextmenu = new Function("event.returnValue=false;");
document.onselectstart = new Function("event.returnValue=false;");
window.onload = function () {
    //For button click
    document.getElementsByTagName("button")[0].onclick = input.bind(null, document.getElementsByTagName("button")[0].value);
    document.getElementsByTagName("button")[1].onclick = input.bind(null, document.getElementsByTagName("button")[1].value);
    document.getElementsByTagName("button")[2].onclick = input.bind(null, document.getElementsByTagName("button")[2].value);
    document.getElementsByTagName("button")[3].onclick = input.bind(null, document.getElementsByTagName("button")[3].value);
    document.getElementsByTagName("button")[4].onclick = input.bind(null, document.getElementsByTagName("button")[4].value);
    document.getElementsByTagName("button")[5].onclick = input.bind(null, document.getElementsByTagName("button")[5].value);
    document.getElementsByTagName("button")[6].onclick = input.bind(null, document.getElementsByTagName("button")[6].value);
    document.getElementsByTagName("button")[7].onclick = input.bind(null, document.getElementsByTagName("button")[7].value);
    document.getElementsByTagName("button")[8].onclick = input.bind(null, document.getElementsByTagName("button")[8].value);
    document.getElementsByTagName("button")[9].onclick = input.bind(null, document.getElementsByTagName("button")[9].value);
    document.getElementsByTagName("button")[10].onclick = input.bind(null, document.getElementsByTagName("button")[10].value);
    document.getElementsByTagName("button")[11].onclick = input.bind(null, document.getElementsByTagName("button")[11].value);
    document.getElementsByTagName("button")[12].onclick = input.bind(null, document.getElementsByTagName("button")[12].value);
    document.getElementsByTagName("button")[13].onclick = input.bind(null, document.getElementsByTagName("button")[13].value);
    document.getElementsByTagName("button")[14].onclick = input.bind(null, document.getElementsByTagName("button")[14].value);
    document.getElementsByTagName("button")[15].onclick = input.bind(null, document.getElementsByTagName("button")[15].value);
    document.getElementsByTagName("button")[16].onclick = input.bind(null, document.getElementsByTagName("button")[16].value);
    document.getElementsByTagName("button")[17].onclick = input.bind(null, document.getElementsByTagName("button")[17].value);
    document.getElementsByTagName("button")[18].onclick = input.bind(null, document.getElementsByTagName("button")[18].value);
    document.getElementsByTagName("button")[19].onclick = input.bind(null, document.getElementsByTagName("button")[19].value);
    
    var DisplayStr, ZeroStatus = false, DotStatus = false, OperatorStatus = false, ShouldBeRefresh = false, LBracketStatus = true, RBracketStatus = false;
    function input(char) {
        DisplayStr = document.getElementById("Display").value;
//        if (char == '0' && ZeroStatus) {
//            DisplayStr += char;
//            DotStatus = true;
//            OperatorStatus = true;
//            LBracketStatus = false;
//            RBracketStatus = true;
//        }
//        else if (char >= '1' && char <= '9') {
//            if (ShouldBeRefresh) {
//                DisplayStr = "";
//                ShouldBeRefresh = false;
//            }
//            DisplayStr += char;
//            ZeroStatus = true;
//            DotStatus = true;
//            OperatorStatus = true;
//            LBracketStatus = false;
//            RBracketStatus = true;
//        }
//        else if (char == '.' && DotStatus) {
//            DisplayStr += char;
//            OperatorStatus = false;
//            ShouldBeRefresh = false;
//            LBracketStatus = false;
//            RBracketStatus = false;
//        }
//        else if (OperatorStatus && (char == '+' || char == '-' || char == '×' || char == '÷')) {
//            DisplayStr += char;
//            ZeroStatus = false;
//            ShouldBeRefresh = false;
//            LBracketStatus = true;
//            RBracketStatus = false;
//            OperatorStatus = false;
//        }
//        else if (char == '=') {
//            DisplayStr = DisplayStr.replace(/×/g, "*");
//            DisplayStr = DisplayStr.replace(/÷/g, "/");
//            DisplayStr = eval(DisplayStr);
//            ShouldBeRefresh = true;
//            ZeroStatus = false;
//            DotStatus = false;
//            OperatorStatus = true;
//            LBracketStatus = true;
//            RBracketStatus = false;
//        }
//        else if (char == "delete") {
//            DisplayStr = DisplayStr.substring(0, DisplayStr.length - 1);
//        }
//        else if (char == '(' && LBracketStatus) {
//            DisplayStr += char;
//        }
//        else if (char == ')' && RBracketStatus) {
//            DisplayStr += char;
//        }
//        else if (char == "clear") {
//            DisplayStr = "";
//        }
        if (char == '=') {
            DisplayStr = DisplayStr.replace(/×/g, "*");
            DisplayStr = DisplayStr.replace(/÷/g, "/");
            DisplayStr = eval(DisplayStr);
            ShouldBeRefresh = true;
        }
        else if (char == "delete") {
            DisplayStr = DisplayStr.substring(0, DisplayStr.length - 1);
            ShouldBeRefresh = false;
        }
        else if (char == "clear") {
            DisplayStr = "";
            ShouldBeRefresh = false;
        }
        else if (char >= '1' && char <= '9' || char == '(' || char == ')') {
            if (ShouldBeRefresh == true) {
                DisplayStr = "";
                ShouldBeRefresh = false;
            }
            DisplayStr += char;
        }
        else {
            DisplayStr += char;
            ShouldBeRefresh = false;
        }
        document.getElementById("Display").value = DisplayStr;
    };
    
    // For keyboard input
    window.document.onkeydown = disableRefresh;
    function disableRefresh(evt) {
        evt = (evt) ? evt : window.event
        if (evt.keyCode) {
            if(evt.keyCode == 13) { input('='); }
            else if(evt.keyCode == 8) { window.event.returnValue = false;input('delete'); }
            else if(evt.keyCode == 27) { input('clear'); }
            else if(evt.keyCode == 48  && !evt.shiftKey) { input('0'); }
            else if(evt.keyCode == 49) { input('1'); }
            else if(evt.keyCode == 50) { input('2'); }
            else if(evt.keyCode == 51) { input('3'); }
            else if(evt.keyCode == 52) { input('4'); }
            else if(evt.keyCode == 53) { input('5'); }
            else if(evt.keyCode == 54) { input('6'); }
            else if(evt.keyCode == 55) { input('7'); }
            else if(evt.keyCode == 56 && !evt.shiftKey) { input('8'); }
            else if(evt.keyCode == 57 && !evt.shiftKey) { input('9'); }
            else if(evt.keyCode == 96) { input('0'); }
            else if(evt.keyCode == 97) { input('1'); }
            else if(evt.keyCode == 98) { input('2'); }
            else if(evt.keyCode == 99) { input('3'); }
            else if(evt.keyCode == 100) { input('4'); }
            else if(evt.keyCode == 101) { input('5'); }
            else if(evt.keyCode == 102) { input('6'); }
            else if(evt.keyCode == 103) { input('7'); }
            else if(evt.keyCode == 104) { input('8'); }
            else if(evt.keyCode == 105) { input('9'); }
            else if(evt.keyCode == 110) { input('.'); }
            else if(evt.keyCode == 106) { input('×'); }
            else if(evt.keyCode == 107) { input('+'); }
            else if(evt.keyCode == 111) { input('÷'); }
            else if(evt.keyCode == 109) { input('-'); }
            else if(evt.keyCode == 187 && evt.shiftKey) { input('+'); }
            else if(evt.keyCode == 189) { input('-'); }
            else if(evt.keyCode == 56 && evt.shiftKey) { input('×'); }
            else if(evt.keyCode == 191) { input('÷'); }
            else if(evt.keyCode == 57 && evt.shiftKey) { input('('); }
            else if(evt.keyCode == 48 && evt.shiftKey) { input(')'); }
        }
    }
};