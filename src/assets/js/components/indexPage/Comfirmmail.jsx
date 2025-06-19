import React from 'react'
import { Link } from 'react-router-dom'





function Comfirmmail() {
  return (
    <>
        <div className="col-md-6 bg-white pt-5">
            <div className="sign-in-from">
                <img src="/images/login/mail.png" width="80" alt="" />
                <h1 className="mt-3 mb-0">Success !</h1>
                <p>A email has been send to youremail@domain.com. Please check for an email from company and click on the included link to reset your password.</p>
                <div className="d-inline-block w-100">
                    <button type="submit" className="btn btn-primary mt-3">Back to Home</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Comfirmmail
