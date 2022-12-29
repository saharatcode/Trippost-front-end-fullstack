import React, {useState } from 'react'
import Navigationbar from '../navigation-bar/Navigationbar'
import Footer from '../footer/Footer'
import Header from '../homeComponents.js/Header'
import WriteBlog from '../profileComponents/WriteBlog'

export default function EdithContent(props) {
  const [prop, setProp] = useState(props)

  return (
    <>
      <Navigationbar props={prop} />
      <Header />
      <WriteBlog/>
      <Footer />
      
    </>
  )
}
