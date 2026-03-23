const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const connectDB=require("./config/database");
const authRouter=require("./routes/auth.routes");
const testai = require("./services/ai.service");

const app=express();
connectDB();

app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}))

const interviewRouter=require("./routes/interview.routes");

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);

module.exports=app;
