import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import axios from '../../config/axios'

export default function MyPostShow({mypost, fetchPost}) {
    // const[userName, setUserName] = useState(mypost.User)
    // const[image, setImage] = useState(mypost.image)
    const[title, setTitle] = useState(mypost.title)
    // const[text, setText] = useState(mypost.text)
    // const[userId, setUserId] = useState(mypost.userId)
    const [id, setId] = useState(mypost.id)
    // console.log(typeof(id))

  return (
    <>
    <div className='my-list-post'>
      <div>
        {title}
        
        <div className='btn-my-list-post'>
            
            <Button ><Link to={`/edith-content/${id}`} className='text-decoration-none'>Edith</Link></Button>

            <Button onClick={ async () => {
              await axios.delete(`/posts/${id}`)
              fetchPost()
              // window.location.reload(false)
              }}>Delete</Button>
              </div>
        </div>
    </div>
    </>
  )
}
