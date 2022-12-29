import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons';
import localStorageService from '../../services/localStorageService';
import axios from '../../config/axios';
import '../../App.css'

export default function Navigationbar({ props }) {

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  const token = localStorageService.getToken();
  const Admin = parseJwt(token)

  const [user, setUser] = useState({})
  const { firstName, lastName, profileImage } = user

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/${Admin.id}`)
      setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    fetchUser();
  }, [])

  const reload = () => {
    window.location.reload()
  }

  return (
    <>
 
      <ul>
        <div className='left'>

          <li>
            <p className='userName'>
              <img
                src={profileImage ?? "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"}
                style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "8px" }} />
              {firstName} {lastName}
            </p>
          </li>
          <li><Link className='tag' to="/home">Trippost</Link></li>
          <li><Link className='tag' to={`/profile-writer/${Admin.id}`} onClick={() => { setTimeout(reload, 0); }}>Profile</Link></li>
          <li><Link className='tag' to="/write">Write now</Link></li>
        </div>

        <li><button
          style={{ height: "60px", width: "150px", }}
          onClick={logout} type="button"
          class="btn btn-dark d-flex align-items-center justify-content-center">Sign out <LogoutOutlined style={{ fontSize: "15px", marginLeft: "4px" }} /></button></li>
      </ul>
    </>
  )
}
