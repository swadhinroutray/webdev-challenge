const  mongoose =require("mongoose");
let exp ={};

exp.connectMongo = async () =>{
  var mongouri = `mongodb://localhost/webchallenge:27017`;
    await mongoose.connect(
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