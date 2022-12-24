import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import localStorageService from '../../services/localStorageService'
import '../../App.css'
import axios from '../../config/axios'

export default function CommentShow({comment:{text, User,id}, fetchPost}) {
    // console.log(id)
    const token = localStorageService.getToken();
    console.log(token)
//..........................................................................................
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
//.........................................................................................
    const ownerPost = parseJwt(token)
    // console.log(ownerPost.id)
    // console.log(`id:${User.firstName}`)
    const deleteComment = async () => {
        await axios.delete(`/comments/${id}`);
        fetchPost()
    }
  

    let CommentEditFrom;
    if(ownerPost.id == User.id){
        CommentEditFrom = (
            <>

            {/* <Button size='small' onClick={toggleEdith}>edith</Button> */}
            {/* <Button size='small' onClick={deleteComment}>delete</Button> */}
            <Button style={{color:"black"}} className='btn btn-warning'  size='small' onClick={deleteComment}>delete</Button>

            </>
        )
    }

  return (
    <>
    <div className='container-fluid blackground-color-white mt-4' style={{width:"800px"}}>
        <div className='row mt-2' style={{marginLeft:"6px",fontSize:"17px", fontWeight: "bold"}}>
            {User.firstName +" "+ User.lastName}
        </div>
        <div className='row mb-3 word-wrap' style={{marginLeft:"6px",fontSize:"16px", fontWeight: "normal"}}>
            {text}
        </div>
        <div className='row'>
            <div className='col-2 mb-4'>
                {CommentEditFrom}
                {/* <Button className='btn btn-warning'  size='small' onClick={deleteComment}>delete</Button> */}
            </div>
        </div>
    </div>   
    </>
   
  )
}
