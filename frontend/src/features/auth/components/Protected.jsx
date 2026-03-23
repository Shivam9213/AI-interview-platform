import {useAuth} from "../hooks/userAuth";
import React from "react";
import { Navigate } from "react-router";

const Protected=({children})=>{
const {user,loading} = useAuth();
if(loading){
   return <div>Loading...</div>
}
if(!user){
   return <Navigate to="/login" replace={true}/>
}
return children;
}
export default Protected;
