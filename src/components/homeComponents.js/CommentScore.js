import React, { useState } from 'react'
import '../../App.css'

export default function CommentScore({comments}) {
  const [comment, setComment] = useState(comments)
  return (
    <>
        <p className='mgr'>{`Comment: `+ comment.length}</p>
    </>
  )
}
