var s=-1;
window.onload = function(){
    var re="";
    document.getElementById("state").innerText=re;
    document.getElementById("start").onmouseover = function(){
         s=0; 
         document.getElementById("state").innerText="start";
        document.getElementById("b1").onmouseover=function(){
            if(s == 0){
            document.getElementById("b1").style.backgroundColor="red";
            /**document.getElementById("b2").style.backgroundColor="red";
            document.getElementById("b3").style.backgroundColor="red";
            document.getElementById("b4").style.backgroundColor="red";
            document.getElementById("b5").style.backgroundColor="red";**/
            var result = "You Lose!"
            document.getElementById("state").innerText=result;
            s = 1;
            }
        }
        document.getElementById("b2").onmouseover=function(){
            if(s == 0){
            //document.getElementById("b1").style.backgroundColor="red";
            document.getElementById("b2").style.backgroundColor="red";
            //document.getElementById("b3").style.backgroundColor="red";
            //document.getElementById("b4").style.backgroundColor="red";
            //document.getElementById("b5").style.backgroundColor="red";
            var result = "You Lose!"
            document.getElementById("state").innerText=result;
            s = 1;
            }
        }
        document.getElementById("b3").onmouseover=function(){
            if(s == 0){
            //document.getElementById("b1").style.backgroundColor="red";
            //document.getElementById("b2").style.backgroundColor="red";
            document.getElementById("b3").style.backgroundColor="red";
            //document.getElementById("b4").style.backgroundColor="red";
            //document.getElementById("b5").style.backgroundColor="red";
            document.getElementById("state").innerText="You lose";
            s = 1;
            }
        }
        document.getElementById("b4").onmouseover=function(){
            if(s==0){
            //document.getElementById("b1").style.backgroundColor="red";
            //document.getElementById("b2").style.backgroundColor="red";
            //document.getElementById("b3").style.backgroundColor="red";
            document.getElementById("b4").style.backgroundColor="red";
            //document.getElementById("b5").style.backgroundColor="red";
            document.getElementById("state").innerText="You lose";
            s = 1;
            }
        }
        document.getElementById("b5").onmouseover=function(){
            if(s==0){
           // document.getElementById("b1").style.backgroundColor="red";
           // document.getElementById("b2").style.backgroundColor="red";
            //document.getElementById("b3").style.backgroundColor="red";
           // document.getElementById("b4").style.backgroundColor="red";
            document.getElementById("b5").style.backgroundColor="red";
            document.getElementById("state").innerText="You lose";
            s = 1;
            }
        }
        document.getElementById("u1").onmouseover=function(){
            if(s==0){
            document.getElementById("u1").style.backgroundColor="red";
            //document.getElementById("u2").style.backgroundColor="red";
            //document.getElementById("u3").style.backgroundColor="red";
            //document.getElementById("u4").style.backgroundColor="red";
            document.getElementById("state").innerText="You lose";
            s = 1;
            }
        }
        document.getElementById("u2").onmouseover=function(){
            if(s==0){
            //document.getElementById("u1").style.backgroundColor="red";
            document.getElementById("u2").style.backgroundColor="red";
            //document.getElementById("u3").style.backgroundColor="red";
            //document.getElementById("u4").style.backgroundColor="red";
            document.getElementById("state").innerText="You lose";
            s = 1;
            }
        }
        document.getElementById("u3").onmouseover=function(){
            if(s==0){
            //document.getElementById("u1").style.backgroundColor="red";
            //document.getElementById("u2").style.backgroundColor="red";
            document.getElementById("u3").style.backgroundColor="red";
            //document.getElementById("u4").style.backgroundColor="red";
            document.getElementById("state").innerText="You lose";
            s = 1;
            }
        }
        document.getElementById("u4").onmouseover=function(){
            if(s==0){
                //document.getElementById("u1").style.backgroundColor="red";
                //document.getElementById("u2").style.backgroundColor="red";
                //document.getElementById("u3").style.backgroundColor="red";
                document.getElementById("u4").style.backgroundColor="red";
                document.getElementById("state").innerText="You lose";
                s = 1;
                }
        }
    }
    document.getElementById("migong").onmouseleave=function(){
        if(s == 1){
        document.getElementById("b1").style.backgroundColor="gainsboro";
        document.getElementById("b2").style.backgroundColor="gainsboro";
        document.getElementById("b3").style.backgroundColor="gainsboro";
        document.getElementById("b4").style.backgroundColor="gainsboro";
        document.getElementById("b5").style.backgroundColor="gainsboro";
        document.getElementById("u1").style.backgroundColor="gainsboro";
        document.getElementById("u2").style.backgroundColor="gainsboro";
        document.getElementById("u3").style.backgroundColor="gainsboro";
        document.getElementById("u4").style.backgroundColor="gainsboro";
        document.getElementById("state").innerText="";
        s = -1;            
        }
        if(s==0){
            s=2;
        }
    }
    document.getElementById("end").onmouseover=function(){
        if(s==0){
            alert("You Win");
            document.getElementById("state").innerText="You Win";
        s = 1;
        }
        if(s==-1||s==2){
            alert("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
            document.getElementById("state").innerText="Don't cheat!";
        }
    }
    
}