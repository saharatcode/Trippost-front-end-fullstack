import React, { useEffect, useState, } from 'react'
import axios from '../../config/axios'
import PostLists from './homeComponents/PostLists'
import TopPost from './homeComponents/TopPost'
import Navigationbar from './navigation/Navigationbar'
import Pagination from './homeComponents/Pagination'
import Footer from './footer/Footer'
import { Input } from 'antd';
import '../../App.css'

export default function Home(props) {

  const [prop, setProp] = useState(props)
  const [posts, setPosts] = useState([])
  const [keyword, setKeyword] = useState("")

  const _posts = []

  posts.forEach(e => {
    const isVicible = e.title.toLowerCase().includes(keyword) || e.text.toLowerCase().includes(keyword)
    if (isVicible) {
      _posts.push(e)
    }
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostPerPage] = useState(6)

  //Get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = _posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  }

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
      <div className='container px-2 w-100 g-0 mt-4'>
        <TopPost posts={posts} />
        <div className='row'>
          <div className='col-sm-2 mb-2'>
            <h3><b style={{ borderBottom: "8px solid red" }}>OTHER POST</b></h3>
          </div>
          <div className='col-sm-6 mb-2'>
            <Input
              placeholder="Search keyword"
              value={keyword}
              onChange={e => setKeyword(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 g-0'>
            <div className='w-100  g-0'>
              <PostLists posts={currentPosts} />
            </div>
          </div>
        </div>
        <div className='row mt-4 text-center'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={_posts.length}
            paginate={paginate}
            currentPage={currentPage} />
        </div>
      </div>
      <Footer />
    </div>
  )
}


