import React, { useState } from 'react'
import { LikeFilled   } from '@ant-design/icons';

export default function LikeScore({ like }) {
  const [likes, setLike] = useState(like)
  return (
    <>
      <p><LikeFilled style={{fontSize:"20px", verticalAlign: 'middle', marginBottom:"6px"}}  /> {likes.length}</p>
    </>
  )
}
