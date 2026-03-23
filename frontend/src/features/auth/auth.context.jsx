import { createContext,useState,useEffect } from "react";
import {getuser} from "./services/auth.api";

export const AuthContext= createContext();

export const AuthProvider = ({ children }) => {
   const [user,setUser]=useState(null);
   const [loading,setLoading]=useState(true);
   useEffect(()=>{
      const getUserCall=async()=>{
         try {
            const data = await getuser();
            setUser(data.user);
         } catch (err) {
            setUser(null);
         } finally {
            setLoading(false);
         }
      }
    getUserCall();
   },[])

   return (
      <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
         {children}
      </AuthContext.Provider> 
   )


}