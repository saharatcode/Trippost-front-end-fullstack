import React, { useEffect, useState } from 'react'
import MyPostShow from './MyPostShow'
import axios from '../../config/axios'

export default function MyPostList() {

  const [myPosts, setMyPosts] = useState([])
 
  const fetchPost = async () => {
    try {
      const res = await axios.get('/myposts')
      setMyPosts(res.data.posts);
    } catch (err){
      console.log(err)
    }
  };
 
  useEffect(() => {
    fetchPost();
    
  }, [])

  return (
    <>
        <h4 className='postList-margin-top postList-margin-buttom postList-color'><b>My Post List:</b></h4>
        <hr className='hr-w'/>
        <br/>
        
        <div className='scrollbar'>
        {myPosts.map( (item) => (<MyPostShow key={item.id} mypost={item} fetchPost={fetchPost}/>))}
        </div>
    </>
  )
}
//
