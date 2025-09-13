import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'

function Home() {
    let {serverUrl,userData,setUserData} = useContext(dataContext)

    const handleLogout = async()=>{
      try {
        let data = await axios.post(serverUrl+"/api/logout",{},{withCredentials:true})
        setUserData(null)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='w-full h-screen bg-[#0d1818] flex flex-col justify-center items-center gap-[20px]'>

      <div className='w-[100px] h-[100px] rounded-full bg-white flex flex-col overflow-hidden relative border-2 border-white'>
            <img src={userData.profileImage} alt="profile preview" className='w-[100%] h-[100%]' />
          </div>

      <p className='text-white text-[20px]'>Hey , <span className='text-[#0ce0e7] text-[25px] font-semibold'>{userData.firstName}</span>, welcome to ultimate world</p>
      <button onClick={handleLogout} className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg cursor-pointer '>LogOut</button>
    </div>
  )
}

export default Home