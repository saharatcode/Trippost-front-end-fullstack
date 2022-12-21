import { Button,Form, Input } from 'antd'
import React, { useState } from 'react'
import axios from '../../config/axios';
import '../../App.css'

export default function ProfileConponent({user, fetchPost}) {

  const [inputImage, setInputImage] = useState();
  const [newFirstName, newSetFirstName] = useState();
  const [newLastName, newSetLastName] = useState();

  // like-paddind
  // console.log(user.firstName)

  const [edithButton, setEdithButton] = useState(false)
  let [uploadButton, setUploadButton] = useState(false)

 
  let imgProfile
  if(inputImage) {
    imgProfile = URL.createObjectURL(inputImage);
    uploadButton = "upload"
  } else if(user.profileImage) {
    imgProfile = user.profileImage;
  } else {
    imgProfile = "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"
  }

  const formData = new FormData();
  formData.append('profileImg', inputImage)

  const updateProfileImage = async () => {
    try {
      await axios.patch('users/profile-img', formData)
      fetchPost()
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
      fetchPost()
      // window.location.reload(false)
    }catch(err){
      console.log(err)
    }
  }

  const showEdithForm = () => {
    setEdithButton(true)
    newSetFirstName(user.firstName)
    newSetLastName(user.lastName)
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
        <input type="file" accept="image/*" id="banner-upload" onChange={ async (e) => {if(e.target.files[0]) setInputImage(e.target.files[0])}} hidden/>
        < label for="banner-upload" ><img src={imgProfile} alt="upload banner" className='img-profile like' /></label>
        </div>
        {uploadButton === "upload" && <Button onClick={updateProfileImage}>upload</Button>}
        <div>
            <br/>
            <h3>{user.firstName+" "+user.lastName}<sub><Button size='small' onClick={showEdithForm}>edith</Button></sub></h3>
            {edithUserNameForm}  
        </div>
        </div>
    </div>
  )
}
