import React from 'react'

function Groupe() {
  return (
    <>
      
      <div className="col-md-6 col-lg-4">
        <div className="iq-card">
           <div className="top-bg-image">
              <img src="/images/page-img/profile-bg1.jpg" className="img-fluid w-100" alt="group-bg" />
           </div>
           <div className="iq-card-body text-center">
              <div className="group-icon">
                 <img src="/images/page-img/gi-1.jpg" alt="profile-img" className="rounded-circle img-fluid avatar-120" />
              </div>
              <div className="group-info pt-3 pb-3">
                 <h4>Designer</h4>
                 <p>Lorem Ipsum data</p>
              </div>
              <div className="group-details d-inline-block pb-3">
                 <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                    <li className="pl-3 pr-3">
                       <p className="mb-0">Post</p>
                       <h6>600</h6>
                    </li>
                    <li className="pl-3 pr-3">
                       <p className="mb-0">Member</p>
                       <h6>320</h6>
                    </li>
                    <li className="pl-3 pr-3">
                       <p className="mb-0">Visit</p>
                       <h6>1.2k</h6>
                    </li>
                 </ul>
              </div>
              <div className="group-member mb-3">
                 <div className="iq-media-group">
                    <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="/images/user/05.jpg" alt="" />
                    </a>
                    <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="/images/user/06.jpg" alt="" />
                    </a>
                    <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="/images/user/07.jpg" alt="" />
                    </a>
                    <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="/images/user/08.jpg" alt="" />
                    </a>
                    <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="/images/user/09.jpg" alt="" />
                    </a>
                    <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="/images/user/10.jpg" alt="" />
                    </a>
                 </div>
              </div>
              <button type="submit" className="btn btn-primary d-block w-100">Join</button>
           </div>
        </div>
     </div>















    </>
  )
}

export default Groupe
