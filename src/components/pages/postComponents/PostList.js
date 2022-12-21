import React from 'react'
import PostCard from './PostCard'
export default function PostList( {posts}) {
  return (
    <>
    {posts.map( (item) => (
        <PostCard key={item.id} post={item} />
        ))}
    </>
  )
}
