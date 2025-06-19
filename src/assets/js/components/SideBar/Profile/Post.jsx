import React from 'react';
import { useState } from 'react';

function Post() {

  const [globalState,setGlobalState] = useState({})
    const handleChange = (e) => {
        const {name,value} = e.target
        setGlobalState(prevState=>({...globalState,[name]:value}))
    }

  return (
    <>
      <div className="post-item">
        <div className="user-post-data p-3">
          <div className="d-flex flex-wrap">
            <div className="media-support-user-img mr-3">
              <img className="rounded-circle img-fluid" src="/images/user/1.jpg" alt="User" />
            </div>
            <div className="media-support-info mt-2">
              <h5 className="mb-0 d-inline-block">
                <a href="#" onClick={(e) => e.preventDefault()}>Bni Cyst</a>
              </h5>
              <p className="ml-1 mb-0 d-inline-block">Add New Post</p>
              <p className="mb-0">3 hours ago</p>
            </div>
          </div>
        </div>

        <div className="user-post">
          <img src="/images/page-img/p1.jpg" alt="post" className="img-fluid w-100" />
        </div>

        <div className="comment-area mt-3">
          <hr />
          <form className="comment-text d-flex align-items-center mt-3">
            <input onChange={handleChange} name='Comment' type="text" className="form-control rounded" />
            <div className="comment-attagement d-flex">
              <a href="#" onClick={(e) => e.preventDefault()}><i className="ri-link mr-3"></i></a>
              <a href="#" onClick={(e) => e.preventDefault()}><i className="ri-user-smile-line mr-3"></i></a>
              <a href="#" onClick={(e) => e.preventDefault()}><i className="ri-camera-line mr-3"></i></a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;
