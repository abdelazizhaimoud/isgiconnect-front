import React from 'react'

function Soon() {
  return (
    <>
      
      <div className="container-fluid">
        <div className="row justify-content-center">
           <div className="col-sm-8 text-center">
              <div className="iq-comingsoon-info">
                 <a href="#">
                 <img src="/images/logo-full2.png" className="img-fluid w-25" alt="" />
                 </a>
                 <h2 className="mt-4 mb-1">Stay tunned, we&apos;re launching very soon</h2>
                 <p>We are working very hard to give you the best experience possible!</p>
                 <ul className="countdown" data-date="Feb 02 2022 20:20:22">
                    <li><span data-days="">0</span>Days</li>
                    <li><span data-hours="">0</span>Hours</li>
                    <li><span data-minutes="">0</span>Minutes</li>
                    <li><span data-seconds="">0</span>Seconds</li>
                 </ul>
              </div>
           </div>
        </div>
        <div className="row justify-content-center">
           <div className="col-lg-4">
              <form className="iq-comingsoon-form mt-5">
                 <div className="form-group">
                    <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email address" />
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                 </div>
              </form>
           </div>
        </div>
     </div>





    </>
  )
}

export default Soon
