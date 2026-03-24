const pdfParse=require("pdf-parse");
const { generateInterviewReport }=require("../services/ai.service");
const interviewReportModel=require("../models/interviewReport.model");
async function generateInterviewReportController(req, res) {
    const resumeContent = await pdfParse(req.file.buffer)
   const {selfDescription,jobDescription}=req.body;

   const interViewReportByAI=await generateInterviewReport({
      resume:resumeContent.text,
      selfDescription,
      jobDescription
   })
   console.log("AI Response:", JSON.stringify(interViewReportByAI, null, 2))
const interviewReport=await interviewReportModel.create({
   user: req.user.id,
   resume:resumeContent.text,
   selfDescription,
   jobDescription,
   ...interViewReportByAI
})
res.status(201).json({
   message:"Interview report generated successfully",
   interviewReport
})
}

async function getInterviewReportByIdController(req, res) {
   const {interviewId}=req.params;
   const interviewReport=await interviewReportModel.findOne({_id:interviewId,user:req.user.id});
   if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found" });
   }
   res.status(200).json({
      message:"Interview report fetched successfully",
      interviewReport
   })
}

async function getAllInterviewReportController(req, res) {
   const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
   res.status(200).json({
      message:"Interview reports fetched successfully",
      interviewReports
   })
}

module.exports={generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportController}