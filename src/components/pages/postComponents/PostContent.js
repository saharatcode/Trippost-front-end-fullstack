import React from 'react'

export default function PostContent({post: {title, image, text}}) {
  return (
    <>
    {image&&
      <img src= {image}
          className='img-fluid'
          alt='User'
      />
    }

    {title &&
      <h3>
        {title}
    </h3>
    }

    {text &&<p> 
        {text}
    </p>}
    </>
  )
}
