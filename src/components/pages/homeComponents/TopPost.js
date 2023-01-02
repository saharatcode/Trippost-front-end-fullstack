import React, {useState } from 'react'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import '../../../App.css'

export default function TopPost({ posts }) {
    const popularPosts = [...posts]

    const [indexNum, setIndexNum] = useState(0)
    const next = () => {
        setIndexNum(indexNum + 1)
    }
    const prev = () => {
        setIndexNum(indexNum - 1)
    }

    for (let i = 1; i < popularPosts.length; i++) {
        for (let j = 0; j < i; j++) {
            if (popularPosts[i].Likes.length > popularPosts[j].Likes.length) {
                let x = popularPosts[i];
                popularPosts[i] = popularPosts[j];
                popularPosts[j] = x;
            }
        }
    }
   
    return (
        <>
            <div className='row w-100 g-0 mb-4'>
                {popularPosts.map((item, index) => {
                    if (indexNum > popularPosts.length - 1) {
                        setIndexNum(0)
                    }
                    if (indexNum < 0) {
                        setIndexNum(popularPosts.length - 1)
                    }
                    if (index == indexNum) {
                        let { image, title, text } = item

                        return (
                            <>
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
                                                // height:"200px",
                                                width: "100%"
                                            }}>
                                            <h1>{title.slice(0, 170)}</h1>
                                            {/* <p>{text.slice(0, 230)}</p> */}
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    }
                })}

                <div className='col-sm-4 p-1'>
                    {popularPosts.map((item, index) => {
                        if (indexNum > popularPosts.length - 2) {
                            setIndexNum(0)
                        }
                        if (indexNum < 0) {
                            setIndexNum(popularPosts.length - 2)
                        }
                        if (index == indexNum + 1) {
                            let { image, title, text } = item;
                            const titleStr = title
                            const title50 = titleStr.slice(0, 50)
                            let titleText = (<>{title50}</>)
                            if (titleStr.length > 50) {
                                titleText = (<>{title50} ...</>)
                            }

                            const str = text
                            const str250 = text.slice(0, 250)
                            text = (<>{str250}</>)
                            if (str.length > 250) {
                                text = (<>{str250} ...</>)
                            }
                            return (
                                <>
                                    <div className='row g-0' style={{ position: "relative" }}>
                                        <img src={image} style={{ height: "250px", }} />
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "0",
                                                background: `rgb(0, 0, 0, 0.5)`,
                                                color: "white",
                                                padding: "20px",
                                                height: "250px",
                                                borderBottom: "2px solid white"
                                            }}>
                                            <h3>{titleText}</h3>
                                            <p>{text}</p>
                                        </div>

                                    </div>
                                </>
                            )
                        }
                    })}

                    {popularPosts.map((item, index) => {
                        if (indexNum > popularPosts.length - 3) {
                            setIndexNum(0)
                        }
                        if (indexNum < 0) {
                            setIndexNum(popularPosts.length - 3)
                        }
                        if (index == indexNum + 2) {
                            let { image, title, text } = item;
                            const titleStr = title
                            const title50 = titleStr.slice(0, 50)
                            let titleText = (<>{title50}</>)
                            if (titleStr.length > 50) {
                                titleText = (<>{title50} ...</>)
                            }

                            const str = text
                            const str250 = text.slice(0, 250)
                            text = (<>{str250}</>)
                            if (str.length > 250) {
                                text = (<>{str250} ...</>)
                            }
                            return (
                                <>
                                    <div className='row g-0' style={{ position: "relative" }}>
                                        <img src={image} className="" style={{ height: "250px", }} />
                                        <div
                                            className=''
                                            style={{
                                                position: "absolute",
                                                bottom: "0",
                                                background: `rgb(0, 0, 0, 0.7)`,
                                                color: "white",
                                                padding: "20px",
                                                height: "250px",
                                                borderTop: "2px solid white"
                                            }}>
                                            <h3>{titleText}</h3>
                                            <p>{text}</p>

                                        </div>

                                    </div>
                                </>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}
