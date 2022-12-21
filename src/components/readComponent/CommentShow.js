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
    console.log(ownerPost.id)
    console.log(`id:${User.firstName}`)
    //{comment:{text, User}}
    // console.log(Comments)
    let [toggleCommentEdithForm, setCommentEdithForn] = useState(false)
    // const toggleEdith = () => {
    //     setCommentEdithForn(true)
    // }
    
    const deleteComment = async () => {
        await axios.delete(`/comments/${id}`);
        // console.log('unLike')
        fetchPost()
    }

    let CommentEditFrom;
    if(ownerPost.id == User.id){
        CommentEditFrom = (
            <>
            <div className='row'>
                <div className='col'>
                    {/* <Button size='small' onClick={toggleEdith}>edith</Button> */}
                    <Button size='small' onClick={deleteComment}>delete</Button>
                </div>
            </div>
            </>
        )
    }

    // let edithCommentInput;
    // if(true){
    //     edithCommentInput = (
    //         <>
    //     <Form.Item
    //     label=""
    //     name="newComment"
    //     rules={[{ required: false, message: 'Please input your username!' }]}
    //     >
    //     <Input />
    //     </Form.Item>
    //         </>
    //     )
    // }

  return (
    <div className='blackground-color-white'>
        <div className='comment-container border'>
            <div>
                <b>{User.firstName +" "+ User.lastName}</b>
                
            </div>
            <p>
                {text}
            </p>
            {/* {edithCommentInput} */}
            {CommentEditFrom}
        </div>
    </div>
  )
}
