import React from 'react'

function PFPcard() {
  return (
    <>
     
     <div className="col-sm-12">
         <div className="iq-card">
            <div className="iq-card-body profile-page p-0">
               <div className="profile-header">
                  <div className="cover-container">
                     <img src="/images/page-img/profile-bg1.jpg" alt="profile-bg" className="rounded img-fluid" />
                     <ul className="header-nav d-flex flex-wrap justify-end p-0 m-0">
                        <li><a href="javascript:void();"><i className="ri-pencil-line"></i></a></li>
                        <li><a href="javascript:void();"><i className="ri-settings-4-line"></i></a></li>
                     </ul>
                  </div>
                  <div className="user-detail text-center mb-3">
                     <div className="profile-img">
                        <img src="/images/user/11.png" alt="profile-img" className="avatar-130 img-fluid" />
                     </div>
                     <div className="profile-detail">
                        <h3 className="">Bni Cyst</h3>
                     </div>
                  </div>
                  <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                     <div className="social-links">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                           <li className="text-center pr-3">
                              <a href="#"><img src="/images/icon/08.png" className="img-fluid rounded" alt="facebook" /></a>
                           </li>
                           <li className="text-center pr-3">
                              <a href="#"><img src="/images/icon/09.png" className="img-fluid rounded" alt="Twitter" /></a>
                           </li>
                           <li className="text-center pr-3">
                              <a href="#"><img src="/images/icon/10.png" className="img-fluid rounded" alt="Instagram" /></a>
                           </li>
                           <li className="text-center pr-3">
                              <a href="#"><img src="/images/icon/11.png" className="img-fluid rounded" alt="Google plus" /></a>
                           </li>
                           <li className="text-center pr-3">
                              <a href="#"><img src="/images/icon/12.png" className="img-fluid rounded" alt="You tube" /></a>
                           </li>
                           <li className="text-center pr-3">
                              <a href="#"><img src="/images/icon/13.png" className="img-fluid rounded" alt="linkedin" /></a>
                           </li>
                        </ul>
                     </div>
                     <div className="social-info">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                           <li className="text-center pl-3">
                              <h6>Posts</h6>
                              <p className="mb-0">690</p>
                           </li>
                           <li className="text-center pl-3">
                              <h6>Followers</h6>
                              <p className="mb-0">206</p>
                           </li>
                           <li className="text-center pl-3">
                              <h6>Following</h6>
                              <p className="mb-0">100</p>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="iq-card">
            <div className="iq-card-body p-0">
               <div className="user-tabing">
                  <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                     <li className="col-sm-3 p-0">
                        <a className="nav-link active" data-toggle="pill" href="#timeline">Timeline</a>
                     </li>
                     <li className="col-sm-3 p-0">
                        <a className="nav-link" data-toggle="pill" href="#about">About</a>
                     </li>
                     <li className="col-sm-3 p-0">
                        <a className="nav-link" data-toggle="pill" href="#friends">friends</a>
                     </li>
                     <li className="col-sm-3 p-0">
                        <a className="nav-link" data-toggle="pill" href="#photos">Photos</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
       
    </>
  )
}

export default PFPcard
