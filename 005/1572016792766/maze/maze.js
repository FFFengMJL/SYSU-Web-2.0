var start = 0,
	stop = 0,
	lose = 0,
	path = [0, 0, 0, 0, 0];

function cheat() { 
	for (var i = 0; i < 5; i ++)
		if (path[i] == 0)
			return false;
	return true;
}
function error(event) {
    if (start == 1 && stop == 0) {
        if (lose != 1) 
            event.target.className += " error"; 
        document.getElementById("result").textContent = "You Lose!" 
        lose = 1; 
        start = 0;
    }
}
function myset(event) { 
    event.target.className = "wall";
}
function record(event) { 
    if (event.target.id == "path1") 
        path[0] = 1;
    else if (event.target.id == "path2")
        path[1] = 1;
    else if (event.target.id == "path3")
        path[2] = 1;
    else if (event.target.id == "path4")
        path[3] = 1;
    else if (event.target.id == "path5")
        path[4] = 1;
}
function startGame(event) { 
    if (start == 0) { 
        document.getElementById("result").textContent = "Have A Try!";
        stop = lose = 0;
        for (var i = 0; i < 5; i++) 
            path[i] = 0;
    }
    start = 1; 
}
function stopGame(event) { 
    stop = 1;
    if (lose != 1) { 
        if (cheat())
			document.getElementById("result").textContent = "You Win!";       
		else  document.getElementById("result").textContent = "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
        start = 0;
    }
	if (lose == 1 && start == 0 && stop == 1)
		document.getElementById("result").textContent = "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
}
function addListener() {
    var walls = document.getElementsByClassName("wall");
    var paths = document.getElementsByClassName("path");
    for (var i = 0; i < 5; i++) {
        walls[i].addEventListener('mouseover', error);
        walls[i].addEventListener('mouseout', myset);
        paths[i].addEventListener('mouseout', record);
    }
    var startblock = document.getElementById("start");
    var endblock = document.getElementById("end");
	startblock.addEventListener('mouseover', startGame);
    endblock.addEventListener('mouseover', stopGame);
}
window.onload = function() {
    addListener();
}
