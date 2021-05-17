const userval=localStorage.getItem("username");
fetch('http://localhost:5000/checkhome',
    {
            
            headers:{
                'Content-type':'application/json'
            },
            method:'post',
            body:JSON.stringify({user:userval})
    }).then((response)=>response.json())
    .then(response=>{
            //console.log(response.data);
            if(response.data.length!=0)
            {
                
                document.getElementById("login").remove();
                document.getElementById("logout").append("SignOut");
                document.getElementById("black").innerHTML="( Hello "+userval+" !)";
               // document.getElementById("login").innerHTML="";
               
            }
        })
    .catch(err=>console.log(errr));
const submit=document.getElementById("logout");
submit.onclick=function()
{
    alert("Successfully SIGNOUT!");
    fetch('http://localhost:5000/logout',
    {
            
            headers:{
                'Content-type':'application/json'
            },
            method:'post',
            body:JSON.stringify({user:userval})
    }).then((response)=>response.json())
    .then(response=>{
        document.getElementById("logout").remove();
        document.getElementById("black").remove();
        document.getElementById("login").append("Sign in/ Sign Up");
        window.location.href="index.html";
    })
    .catch(err=>console.log(err));
}