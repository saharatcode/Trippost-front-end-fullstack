import React from 'react'
import '../../App.css'
import { Link, } from 'react-router-dom'
import { Button } from 'antd'
export default function FooterContent({ post }) {

  const path = `/read-content/${post}`

  return (
    <>
      <Link to={path}><Button>Read more</Button></Link>
    </>
  )
}
