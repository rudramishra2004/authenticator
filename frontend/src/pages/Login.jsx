import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { serverUrl,userData,setUserData,getUserData } = useContext(dataContext);
  let navigate = useNavigate()

  let [email,setEmail] = useState(null);
  let [password,setPassword] = useState(null);

  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      let {data} = await axios.post(serverUrl+"/api/login",{email,password},{withCredentials:true})
      await getUserData()
      setUserData(data.user)
      navigate("/");
    } catch (error) {
      console.log(error.message)
      alert(error.response.data.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center ' >
      <div className='w-[90%] max-w-[500px] h-[400px] bg-[#141f1f] rounded-lg flex flex-col justify-center items-center gap-[20px] '>
        <h1 className='font-semibold text-[25px] text-white '>Log In</h1>

        <form className='flex gap-[20px] w-[80%] flex-col justify-center items-center' onSubmit={handleLogin} >
          <input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} value={email} className='w-[100%] h-[50px] outline-none border-none rounded-lg  px-[10px] py-[5px]' />
          <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password} className='w-[100%] h-[50px] outline-none border-none rounded-lg  px-[10px] py-[5px]' />

          <button className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg cursor-pointer '>Login</button>

          <p className='text-white cursor-pointer' onClick={()=>navigate("/signup")}>Don't have an account? <span className='text-[#07c7e4]'>SignUp</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login