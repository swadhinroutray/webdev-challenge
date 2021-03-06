const path = require('path')
require('dotenv').config({ path: path.join('.env')});
const user = require('../models/usertemplate')
const design = require('../models/postTemplate')
const {uuid} = require('uuidv4')

let exp ={};


uploadS3 = async (file,filename)=> {
    
    const requestData = {
        Bucket: 'webdevchallenge',
        Key: filename,
        Body: file.buffer
    }

    await s3.upload(requestData, (data) => {
        if(data){ 
            console.log(data)
            return true;
        }
        return false;
        
    })
}


    exp.upload = async (req,res)=>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
        const file = req.files[0];
        console.log(req.files)
        const id = uuid();
        var ext = file.originalname.split('.').pop();
        var filename = id + '.' + ext;
        console.log(filename)
       

        await uploadS3(file,filename);

        result = await user.findOneAndUpdate(
            {"email":(req.session.email).trim()},
            {$push:{ designs: filename }} 
        )
            console.log(result)
            if(!result) return res.send("An Error Occured"); 
            
            const newDesign = new design({
                title:req.params.title,
                authoremail:(req.session.email).trim(),
                authorname:(req.session.name).trim(),
                filename: filename,
                savedby:[],
                comments:[],
                likedby:[],
            });

            resultData = await newDesign.save();
            console.log(resultData)
            if(!resultData) return res.send("An Error Occured"); 

            return res.send("Successfully Uploaded & Posted");

        }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}

exp.addbio = async (req,res)=>{
 try{
    if(req.session.logged_in != undefined && req.session.logged_in == true){
        result = await user.findOneAndUpdate(
            {"email":(req.session.email).trim()},
            {$set:{ bio : req.body.bio}} 
        )
            console.log(result)
            if(!result) return res.send("An Error Occured");
            return res.send("Bio Added Successfully")

    }
    else{
        return res.redirect('/login')
    }
 }   
 catch(e){
     console.log(e);
     return res.send('An Error Occured'+e)
 }
}


exp.likeDesign = async(req,res)=>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result0 = await user.findOne(
                {"email":(req.session.email).trim()},
                {likes:{ $elemMatch:{$eq : req.params.title}}} 
            )
            console.log(result0)
            if(result0.likes){
                return res.send("Already liked")

            }
            result = await user.findOneAndUpdate(
                {"email":(req.session.email).trim()},
                {$push:{ likes: (req.params.title).trim() }} 
            )
            if(!result) return res.send("An Error Occured");
            
            PostResult = await design.findOneAndUpdate(
                {"title":(req.params.title).trim()},
                {$push:{ likedby: (req.session.email).trim()}}    
            )
            if(!PostResult) return res.send("An Error Occured");
            
            return res.send("Design Liked!")
        }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+e)
    }

}

exp.addComment = async(req,res)=>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            PostComment = await design.findOneAndUpdate(
                {"title":(req.params.title).trim()},
                {$push:{ comments: (req.body.comment)}}    
            )
            if(!PostComment) return res.send("An Error Occured");
            return res.send("Published comment Successfully");
        }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}

exp.saveDesign = async(req,res)=>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
        
            result0 = await user.findOne(
                {"email":(req.session.email).trim()},
                {saved:{ $elemMatch:{$eq:req.params.title}}} 
            )
            console.log(result0.saved.length)
            if(result0.saved.length != 0){
                return res.send("Already saved")
            }
            result = await user.findOneAndUpdate(
                {"email":(req.session.email).trim()},
                {$push:{ saved: (req.params.title).trim() }} 
            )
            if(!result) return res.send("An Error Occured");
            
            SaveResult = await design.findOneAndUpdate(
                {"title":(req.params.title).trim()},
                {$push:{ savedby: (req.session.name).trim()}}    
            )
            if(!SaveResult) return res.send("An Error Occured");
            
            return res.send("Design Saved!")
        }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}

exp.follow = async(req,res) =>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            console.log(req.params.authorname)
            result0 = await user.findOne(
                {"email":(req.session.email).trim()},
                {following:{ $elemMatch:{$eq : req.params.authorname}}} 
            )
            console.log(result0.following)
            if(result0.following){
                return res.send("Already Following")

            }
            result = await user.findOneAndUpdate(
                {"email":(req.session.email).trim()},
                {$push:{ following:(req.params.authorname).trim() }} 
            )

            if(!result) return res.send("An error Occured")
            return res.send("Now Following "+ req.params.authorname)
        }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}

exp.getProfile = async(req,res) => {
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result = await user.findOne(
                {"email":(req.session.email).trim()}, 
            )
            console.log(result)
            if(!result) return res.send("An error Occured")
            return res.send(result)
        }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
     
}


exp.getDesigns = async(req,res) =>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result = await user.findOne(
                {"email":(req.session.email).trim()}, 
            )
            console.log(result)
            if(!result) return res.send("An error Occured")
            var arr = [...result.designs]
            console.log(arr)
            resultData = await design.find(
                {
                    "authoremail":(req.session.email).trim(),
                }
            )

            console.log(resultData);
            if(!resultData) return res.send("An error Occured")
           
         // var obj = [];

        //     for (let index = 0; index < arr.length; index++) {
        //     const element = arr[index];
        //     var getParams = {
        //         Bucket: 'webdevchallenge',
        //         Key: element,
        //     }
            
        //     //Fetch or read data from aws s3
        //     await s3.getObject(getParams, function (err, data) {
            
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log(data.Body.toString())
        //             obj.push(data.Body); //this will log data to console
        //         }
        //     }
            
        //     )
        // }
    
        return res.send(resultData);
    }
        else{
            return res.redirect('/login')
        }
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
     
}   

exp.getFeed = async (req,res)=>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result = await design.find({}, 
            )
            console.log(result)
            if(!result) return res.send("An error Occured")
            return res.send(result)
        }
        else{
            return res.redirect('/login')
        }  
        
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}
exp.getLiked = async (req,res)=>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result = await user.findOne({"email": req.session.email}, 
            )
            console.log(result)
            if(!result) return res.send("An error Occured")
            var arr =[result.likes]
            if(arr.length==0)
            return res.send("Empty array!")
            return res.send(arr)
        }
        else{
            return res.redirect('/login')
        }  
        
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}

exp.getSaved = async (req,res) =>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result = await user.findOne({"email": req.session.email}, 
            )
            console.log(result)
            if(!result) return res.send("An error Occured")
            var arr = [result.saved]
            if(arr.length==0)
            return res.send("Empty array!")
            return res.send(arr)
        }
        else{
            return res.redirect('/login')
        }  
        
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}
exp.getFollowing = async (req,res) =>{
    try{
        if(req.session.logged_in != undefined && req.session.logged_in == true){
            result = await user.findOne({"email": req.session.email}, 
            )
            console.log(result)
            if(!result) return res.send("An error Occured")
            var arr = [result.following]
            if(arr.length==0)
            return res.send("Empty array!")
            return res.send(arr)
        }
        else{
            return res.redirect('/login')
        }  
        
    }
    catch(e){
        console.log(e);
        return res.send('An Error Occured'+ e)
    }
}


module.exports =exp;


