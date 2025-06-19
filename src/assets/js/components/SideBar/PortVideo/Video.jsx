import React from 'react'

function video() {
  return (
    <>
      
      <div className="col-md-6 col-lg-4 mb-3">
        <div className="user-images position-relative overflow-hidden">
           <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/K3M-czGNUCg" allowfullscreen=""></iframe>
           </div>
           <div className="image-hover-data">
              <div className="product-elements-icon">
                 <ul className="d-flex align-items-center m-0 p-0 list-inline">
                    <li><a href="#" className="pr-3 text-white"> 60 <i className="ri-thumb-up-line"></i> </a></li>
                    <li><a href="#" className="pr-3 text-white"> 30 <i className="ri-chat-3-line"></i> </a></li>
                    <li><a href="#" className="pr-3 text-white"> 10 <i className="ri-share-forward-line"></i> </a></li>
                 </ul>
              </div>
           </div>
           <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove"><i className="ri-edit-2-fill"></i></a>
        </div>
     </div>



    </>
  )
}

export default video
