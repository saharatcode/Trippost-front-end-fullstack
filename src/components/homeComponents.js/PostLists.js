import React from 'react'
import CardContent from './CardContent'
import '../../App.css'

export default function PostLists({ posts }) {
  return (
    <>
      <div className='container'>
        {posts.map((item) => (
          <CardContent
            key={item.id}
            post={item} />
        ))}

      </div>
    </>
  )
}
