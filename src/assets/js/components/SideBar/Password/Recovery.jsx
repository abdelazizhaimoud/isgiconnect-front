import React from 'react'
import { useState } from 'react'
function Recovery() {
    const [globalState,setGlobalState] = useState({})
    const handleChange = (e) => {
        const {name,value} = e.target
        setGlobalState(prevState=>({...globalState,[name]:value}))
    }
  return (
    <>
     
     <div className="col-md-6 bg-white pt-5">
        <div className="sign-in-from">
            <h1 className="mb-0">Reset Password</h1>
            <p>Enter your email address and we&apos;ll send you an email with instructions to reset your password.</p>
            <form className="mt-4">

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} name='Email' type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" />
                </div>

                <div className="d-inline-block w-100">

                    <button type="submit" className="btn btn-primary float-right">Reset Password</button>
                </div>

            </form>
        </div>
    </div>



 
    </>
  )
}

export default Recovery
