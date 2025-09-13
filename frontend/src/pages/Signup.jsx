import React, { useContext, useRef, useState } from 'react';
import dp from "../assets/empty-pic.webp";
import { dataContext } from '../context/UserContext.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { serverUrl,userData,setUserData,getUserData } = useContext(dataContext);
  const navigate = useNavigate();

  // ✅ Changed initial states from `null` to `""`
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const file = useRef(null);

  const [frontendImage, setFrontendImage] = useState(dp);
  const [backendImage, setBackendImage] = useState();

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setBackendImage(selectedFile);
    const imagePreview = URL.createObjectURL(selectedFile);
    setFrontendImage(imagePreview);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);

      if (backendImage) {
        formData.append("profileImage", backendImage);
      }

      const {data} = await axios.post(
        `${serverUrl}/api/signup`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      await getUserData()
      setUserData(data.user)
       navigate("/");

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px] '>
        <h1 className='text-white text-[20px] font-semibold '>Sign Up</h1>
        <form
          className='w-[100%] flex flex-col justify-center items-center gap-[20px]'
          onSubmit={handleSignup}
        >
          <input
            type="file"
            hidden
            ref={file}
            onChange={handleImage}
          />

          <div className='w-[100px] h-[100px] rounded-full bg-white flex flex-col overflow-hidden relative border-2 border-white'>
            <img src={frontendImage} alt="profile preview" className='w-[100%] h-[100%]' />
            <div
              onClick={() => file.current.click()}
              className='absolute w-[100%] h-[100%] bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white font-semibold text-[26px]'
            >
              +
            </div>
          </div>

          <div className='w-[80%] h-[50px] flex justify-center items-center gap-[10px]'>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder='first name'
              className='w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            />
            <input
              type="text"
              placeholder='last name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className='w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            />
          </div>

          <input
            type="text"
            placeholder='username'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
          />

          <input
            type="email"
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
          />

          <input
            type="password"
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
          />

          <button className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg'>
            Sign Up
          </button>

          <p className='text-white cursor-pointer' onClick={() => navigate("/login")}>
            Already have an account? <span className='text-[#07c7e4]'>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
