import React, { useEffect, useState, } from 'react'
import { useParams, } from 'react-router-dom'
import axios from '../../config/axios'
import Navigationbar from './navigation/Navigationbar'
import Header from './header/Header'
import Footer from './footer/Footer'
import WriterPostList from './profileComponents/WriterPostList'
import Pagination from './homeComponents/Pagination'
import { Button, Form, Input } from 'antd'
import Loading from '../spindle/Loading'
import localStorageService from '../../services/localStorageService'

export default function ProfileWriter(props) {
  let { id } = useParams()
  const writerId = parseInt(id)
  const defaultImage = "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"

  const [prop, setProp] = useState(props)
  const [posts, setPosts] = useState([])
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [image, setImage] = useState()
  const [imageInput, setImageInput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ownerAccountId, setOwnerAccountId] = useState()
  const [newFirstName, newSetFirstName] = useState();
  const [newLastName, newSetLastName] = useState();
  const [showFormEdithWriterName, setShowFormEdithWriterName] = useState(false)

  const toggleShowFormEdithWriterName = () => {
    setShowFormEdithWriterName(prev => !prev)
  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  const token = localStorageService.getToken();
  const Admin = parseJwt(token)

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/${writerId}`)
      setFirstName(res.data.user.firstName)
      setLastName(res.data.user.lastName)
      setImage(res.data.user.profileImage)
      setOwnerAccountId(res.data.user.id)
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    fetchUser();
  }, [])

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/${writerId}`)
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    fetchPost();
  }, [])


  const likeArr = posts.map((item) => (item.Likes.length))
  const likeTotal = likeArr.reduce((a, b) => a + b, 0)
  const commentArr = posts.map((item) => (item.Comments.length))
  const commentTotal = commentArr.reduce((a, b) => a + b, 0)
  //   console.log(like.reduce((a,b) => a+b,0))

  const formData = new FormData();
  formData.append('profileImg', imageInput)

  const UpdateProfileImage = async () => {
    try {
      setLoading(true)
      await axios.patch('users/profile-img', formData)
      setImageInput(null)
      fetchUser()
      window.location.reload();
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const body = {
    firstName: newFirstName,
    lastName: newLastName,
  }

  const updateNameWriter = async () => {
    try {
      setLoading(true)
      await axios.patch('users/new-user-name', body)
      fetchUser()
      setShowFormEdithWriterName(false)
      window.location.reload()
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  let writer_profile_image = (
    <>
      <div className='row' style={{ textAlign: "center" }}>
        <img
          className='p-0'
          src={image ?? defaultImage}
          style={{ width: "130px", height: "130px", borderRadius: "50%" }}
        />
      </div>
    </>
  )

  let writer_name_action;
  let writer_name_edith_form;

  if (showFormEdithWriterName) {
    writer_name_edith_form = (
      <>
        <div className='col-sm' style={{ maxWidth: '500px' }}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: false, message: 'Please input your username!' }]}
          >
            <Input value={newFirstName} onChange={e => { newSetFirstName(e.target.value) }} />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: false, message: 'Please input your username!' }]}
          >
            <Input value={newLastName} onChange={e => { newSetLastName(e.target.value) }} />
          </Form.Item>
          <button
            type="button"
            className='mb-4 btn btn-dark'
            style={{ float: "right" }}
            size='middle'
            onClick={updateNameWriter} >update
          </button>
        </div>
      </>
    )
  }

  if (Admin.id === ownerAccountId) {

    writer_profile_image = (
      <>
        <div className='row' style={{ textAlign: "center" }}>
          <input
            type="file"
            className='d-none'
            onChange={e => setImageInput(e.target.files[0])}
            id="profile-upload"
          />
          < label for="profile-upload" >
            <img
              className='p-0'
              src={imageInput ? URL.createObjectURL(imageInput) : image ?? defaultImage}
              style={{ width: "130px", height: "130px", borderRadius: "50%", marginBottom: "6px" }}
              role={"button"}
            />
          </label>
          <div className='rov'>
            {imageInput && <button type="button" class="btn btn-dark" onClick={UpdateProfileImage}>Update</button>}

          </div>
        </div>
      </>
    )

    writer_name_action = (
      <>
        <button
          type="button"
          class="btn btn-link">
          <sub
            className='text-mute'
            role="button"
            onClick={toggleShowFormEdithWriterName}>edith
          </sub>
        </button>
      </>
    )
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostPerPage] = useState(5)

  //Get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  }

  return (
    <>
      {loading && <Loading />}
      <Navigationbar props={prop} />
      <Header />

      <div className='container-fluid w-75 font'>
        <div className='row'>
          <div className='row'>
            <div className='col-sm-2 mb-4 d-flex justify-content-center'>
              {writer_profile_image}
            </div>
            <div className='col-sm mb-4'>
              {/* <div className='row g-0 border'> */}
              <div className='col-sm g-0'>
                <h1 >
                  <b>{firstName} {lastName}</b>
                  {writer_name_action}
                  {writer_name_edith_form}
                </h1>
              </div>
              {/* </div> */}


              <div className='row w-100 mt-4 ' style={{ width: "750px", textAlign: "center" }}>
                <div className='col-sm-3 border ' style={{ padding: "8px", margin: "6px", borderRadius: "25px" }}>
                  <h3>Posted : {posts.length}</h3>
                </div>
                <div className='col-sm-3 border' style={{ padding: "8px", margin: "6px", borderRadius: "25px" }}>
                  <h3>Likes : {likeTotal}</h3>
                </div>
                <div className='col-sm-4 border' style={{ padding: "8px", margin: "6px", borderRadius: "25px" }}>
                  <h3>Comments : {commentTotal}</h3>
                </div>
              </div>

            </div>
          </div>
          <hr />
          <div className='row'>
            {currentPosts.map((item) =>
            (<WriterPostList key={item.id} posts={item}
              fetchPost={fetchPost}
              postId={item.id}
              comment={item.Comments} like={item.Likes}
              title={item.title} text={item.text}
              image={item.image} />))}

          </div>
          <div className='row mt-4 text-center'>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage} />
          </div>
        </div>

      </div>
      <Footer />
    </>

  )
}


