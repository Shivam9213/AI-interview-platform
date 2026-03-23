const express=require("express");
const authMiddleware=require("../middleware/auth.middleware");
const interviewController=require("../controllers/interview.conroller");
const upload=require("../middleware/file.middleware");




const interviewRouter=express.Router();
interviewRouter.post("/",authMiddleware.authMiddleware,upload.single("resume"),interviewController.generateInterviewReportController);

interviewRouter.get("/:interviewId",authMiddleware.authMiddleware,interviewController.getInterviewReportByIdController)

interviewRouter.get("/",authMiddleware.authMiddleware,interviewController.getAllInterviewReportController)



module.exports=interviewRouter;