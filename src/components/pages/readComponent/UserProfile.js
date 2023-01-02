
import React from 'react'
import { Link } from 'react-router-dom';

export default function UserProfile({ firstName, lastName, profileImage, createdAt, userId }) {

    let date = new Date(createdAt);
    let dateStr = `${date}`.split(' ')
    let MDYArr = date.toLocaleDateString().split('/');
    let DMY = `${dateStr[0]}, ${MDYArr[1]}/${dateStr[1]}/${MDYArr[2]}`

    let path = `/profile-writer/${userId}`
    const defultImage = "https://res.cloudinary.com/dv7ae30yk/image/upload/v1671340437/blank-profile-picture-gbc548e19f_1280_eutyml.png"

    return (
        <>
            <div className='container-fluid  w-100 '>
                <div className='row  w-100 mb-2 align-items-start'>
                    <div className='col-1'>
                        <div>
                            <img
                                src={profileImage ?? defultImage}
                                style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                        </div>
                    </div>
                    <div className='col-11 text-left'>
                        <b style={{ fontSize: "20px", marginLeft: "10px", }}>
                            <Link to={path} className='color-black' style={{ textDecoration: "none", color: "" }}>
                                {firstName} {lastName}
                            </Link>
                        </b>
                        <p style={{ fontSize: "16px", marginLeft: "10px" }}>{DMY}</p>
                    </div>

                </div>

            </div>

        </>

    )
}
