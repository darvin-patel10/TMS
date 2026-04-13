import {React, useState } from 'react'
import bgImage from '/bgimg.jpg'

const Login = ({handleLogin}) => {

  const [email,setEmail] = useState("");
  const [password , setPassword] = useState("");

  const emailHandler = (e)=>{
    setEmail(e.target.value);
  }

  const passwordHandler = (e)=>{
    setPassword(e.target.value);
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    handleLogin(email,password);
    setEmail("");
    setPassword("");
  }

  return (
    <div style={{ backgroundImage: `url(${bgImage})` }}className='flex h-screen w-screen items-center justify-center bg-cover bg-center'>
        <div className='bg-white/10 backdrop-blur-md w-[90%] sm:size-100 border-2 border-emerald-600 rounded-xl'>
            <form className='p-8 sm:p-16 rounded-xl'>
                <h2 className='text-white text-3xl font-bold'>Log In</h2>
                <input type='email' required onChange={emailHandler} value={email} placeholder='Enter your email' className='flex h-10 w-full sm:w-70 mt-5 mb-5 p-3 border-2 border-emerald-600 text-gray-50 text-lg rounded-lg'/>
                <input type='password' required onChange={passwordHandler} value={password} placeholder='Enter your password' className='flex h-10 w-full sm:w-70 mt-5 p-3 border-2 border-emerald-600 text-gray-50 text-lg rounded-lg' />
                <button onClick={submitHandler} className='mt-10 bg-emerald-600 text-white cursor-pointer h-10 w-full sm:w-70 rounded-full'>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default Login
