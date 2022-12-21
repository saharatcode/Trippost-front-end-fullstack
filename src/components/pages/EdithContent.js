import React, { useEffect, useState } from 'react'
import axios from '../../config/axios'
import { useParams } from 'react-router-dom'
import Navigationbar from '../navigation-bar/Navigationbar'
import Footer from '../footer/Footer'
import Header from '../homeComponents.js/Header'
import CreatePost from '../profileComponents/CreatePost'
import EdithComponent from '../profileComponents/EdithComponent'

export default function EdithContent() {
    const {id} = useParams()
    const postId = parseInt(id)

    const [posts, setPosts] = useState([])
    // console.log(posts.image)
    const valueImage = posts.image 
    const valueTitle = posts.title
    const valueText = posts.text
    const valueId = posts.id
    
    // console.log(typeof(valueImage))

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const res = await axios.get('/posts')
            setPosts(res.data.posts.find(e => e.id === postId));
          } catch (err){
            console.log(err)
          }
        };
        fetchPost();
        
      }, [])

  return (
    <>
        <Navigationbar/>
        <Header/>
            <div class="container wid">
                <div class="row">
                    <CreatePost valueTitle={valueTitle} valueText={valueText} valueImage={valueImage} valueId={valueId}/>
                </div> 
            </div>
        <Footer/>
    </>
  )
}
