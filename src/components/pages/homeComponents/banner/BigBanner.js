import React from 'react'
import { Link } from 'react-router-dom';
import cutWordLength from '../../../../services/cutWordLength';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import '../../../../App.css'

export default function BigBanner({ image, title, postId, prev, next }) {
    const { titleCut } = cutWordLength(title, null, 170, null)
    const path = `/read-content/${postId}`
    return (
        <div className='col-sm-8 p-1'>
            <div style={{ position: "relative" }}>
                <img src={image} style={{ width: "100%", height: "500px" }} />
                <a class="prev" onClick={prev}><DoubleLeftOutlined style={{ verticalAlign: 'middle' }} /></a>
                <a class="next" onClick={next}><DoubleRightOutlined style={{ verticalAlign: 'middle' }} /></a>
                <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        background: `rgb(0, 0, 0, 0.5)`,
                        color: "white",
                        padding: "20px",
                        width: "100%"
                    }}>
                    {/* <h1>{titleCut}</h1> */}
                    <Link
                        className='banner-title'
                        to={path}>
                        <h1>
                            <b className='word-wrap'>{titleCut}</b>
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}
