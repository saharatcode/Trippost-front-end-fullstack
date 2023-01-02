import React, { useState } from 'react'
import { CommentOutlined ,MessageOutlined } from '@ant-design/icons';

export default function CommentScore({comments}) {
  const [comment, setComment] = useState(comments)
  return (
    <>
        <p><MessageOutlined  style={{fontSize:"20px", verticalAlign: 'middle', marginBottom:"6px"}} /> {comment.length}</p>
    </>
  )
}
