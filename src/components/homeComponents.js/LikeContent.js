import React, { useState } from 'react'
import '../../App.css'

export default function LikeContent({ like }) {
  const [likes, setLike] = useState(like)
  return (
    <>
      <p className='mgr like-paddind'>{`Like: ` + likes.length}</p>
    </>
  )
}
