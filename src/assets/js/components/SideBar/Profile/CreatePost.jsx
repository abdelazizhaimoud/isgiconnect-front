import React from "react";

function CreatePost() {
  return (
    <div id="post-modal-data" className="iq-card">
      <div className="iq-card-header d-flex justify-content-between">
        <div className="iq-header-title">
          <h4 className="card-title">Create Post</h4>
        </div>
      </div>
      <div
        className="iq-card-body"
        data-toggle="modal"
        data-target="#post-modal"
      >
        <div className="d-flex align-items-center">
          <div className="user-img">
            <img
              src="/images/user/1.jpg"
              alt="User"
              className="avatar-60 rounded-circle img-fluid"
            />
          </div>
          <form className="post-text ml-3 w-100">
            <input
              type="text"
              className="form-control rounded"
              placeholder="Write something here..."
              style={{ border: "none" }}
            />
          </form>
        </div>

        <ul className="post-opt-block d-flex align-items-center list-inline m-0 p-0">
          {[
            { img: "07.png", text: "Photo/Video" },
            { img: "08.png", text: "Tag Friend" },
            { img: "09.png", text: "Feeling/Activity" },
          ].map((item, index) => (
            <li key={index} className="iq-bg-primary rounded p-2 pointer mr-3">
              <img src={`/images/small/${item.img}`} alt={item.text} className="img-fluid" /> {item.text}
            </li>
          ))}
          <li className="iq-bg-primary rounded p-2 pointer">
            <div className="dropdown">
              <span
                className="dropdown-toggle"
                id="post-option"
                data-toggle="dropdown"
              >
                <i className="ri-more-fill"></i>
              </span>
              <div className="dropdown-menu dropdown-menu-right">
                {["Check in", "Live Video", "Gif", "Watch Party", "Play with Friend"].map(
                  (option, idx) => (
                    <a key={idx} className="dropdown-item" href="#">
                      {option}
                    </a>
                  )
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="post-modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Post</h5>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                <i className="ri-close-fill"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                <div className="user-img">
                  <img
                    src="/images/user/1.jpg"
                    alt="User"
                    className="avatar-60 rounded-circle img-fluid"
                  />
                </div>
                <form className="post-text ml-3 w-100">
                  <input
                    type="text"
                    className="form-control rounded"
                    placeholder="Write something here..."
                    style={{ border: "none" }}
                  />
                </form>
              </div>
              <hr />
              <ul className="d-flex flex-wrap list-inline m-0 p-0">
                {[
                  { img: "07.png", text: "Photo/Video" },
                  { img: "08.png", text: "Tag Friend" },
                  { img: "09.png", text: "Feeling/Activity" },
                  { img: "10.png", text: "Check in" },
                  { img: "11.png", text: "Live Video" },
                  { img: "12.png", text: "Gif" },
                  { img: "13.png", text: "Watch Party" },
                  { img: "14.png", text: "Play with Friends" },
                ].map((item, index) => (
                  <li key={index} className="col-md-6 mb-3">
                    <div className="iq-bg-primary rounded p-2 pointer">
                      <img
                        src={`/images/small/${item.img}`}
                        alt={item.text}
                        className="img-fluid"
                      />{" "}
                      {item.text}
                    </div>
                  </li>
                ))}
              </ul>
              <hr />

              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="user-img mr-3">
                    <img
                      src="/images/user/1.jpg"
                      alt="User"
                      className="avatar-60 rounded-circle img-fluid"
                    />
                  </div>
                  <h6>Your Story</h6>
                </div>
                <div className="iq-card-post-toolbar">
                  <div className="dropdown">
                    <span
                      className="dropdown-toggle btn btn-primary"
                      id="postdata-1"
                      data-toggle="dropdown"
                    >
                      Friends
                    </span>
                    <div className="dropdown-menu">
                      {[
                        { icon: "ri-save-line", title: "Public", desc: "Anyone on or off Facebook" },
                        { icon: "ri-close-circle-line", title: "Friends", desc: "Your friends on Facebook" },
                        { icon: "ri-user-unfollow-line", title: "Friends except", desc: "Don't show to some friends" },
                        { icon: "ri-notification-line", title: "Only Me", desc: "Only me" },
                      ].map((item, index) => (
                        <a key={index} className="dropdown-item p-3" href="#">
                          <div className="d-flex align-items-top">
                            <div className="icon font-size-20">
                              <i className={item.icon}></i>
                            </div>
                            <div className="data ml-2">
                              <h6>{item.title}</h6>
                              <p className="mb-0">{item.desc}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary d-block w-100 mt-3">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
