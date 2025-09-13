import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { useContext } from 'react'
import { dataContext } from './context/UserContext.jsx'

function App() {

  let {userData,setUserData} = useContext(dataContext)

  return (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={userData?<Home/>:<Login/>}/>
    </Routes>
  )
}

export default App
