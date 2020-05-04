const mongoose = require('mongoose')

const user  = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
       type: String,
       required:true
    },
    bio:{
        type: String,
    }, 
    following :{
        type: Array,
    },
    designs:{
        type: Array,
    },
    likes:{
        type: Array,  
    },
    saved:{
        type:Array,
    }
});

module.exports = mongoose.model("user",user)