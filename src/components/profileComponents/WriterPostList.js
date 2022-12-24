import { Button } from 'antd'
import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import localStorageService from '../../services/localStorageService'
import axios from '../../config/axios'

export default function WriterPostList({fetchPost, like, comment, image, title, text, postId, posts:{User:{id}}}) {

    let text200 = text.slice(0,200)
    if(text.length > 200){
        text200 = (`${text.slice(0,200)} ...`)
    }

    let title250 = title.slice(0,250)
    if(title.length > 250){
        title250 = (`${title.slice(0,250)} ...`)
    }
    const path = `/read-content/${postId}`

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    const token = localStorageService.getToken();
    const ownerPost = parseJwt(token)

    const deletePost = async () => {
        try {
            await axios.delete(`/posts/${postId}`)
            fetchPost()
        }catch(err){
            console.log(err)
        }
    } 

    let ActionPost; 
    if(ownerPost.id === id){
        ActionPost = (
            <>
            <Button 
            style={{ marginRight:"6px"}} 
            className='btn btn-primary'  
            size='small'>
            <Link 
            to={`/edith-content/${postId}`} 
            style={{color:"black", textDecoration:"none"}}>edith</Link>
            </Button>

            <Button 
            style={{color:"black"}} 
            className='btn btn-warning'  
            size='small' 
            onClick={deletePost}>delete</Button>
            </>
        )
    }
    
  return ( 
    <>
        <div className='container-fluid'>
            <div className='row mb-4'>
            <div className='col-4' style={{maxHeight: "300px"}}>
                <img src={image} style={{width:"100%",height:"100%"}}/>
            </div>
            <div className='col-8'>
                    <div className='row'>
                        <h3 className='word-wrap'><b>{title250}</b></h3>
                    </div>
                    <div className='row' style={{height:"116px", width:"700px"}}>
                        <h5 className='word-wrap'>{text200}</h5>
                        <div className='row'>
                            <div className='col'>{ActionPost}</div>
                        </div>
                    </div>
                    <div className='row d-flex align-items-end'>
                        <div className='col-3'>
                        <Button><Link to={path} style={{textDecoration: "none"}} className='color-gray'>Read more</Link></Button>
                        </div>
                        <div className='col-9'>
                            <div className='row p-0 d-flex align-items-end'>
                            <div className='col-8'>
                                <p style={{textAlign : "right"}}>{like.length} likes</p>
                            </div>
                            <div className='col-4'>
                                <p style={{textAlign : "center"}}>{comment.length} comments</p>
                            </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
                </div>
                <hr/>
        </div>
    </>
  )
}
