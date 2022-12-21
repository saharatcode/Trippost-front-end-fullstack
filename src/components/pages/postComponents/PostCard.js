import React from 'react'
import Card from 'react-bootstrap/Card';
import PostContent from './PostContent';

export default function PostCard({post}) {
  return (
    <Card style={{ width: '30rem'}}>
        <PostContent post={post}/>
    </Card>
  )
}
