import React from 'react'
import '../../App.css'
import { AndroidOutlined, AppleOutlined, WindowsOutlined, GithubOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <>
      <div className='footer-container'>
        <h1>Code Camp 10</h1>
        <div className='size-icon'>
          <AndroidOutlined /><AppleOutlined /><WindowsOutlined /><GithubOutlined /><TwitterOutlined /><FacebookOutlined />
        </div>
        <h4>by Saharat Surapanya</h4>
      </div>
    </>

  )
}