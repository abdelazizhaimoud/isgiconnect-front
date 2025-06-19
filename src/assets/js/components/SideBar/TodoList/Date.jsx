import React from 'react'

function Date() {
  return (
    <>
      
      <div className="col-sm-12">
        <div className="iq-card">
           <div className="iq-card-body">
              <div className="d-flex justify-content-between align-items-center">
                 <div className="todo-date d-flex mr-3">
                    <i className="ri-calendar-2-line text-success mr-2"></i>
                    <span>Wednesday, 08th January, 2020</span>
                 </div>
                 <div className="todo-notification d-flex align-items-center">
                    <div className="notification-icon position-relative d-flex align-items-center mr-3">
                       <a href="#"><i className="ri-notification-3-line font-size-16"></i></a>
                       <span className="bg-danger text-white">5</span>
                    </div>
                    <button type="submit" className="btn iq-bg-success">Add Task</button>
                 </div>
              </div>
           </div>
        </div>
     </div>
    </>
  )
}

export default Date
