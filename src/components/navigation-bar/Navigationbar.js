import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import localStorageService from '../../services/localStorageService';
import '../../App.css'
import { Button } from 'antd';



export default function Navigationbar({props}) {
  
  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
}

  return (
    <>
    {/* position-fix */}
        <ul className='nav-container'>
            <li><Link to="/home">Trippost</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            
            <button className='button-logout' onClick={logout}>Logout</button>
        </ul>
        
    </>
  )
}
//