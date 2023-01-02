import React, { useState } from 'react'
import Navigationbar from './navigation/Navigationbar'
import Footer from './footer/Footer'
import Header from './header/Header'
import WriteBlog from './writeConponents/WriteBlog'

export default function EdithContent(props) {
  const [prop, setProp] = useState(props)

  return (
    <>
      <Navigationbar props={prop} />
      <Header />
      <WriteBlog />
      <Footer />
    </>
  )
}
