import React, { useEffect, useState, } from 'react'
import axios from '../../config/axios'
import PostLists from '../homeComponents.js/PostLists'
import Header from '../homeComponents.js/Header'
import Navigationbar from '../navigation-bar/Navigationbar'
import Footer from '../footer/Footer'
import CardContent from '../homeComponents.js/CardContent'
import { Input, Space } from 'antd';

const { Search } = Input;

export default function Home(props) {

  // const onSearch = (e) => console.log(e.target.value);

  const [prop, setProp] = useState(props)
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('/posts')
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err)
      }
    };
    fetchPost();

  }, [])

  return (

    <div>
      <Navigationbar props={prop} />
      <Header />
      <PostLists posts={posts} />
      <Footer />
    </div>
  )
}


