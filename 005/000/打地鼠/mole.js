// JavaScript Document

var pau=false;//是否暂停
var sto=true;//是否停止
var t;//时间计数
var tv;//时间数字
var sv;//分数数字
var s1= document.getElementById("score");//分数
var t1 = document.getElementById("time");//时间
var cho;//出现地鼠的按钮

//开始/停止
document.getElementById("start").onclick=function(){
	if(sto===true){
		document.getElementById("time").value="30";
		tv=30;
		t = setInterval(function update(){
			if(tv>0){
				tv -= 1;
				t1.value = tv;
			}
			else{
				clearInterval(t);
				sto=true;
				clearInterval(t);
				document.getElementById("time").value="";
				document.getElementById("score").value="";
				var b = document.getElementsByClassName("b");
				var j;
				for (j = 0; j < b.length; j++) {
    			b[j].style.background = "white";
				}
			}
		}, 1000);
		pau=false;
		sto=false;
		document.getElementById("score").value="0";
		sv=0;
		up();
	}
	else{
		sto=true;
		clearInterval(t);
		document.getElementById("time").value="";
		var a = document.getElementsByClassName("b");
		var i;
		for (i = 0; i < a.length; i++) {
    	a[i].style.background = "white";
		}
	}
};

//暂停/取消暂停
document.getElementById("pause").onclick=function(){
	if(sto===false){
	if(pau===true){
		t = setInterval(function update(){
			if(tv>0){
				tv -= 1;
				t1.value = tv;
			}
			else{
				clearInterval(t);
			}
		}, 1000);
		pau=false;
	}
	else{
		clearInterval(t);
		pau=true;
	}
}
};

//打地鼠
function choose(id){
	if(sto===false&&pau==false){
		if(cho==id){
			sv++;
			s1.value=sv;
			document.getElementById(cho).style.background= "white";
			up();
		}
		else{
			sv--;
			s1.value=sv;
		}	
	}
}

//出现新的地鼠
function up(){
	cho=eval(parseInt(Math.random()*0.6*100));
	document.getElementById(cho).style.background="red";
}
