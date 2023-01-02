import React from 'react'

export default function LikesList({
  wholikes: {
    User: {
      firstName,
      lastName,
      profileImage,
    }
  }
}) {

  return (
    <>
      <div className='container-fluid'>
        <div className='row mb-1'>
          <div className='col-1 g-0'>
            <img src={profileImage} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
          </div>
          <div className='col g-0'>
            <p style={{ marginLeft: "8px" }}>{firstName} {lastName}</p>
          </div>
        </div>
      </div>
    </>

  )
}
