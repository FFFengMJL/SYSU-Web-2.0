// JavaScript Document
var f=true;
var sta=false;
var ch=false;
//判断撞壁
document.getElementById("inmaze1").onmouseover=function(){
	f=false;
};
document.getElementById("inmaze2").onmouseover=function(){
	f=false;
};
document.getElementById("inmaze3").onmouseover=function(){
	f=false;
};
document.getElementById("inmaze4").onmouseover=function(){
	f=false;
};
document.getElementById("inmaze5").onmouseover=function(){
	f=false;
	ch=false;
};
document.getElementById("inmaze1").onmouseleave=function(){
	f=true;
};
document.getElementById("inmaze2").onmouseleave=function(){
	f=true;
};
document.getElementById("inmaze3").onmouseleave=function(){
	f=true;
};
document.getElementById("inmaze4").onmouseleave=function(){
	f=true;
};
document.getElementById("inmaze5").onmouseleave=function(){
	f=true;
};
//判断开始
document.getElementById("start").onmouseover=function(){
	sta=true;
};
//判断作弊
document.getElementById("maze").onmouseleave=function(){
	ch=true;
};

//撞壁
document.getElementById("maze").onmouseover=function(){
	if(f===true&&sta===true){
		document.getElementById("maze").style.background="deeppink";
		setTimeout( function(){
			alert("You lose!");
	    	location.reload();
        }, 500 );
	}
};
//胜利
document.getElementById("end").onmouseover=function(){
	if(sta===true&&ch===false){
		alert("You win!");
		location.reload();
	}
	else{
		alert("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
	}
};