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
                title:req.body.title,
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


module.exports =exp;


