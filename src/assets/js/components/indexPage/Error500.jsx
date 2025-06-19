import React from 'react'

function Error500() {
  return (
    <div className="col-sm-12 text-center">
        <div className="iq-error position-relative mt-5">
            <img src="/images/error/01.png" className="img-fluid iq-error-img" alt="" />
            <h1 className="text-in-box">500</h1>
            <h2 className="mb-0">Oops! This Page is Not Working.</h2>
            <p>The requested is Internal Server Error.</p>
            <a className="btn btn-primary mt-3" href="index.html"><i className="ri-home-4-line"></i>Back to Home</a>
        </div>
    </div>
  )
}

export default Error500
