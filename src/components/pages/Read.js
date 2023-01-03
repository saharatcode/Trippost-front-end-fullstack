import React, { useEffect, useState, } from 'react'
import { useParams } from 'react-router-dom'
import Navigationbar from './navigation/Navigationbar'
import Header from './header/Header'
import Footer from './footer/Footer'
import ReadComponent from './readComponent/ReadComponent'
import CommentWrite from './readComponent/CommentWrite'
import CommentShow from './readComponent/CommentShow'
import Pagination from './homeComponents/Pagination'
import '../../App.css'
import axios from '../../config/axios'

export default function ReadContent(props) {
  const [prop, setProp] = useState(props)
  const { id } = useParams()
  const postId = parseInt(id)

  const [posts, setPosts] = useState([])
  const [comments, setComment] = useState([])
  const [likesLength, setLikesLength] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [profileImage, setProfileImage] = useState()
  const [createdAt, setcreatedAt] = useState()

  const fetchPost = async () => {
    try {
      const res = await axios.get('/posts')
      setPosts(res.data.posts.find(e => e.id === postId));
      setComment(res.data.posts.find(e => e.id === postId).Comments.reverse())
      setLikesLength(res.data.posts.find(e => e.id === postId).Likes.length)
      setFirstName(res.data.posts.find(e => e.id === postId).User.firstName)
      setLastName(res.data.posts.find(e => e.id === postId).User.lastName)
      setProfileImage(res.data.posts.find(e => e.id === postId).User.profileImage)
      setcreatedAt(res.data.posts.find(e => e.id === postId).createdAt)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchPost();
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [commentsPerPage, secommentsPerPage] = useState(3)

  //Get current page
  const indexOfLastComments = currentPage * commentsPerPage;
  const indexOfFirstComments = indexOfLastComments - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComments, indexOfLastComments);

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  }

  return (

    <div style={{ background: "rgb(238,238,238)" }}>
      <Navigationbar props={prop} />
      <Header />
      <div className='container'>
        <div className='row'>
          <ReadComponent
            posts={posts}
            createdAt={createdAt}
            profileImage={profileImage}
            fetchPost={fetchPost}
            firstName={firstName}
            lastName={lastName}
            likesLength={likesLength}
          />
        </div>
        <div className='row'>
          <CommentWrite
            postId={posts.id}
            fetchPost={fetchPost} />
        </div>
        <div className='row'>
          {currentComments.map((item) => (
            <CommentShow
              key={item.id}
              comment={item}
              fetchPost={fetchPost} />
          ))}
        </div>
        <div className='row mt-4 text-center'>
          <Pagination
            postsPerPage={commentsPerPage}
            totalPosts={comments.length}
            paginate={paginate}
            currentPage={currentPage} />
        </div>
      </div>
      <Footer />
    </div>



  )
}
