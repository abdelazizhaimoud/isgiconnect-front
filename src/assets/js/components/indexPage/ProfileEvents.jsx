import React from 'react'

function ProfileEvents() {
  return (
    <>
        <div className="col-md-6 col-lg-4">
        <div className="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
           <div className="event-images">
              <a href="#">
              <img src="/images/page-img/52.jpg" className="img-fluid" alt="Responsive image" />
              </a>
           </div>
           <div className="iq-card-body">
              <div className="d-flex">
                 <div className="date-of-event">
                    <span>Jan</span>
                    <h5>24</h5>
                 </div>
                 <div className="events-detail ml-3">
                    <h5>Birthday Celibration</h5>
                    <p>Lorem Ipsum is simply dummy text</p>
                    <div className="event-member">
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
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
    </>
  )
}

export default ProfileEvents
