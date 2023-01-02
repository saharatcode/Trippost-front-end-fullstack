import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../CreatePost.css'
import axios from '../../../config/axios'


export default function EdithComponent({valueImage, valueTitle, valueText}) {

    const [inputTitle, setInputTitle] = useState();
    const [inputText, setInputText] = useState();
    const [inputImage, setInputImage] = useState();
    // const[valueImage, setValueImage] = useState(valueImage);
    if(inputImage){
        valueImage = ""
    }

    const formData = new FormData();
    formData.append('postImg', inputImage)
    formData.append('title', inputTitle)
    formData.append('text', inputText)

    let button = "Publice"
    if(valueText) {
        button = "Update"
    }

  return (
    <>
    
    <div>
    <div className='banner'>
        <input type="file" multiple accept='image/*'  onChange={ async (e) => {if(e.target.files[0]) setInputImage(e.target.files[0])}} />
        {valueImage && (<img src={valueImage} className="banner image-100 img-fluid"/>)}
        {inputImage && (<img src={URL.createObjectURL(inputImage)} className="banner image-100 img-fluid"/>)}
        
        
        
    </div>
    
    <div class="blog">
        <textarea type="text" class="title" placeholder="Blog title..." value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></textarea>
        <textarea type="text" class="article" placeholder="Start writing here..." value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
        <Button onClick={async ()=>{
                    try {
                        await axios.post('/posts', formData)
                        setInputTitle("")
                        setInputText("")
                        setInputImage("")
                        window.location.reload(false)
                        // console.log(Array.from(formData))
                    } catch(err) {
                        console.log(err)
                    }
        }}>{button}</Button>

        
    </div>
    </div>
    


    
    

    </>

  )
}

