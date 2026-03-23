import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,logout,register,getuser as fetchUser } from "../services/auth.api";

export const  useAuth=()=>{
   const constext =useContext(AuthContext);
   const {user,setUser,loading,setLoading}=constext;
   
   const handleLogin= async ({email,password})=>{
      setLoading(true)
      try{
     const data =await login({email,password}) ;
     setUser(data.user);
      }
      catch(err){
         console.log(err)
      }
      finally{
     setLoading(false)
      }
   }
   const handleRegister= async ({username,email,password})=>{
      setLoading(true)
      try {
     const data =await register({username,email,password}) ;
         setUser(data.user);
      }
      catch(err){
         console.log(err)
      }
      finally{    
     setLoading(false)
      }
   }
   const handlogout = async ()=>{
      setLoading(true)
      try {
     const data = await logout();
      setUser(null);
      }
      catch(err){
         console.log(err)
      }
      finally{
      setLoading(false)
   }}
   const handleGetUser = async () => {
      setLoading(true);
      try {
         const data = await fetchUser();
         setUser(data.user);
      } catch (err) {
         console.log(err);
      } finally {
         setLoading(false);
      }
   }
   return {
      user,
      setUser,
      loading,
      setLoading,
      handleLogin,
      handleRegister,
      handlogout,
      handleGetUser
   }
}