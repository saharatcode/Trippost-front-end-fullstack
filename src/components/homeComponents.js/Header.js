import React from 'react'
import '../../App.css'


export default function Header() {
  return (
    <div className='blackground-color-header padding-top-header'>
        <div className='header-container'>
        <h1><b>Trippost Blog</b></h1>
        <p>Welcome to the blog of <span class="w3-tag">travel</span></p>
        </div>
        <hr/>
    </div>
  )
}
