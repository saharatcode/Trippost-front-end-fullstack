import React, { useState } from 'react'
import { LikeTwoTone, LikeFilled,} from '@ant-design/icons';
import '../../App.css'

export default function LikeContent({like}) {
  const [likes, setLike] = useState(like)
  return (
    <>
        {/* <LikeTwoTone /> */}
        
        <p className='mgr like-paddind'>{`Like: `+ likes.length}</p>
        {/* <p className='mgr'>{likes.length}</p> */}
    </>
  )
}
