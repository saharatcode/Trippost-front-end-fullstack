

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center offcanvas-backdrop show"
            style={{zIndex:1100}}
        >
            <div 
            className="spinner-border text-warning"
            style={{width: '3rem', height:"3rem"}}
            >
            </div>

            <span className="text-warning ms-3" style={{fontSize:"30px"}}>Please wait</span>
         </div>
    )
}

export default Loading