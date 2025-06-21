import {React,useState} from 'react'
import axios from '../../api/getUser'
import { useEffect } from 'react'




function Signup() {
    const [globalState,setGlobalState] = useState({})
    const handleChange = (e) => {
        const {name,value} = e.target
        setGlobalState(prevState=>({...globalState,[name]:value}))
        console.log(globalState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Register()
    }


    const Register = async () => {
        try {
          const response = await axios.post('/register', globalState);
          console.log('Registration successful:', response.data);
        } catch (error) {
          console.error('Registration failed:', error.response?.data || error.message);
        }
      };



    
  return (
        <div className="ol-md-6 bg-white pt-5">
            <div className="sign-in-from">
                <h1 className="mb-0">Sign Up</h1>
                <p>Enter your email address and password to access admin panel.</p>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Your Full Name</label>
                        <input onChange={handleChange} name="fullName" type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Your Full Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail2">Email address</label>
                        <input onChange={handleChange} name="email" type="email" className="form-control mb-0" id="exampleInputEmail2" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={handleChange} name="password" type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="d-inline-block w-100">
                        <div className="ustom-control custom-checkbox d-inline-block mt-2 pt-1">
                            <input onChange={handleChange} name="checkbox" type="checkbox" className="ustom-control-input" id="customCheck1" />
                            <label className="ustom-control-label" htmlFor="customCheck1">I accept <a href="#">Terms and Conditions</a></label>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Sign Up</button>
                    </div>
                    <div className="sign-info">
                        <span className="dark-color d-inline-block line-height-2">Already Have Account ? <a href="#">Log In</a></span>
                        <ul className="iq-social-media">
                            <li><a href="#"><i className="ri-facebook-box-line"></i></a></li>
                            <li><a href="#"><i className="ri-twitter-line"></i></a></li>
                            <li><a href="#"><i className="ri-instagram-line"></i></a></li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>



  )
}

export default Signup
