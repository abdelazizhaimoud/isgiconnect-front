import React from 'react'
import { useState } from 'react'

function MessagePart() {

   const [globalState,setGlobalState] = useState({})
    const handleChange = (e) => {
        const {name,value} = e.target
        setGlobalState(prevState=>({...globalState,[name]:value}))
    }

  return (
    <>
    <div className="tab-pane fade active show" id="chatbox3" role="tabpanel">
        <div className="chat-head">
           <header className="d-flex justify-content-between align-items-center bg-white pt-3 pl-3 pr-3 pb-3">
              <div className="d-flex align-items-center">
                 <div className="sidebar-toggle">
                    <i className="ri-menu-3-line"></i>
                 </div>
                 <div className="avatar chat-user-profile m-0 mr-3">
                    <img src="/images/user/07.jpg" alt="avatar" className="avatar-50 " />
                    <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                 </div>
                 <h5 className="mb-0">Designer</h5>
              </div>
              <div className="chat-user-detail-popup scroller">
                 <div className="user-profile text-center">
                    <button type="submit" className="close-popup p-3"><i className="ri-close-fill"></i></button>
                    <div className="user mb-4">
                       <a className="avatar m-0">
                       <img src="/images/user/07.jpg" alt="avatar" />
                       </a>
                       <div className="user-name mt-4">
                          <h4>Paige Turner</h4>
                       </div>
                       <div className="user-desc">
                          <p>Cape Town, RSA</p>
                       </div>
                    </div>
                    <hr />
                    <div className="chatuser-detail text-left mt-4">
                       <div className="row">
                          <div className="col-6 col-md-6 title">Bni Name:</div>
                          <div className="col-6 col-md-6 text-right">pai</div>
                       </div>
                       <hr />
                       <div className="row">
                          <div className="col-6 col-md-6 title">Tel:</div>
                          <div className="col-6 col-md-6 text-right">072 143 9920</div>
                       </div>
                       <hr />
                       <div className="row">
                          <div className="col-6 col-md-6 title">Date Of Birth:</div>
                          <div className="col-6 col-md-6 text-right">July 12, 1989</div>
                       </div>
                       <hr />
                       <div className="row">
                          <div className="col-6 col-md-6 title">Gender:</div>
                          <div className="col-6 col-md-6 text-right">Male</div>
                       </div>
                       <hr />
                       <div className="row">
                          <div className="col-6 col-md-6 title">Language:</div>
                          <div className="col-6 col-md-6 text-right">Engliah</div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="chat-header-icons d-flex">
                 <a href="javascript:void();" className="chat-icon-phone">
                 <i className="ri-phone-line"></i>
                 </a>
                 <a href="javascript:void();" className="chat-icon-video">
                 <i className="ri-vidicon-line"></i>
                 </a>
                 <a href="javascript:void();" className="chat-icon-delete">
                 <i className="ri-delete-bin-line"></i>
                 </a>
                 <span className="dropdown">
                 <i className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu"></i>
                 <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                 <a className="dropdown-item" href="JavaScript:void(0);"><i className="fa fa-thumb-tack" aria-hidden="true"></i> Pin to top</a>
                 <a className="dropdown-item" href="JavaScript:void(0);"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete chat</a>
                 <a className="dropdown-item" href="JavaScript:void(0);"><i className="fa fa-ban" aria-hidden="true"></i> Block</a>
                 </span>
                 </span>
              </div>
           </header>
        </div>
        <div className="chat-content scroller">
           <div className="chat">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/1.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:45</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>How can we help? We're here for you! 😄</p>
                 </div>
              </div>
           </div>
           <div className="chat chat-left">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/07.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:48</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>Hey John, I am looking for the best admin template.</p>
                    <p>Could you please help me to find it out? 🤔</p>
                 </div>
              </div>
           </div>
           <div className="chat">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/1.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:49</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>Absolutely!</p>
                    <p>SocialV Dashboard is the responsive bootstrap 4 admin template.</p>
                 </div>
              </div>
           </div>
           <div className="chat chat-left">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/07.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:52</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>Looks clean and fresh UI.</p>
                 </div>
              </div>
           </div>
           <div className="chat">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/1.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:53</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>Thanks, from ThemeForest.</p>
                 </div>
              </div>
           </div>
           <div className="chat chat-left">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/07.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:54</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>I will purchase it for sure. 👍</p>
                 </div>
              </div>
           </div>
           <div className="chat">
              <div className="chat-user">
                 <a className="avatar m-0">
                 <img src="/images/user/1.jpg" alt="avatar" className="avatar-35 " />
                 </a>
                 <span className="chat-time mt-1">6:56</span>
              </div>
              <div className="chat-detail">
                 <div className="chat-message">
                    <p>Okay Thanks..</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="chat-footer p-3 bg-white">
           <form className="d-flex align-items-center" action="javascript:void(0);">
              <div className="chat-attagement d-flex">
                 <a href="javascript:void();"><i className="fa fa-smile-o pr-3" aria-hidden="true"></i></a>
                 <a href="javascript:void();"><i className="fa fa-paperclip pr-3" aria-hidden="true"></i></a>
              </div>
              <input name='typeMessage' type="text" onChange={handleChange} className="form-control mr-3" placeholder="Type your message" />
              <button type="submit" className="btn btn-primary d-flex align-items-center p-2"><i className="fa fa-paper-plane-o" aria-hidden="true"></i><span className="d-none d-lg-block ml-1">Send</span></button>
           </form>
        </div>
     </div>
    </>
  )
}

export default MessagePart
