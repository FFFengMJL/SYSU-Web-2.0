var td = new Array(),
	playing = false,
	score = 0,
	countDown = 30,
	interId = null,
	timeId = null;

function GameOver(){
	timeStop();
	playing = false;
	clearMouse();
	alert("游戏结束！\n 你获得的分数为："+score+"\n");
	score = 0;
	countDown = 30;
	document.form1.state.value = "Game Over";
}

function timeShow(){
	document.form1.remtime.value = countDown;
	if(countDown == 0){
		GameOver();
		return;
	}else{
		countDown = countDown-1;
		timeId = setTimeout("timeShow()",1000);
	}
}

function timeStop() {
	clearInterval(interId);
	clearTimeout(timeId); 
}

function show(){
	if(playing){
		var current = Math.floor(Math.random()*35);
		document.getElementById("td["+current+"]").innerHTML = '<img src="untitled.png">';
	}
	
}

function clearMouse(){
	for(var i=0;i<35;i++){
		document.getElementById("td["+i+"]").innerHTML="";
	}
}

function hit(id){
	if(playing == false){
		alert("请点击开始游戏!");
		return;
	}else{
		if(document.getElementById("td["+id+"]").innerHTML != ""){
			score += 1;
			document.form1.score.value = score;
			document.getElementById("td["+id+"]").innerHTML = "";
			show();
		}else{
			score += -1;
			document.form1.score.value = score;
		}
	}
}

function GameStart(){
	playing = true;
	show();
	document.form1.score.value = score;
	timeShow();
	document.form1.state.value = "Playing";
 } 