       
window.onload = function(){   
       var ipt = document.querySelector("input");
        var divs = document.querySelectorAll(".button");

        for(let i = 0;i < divs.length;++i)
        {
            let item = divs[i];
            item.onclick = function()
            {
                try
                {
                    if(item.innerHTML != "CE" && item.innerHTML != "=" && item.innerHTML !="⬅")
                    {    
                        ipt.value +=item.innerHTML;
                    }
                    else if(item.innerHTML =="=")
                    {
                        if(ipt.value != "")
                        ipt.value = eval(ipt.value);
                    }
                    else if (item.innerHTML =="CE")
                    {   
                        ipt.value = "";
                    }
                    else if (item.innerHTML == "⬅")
                    {
                        ipt.value = ipt.value.substring(0,ipt.length-1);
                    }
                    
                }
                catch(e)
                {
                    alert("您的输入有误："+e.message );
                    ipt.value = "";
                }
            }
        }
    }