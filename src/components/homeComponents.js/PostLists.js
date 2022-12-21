import React from 'react'
import CardContent from './CardContent'
import Navigationbar from '../navigation-bar/Navigationbar'
import Header from './Header'
import Footer from '../footer/Footer'
import '../../App.css'

export default function PostLists( {posts}) {
  return (
    // <>
    // {posts.map( (item) => (
    //     <PostCard key={item.id} post={item} />
    //     ))}
    // </>

    <>
    <Navigationbar/>
    <Header/>
    
    <div className='container'>
    {/* <CardContent/> */}
    {posts.map( (item) => (
        <CardContent key={item.id} post={item} />
        ))}

    </div>
    <Footer/>

    
  </>
  )
}
