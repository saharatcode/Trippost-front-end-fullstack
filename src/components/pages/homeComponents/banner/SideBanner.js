import React from 'react'
import { Link } from 'react-router-dom';
import cutWordLength from '../../../../services/cutWordLength'
import '../../../../App.css'

export default function SideBanner({ image, title, text, postId }) {
  let { titleCut, textCut } = cutWordLength(title, text, 50, 150)
  const path = `/read-content/${postId}`
  console.log(postId)
  return (
    <div className='row g-0' style={{ position: "relative" }}>
      <img src={image} className="" style={{ height: "250px", }} />
      <div
        className=''
        style={{
          position: "absolute",
          bottom: "0",
          background: `rgb(0, 0, 0, 0.5)`,
          color: "white",
          padding: "20px",
          height: "250px",
          borderTop: "2px solid white"
        }}>
        <Link
          className='banner-title'
          to={path}>
          <h2>
            <b className='word-wrap'>{titleCut}</b>
          </h2>
        </Link>
        <p>{textCut}</p>
      </div>
    </div>
  )
}
