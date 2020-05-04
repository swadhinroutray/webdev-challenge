const mongoose = require('mongoose')

const design = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    authoremail:{
        type:String,
    },
    authorname:{
        type:String
    },
    filename:{
        type:String,
        required:true,
    },
    savedby:{
        type:Array
    },
    comments:{
        type:Array
    },
    likedby:{
        type:Array
    }
});

module.exports = mongoose.model("design",design)