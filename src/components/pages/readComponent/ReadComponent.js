import React, { useState, useEffect, } from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { Modal } from 'antd';
import LikesList from './LikesList'
import UserProfile from './UserProfile'
import axios from '../../../config/axios'
import '../../../App.css'

export default function ReadComponent({
    posts: { image, title, text, createdAt, userId, Likes },
    fetchPost, likesLength, firstName, lastName, profileImage,
}) {

    const { id } = useParams()
    const postId = parseInt(id)

    //Toggle like, unlike icon 
    const [liked, setLiked] = useState([])

    //Check in database writer have like this post done yet.
    const fetchLike = async () => {
        try {
            const res = await axios.get(`/likes/${postId}`)
            setLiked(res.data.likes);
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchLike();
    }, [])

    //Modal show who like this post
    const info = () => {
        Modal.info({
            title: `Likes ${likesLength}`,
            content: (
                <div>
                    {Likes.map(item => (<LikesList key={item.id} wholikes={item} />))}
                </div>
            ),
            onOk() { },
        });
    };

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
            <HeartFilled
                className='like'
                style={{ fontSize: '40px', color: 'black', }}
                onClick={deleteLike} />
        </>
    )
    if (liked === null) {
        likeButton = (
            <>
                <HeartOutlined
                    className='text-muted'
                    role="button"
                    style={{ fontSize: '40px', }}
                    onClick={addLike} />
            </>
        )
    }

    return (
        <>
            <div
                className='container-fluid'
                style={{ width: "800px", paddingTop: "24px", background: "white" }}>
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
                        createdAt={createdAt} />
                </div>
                <div className='row mb-4 d-flex justify-content-center'>
                    <img src={image} style={{ maxHeight: "600px", width: "auto" }} />
                </div>
                <div className='row'>
                    <pre className='text-left text-read word-wrap'>
                        {text}
                    </pre>
                </div>
                <div className='row text-center'>
                    <h2 role="button" className='likeLength' onClick={info}>{likesLength}</h2>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center mb-4'>
                        {likeButton}
                    </div>
                </div>
            </div>
        </>
    )
}