var h = 0;//小时
var m = 0;//分钟
var s = 0;//秒
var step = 0;//步数
var ifstart = false;//游戏是否开始，即能否点击拼图
var l = 2;//难度，1为简单，2为中等，3为难
var picnum = 1;//记录当前图片是相应难度的第几张
var exchange = 16;//应该16模块背景对调的
var src = "url(11.jpg)";//当前图片连接
var timevalue = document.getElementById("time");
var stepvalue = document.getElementById("step");
var temptimer;
var create_array = new Array(); //设置最初的数组

window.onload = function(){
	create_p();
	document.getElementById("easy").addEventListener("click",lto1);
	document.getElementById("normal").addEventListener("click",lto2);
	document.getElementById("difficult").addEventListener("click",lto3);
	
	document.getElementById("start").addEventListener("click",restart);
	document.getElementById("changep").addEventListener("click",change_pictrue);
}

function create_p(){
	var p = document.getElementById("p");

	for(var k = 1; k <= 16; k++){
		var single = document.createElement("div");
		single.id = "pos"+k;
		single.className = "picpart";
		single.addEventListener("click",p_move);
		p.appendChild(single);
		create_array[k-1] = single;
	}
	console.log(1);
}

function timer(){
	if(ifstart){
		temptimer = setInterval(function(){
			var realh,realm,reals;
			if(h<10) realh = "0"+String(h);
			else realh = h;
			if(m<10) realm = "0"+String(m);
			else realm = m;
			if(s<10) reals = "0"+String(s);
			else reals = s;
			var realtime = realh+":"+realm+":"+reals;
			timevalue.innerHTML = realtime;
			s++;
			if(s > 59){
				s = 0;
				m++;
			}
			if(m > 59){
				m = 0;
				h++;
			}
		},1000);
	}
	console.log(2);
}

function restart(){
	ifstart = true; 
    clearInterval(temptimer);
    h = 0;
	m = 0;
	s = 0;
    timer(); 
	timevalue.innerHTML = "00:00:00";
    stepvalue.innerHTML = "0";
    document.getElementById("result").innerText = "Playing...";
	

    // 产生随机数列前先将拼图块对应的位置复位
    for (var i = 1; i <= 16; i++) {
        document.getElementById("p").childNodes[i-1].id = "pos"+i;
    }
	for(var j=1;j<=15;j++){
		if(document.getElementById("pos"+j).style.backgroundImage == "none")
			document.getElementById("pos"+j).style.backgroundImage = src;
	}
	document.getElementById("pos16").style.backgroundImage = "none";
    // 通过更改ID名类名来改变位置 
	for(var k = 0; k < 1000; k++){
		var random_value = parseInt(Math.random() * 16 + 1); //产生一个1-16的随机数
		var blank = document.getElementById("pos16"); 
		var blanktop = blank.offsetTop;
		var blankleft = blank.offsetLeft;
		
		var ran = document.getElementById("pos" + random_value); //找到随机数对应的块，判断能否移动
		var top = ran.offsetTop;
		var left = ran.offsetLeft;
		
		if((Math.abs(top - blanktop)>95 && Math.abs(top - blanktop)<105 && left==blankleft)||(Math.abs(left - blankleft)>95 && Math.abs(left - blankleft)<105 && top==blanktop)){
			console.log(3);
			var temp4 = blank.id;
			blank.id = ran.id;
			ran.id = temp4;
			
			var temp5 = blank.style.backgroundImage;
			blank.style.backgroundImage = ran.style.backgroundImage;
			ran.style.backgroundImage = temp5;
			exchange = random_value;
		}
	}
    console.log(4);
    if_end();
	console.log(5);
}

function change_pictrue(){
	if(picnum<4){
		picnum++;
		for(var i=1;i<=15;i++)
			document.getElementById("pos"+i).style.backgroundImage = "url("+l+picnum+".jpg)";
		src = "url("+l+picnum+".jpg)";
	}
	else{
		picnum = 1;
		for(var j=1;j<=15;j++)
			document.getElementById("pos"+j).style.backgroundImage = "url("+l+picnum+".jpg)";
		src = "url("+l+picnum+".jpg)";
	}
	console.log(6);
}

function p_move(event){
	if(!ifstart) return;
	
	var blank = document.getElementById("pos16");
	
	var blanktop = blank.offsetTop;
	var blankleft = blank.offsetLeft;
	var top = this.offsetTop;
	var left = this.offsetLeft;
	console.log(7);
	if((Math.abs(top - blanktop)>95 && Math.abs(top - blanktop)<105 && left==blankleft)||(Math.abs(left - blankleft)>95 && Math.abs(left - blankleft)<105 && top==blanktop)){
		console.log(8);
		step++;
		stepvalue.innerHTML = String(step);
		var temp4 = blank.id;
		blank.id = this.id;
		this.id = temp4;
		
		var temp5 = blank.style.backgroundImage;
		blank.style.backgroundImage = this.style.backgroundImage;
		this.style.backgroundImage = temp5;
		exchange = this.id - "pos";
		
		
		if_end();
	}
}


function if_end(){
	for(var i = 1; i <= 16; i++){
		var temp3 = "pos"+i;
		if(temp3 != document.getElementById("p").childNodes[i-1].id){
			document.getElementById("result").innerText = "Playing...";
			console.log(10);
			return;
		}
	}
	document.getElementById("result").innerText= "You succeed!!!";
	ifstart = false;
	clearInterval(temptimer);
	return;
}



function lto1(){
	l = 1;
	console.log(11);
	for(var i=1;i<=15;i++)
		document.getElementById("pos"+i).style.backgroundImage = "url(11.jpg)";
	src="url(11.jpg)";
	picnum = 1;
	console.log(11);
}

function lto2(){
	l = 2;
	for(var i=1;i<=15;i++)
		document.getElementById("pos"+i).style.backgroundImage = "url(21.jpg)";
	src = "url(21.jpg)";
	picnum = 1;
	console.log(12);
}

function lto3(){
	l = 3;
	for(var i=1;i<=15;i++)
		document.getElementById("pos"+i).style.backgroundImage = "url(31.jpg)";
	src = "url(31.jpg)";
	picnum = 1;
	console.log(13);
}


