const db = require('../config/mongo');
const bcrypt = require('bcryptjs');
const user = require('../models/usertemplate')
let exp ={};


exp.register = async(req,res)=>{
    try{
        bcrypt.hash(req.body.password, 10).then( async (hash) => {
            const newUser = new user({
                name: (req.body.name).trim(),
                email: (req.body.email).trim(),
                password: hash,
                bio:'',
                following:[],
                designs:[],
                likes:[],
                saved:[],
            });
        
           var result = await newUser.save();
           if(!result){
               console.log(e);
               return res.send("An error Occured");
           }
           console.log(result);
           return res.send("User added successfully" +result)

        });

    }
    catch(e){
        console.log(e);
        return res.send("Error Occured: "+ e)
    }
}
exp.login = async(req,res)=>{
    try{
        if( req.session.logged_in == undefined || !req.session.logged_in ){
            result = await user.findOne({"email":(req.body.email).trim()})
            console.log(result)
            
            if(!result) return res.send("An Error Occured");
            
            else if( result.length == 0 ) res.send('Invalid credentials');

            else{
                resultVal = await bcrypt.compare( req.body.password , result.password );
                
                if(!resultVal) return res.send("Invalid Credentials");
                
                 else{
                    //console.log(query);      
                    req.session.email = req.body.email;
                    req.session.name = result.name;
                    req.session.logged_in = true;
                    console.log(req.session)
                    return res.send('Logged in Successfully');
                }
            }
        }
        else{
            console.log(req.session)
            return res.send('Already Logged in');
        }
    }
    catch(e){
        console.log(e)
        return res.send('Error Occured: '+ e)
    }
}


exp.logout = async (req, res) => {
    await req.session.destroy();
    return res.send('Logged Out Successfully');
  };
  
module.exports = exp;