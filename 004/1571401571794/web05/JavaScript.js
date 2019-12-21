var result = 0;
var defl = "0";
var flag = 0;
var ifeql = 0;

window.onload = function(){
	document.getElementById('eqScreen').value = defl;
	flag = 0;
}

function display(a){
	var temp = document.getElementById('eqScreen').value;
	if(temp == "Infinity" || temp == "NaN" || flag === 0){
		document.getElementById('eqScreen').value = "";
	}
	flag = 1;
	if(ifeql === 1 && a >= 0 && a <= 9){
		document.getElementById('eqScreen').value = "";
	}
	ifeql = 0;
	var str = temp.toString();
	var len = str.length - 1;
	if(len + 1 === 27){
		alert("Too long expression! Please check it out @~@");
		document.getElementById('eqScreen').value = defl;
		flag = 0;
		return true;
	}
	if(a === '+' || a === '-' || a === '.' || a === '*' || a === '/'){
		if(len > 0 && str[len] === a){
			document.getElementById('eqScreen').value = temp;
		}
		else{
			document.getElementById('eqScreen').value =
			String(document.getElementById('eqScreen').value) + a;
		}
	}
	else{
		document.getElementById('eqScreen').value =
		String(document.getElementById('eqScreen').value) + a;
	}
}

function del(){
	var temp = String(document.getElementById('eqScreen').value);
	temp = temp.substr(0, temp.length-1);
	document.getElementById('eqScreen').value = temp;
	if(temp === ""){
		document.getElementById('eqScreen').value = "0";
	}
}

function equal(){
	ifeql = 1;
	try{
		var temp = eval(document.getElementById('eqScreen').value);
		var str = temp.toString();
		var match = str.match(/\.(\d*?)(9|0)\2{5,}(\d{1,5})$/);
		if(match != null){
			temp = temp.toFixed(match[1].length) - 0;
		}
		document.getElementById('eqScreen').value = temp;
	}
	catch(err){
		alert("Input error! Please input again~~");
		document.getElementById('eqScreen').value = "";
	}
}

function clr(){
	document.getElementById('eqScreen').value = defl;
	flag = 0;
}
