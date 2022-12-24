import React, { useState, useEffect } from 'react'
import '../../App.css'
// import LikeContent from '../homeComponents.js/LikeContent'
import {LikeFilled,LikeOutlined} from '@ant-design/icons'
import UserProfile from './UserProfile'
import { useParams } from 'react-router-dom'
import axios  from '../../config/axios'

export default function ReadComponent({
    posts:{image, title, text,},
    fetchPost,
    likes,
    firstName,
    lastName,
    profileImage,
    createdAt,
    userId,
}) 

{
    const {id} = useParams()
    const postId = parseInt(id)

    const [liked, setLiked ] = useState()

    const fetchLike = async () => {
        try {
          const res = await axios.get(`/likes/${postId}`)
          setLiked(res.data.likes);
        } catch (err){
          console.log(err)
        }
      };
      useEffect(() => {
        fetchLike();
      }, [])

    const addLike = async () => {
        await axios.post("/likes", { postId: postId });
        fetchPost()
        fetchLike()
    };

    const deleteLike = async () => { 
        await axios.delete(`/likes/${postId}`);
        fetchPost()
        fetchLike()
    };

    //Toggle Like Dislike Button
    let likeButton = (
        <>
        <LikeFilled className='like' style={{ fontSize: '40px', color: 'black' , }} onClick={deleteLike}/>
        </>
    )
    if(liked === null) {
        likeButton = (
            <>
                <LikeOutlined className='text-muted' role="button" style={{ fontSize: '40px' , }} onClick={addLike}/>
            </>
        )
    }

  return (
    <>
    <div className='background-color-read-component' style={{marginTop:"50px"}}>
        <div className='container-fluid' style={{width:"800px",paddingTop:"24px"}}>
            <div className='row'>
                <div className='col'>
                    <div className='title-read word-wrap'>{title}</div>
                </div>
            </div>
            <div className='row mt-4'>
                <UserProfile 
                userId={userId} 
                firstName={firstName} 
                lastName={lastName} 
                profileImage={profileImage} 
                createdAt={createdAt}/>
            </div>
            <div className='row mb-4 d-flex justify-content-center'>
                <img src={image} style={{maxHeight:"600px", width:"auto"}} />
            </div>
            <div className='row'>
                <pre className='text-left text-read word-wrap'>
                    {text}
                </pre>
            </div>
            <div className='row text-center'>
                <h2>{likes}</h2>
            </div>
            <div className='row'>
            <div className='col d-flex justify-content-center mb-4'>
                {likeButton}
            </div>
        </div>
    </div>            
    </div>

    
    </>

  )
}
////