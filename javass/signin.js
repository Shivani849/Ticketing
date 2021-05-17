const submit = document.querySelector('#submit');
submit.onclick=function(){

    const user=document.getElementById('user');
    const pswd=document.getElementById('pswd');
    const userval=user.value;
    const pswdval=pswd.value;
    
    fetch('http://localhost:5000/checklogin',
    {
            
            headers:{
                'Content-type':'application/json'
            },
            method:'post',
            body:JSON.stringify({user:userval , pswd:pswdval})
    }).then((response)=>response.json())
    .then(response=>{

        if(response.data.length==0)
        {
            user.value="";
            pswd.value="";
            alert("Invalid data");
            return(false);
        }
        else if(response.data.length==1)
        {
    
        try{
        const res=fetch('http://localhost:5000/logininsertion',{
            
            headers:{
                'Content-type':'application/json'
            },
            method:'post',
            body:JSON.stringify({user:userval , pswd:pswdval})
        })
            alert("Welcome to ticketing App");
            const sign=document.getElementById("signout").innerHTML="SignOut";
            if(user=="admin")
            {
                window.location.href="*";
            }
            else
            { 
                localStorage.setItem("username",userval);
                window.location.href="/index.html";
            }

        }
        catch(error){
            alert(error);
        }
    }
    })
        .catch(err=>console.log(err));

    }

