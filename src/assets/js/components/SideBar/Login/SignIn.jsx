import React from 'react'
import { useState } from 'react'

function SignIn() {
    const [globalState,setGlobalState] = useState({})
    const handleChange = (e) => {
        const {name,value} = e.target
        setGlobalState(prevState=>({...globalState,[name]:value}))
    }
  return (
    <>


    
<div className="col-md-6 bg-white pt-5">
        <div className="sign-in-from">
            <h1 className="mb-0">Sign in</h1>
            <p>Enter your email address and password to access admin panel.</p>
            <form className="mt-4">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} type="email" name='Email' className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <a href="#" className="float-right">Forgot password?</a>
                    <input type="password" className="form-control mb-0" name='Password' id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="d-inline-block w-100">
                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                        <input onChange={handleChange} type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary float-right">Sign in</button>
                </div>
                <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">Don&apos;t have an account? <a href="#">Sign up</a></span>
                    <ul className="iq-social-media">
                        <li><a href="#"><i className="ri-facebook-box-line"></i></a></li>
                        <li><a href="#"><i className="ri-twitter-line"></i></a></li>
                        <li><a href="#"><i className="ri-instagram-line"></i></a></li>
                    </ul>
                </div>
            </form>
        </div>
    </div>


      
    </>
  )
}

export default SignIn
