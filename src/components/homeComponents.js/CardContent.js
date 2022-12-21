import React, { useState } from 'react'
import '../../App.css'
import FooterContent from './FooterContent'
import LikeContent from './LikeContent'
import CommentScore from './CommentScore'

export default function CardContent({post}) {
    //ยอด Comments, like
    const [comments, setComment] = useState(post.Comments)
    const [likes, setLike] = useState(post.Likes)


    const str = post.text
    const str200 = str.slice(0,200)
    let textUp = (<>{str200}</>)
    if(str.length > 200) {
        textUp = (<>{str200} ...</>)
    }
    // const str30 = str.slice(0,200)
    
  return (
    <div className='blackground-color-white'>
        <div className='card-container center'>
        
            <img src={post.image} />
            <div className='padding'>
            <div className='text-left'>
            <div>
                <h2>{post.title}</h2>
                <p className='color-gray'><b>{`By ${post.User.firstName} ${post.User.lastName}`}</b></p>
            </div>
            <div>
                <p>
                    {textUp}
                    {/* {str200} ... <p>Post Id: {post.id}</p> */}
                </p>
            </div>
           
            </div>
            <div className='container-footer-content'>

            <FooterContent post={post.id} /> 
            <LikeContent like={likes}/>
            <CommentScore comments={comments}/>
            </div>
            </div>

        </div>

        
    </div>
  )
}
//
