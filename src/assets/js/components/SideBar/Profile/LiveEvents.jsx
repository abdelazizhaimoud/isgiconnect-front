import React from 'react'

function LiveEvents() {
  return (
    <>
     
     <div className="iq-card">
         <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
               <h4 className="card-title">Life Event</h4>
            </div>
            <div className="iq-card-header-toolbar d-flex align-items-center">
               <p className="m-0"><a href="javacsript:void();"> Create </a></p>
            </div>
         </div>
         <div className="iq-card-body">
            <div className="row">
               <div className="col-sm-12">
                  <div className="event-post position-relative">
                     <a href="javascript:void();"><img src="/images/page-img/07.jpg" alt="gallary-image" className="img-fluid rounded" /></a>
                     <div className="job-icon-position">
                        <div className="job-icon bg-primary p-2 d-inline-block rounded-circle"><i className="ri-briefcase-line"></i></div>
                     </div>
                     <div className="iq-card-body text-center p-2">
                        <h5>Started New Job at Apple</h5>
                        <p>January 24, 2019</p>
                     </div>
                  </div>
               </div>
               <div className="col-sm-12">
                  <div className="event-post position-relative">
                     <a href="javascript:void();"><img src="/images/page-img/06.jpg" alt="gallary-image" className="img-fluid rounded" /></a>
                     <div className="job-icon-position">
                        <div className="job-icon bg-primary p-2 d-inline-block rounded-circle"><i className="ri-briefcase-line"></i></div>
                     </div>
                     <div className="iq-card-body text-center p-2">
                        <h5>Freelance Photographer</h5>
                        <p>January 24, 2019</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>







 
    </>
  )
}

export default LiveEvents
