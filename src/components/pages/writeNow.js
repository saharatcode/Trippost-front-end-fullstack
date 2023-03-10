import React, { useState } from 'react'
import '../../App.css'
import Navigationbar from './navigation/Navigationbar';
import Footer from './footer/Footer'
import Header from './header/Header'
import WriteBlog from './writeConponents/WriteBlog'

export default function Profile(props) {

  const [prop, setProp] = useState(props)

  return (
    <div className='background-color-white'>
      <Navigationbar props={prop} />
      <Header />
      <WriteBlog />
      <Footer />
    </div>
  );
}
