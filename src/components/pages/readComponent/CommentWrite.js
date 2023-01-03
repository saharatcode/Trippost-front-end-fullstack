import { Button, Input } from 'antd';
import React, { useState } from 'react';
import axios from '../../../config/axios'

export default function CommentWrite({ postId, fetchPost }) {
  const [inputField, setInputField] = useState("");

  const id = postId

  const addComment = async () => {
    await axios.post("/comments", { text: inputField, postId: id });
    setInputField("");
    fetchPost()
  };

  const { TextArea } = Input;
  let writeComment = (
    <>
      <TextArea
        rows={2}
        placeholder="comment max 150"
        maxLength={150}
        value={inputField}
        onChange={(e) => setInputField(e.target.value)} />
    </>
  )
  return (
    <>
      <div className='container-fluid mt-4 mb-3 ' style={{ width: "800px" }}>
        <div className='row g-0'>
          <div className='col-10'>
            {writeComment}
          </div>
          <div className='col-2 g-0'>
            <button
              type="button"
              class="btn btn-dark h-100 w-100"
              style={{fontSize: "clamp(16px, 2.5vw, 20px )"}}
              onClick={addComment}
              >send
            </button>
          </div>
        </div>

      </div>


    </>
  )
}
