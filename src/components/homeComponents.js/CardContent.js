import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import FooterContent from './FooterContent'
import LikeContent from './LikeContent'
import CommentScore from './CommentScore'

export default function CardContent({ post }) {
    //ยอด Comments, like
    const [comments, setComment] = useState(post.Comments)
    const [likes, setLike] = useState(post.Likes)
    const [userId, setUserId] = useState(post.User.id)
    // console.log(userId)

    const str = post.text
    const str200 = str.slice(0, 200)
    let textUp = (<>{str200}</>)
    if (str.length > 200) {
        textUp = (<>{str200} ...</>)
    }

    const titleStr = post.title
    const title180 = titleStr.slice(0, 180)
    let titleText = (<>{title180}</>)
    if (titleStr.length > 180) {
        titleText = (<>{title180} ...</>)
    }

    const path = `/profile-writer/${userId}`

    return (
        <div className='blackground-color-white'>
            <div className='card-container center'>

                <img src={post.image} />
                <div className='padding'>
                    <div className='text-left'>
                        <div>
                            <h2 className='word-wrap'>{titleText}</h2>
                            <p>
                                <Link
                                    to={path}
                                    className='color-gray'
                                    style={{ textDecoration: "none" }}>
                                    <b>{`By ${post.User.firstName} ${post.User.lastName}`}</b>
                                </Link>
                            </p>
                        </div>
                        <div>
                            <p className='word-wrap'>
                                {textUp}
                            </p>
                        </div>

                    </div>
                    <div className='container-footer-content'>

                        <FooterContent post={post.id} />
                        <LikeContent like={likes} />
                        <CommentScore comments={comments} />
                    </div>
                </div>

            </div>


        </div>
    )
}

