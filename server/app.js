const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const dbService=require('./dbService');
const { createConnection } = require('mysql');
const { response } = require('express');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
//create
app.post('/insertreg',(request,response)=>{
    const {fname,user,email,phn,pswd,date_added} =request.body;
    const db= dbService.getDbServiceInstance();
    const result=db.insertreg(fname,user,email,phn,pswd,date_added);
    result
    .then(data=>response.json({success:true}))
    .catch(err=>function(err){
        console.log(err);
    })
});

//check for reg details
app.post('/checkreg',(request,response)=>{
    const{user,phn}=request.body;
    const db= dbService.getDbServiceInstance();
    const results=db.checkreg(user,phn);
    results
    .then(data=>response.json({data: data}))
    .then((data)=>
        {
        return(data)})
    .catch(err=> console.log(err));
});

// inserting login data
app.post('/logininsertion',(request,response)=>{
    const {user,pswd} =request.body;
    const db= dbService.getDbServiceInstance();
    const result=db.logininsertion(user,pswd);
    result
    .then(data=>response.json({success:true}))
    .catch(err=>function(err){
        console.log(err);})
});

// checking login credentials
app.post('/checklogin',(request,response)=>{
    const{user,pswd}=request.body;
    const db= dbService.getDbServiceInstance();
    const results=db.checklogin(user,pswd);
    results
    .then(data=>response.json({data: data}))
    .then((data)=>
        {
        return(data)})
    .catch(err=> console.log(err));
});
//displaying user
app.post('/checkhome',(request,response)=>{
    const{user}=request.body;
    const db= dbService.getDbServiceInstance();
    const results=db.checkhome(user);
    results
    .then(data=>response.json({data: data}))
    .then((data)=>
        {
        return(data)})
    .catch(err=> console.log(err));
});
// logout
app.post('/logout',(request,response)=>{
    const{user}=request.body;
    const db= dbService.getDbServiceInstance();
    const results=db.logout (user);
    results
    .then(data=>response.json({success:true}))
    .catch(err=>function(err){
        console.log(err);})
});

app.listen(process.env.PORT,()=>console.log('app is running'));