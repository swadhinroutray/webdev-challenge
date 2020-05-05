const  mongoose =require("mongoose");
let exp ={};

  exp.connectMongo = ()=>{
  var mongouri = `mongodb://localhost:27017/webchallenge`;
  
  mongoose.connect(
    mongouri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) console.log(err);
      else 
      console.log("Connected to MongoDB");
    }
  );
}

module.exports = exp;

//var mongouri = `mongodb://db:27017/webchallenge