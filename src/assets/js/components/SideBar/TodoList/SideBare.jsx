import React from 'react'

function sidebare() {
  return (
    <>
     <div className="col-lg-3">
        <div className="iq-card">
           <div className="iq-card-body">
              <div className="iq-todo-page">
                 <form className="position-relative">
                    <div className="form-group mb-0">
                       <input type="text" className="form-control todo-search" id="exampleInputEmail002" placeholder="Search" />
                       <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                    </div>
                 </form>
                 <div className="add-new-project mt-3 mb-3">
                    <a href="javascript:void();" className="d-block nrw-project"><i className="ri-add-line mr-2"></i>add Project</a>
                 </div>
                 <ul className="todo-task-list p-0 m-0">
                    <li className="">
                       <a href="javascript:void();"><i className="ri-stack-fill mr-2"></i> Secrat Project</a>
                       <ul id="todo-task1" className="sub-task  show mt-2 p-0">
                          <li className="active"><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-success"></i> All Task </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-warning"></i> People </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-danger"></i> Files <span className="badge badge-danger ml-2 float-right">44</span> </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-primary"></i> Statistics </a></li>
                       </ul>
                    </li>
                    <li>
                       <a href="javascript:void();"><i className="ri-stack-fill mr-2"></i> Bnie Mobile App</a>
                       <ul id="todo-task2" className="sub-task  mt-2 p-0">
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-success"></i> All Task </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-warning"></i> People </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-danger"></i> Files <span className="badge badge-danger ml-2 float-right">20</span> </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-primary"></i> Statistics </a></li>
                       </ul>
                    </li>
                    <li>
                       <a href="javascript:void();"><i className="ri-stack-fill mr-2"></i> New Portfolio Site</a>
                       <ul id="todo-task3" className="sub-task  mt-2 p-0">
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-success"></i> All Task </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-warning"></i> People </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-danger"></i> Files <span className="badge badge-danger ml-2 float-right">10</span> </a></li>
                          <li><a href="javascript:void();"><i className="ri-checkbox-blank-circle-fill text-primary"></i> Statistics </a></li>
                       </ul>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
     </div>

 
    </>
  )
}

export default sidebare
