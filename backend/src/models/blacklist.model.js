const mongoose = require('mongoose');

const blackListSchema= new mongoose.Schema({
   token:{
      type:String,
      required: [true, "Token is required"]
   }
},
{
   timestamps:true
}
)
const blackListTokens=mongoose.model("blackListTokens",blackListSchema);

module.exports=blackListTokens;