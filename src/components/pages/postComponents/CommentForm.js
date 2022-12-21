import React from 'react'

export default function CommentForm() {
  return (
    <>
        <div className="d-flex pt-1 gap-2">
            <a href="/">
                <img
                      src="https://images.pexels.com/photos/5193860/pexels-photo-5193860.png"
                      className="rounded-circle"
                      width="32"
                      height="32"
                      alt="user"
                    />
            </a>
                  <input
                    className="form-control rounded-pill shadow-none border-0 h-9 text-3.5 bg-gray-200 focus-bg-gray-200"
                    placeholder="Write a comment..."
                  />
        </div>
    </>
  )
}
