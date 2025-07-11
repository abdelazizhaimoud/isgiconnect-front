import React from 'react'

function Events() {
  return (
    <>
      

      <div className="iq-card">
        <div className="iq-card-header d-flex justify-content-between">
           <div className="iq-header-title">
              <h4 className="card-title">Events</h4>
           </div>
           <div className="iq-card-header-toolbar d-flex align-items-center">
              <div className="dropdown">
                 <span className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" role="button">
                 <i className="ri-more-fill"></i>
                 </span>
                 <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" >
                    <a className="dropdown-item" href="#"><i className="ri-eye-fill mr-2"></i>View</a>
                    <a className="dropdown-item" href="#"><i className="ri-delete-bin-6-fill mr-2"></i>Delete</a>
                    <a className="dropdown-item" href="#"><i className="ri-pencil-fill mr-2"></i>Edit</a>
                    <a className="dropdown-item" href="#"><i className="ri-printer-fill mr-2"></i>Print</a>
                    <a className="dropdown-item" href="#"><i className="ri-file-download-fill mr-2"></i>Download</a>
                 </div>
              </div>
           </div>
        </div>
        <div className="iq-card-body">
           <ul className="media-story m-0 p-0">
              <li className="d-flex mb-4 align-items-center ">
                 <img src="/images/page-img/s4.jpg" alt="story-img" className="rounded-circle img-fluid" />
                 <div className="stories-data ml-3">
                    <h5>Web Workshop</h5>
                    <p className="mb-0">1 hour ago</p>
                 </div>
              </li>
              <li className="d-flex align-items-center">
                 <img src="/images/page-img/s5.jpg" alt="story-img" className="rounded-circle img-fluid" />
                 <div className="stories-data ml-3">
                    <h5>Fun Events and Festivals</h5>
                    <p className="mb-0">1 hour ago</p>
                 </div>
              </li>
           </ul>
        </div>
     </div>
    </>
  )
}

export default Events
