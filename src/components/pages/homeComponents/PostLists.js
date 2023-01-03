import React from 'react'
import CardContent from './CardContent'

export default function PostLists({ posts }) {

  return (
    <>
      <div className='row g-0'>
        {posts.map((item) => (<CardContent key={item.id} post={item} />))}
      </div>
    </>
  )
}
