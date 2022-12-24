import { Button, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../CreatePost.css'
import axios from '../../config/axios'
import Loading from '../../function/Loading' 


export default function CreatePost({valueImage, valueTitle, valueText, valueId}) {

    const [loading, setLoading] = useState(false)
    

    const [inputTitle = valueTitle, setInputTitle] = useState()
    // const [inputTitle = valueTitle, setInputTitle] = useState();
    const [inputText = valueText, setInputText] = useState();
    const [inputImage, setInputImage] = useState();

    if(inputImage){
        valueImage = ""
    }

    let button = "Publice"
    if(valueText || valueImage || valueTitle) {
        button = "Update"
    }

    let formData = new FormData();
    formData.append('postImg', inputImage)
    formData.append('title', inputTitle)
    formData.append('text', inputText)



  return (
    <> 
    {loading && <Loading/>}
    <div className='ceate-post-container'>
    <div className='banner'>
    {/* <input type="file" accept="image/*" id="image-upload" onChange={ async (e) => {if(e.target.files[0]) setInputImage(e.target.files[0])}} hidden/> */}
    {/* {valueImage && < label for="image-upload" ><img src={valueImage} className="banner  img-fluid"/></label>} */}
    {/* {inputImage && < label for="image-upload" ><img src={URL.createObjectURL(inputImage)} className="banner img-fluid"/></label>} */}

        <input type="file" multiple accept='image/*'  onChange={ async (e) => {if(e.target.files[0]) setInputImage(e.target.files[0])}} />
        {valueImage && (<img src={valueImage} className="banner  img-fluid"/>)}
        {inputImage && (<img src={URL.createObjectURL(inputImage)} className="banner img-fluid"/>)}
    </div>
    
    <div class="blog">
        <textarea type="text" class="title" placeholder="Blog title..." value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></textarea>
        <textarea type="text" class="article" placeholder="Start writing here..." value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>

        
            <Button className='publice-button' size='large' onClick={async ()=>{
                    try {
                        if(button === "Publice"){
                        setLoading(true)
                        await axios.post('/posts', formData)
                        setInputTitle("")
                        setInputText("")
                        setInputImage("")
                        // window.location.reload(false)

                        window.location.replace("/home")
                        setLoading(false)
                        notification.success({
                            message:`โพสต์เรียบร้อยแล้ว`
                        });
                        
                        // console.log(Array.from(formData)) 
                        }else if(inputImage){
                            setLoading(true)
                            const formData = new FormData();
                            formData.append('postImg', inputImage)
                            formData.append('title', inputTitle)
                            formData.append('text', inputText)

                            // console.log(Array.from(formData))
                            await axios.put(`/posts/${valueId}`, formData);
                            // window.location.reload(false)
                            
                            window.location.replace("/home")
                            setLoading(false)
                            notification.success({
                                message:`โพสต์เรียบร้อยแล้ว`
                            });
  
                        }else { 
                            setLoading(true)
                            const formData = new FormData();
                            
                            formData.append('title', inputTitle)
                            formData.append('text', inputText)

                            console.log(Array.from(formData))
                            await axios.put(`/myposts/${valueId}`, formData);
                            // window.location.reload(false)
                            window.location.replace("/home")
                            setLoading(false)
                            notification.success({
                                message:`โพสต์เรียบร้อยแล้ว`
                            }); 

                        }

                    } catch(err) {
                        console.log(err)
                        setLoading(false)
                        notification.error({
                            message: `โปรดใส่รูปภาพ`
                        })
                    }
        }}>{button}</Button>
    
    </div>
    </div>
    


    
    

    </>

  )
}
