import React from 'react'
import { useState } from 'react'

function DisplayChatHistory() {

   const [globalState,setGlobalState] = useState({})

    const handleChange = (e) => {
        const {name,value} = e.target
        setGlobalState(prevState=>({...globalState,[name]:value}))
    }

  return (
    <>
          <div className="col-lg-3 chat-data-left scroller">
        <div className="chat-search pt-3 pl-3">
           <div className="d-flex align-items-center">
              <div className="chat-profile mr-3">
                 <img src="/images/user/1.jpg" alt="chat-user" className="avatar-60 " />
              </div>
              <div className="chat-caption">
                 <h5 className="mb-0">Bni Jordan</h5>
                 <p className="m-0">Web Designer</p>
              </div>
              <button type="submit" className="close-btn-res p-3"><i className="ri-close-fill"></i></button>
           </div>
           <div id="user-detail-popup" className="scroller">
              <div className="user-profile">
                 <button type="submit" className="close-popup p-3"><i className="ri-close-fill"></i></button>
                 <div className="user text-center mb-4">
                    <a className="avatar m-0">
                    <img src="/images/user/1.jpg" alt="avatar" />
                    </a>
                    <div className="user-name mt-4">
                       <h4>Bni Jordan</h4>
                    </div>
                    <div className="user-desc">
                       <p>Web Designer</p>
                    </div>
                 </div>
                 <hr />
                 <div className="user-detail text-left mt-4 pl-4 pr-4">
                    <h5 className="mt-4 mb-4">About</h5>
                    <p>It is long established fact that a reader will be distracted bt the reddable.</p>
                    <h5 className="mt-3 mb-3">Status</h5>
                    <ul className="user-status p-0">
                       <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-success pr-1"></i><span>Online</span></li>
                       <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-warning pr-1"></i><span>Away</span></li>
                       <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-danger pr-1"></i><span>Do Not Disturb</span></li>
                       <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-light pr-1"></i><span>Offline</span></li>
                    </ul>
                 </div>
              </div>
           </div>
           <div className="chat-searchbar mt-4">
              <div className="form-group chat-search-data m-0">
                 <input name='chatSearch' type="text" onChange={handleChange} className="form-control round" id="chat-search" placeholder="Search" />
                 <i className="ri-search-line"></i>
              </div>
           </div>
        </div>
        <div className="chat-sidebar-channel scroller mt-4 pl-3">
           <h5 className="">Public Channels</h5>
           <ul className="iq-chat-ui nav flex-column nav-pills">
              <li>
                 <a data-toggle="pill" href="#chatbox1" className="active">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/05.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Team Discussions</h6>
                          <span>Lorem Ipsum is</span>
                       </div>
                       <div className="chat-meta float-right text-center mt-2 mr-1">
                          <div className="chat-msg-counter bg-primary text-white">20</div>
                          <span className="text-nowrap">05 min</span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox2" className="">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/06.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Announcement</h6>
                          <span>This Sunday we</span>
                       </div>
                       <div className="chat-meta float-right text-center mt-2 mr-1">
                          <div className="chat-msg-counter bg-primary text-white">10</div>
                          <span className="text-nowrap">10 min</span>
                       </div>
                    </div>
                 </a>
              </li>
           </ul>
           <h5 className="mt-3">Private Channels</h5>
           <ul className="iq-chat-ui nav flex-column nav-pills">
              <li>
                 <a data-toggle="pill" href="#chatbox3" className="active">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/07.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-warning"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Designer</h6>
                          <span>There are many </span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox4" className="">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/08.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Developer</h6>
                          <span>passages of Lorem</span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox5">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/09.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-info"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Testing Team</h6>
                          <span>Lorem Ipsum used</span>
                       </div>
                    </div>
                 </a>
              </li>
           </ul>
           <h5 className="mt-3">Direct Message</h5>
           <ul className="iq-chat-ui nav flex-column nav-pills">
              <li>
                 <a data-toggle="pill" href="#chatbox6">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/10.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-dark"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Paul Molive</h6>
                          <span>translation by</span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox7">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/05.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Paige Turner</h6>
                          <span>Lorem Ipsum which</span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox8">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/06.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-primary"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Barb Ackue</h6>
                          <span>simply random text</span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox9">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/07.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-danger"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Maya Didas</h6>
                          <span> but also the leap</span>
                       </div>
                    </div>
                 </a>
              </li>
              <li>
                 <a data-toggle="pill" href="#chatbox10">
                    <div className="d-flex align-items-center">
                       <div className="avatar mr-2">
                          <img src="/images/user/08.jpg" alt="chatuserimage" className="avatar-50 " />
                          <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-warning"></i></span>
                       </div>
                       <div className="chat-sidebar-name">
                          <h6 className="mb-0">Monty Carlo</h6>
                          <span>Contrary to popular</span>
                       </div>
                    </div>
                 </a>
              </li>
           </ul>
        </div>
     </div>
    </>
  )
}

export default DisplayChatHistory
