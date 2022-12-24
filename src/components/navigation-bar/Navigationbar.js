import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

  let [image, setImage] = useState()

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/${Admin.id}`)
      setImage(res.data.user.profileImage)
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <>

      <ul>
        <li><img src={image ?? "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"} style={{ width: "60px", height: "60px", borderRadius: "50%", marginLeft: "20px" }} /></li>
        <li><Link to="/home">Trippost</Link></li>
        <li><Link to={`/profile-writer/${Admin.id}`}>Profile</Link></li>
        <li><Link to="/profile">Write now</Link></li>
        <li><button
          style={{ height: "60px", width: "100px", marginLeft: "1065px", }}
          onClick={logout} type="button"
          class="btn btn-dark">Sign out</button></li>
      </ul>
    </>
  )
}
