import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigationbar from '../navigation-bar/Navigationbar'
import Footer from '../footer/Footer'
import ReadComponent from '../readComponent/ReadComponent'
import CommentWrite from '../readComponent/CommentWrite'
import CommentShow from '../readComponent/CommentShow'
import '../../App.css'
import axios from '../../config/axios'

export default function ReadContent() {
    const {id} = useParams()
    const postId = parseInt(id)
    
    const [posts, setPosts] = useState([])
    const [comments, setComment] = useState([])
    const [likes, setLikes] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
  // console.log(likes)
    const fetchPost = async () => {
      try {
        const res = await axios.get('/posts')
        setPosts(res.data.posts.find(e => e.id === postId));
        setComment(res.data.posts.find(e => e.id === postId).Comments)
        setLikes(res.data.posts.find(e => e.id === postId).Likes.length)
        setFirstName(res.data.posts.find(e => e.id === postId).User.firstName)
        setLastName(res.data.posts.find(e => e.id === postId).User.lastName)
      } catch (err){
        console.log(err)
      }
    };

    useEffect(() => {
      fetchPost();
    }, [])

    // console.log(comments)
//
  return (
    <div className='background-color-read-content'>
        <Navigationbar/>
        <div className='container'>
            <ReadComponent posts={posts}  fetchPost={fetchPost} firstName={firstName} lastName={lastName} likes={likes}/>
            {/* <LikeComponent/> */}
        
            {/* <h1>{posts.title}</h1> */}
        </div>
        <div className='container'>
            <CommentWrite postId={posts.id} fetchPost={fetchPost}/>
        </div>
        <div className='container'>
            {/* <CommentList post={posts.Comments}/> */}
            {/* <CommentShow/> */}

            {comments.map( (item) => (
            <CommentShow key={item.id} comment={item} fetchPost={fetchPost}/>
              ))}
        </div>
        
        <Footer/>

    </div>
    
  )
}
//