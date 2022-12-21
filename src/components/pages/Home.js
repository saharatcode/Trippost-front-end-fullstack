import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from 'antd';
// import PostPage from './PostPage';
// import PostCard from './postComponents/PostCard';
import axios from '../../config/axios'
// import PostList from './postComponents/PostList';
import PostLists from '../homeComponents.js/PostLists'

// import Header from './Header';


export default function Home() {
  const [posts, setPosts] = useState([])
  const [data, setData] = useState()
  console.log(data)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('/posts')
        setPosts(res.data.posts);
      } catch (err){
        console.log(err)
      }
    };
    fetchPost();
    
  }, [])
  return (
    <div>
    <PostLists posts={posts}/>
    </div>
    

  )
}
