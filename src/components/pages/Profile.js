import React, { useEffect, useState } from 'react'
import CreatePost from '../profileComponents/CreatePost';
import '../../App.css'
import Navigationbar from '../../components/navigation-bar/Navigationbar';
import Footer from '../../components/footer/Footer'
import Header from '../../components/homeComponents.js/Header'
import axios from '../../config/axios';

export default function Profile(props) {

  const [valueEdith, setValueEdith] = useState("")
  const chooseValue = (valueEdith) => {
    setValueEdith(valueEdith)
  }

  const [prop, setProp] = useState(props)

  const [user, setUser] = useState([])

  const fetchPost = async () => {
    try {
      const res = await axios.get('/myposts')
      setUser(res.data.posts[0].User);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchPost();

  }, [])
  return (
    <div className='background-color-white'>
      <Navigationbar props={prop} />
      <Header />
      <div class="container">
        <div class="row">
          <div class="col-sm-8 fix-width-createPost">
            <CreatePost />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
