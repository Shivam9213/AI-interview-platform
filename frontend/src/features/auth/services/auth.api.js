import axios from "axios";

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
   withCredentials:true
})

export async function register ({username,email,password}){
   try{
      const response= await instance.post('/api/auth/register',
      {username,email,password}
      )
      return response.data;
   }
   catch(err){
      console.log(err)
   }
}
export async function login({email,password}){
   try {
      const response= await instance.post('/api/auth/login',
      {email,password}
      )
      return response.data
   }
   catch(err){
      console.log(err)
   }
}
export async function logout(){
   try {
      const response=await instance.get('/api/auth/logout')
      return response.data
   }
   catch(err){
      console.log(err) 
   }
}
export async function getuser(){
   try {
      const response=await instance.get('/api/auth/get-me')
      return response.data
   }
   catch(err){
      console.log(err)
   }
}