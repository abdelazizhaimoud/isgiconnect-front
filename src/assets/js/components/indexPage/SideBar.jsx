import React from 'react'

function SideBar() {
  return (
    <div className="iq-sidebar">
      <div id="sidebar-scrollbar" data-scrollbar="true" tabindex="-1" style={{ outline: "none" }}><div className="scroll-content" style={{ transform: "translate3d(0px, 0px, 0px)" }}>
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className="active">
              <a href="index.html" className="iq-waves-effect"><i className="las la-newspaper"></i><span>Newsfeed</span></a>
            </li>
            <li>
              <a href="profile.html" className="iq-waves-effect"><i className="las la-user"></i><span>Profile</span></a>
            </li>
            <li>
              <a href="friend-list.html" className="iq-waves-effect"><i className="las la-user-friends"></i><span>Friend Lists</span></a>
            </li>
            <li>
              <a href="group.html" className="iq-waves-effect"><i className="las la-users"></i><span>Group</span></a>
            </li>
            <li>
              <a href="profile-images.html" className="iq-waves-effect"><i className="las la-image"></i><span>Profile Image</span></a>
            </li>
            <li>
              <a href="profile-video.html" className="iq-waves-effect"><i className="las la-video"></i><span>Profile Video</span></a>
            </li>
            <li>
              <a href="profile-event.html" className="iq-waves-effect"><i className="las la-film"></i><span>Profile Events</span></a>
            </li>
            <li>
              <a href="notification.html" className="iq-waves-effect"><i className="las la-bell"></i><span>Notification</span></a>
            </li>
            <li>
              <a href="file.html" className="iq-waves-effect"><i className="las la-file"></i><span>Files</span></a>
            </li>
            <li>
              <a href="friend-request.html" className="iq-waves-effect"><i className="las la-anchor"></i><span>Friend Request</span></a>
            </li>
            <li>
              <a href="chat.html" className="iq-waves-effect"><i className="lab la-rocketchat"></i><span>Chat</span></a>
            </li>
            <li>
              <a href="todo.html" className="iq-waves-effect"><i className="las la-check-circle"></i><span>Todo</span></a>
            </li>
            <li>
              <a href="calendar.html" className="iq-waves-effect"><i className="las la-calendar"></i><span>Calendar</span></a>
            </li>
            <li>
              <a href="birthday.html" className="iq-waves-effect"><i className="las la-birthday-cake"></i><span>Birthday</span></a>
            </li>
            <li>
              <a href="weather.html" className="iq-waves-effect"><i className="ri-snowy-line"></i><span>Weather</span></a>
            </li>
            <li>
              <a href="music.html" className="iq-waves-effect"><i className="ri-play-circle-line"></i><span>Music</span></a>
            </li>
            <li>
              <a href="#mailbox" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-mail-line"></i><span>Email</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></a>
              <ul id="mailbox" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                <li><a href="app/index.html"><i className="ri-inbox-line"></i>Inbox</a></li>
                <li><a href="app/email-compose.html"><i className="ri-edit-line"></i>Email Compose</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="p-3"></div>
      </div><div className="scrollbar-track scrollbar-track-x" style={{ display: "none" }}><div className="scrollbar-thumb scrollbar-thumb-x" style={{ width: "250px", transform: "translate3d(0px, 0px, 0px)" }}></div></div></div>
    </div>
  )
}

export default SideBar
