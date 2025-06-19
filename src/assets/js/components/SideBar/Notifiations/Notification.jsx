import React from 'react'

function Notification() {
  return (
    <>
     
     <div className="iq-card">
        <div className="iq-card-body">
           <ul className="notification-list m-0 p-0">
              <li className="d-flex align-items-center">
                 <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                 <div className="media-support-info ml-3">
                    <h6>Paige Turner Posted in UI/UX Community</h6>
                    <p className="mb-0">30  ago</p>
                 </div>
                 <div className="d-flex align-items-center">
                    <a href="javascript:void();" className="mr-3 iq-notify iq-bg-primary rounded"><i className="ri-award-line"></i></a>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="dropdown">
                          <span className="dropdown-toggle" data-toggle="dropdown">
                          <i className="ri-more-fill"></i>
                          </span>
                          <div className="dropdown-menu dropdown-menu-right">
                             <a className="dropdown-item" href="#"><i className="ri-eye-fill mr-2"></i>View</a>
                             <a className="dropdown-item" href="#"><i className="ri-delete-bin-6-fill mr-2"></i>Delete</a>
                             <a className="dropdown-item" href="#"><i className="ri-pencil-fill mr-2"></i>Edit</a>
                             <a className="dropdown-item" href="#"><i className="ri-printer-fill mr-2"></i>Print</a>
                             <a className="dropdown-item" href="#"><i className="ri-file-download-fill mr-2"></i>Download</a>
                          </div>
                       </div>
                    </div>
                 </div>
              </li>
           </ul>
        </div>
     </div>




 
    </>
  )
}

export default Notification
