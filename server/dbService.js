const mysql=require('mysql');
const dotenv=require('dotenv');
let inst=null;
dotenv.config();

const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
   // console.log('db ' + connection.state);
});

class DbService{
    static getDbServiceInstance(){
            return inst ? inst : new DbService();
    }

    async insertreg(fname,user,email,phn,pswd){
        try{
            const insertId= await new Promise((resolve,reject)=>{
            const date_added=new Date();    
            const query="INSERT INTO registration(fname,user,email,phn,pswd,date_added) VALUES(?,?,?,?,?,?);";

                connection.query(query,[fname,user,email,phn,pswd,date_added],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result);
            
                })
            
            });
            console.log(insertId);
            return(insertId);
        }
        
        catch(error){
            console.log(error);
        }
    }
    async checkreg(user,phn)
    { 
        try{
        const reg=await new Promise((resolve,reject)=>{   
            console.log(user);
            console.log(phn);
        const query="SELECT user,phn FROM registration WHERE user='"+user+"' or phn="+phn+";";
        connection.query(query,[user,phn],(err,reg)=>{
            console.log(reg);
            console.log(reg.length);
            if(err) reject(new Error(err.message));
                    resolve(reg);
            })
        });

        console.log(reg.length);
        return(reg);
        }
        catch(error)
        {
            console.log(error);
        }
        //console.log(login.length);
        //return(login);
    }
    async checklogin(user,pswd)
    { 
        try{
        const login=await new Promise((resolve,reject)=>{   
        const query="SELECT user,pswd FROM registration WHERE user='"+user+"' and pswd='"+pswd+"';";
        connection.query(query,[user,pswd],(err,login)=>{
            if(err) reject(new Error(err.message));
                    resolve(login);
            })
        });

       // console.log(login.length);
        return(login);
        }
        catch(error)
        {
            console.log(error);
        }
        //console.log(login.length);
        return(login);
    }
    async logininsertion(user,pswd)
    {
        const insert=await new Promise((resolve,reject)=>{
        const query="INSERT INTO login(user,pswd) VALUES(?,?);";
        connection.query(query,[user,pswd],(err,result)=>{
            if(err)
            {
                console.log(err.message);
                return(err.message);
            }
        });
    });

    }
    async checkhome(user)
    { 
        try{
        const home=await new Promise((resolve,reject)=>{   
        const query="SELECT user FROM login WHERE user='"+user+"';";
        connection.query(query,[user],(err,home)=>{
            if(err) reject(new Error(err.message));
                    resolve(home);
            })
        });
        
        return(home);
        }
        catch(error)
        {
            console.log(error);
        }
        //console.log(login.length);
        //return(login);
    }
    async logout(user)
    {
        const delet=await new Promise((resolve,reject)=>{
        const query="DELETE FROM login WHERE user='"+user+"';";
        connection.query(query,[user],(err,delet)=>{
            if(err)
            {
                console.log(err.message);
                return(err.message);
            }
        });
    });

    }
    
}

module.exports = DbService;
