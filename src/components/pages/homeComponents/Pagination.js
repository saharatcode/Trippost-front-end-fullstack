import React from 'react'

export default function Pagination({ totalPosts, postsPerPage, paginate, currentPage }) {

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div>
                {pageNumbers.map(number => (
                    <div key={number} className="pagination">
                        <a
                            className={currentPage == number ? "active" : null}
                            role="button"
                            onClick={() => {
                                paginate(number)
                            }}>
                            {number}
                        </a>
                    </div>
                ))}

            </div>

        </div>
    )
}
