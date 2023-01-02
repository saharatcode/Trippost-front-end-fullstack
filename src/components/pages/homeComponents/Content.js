import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css'
import ReadMore from './ReadMore'
import LikeScore from './LikeScore'
import CommentScore from './CommentScore'
import timeSince from '../../../services/timeSince'

export default function Content({ post }) {
    //ยอด Comments, like
    const [comments, setComment] = useState(post.Comments)
    const [likes, setLike] = useState(post.Likes)
    // const [userId, setUserId] = useState(post.User.id)
    const [postId, setPostId] = useState(post.id)
    const [firstName, setFirstName] = useState(post.User.firstName)
    const [lastName, setLastName] = useState(post.User.lastName)
    const [profileImage, setProfileImage] = useState(post.User.profileImage)
    const [createdAt, setCreatedAt] = useState(post.createdAt)

    const str = post.text
    const str120 = str.slice(0, 120)
    let text = (<>{str120}</>)
    if (str.length > 120) {
        text = (<>{str120} ...</>)
    }

    const titleStr = post.title
    const title50 = titleStr.slice(0, 50)
    let titleText = (<>{title50}</>)
    if (titleStr.length > 50) {
        titleText = (<>{title50} ...</>)
    }

    const path = `/read-content/${postId}`
    const defualImage = "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"
    return (
        <>
            <div className='w-100' style={{background:"white"}}>
                <div className='row g-0'>
                    <div className='col-1 g-0'>
                        <img src={profileImage ?? defualImage} style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                    </div>
                    <div className='col-8 g-0 px-2'>
                        <p>{firstName} {lastName}</p>
                    </div>
                    <div className='col-3 g-0'>
                        <p style={{ fontSize: "12px", textAlign: "right" }}>{timeSince(createdAt)}</p>
                    </div>
                </div>
                <img src={post.image} style={{ width: "100%", height: "200px" }} />
                <div className='row g-0 px-1 mt-1' style={{ height: "50px" }}>
                    <Link className='title-css' to={path}><h5><b className='word-wrap'>{titleText}</b></h5></Link>
                </div>
                <div className='row g-0 px-1' style={{ height: "75px" }}>
                    <p className='word-wrap'>{text}</p>
                </div>
                <div className='row g-0' style={{ borderBottom: "5px solid rgb(0,0,128)", height: "30px" }}>
                    <div className='col-sm-2 px-1'>
                        <LikeScore like={likes} />
                    </div>
                    <div className='col-sm'>
                        <CommentScore comments={comments} />
                    </div>
                </div>
            </div>

        </>
    )
}
