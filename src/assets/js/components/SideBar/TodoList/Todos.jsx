import React from 'react'

function Todos() {
   
  return (
    <>
      

      <div className="col-md-8">
        <div className="iq-card">
           <div className="iq-card-body p-0">
              <ul className="todo-task-lists m-0 p-0">
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6 className="d-inline-block">Landing page for secret Project</h6>
                       <span className="badge badge-warning ml-3 text-white">expirinq</span>
                       <p className="mb-0">by Danlel Cllfferton</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check1" />
                          <label className="custom-control-label" htmlFor="check1"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3 active-task">
                    <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6>Fix Critical Crashes</h6>
                       <p className="mb-0">by Cralg Danles</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check2" checked="checked" />
                          <label className="custom-control-label" htmlFor="check2"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/02.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6 className="d-inline-block">IOS App - Redesign the contact</h6>
                       <span className="badge badge-success ml-3">ending</span>
                       <p className="mb-0">by Simona Gomez </p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check3" />
                          <label className="custom-control-label" htmlFor="check3"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/03.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6>Final Meetup for the Secrat Project Client</h6>
                       <p className="mb-0">bt Serena Gemoz</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check4" />
                          <label className="custom-control-label" htmlFor="check4"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/04.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6>Code the Parsing Element</h6>
                       <p className="mb-0">by Jeena Gaze</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check5" />
                          <label className="custom-control-label" htmlFor="check5"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/05.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6 className="d-inline-block">Test the Bug, that causes design</h6>
                       <span className="badge badge-danger ml-3">urgent</span>
                       <p className="mb-0">by migule Slimmonas</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check6" />
                          <label className="custom-control-label" htmlFor="check6"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/06.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6>Android App Design</h6>
                       <p className="mb-0">by Becky Dimes</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check7"/>
                          <label className="custom-control-label" htmlFor="check7"></label>
                       </div>
                    </div>
                 </li>
                 <li className="d-flex align-items-center p-3">
                    <div className="user-img img-fluid"><img src="/images/user/07.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                       <h6>Skype Meetup with clients</h6>
                       <p className="mb-0">by James Romero</p>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                       <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="todo-check" className="custom-control-input" id="check8"/>
                          <label className="custom-control-label" htmlFor="check8"></label>
                       </div>
                    </div>
                 </li>
              </ul>
           </div>
        </div>
     </div>


    </>
  )
}

export default Todos
