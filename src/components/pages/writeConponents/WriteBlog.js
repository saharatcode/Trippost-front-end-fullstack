import React, { useState, useEffect } from 'react'
import {CloudUploadOutlined } from '@ant-design/icons';
import {notification } from 'antd';
import { useParams } from 'react-router-dom'
import axios from '../../../config/axios';
import Loading from '../../spindle/Loading';
import '../../../CreatePost.css'

export default function WriteBlog() {
    //Edith post
    const { id } = useParams()
    const postId = parseInt(id)
    const [posts, setPosts] = useState([])
    // const [data, setData] = useState()
    let imageEdith;
    let textEdith;
    let titleEdith;
    if (posts) {
        imageEdith = posts.image;
        titleEdith = posts.title;
        textEdith = posts.text;
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get('/posts')
                setPosts(res.data.posts.find(e => e.id === postId));

            } catch (err) {
                console.log(err)
            }
        };
        fetchPost();
    }, [])

    //Create post
    const [imageInput, setImageInput] = useState(null)
    let [inputTitle, setInputTitle] = useState()
    const [inputText, setInputText] = useState();
    const [loading, setLoading] = useState(false);

    let formData = new FormData();
    if (imageInput) {
        formData.append('postImg', imageInput)
    }
    formData.append('title', inputTitle ?? titleEdith)
    formData.append('text', inputText ?? textEdith)

    const publish = async () => {
        try {
            setLoading(true)
            await axios.post("/posts", formData);
            setLoading(false)
            window.location.replace("/home")
        }catch(err){
            setLoading(false)
            console.log(err)
            notification.error({
                message: `You can not publish without picture.`
              })
        }

    };

    let updatePost = async () => {
        setLoading(true)
        await axios.put(`/myposts/${postId}`, formData);
        setLoading(false)
        window.location.replace("/home")
    }

    if (imageInput) {
        updatePost = async () => {
            setLoading(true)
            await axios.put(`/posts/${postId}`, formData)
            setLoading(false)
            window.location.replace("/home")
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className='container-fluid' style={{ minHeight: "100vh", maxWidth: "700px" }}>
                <div
                    className='row g-0'
                    style={{ background: "#e7e7e7", height: "400px", width: "100%", }}>
                    <input
                        type="file"
                        className='d-none p0'
                        onChange={e => setImageInput(e.target.files[0])}
                        id="profile-upload"
                    />
                    < label for="profile-upload" >
                        <div
                            role={"button"}
                            className=' d-flex align-items-center justify-content-center'
                            style={{ width: "100%", height: "400px", marginBottom: "6px", }}>
                            {imageInput ?
                                <img src={URL.createObjectURL(imageInput)}
                                    style={{ width: "100%", height: "400px" }} /> : imageEdith ?
                                    <img src={imageEdith} style={{ width: "100%", height: "400px" }} /> :
                                    <CloudUploadOutlined style={{ fontSize: '200px' }} />}
                        </div>
                    </label>

                </div>
                <div className='row g-0 mt-4 w-100'>
                    <textarea
                        maxlength="250"
                        type="text"
                        class="title"
                        placeholder="Blog title..."
                        value={inputTitle ?? titleEdith}
                        onChange={(e) => setInputTitle(e.target.value)}>
                    </textarea>
                </div>
                <div className='row g-0 w-100'>
                    <textarea
                        maxlength="4000"
                        type="text"
                        class="article"
                        placeholder="Start writing here..."
                        value={inputText ?? textEdith}
                        onChange={(e) => setInputText(e.target.value)}>
                    </textarea>
                </div>
                <div className='row g-0 w-25 mt-4'>
                    {posts ?
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={updatePost}>update
                        </button> :
                        <button
                            type='button'
                            className='btn btn-dark'
                            onClick={publish}>publish
                        </button>
                    }
                </div>
            </div>
        </>
    )
}
