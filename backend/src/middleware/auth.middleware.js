const jwt = require("jsonwebtoken");
const blackListTokens = require("../models/blacklist.model");
async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  const isBlackListed= await blackListTokens.findOne({token});
  if(isBlackListed){
   return res.status(401).json({
      message:"Unauthorized"
   })
  }
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try{
   const decoded=jwt.verify(token, process.env.JWT_SECRET);
   req.user=decoded;
   next();
  }
  catch(err){
   return res.status(401).json(
      {
         message:"Unauthorized"
      }
   )
  }
}

module.exports={
   authMiddleware

}