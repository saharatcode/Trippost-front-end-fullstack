import React, { useState } from 'react'
import '../../App.css'
import Navigationbar from '../navigation-bar/Navigationbar';
import Footer from '../footer/Footer'
import Header from '../homeComponents.js/Header'
import WriteBlog from '../profileComponents/WriteBlog';

export default function Profile(props) {

  const [prop, setProp] = useState(props)
//Write now
  return (
    <div className='background-color-white'>
      <Navigationbar props={prop} />
      <Header />
      <WriteBlog/>
      <Footer />
    </div>
  );
}
