import React from 'react'

function AdminPass() {
  return (
    <>
      
      <div className="col-md-6 bg-white pt-5">
        <div className="sign-in-from">
            <img src="images/user/1.jpg" alt="user-image" className="rounded-circle" />
                    <h4 className="mt-3 mb-0">Hi ! Michael Smith</h4>
                    <p>Enter your password to access the admin.</p>
            <form className="mt-4">

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input type="Password" className="form-control mb-0" id="exampleInputEmail1" placeholder="Password" />
                </div>

                <div className="d-inline-block w-100">
                    <button type="submit" className="btn btn-primary float-right">Log In</button>
                </div>

            </form>
        </div>
    </div>


    </>
  )
}

export default AdminPass
