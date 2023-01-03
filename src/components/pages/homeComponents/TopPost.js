import React, { useState } from 'react'
import SideBanner from './banner/SideBanner';
import BigBanner from './banner/BigBanner';
import '../../../App.css';

export default function TopPost({ posts }) {
    const popularPosts = [...posts]
    for (let i = 1; i < popularPosts.length; i++) {
        for (let j = 0; j < i; j++) {
            if (popularPosts[i].Likes.length > popularPosts[j].Likes.length) {
                let x = popularPosts[i];
                popularPosts[i] = popularPosts[j];
                popularPosts[j] = x;
            }
        }
    }

    const top10 = popularPosts.slice(0,10)

    const [indexBigBanner, setIndexBigBanner] = useState(0)
    const [indexSideBannerTop, setIndexSideBannerTop] = useState(1)
    const [indexSideBannerBottom, setIndexSideBannerBottom] = useState(2)
    
    const next = () => {
        setIndexBigBanner(indexBigBanner + 1)
        setIndexSideBannerTop(indexSideBannerTop + 1)
        setIndexSideBannerBottom(indexSideBannerBottom + 1)
    }
    const prev = () => {
        setIndexBigBanner(indexBigBanner - 1)
        setIndexSideBannerTop(indexSideBannerTop - 1)
        setIndexSideBannerBottom(indexSideBannerBottom - 1)
    }

    return (
        <>
            <div className='row w-100 g-0 mb-4'>
                {top10.map((item, index) => {
                    if (indexBigBanner > top10.length - 1) {
                        setIndexBigBanner(0)
                    }
                    if (indexBigBanner < 0) {
                        setIndexBigBanner(top10.length - 1)
                    }
                    if (index == indexBigBanner) {
                        let { image, title, text, id } = item
                        
                        return (
                            <>
                                <BigBanner
                                    key={item.id}
                                    postId={id}
                                    image={image}
                                    title={title}
                                    text={text}
                                    prev={prev}
                                    next={next}

                                />
                            </>
                        )
                    }
                })}

                <div className='col-sm-4 p-1'>
                    {top10.map((item, index) => {
                        if (indexSideBannerTop > top10.length - 1) {
                            setIndexSideBannerTop(0)
                        }
                        if (indexSideBannerTop < 0) {
                            setIndexSideBannerTop(top10.length - 1)
                        }
                        if (index == indexSideBannerTop) {
                            let { image, title, text, id} = item;
                            return (
                                <>
                                    <SideBanner
                                        key={index}
                                        postId={id}
                                        image={image}
                                        title={title}
                                        text={text} />
                                </>
                            )
                        }
                    })}

                    {top10.map((item, index) => {
                        if (indexSideBannerBottom > top10.length - 1) {
                            setIndexSideBannerBottom(0)
                        }
                        if (indexSideBannerBottom < 0) {
                            setIndexSideBannerBottom(top10.length - 1)
                        }
                        if (index == indexSideBannerBottom) {
                            let { image, title, text, id} = item;
                            return (
                                <>
                                    <SideBanner
                                        key={index}
                                        postId={id}
                                        image={image}
                                        title={title}
                                        text={text} />
                                </>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}
