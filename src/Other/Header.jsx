import React from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';

const Header = (props) => {

  const logout = () =>{
    localStorage.setItem('loggedInUser','');
    props.changeUser('')
    // window.location.reload();
  }

  return (
    <div className='flex justify-between items-center space-between p-4'>
      <div className='ml-3'>
        <h2 className='text-base'>Hello</h2>
        <span className='text-xl text-white font-bold'>{props.data.firstName}</span>
      </div>
      <button onClick={logout} className='h-10 w-20 mr-3 bg-red-400 rounded-md cursor-pointer'> Log out </button>
    </div>
  )
}

export default Header
