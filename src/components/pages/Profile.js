import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import localStorageService from '../../services/localStorageService';
import ProfileConponent from '../profileComponents/ProfileConponent';
import MyPostList from '../profileComponents/MyPostList';
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



    const [prop, setProp]= useState(props)
    

    const logout = () => {
        localStorageService.removeToken();
        props.setRole("guest");
    }

    const [user, setUser] = useState([])
   
    const [firstName, setFirstName] = useState(user.firstName)
    
    // const [user, setUser] = useState(posts[0].User)

    const fetchPost = async () => {
        try {
          const res = await axios.get('/myposts')
          setUser(res.data.posts[0].User);
        } catch (err){
          console.log(err)
        }
      };
   //
    useEffect(() => {
      fetchPost();
      
    }, [])
    return ( 
        <div className='background-color-white'>
        <Navigationbar props={prop}/>
        <Header/>
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <ProfileConponent user={user} fetchPost={fetchPost}/>

                        <div class="row">
                            <MyPostList chooseValue={chooseValue}/>
                        </div>
                    </div>
                    <div class="col-sm-8">
                            <CreatePost/>
                    </div>
                </div>
                
            </div>
           
            <Footer/>
    
        {/* ล่างสุดไม่เกี่ยว */}
        {/* <div>
           
            <h2>
                Profile Page
            </h2>
            <Button onClick={logout}>Logout</Button>
            
        </div> */}
        </div>
    );
}
