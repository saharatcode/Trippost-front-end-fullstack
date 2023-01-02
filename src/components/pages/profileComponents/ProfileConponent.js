import { Button,Form, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from '../../../config/axios';
import '../../../App.css'

export default function ProfileConponent() {

  const [profileData, setProfileData] = useState([])
  
  const fetchUser = async () => {
    try {
      const res = await axios.get('/users')
      setProfileData(res.data.user);
    } catch (err){
      console.log(err)
    }
  };
  useEffect(() => {
    fetchUser();  
    
  }, [])

  const [inputImage, setInputImage] = useState(false);
  const [newFirstName, newSetFirstName] = useState();
  const [newLastName, newSetLastName] = useState();

  // like-paddind
  // console.log(user.firstName)

  const [edithButton, setEdithButton] = useState(false)
  let [uploadButton, setUploadButton] = useState(false)
console.log(inputImage)
 
  let imgProfile
  if(inputImage) {
    imgProfile = URL.createObjectURL(inputImage);
    // uploadButton = "upload"
  } else if(profileData.profileImage) {
    imgProfile = profileData.profileImage;
  } else {
    imgProfile = "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"
  }

  const formData = new FormData();
  formData.append('profileImg', inputImage)

  const updateProfileImage = async () => {
    try {
      await axios.patch('users/profile-img', formData)
      setInputImage(false)
      fetchUser()
      // window.location.reload(false)
    }catch(err){
      console.log(err)
    }
  }

  const body = {
    firstName: newFirstName,
    lastName: newLastName,
  }

  const updateNameUser = async () => {
    try {
      await axios.patch('users/new-user-name', body)
      setEdithButton(false)
      fetchUser()
      // window.location.reload(false)
    }catch(err){
      console.log(err)
    }
  }

  const showEdithForm = () => {
    setEdithButton(true)
    newSetFirstName(profileData.firstName)
    newSetLastName(profileData.lastName)
    console.log(edithButton)
  }

  
  let edithUserNameForm
if(edithButton) {
  edithUserNameForm = (
    <>
    <Form.Item
    label="First name"
    name="firstName"
    rules={[{ required: false, message: 'Please input your username!' }]}
  >
    <Input value={newFirstName} onChange={ e => {newSetFirstName(e.target.value)}} />
  </Form.Item>
  <Form.Item
    label="Last name"
    name="lastName"
    rules={[{ required: false, message: 'Please input your username!' }]}
  >
    <Input value={newLastName} onChange={ e => {newSetLastName(e.target.value)}}/>
  </Form.Item>
  <Button size='middle' onClick={updateNameUser} >update</Button>
  </>
  )
}
  

  return (
    <div className='blackground-color-white'>
        <div className='center'>
        
        <div>
        <input type="file" accept="image/*" id="profile-upload" onChange={ async (e) => {if(e.target.files[0]) setInputImage(e.target.files[0])}} hidden/>
        < label for="profile-upload" ><img src={imgProfile} alt="upload profile" className='img-profile like' /></label>
        </div>
        {/* {uploadButton === "upload" && <Button onClick={updateProfileImage}>upload</Button>} */}
        {inputImage && <Button onClick={updateProfileImage}>upload</Button>}
        <div>
            <br/>
            <h3>{profileData.firstName+" "+profileData.lastName}<sub><Button size='small' onClick={showEdithForm}>edith</Button></sub></h3>
            {edithUserNameForm}  
        </div>
        </div>
    </div>
  )
}
