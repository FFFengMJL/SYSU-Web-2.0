var score = 0;
var start1 = 0;
function hit(id){
    if(start1==1){
    if(document.getElementById(id).value==1){
        score=score+1;
        document.getElementById("Score").value = score;
        document.getElementById(id).value=0;
        document.getElementById(id).checked = 0;
        document.getElementById(id).style.outline="dashed 0px white";
        var ran = Math.round(59*Math.random());
        document.getElementById(ran+1).style.outline="dashed 2px green";
        document.getElementById(ran+1).value=1;
        document.getElementById(ran+1).checked = 1;
    }
    else{
        score=score-1;
        document.getElementById(id).checked = 0;
        document.getElementById("Score").value = score;
    }
}
    else{
        document.getElementById(id).checked = 0;
    }
}
window.onload = function(){
    var time = 30;
    document.getElementById("over").value="Game over";
    document.getElementById("Score").value = score;
    function timer(){
        time = time -1;
        document.getElementById("Time").value=time;
        if(time == 0){
            alert("Game Over ,Your score ="+score+"." );
            document.getElementById("over").value="Game over";
            clearInterval(i);
            for(var j = 0;j<60;++j){
                document.getElementById(j+1).style.outline="dashed 0px white";
                document.getElementById(j+1).value=0;
                document.getElementById(j+1).checked = 0;
            }
            start1 = 0;
        }
    }
    document.getElementById("Time").value = 30;
    document.getElementById("start").onclick = function(){
        if(start1 == 0){
            document.getElementById("over").value="playing";
            start1 = 1;
            time = 30;
            document.getElementById("Time").value=time;
            score = 0;
            document.getElementById("Score").value = score;
            start1 = 1 ;
            i = setInterval(timer,1000);
            var ran=Math.round(59*Math.random());
            document.getElementById(ran+1).style.outline="dashed 2px green";
            document.getElementById(ran+1).checked = 1;
            document.getElementById(ran+1).value=1;

            
            /**document.getElementsById(ran+1).onclick=function(){
                    score = score+1;
                    document.getElementById("Score").value = score;
                    ran = Math.round(59*Math.random());
            }**/

        }
        else {
            start1 = 0;
            clearInterval(i);
            document.getElementById("over").value="Game over";
                alert("Game Over ,Your score ="+score+"." );
            for(var j = 0;j<60;++j){
                document.getElementById(j+1).style.outline="dashed 0px white";
                document.getElementById(j+1).value=0;
                document.getElementById(j+1).checked = 0;
            }
        }
    }
    /**document.getElementById("over").onclick=function(){
        if(start1 ==1){
            start1 = 0;
            clearInterval(i);
            for(var j = 0;j<60;++j){
                document.getElementById(j+1).style.outline="dashed 0px white";
                document.getElementById(j+1).value=0;
                document.getElementById(j+1).checked = 0;
            }
        }
    }**/

}