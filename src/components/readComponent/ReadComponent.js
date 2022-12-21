import React, { useState } from 'react'
import '../../App.css'
import LikeContent from '../homeComponents.js/LikeContent'
import {LikeFilled,DislikeFilled, LikeOutlined, DislikeOutlined, BulbOutlined} from '@ant-design/icons'

import { useParams } from 'react-router-dom'
import axios  from '../../config/axios'

export default function ReadComponent({posts:{image, title, text,}, fetchPost, likes, firstName, lastName}) {
    
    const {id} = useParams()
    const postId = parseInt(id)
    //*************************************** */
    // const [like, setLike] = useState(posts.Likes)
    // console.log(`N: ${lastName}`)
    // const [state, setState] = useState("")
    // console.log(state)
    
    const addLike = async () => {
        await axios.post("/likes", { postId: postId });
        fetchPost()
    };

    const deleteLike = async () => {
        await axios.delete(`/likes/${postId}`);
        fetchPost()
    };

    let likeButton = (
        <>
            <LikeFilled className='like' style={{ fontSize: '40px' , }} onClick={addLike}/>
        </>
    )
    
    let unlikeButton = (
            <>
                {/* <BulbOutlined className='like' style={{ fontSize: '40px', color: 'black' , }} onClick={deleteLike} /> */}
                <DislikeFilled className='like' style={{ fontSize: '40px', color: 'black' , }} onClick={deleteLike}/>
                {/* <LikeFilled className='like' style={{ fontSize: '40px', color: 'black' , }} onClick={deleteLike} /> */}
            </>
        )
    
  return (
    <div className='background-color-read-component'>
    <div className='read-container center margin-top-90'>
        <div className='center title-read'>
            <p>{title}</p>
            {/* <p>{posts.title}</p> */}
           
        </div>

        <p className='ownerPost-read'>{`By ${firstName} ${lastName}`}</p>
        <img src={image} />
        {/* <img src={posts.image} /> */}
        

        <div className='padding'>
            <div>
            <pre className='text-left text-read'>
                {text}
                {/* {posts.text} */}
            </pre>
                <h1>{likes}</h1>
                {likeButton}
                
                {unlikeButton}
            </div>
        </div>
    </div>
    </div>
  )
}
////