import { Button, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'

export default function CommentWrite({postId,fetchPost}) {
  const [inputField, setInputField] = useState("");
  console.log(typeof(postId))
  const id = postId

  const addComment= async () => {
    await axios.post("/comments", { text: inputField ,postId: id });
    setInputField("");
    fetchPost()
};

const { TextArea } = Input;
let writeComment = (
  <>
  <TextArea rows={2} placeholder="comment max 150" maxLength={150} value={inputField} onChange={(e) => setInputField(e.target.value)} />
  </>
)
  return (
    <>
        <div className='container-fluid mt-4 ' style={{width:"800px"}}>
          <div className='row'>
            <div className='col-10'>
              {writeComment}
            </div>
            <div className='col-2'>
            <Button style={{width:"100%", height:"100%", color:"white", background:"black", fontSize:"20px"}} onClick={addComment}>send</Button>
            </div>
          </div>

        </div>

       
    </>
  )
}
