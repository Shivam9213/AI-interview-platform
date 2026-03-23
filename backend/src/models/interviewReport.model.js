const mongoose=require("mongoose");

const technicalQauestionsSchema= new mongoose.Schema({
   question : {
      type: String,
      required : [true,"question required"]
   },
   intention : {
      type: String,
      required : [true,"intention required"]
   },
   answer : {
      type: String,
      required : [true,"answer required"]
   }
},{
   _id:false
})

const behavioralQauestionsSchema= new mongoose.Schema({
   question : {
      type: String,
      required : [true,"question required"]
   },
   intention : {
      type: String,
      required : [true,"intention required"]
   },
   answer : {
      type: String,
      required : [true,"answer required"]
   }
},{
   _id:false
})

const skillGapSchema= new mongoose.Schema({
   skill : {
      type: String,
      required : [true,"skill required"]
   },
   severity :{
      type: String ,
      enum : ["low","medium","high"] ,
      required : [true,"severity required"]
   }
},
{
   _id:false
})

const preparationPlanSchema= new mongoose.Schema({
   day:{
      type : Number,
      required : [true,"day required"]
   },
   focus : {
      type: String,
      required : [true,"focus required"]
   },
   tasks:[{
      type : String,
      required : [true,"tasks required"]
   }]

},{
   _id:false
})
const interviewReportSchema= new mongoose.Schema({
   jobDescription: {
      type: String,
      required : [true,"job description required"]
   },
   resume : {
      type: String,
      required : [true,"resume required"]
      },
      selfDescription : {
      type: String,
      required : [true,"self description required"]
   },
   matchScore :{
      type :Number ,
      min: 0,
      max: 100
   
   },
   technicalQuestions : [technicalQauestionsSchema],
   behavioralQuestions : [behavioralQauestionsSchema],
   skillGaps : [skillGapSchema],
   preparationPlan : [preparationPlanSchema],
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   title : {
      type: String,
      required : [true,"title required"]
   }
},{
   timestamps:true
}
)
const interviewReportMmodel=mongoose.model("interviewReport",interviewReportSchema);
module.exports=interviewReportMmodel;