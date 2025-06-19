import React from 'react'

function Header() {
  return (
      <div className="iq-top-navbar">
          <div className="iq-navbar-custom">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                  <div className="iq-navbar-logo d-flex justify-content-between">
                      <a href="index.html">
                          <img src="/images/Logo.svg" className="img-fluid" alt="" width="100px" height="60px" />
                          <span style={{fontSize:'20px'}}>ISGI CONNECT</span>
                      </a>
                      <div className="iq-menu-bt align-self-center">
                          <div className="wrapper-menu">
                              <div className="main-circle"><i className="ri-menu-line"></i></div>
                          </div>
                      </div>
                  </div>
                  <div className="iq-search-bar">
                      <form action="#" className="searchbox">
                          <input type="text" className="text search-input" placeholder="Type here to search..." />
                          <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                      </form>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                      <i className="ri-menu-3-line"></i>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ml-auto navbar-list">
                          <li>
                              <a href="profile.html" className="iq-waves-effect d-flex align-items-center">
                                  <img src="/images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" />
                                  <div className="caption">
                                      <h6 className="mb-0 line-height">Bni Cyst</h6>
                                  </div>
                              </a>
                          </li>
                          <li>
                              <a href="index.html" className="iq-waves-effect d-flex align-items-center">
                                  <i className="ri-home-line"></i>
                              </a>
                          </li>
                          <li className="nav-item iq-show">
                              <a className="search-toggle iq-waves-effect active" href="#"><span className="ripple rippleEffect" style={{ width: "75px", height: "75px", top: "-9.5px", left: "-11.5px" }}></span><i className="ri-group-line"></i></a>
                              <div className="iq-sub-dropdown iq-sub-dropdown-large">
                                  <div className="iq-card shadow-none m-0">
                                      <div className="iq-card-body p-0 ">
                                          <div className="bg-primary p-3">
                                              <h5 className="mb-0 text-white">Friend Request<small className="badge  badge-light float-right pt-1">4</small></h5>
                                          </div>
                                          <div className="iq-friend-request">
                                              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                  <div className="d-flex align-items-center">
                                                      <div className="">
                                                          <img className="avatar-40 rounded" src="/images/user/01.jpg" alt="" />
                                                      </div>
                                                      <div className="media-body ml-3">
                                                          <h6 className="mb-0 ">Jaques Amole</h6>
                                                          <p className="mb-0">40  friends</p>
                                                      </div>
                                                  </div>
                                                  <div className="d-flex align-items-center">
                                                      <a href="javascript:void()" className="mr-3 btn btn-primary rounded">Confirm</a>
                                                      <a href="javascript:void()" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="iq-friend-request">
                                              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                  <div className="d-flex align-items-center">
                                                      <div className="">
                                                          <img className="avatar-40 rounded" src="/images/user/02.jpg" alt="" />
                                                      </div>
                                                      <div className="media-body ml-3">
                                                          <h6 className="mb-0 ">Lucy Tania</h6>
                                                          <p className="mb-0">12  friends</p>
                                                      </div>
                                                  </div>
                                                  <div className="d-flex align-items-center">
                                                      <a href="javascript:void()" className="mr-3 btn btn-primary rounded">Confirm</a>
                                                      <a href="javascript:void()" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="iq-friend-request">
                                              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                  <div className="d-flex align-items-center">
                                                      <div className="">
                                                          <img className="avatar-40 rounded" src="/images/user/03.jpg" alt="" />
                                                      </div>
                                                      <div className="media-body ml-3">
                                                          <h6 className="mb-0 ">Manny Petty</h6>
                                                          <p className="mb-0">3  friends</p>
                                                      </div>
                                                  </div>
                                                  <div className="d-flex align-items-center">
                                                      <a href="javascript:void()" className="mr-3 btn btn-primary rounded">Confirm</a>
                                                      <a href="javascript:void()" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="iq-friend-request">
                                              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                  <div className="d-flex align-items-center">
                                                      <div className="">
                                                          <img className="avatar-40 rounded" src="/images/user/04.jpg" alt="" />
                                                      </div>
                                                      <div className="media-body ml-3">
                                                          <h6 className="mb-0 ">Marsha Mello</h6>
                                                          <p className="mb-0">15  friends</p>
                                                      </div>
                                                  </div>
                                                  <div className="d-flex align-items-center">
                                                      <a href="javascript:void()" className="mr-3 btn btn-primary rounded">Confirm</a>
                                                      <a href="javascript:void()" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="text-center">
                                              <a href="#" className="mr-3 btn text-primary">View More Request</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </li>
                          <li className="nav-item">
                              <a href="#" className="search-toggle iq-waves-effect">
                                  <div id="lottie-beil"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)" }}><defs><clipPath id="__lottie_element_2"><rect width="192" height="192" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_2)"><g transform="matrix(5.833330154418945,0,0,5.833330154418945,26.000038146972656,18.206588745117188)" opacity="1" style={{ display: "block" }}><g opacity="1" transform="matrix(1,0,0,1,12,21.639999389648438)"></g><g opacity="1" transform="matrix(0.9999564290046692,0.009335060603916645,-0.009335060603916645,0.9999564290046692,12,8.654000282287598)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M6,-0.6539999842643738 C6,-5.052999973297119 1.2649999856948853,-8.345999717712402 -3.38700008392334,-5.715000152587891 C-5.052000045776367,-4.77400016784668 -6.0329999923706055,-2.9560000896453857 -6.002999782562256,-1.0440000295639038 C-5.888999938964844,6.271999835968018 -9,8.345999717712402 -9,8.345999717712402 C-9,8.345999717712402 9,8.345999717712402 9,8.345999717712402 C9,8.345999717712402 6,6.3460001945495605 6,-0.6539999842643738z"></path></g><g opacity="1" transform="matrix(0.999430239200592,0.0337514691054821,-0.0337514691054821,0.999430239200592,12.023355484008789,21.663970947265625)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M1.7300000190734863,-0.6399999856948853 C1.1749999523162842,0.3149999976158142 -0.04800000041723251,0.6399999856948853 -1.003999948501587,0.08699999749660492 C-1.3049999475479126,-0.08799999952316284 -1.555999994277954,-0.33799999952316284 -1.7300000190734863,-0.6399999856948853"></path></g></g></g></svg></div>
                                  <span className="bg-danger dots"></span>
                              </a>
                              <div className="iq-sub-dropdown">
                                  <div className="iq-card shadow-none m-0">
                                      <div className="iq-card-body p-0 ">
                                          <div className="bg-primary p-3">
                                              <h5 className="mb-0 text-white">All Notifications<small className="badge  badge-light float-right pt-1">4</small></h5>
                                          </div>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/01.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Emma Watson Bni</h6>
                                                      <small className="float-right font-size-12">Just Now</small>
                                                      <p className="mb-0">95 MB</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/02.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">New customer is join</h6>
                                                      <small className="float-right font-size-12">5 days ago</small>
                                                      <p className="mb-0">Cyst Bni</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/03.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Two customer is left</h6>
                                                      <small className="float-right font-size-12">2 days ago</small>
                                                      <p className="mb-0">Cyst Bni</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/04.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">New Mail from Fenny</h6>
                                                      <small className="float-right font-size-12">3 days ago</small>
                                                      <p className="mb-0">Cyst Bni</p>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </li>
                          <li className="nav-item dropdown">
                              <a href="#" className="search-toggle iq-waves-effect">
                                  <div id="lottie-mail"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)" }}><defs><clipPath id="__lottie_element_7"><rect width="192" height="192" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_7)"><g transform="matrix(6.425090312957764,0.3642463684082031,-0.3642463684082031,6.425090312957764,23.269866943359375,41.643157958984375)" opacity="1" style={{ display: "block" }}><g opacity="1" transform="matrix(1,0,0,1,12,12.399999618530273)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M8.20199966430664,-6.318999767303467 C8.682999610900879,-6.021999835968018 9,-5.51800012588501 9,-4.949999809265137 C9,-4.949999809265137 9,4.949999809265137 9,4.949999809265137 C9,5.857999801635742 8.190999984741211,6.599999904632568 7.199999809265137,6.599999904632568 C7.199999809265137,6.599999904632568 -7.199999809265137,6.599999904632568 -7.199999809265137,6.599999904632568 C-8.1899995803833,6.599999904632568 -9,5.857999801635742 -9,4.949999809265137 C-9,4.949999809265137 -9,-4.949999809265137 -9,-4.949999809265137 C-9,-5.4730000495910645 -8.730999946594238,-5.940999984741211 -8.314000129699707,-6.24399995803833"></path></g><g opacity="1" transform="matrix(1,0,0,1,12,9.75)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M7.98799991607666,-3.881999969482422 C7.98799991607666,-3.881999969482422 0,-10.239999771118164 0,-10.239999771118164 C0,-10.239999771118164 -7.98799991607666,-3.8450000286102295 -7.98799991607666,-3.8450000286102295"></path></g></g><g transform="matrix(6.425090312957764,0.3642463684082031,-0.3642463684082031,6.425090312957764,24.34912872314453,22.605613708496094)" opacity="1" style={{ display: "block" }}><g opacity="1" transform="matrix(1,0,0,1,12,15.399999618530273)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M-7.199999809265137,-6.599999904632568 C-7.199999809265137,-6.599999904632568 7.199999809265137,-6.599999904632568 7.199999809265137,-6.599999904632568 C8.190999984741211,-6.599999904632568 9,-5.85699987411499 9,-4.949999809265137 C9,-4.949999809265137 9,4.949999809265137 9,4.949999809265137 C9,5.857999801635742 8.190999984741211,6.599999904632568 7.199999809265137,6.599999904632568 C7.199999809265137,6.599999904632568 -7.199999809265137,6.599999904632568 -7.199999809265137,6.599999904632568 C-8.1899995803833,6.599999904632568 -9,5.857999801635742 -9,4.949999809265137 C-9,4.949999809265137 -9,-4.949999809265137 -9,-4.949999809265137 C-9,-5.85699987411499 -8.1899995803833,-6.599999904632568 -7.199999809265137,-6.599999904632568z"></path></g><g opacity="1" transform="matrix(1,0,0,1,12,7.5)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M7.01200008392334,2.9149999618530273 C7.01200008392334,2.9149999618530273 6.930704593658447,-7.9358906745910645 6.930704593658447,-7.9358906745910645 C6.930704593658447,-7.9358906745910645 -7.069295406341553,-7.9358906745910645 -7.069295406341553,-7.9358906745910645 C-7.069295406341553,-7.9358906745910645 -6.98799991607666,2.9149999618530273 -6.98799991607666,2.9149999618530273"></path><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M7.01200008392334,2.9149999618530273 C7.01200008392334,2.9149999618530273 6.930704593658447,-7.9358906745910645 6.930704593658447,-7.9358906745910645 C6.930704593658447,-7.9358906745910645 -7.069295406341553,-7.9358906745910645 -7.069295406341553,-7.9358906745910645 C-7.069295406341553,-7.9358906745910645 -6.98799991607666,2.9149999618530273 -6.98799991607666,2.9149999618530273"></path></g><g opacity="1" transform="matrix(1,0,0,1,12,12.75)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2" d=" M8,-3.1500000953674316 C8,-3.1500000953674316 0,3.1500000953674316 0,3.1500000953674316 C0,3.1500000953674316 -8,-3.1500000953674316 -8,-3.1500000953674316"></path></g></g></g></svg></div>
                                  <span className="bg-primary count-mail"></span>
                              </a>
                              <div className="iq-sub-dropdown">
                                  <div className="iq-card shadow-none m-0">
                                      <div className="iq-card-body p-0 ">
                                          <div className="bg-primary p-3">
                                              <h5 className="mb-0 text-white">All Messages<small className="badge  badge-light float-right pt-1">5</small></h5>
                                          </div>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/01.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Bni Emma Watson</h6>
                                                      <small className="float-left font-size-12">13 Jun</small>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/02.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                                                      <small className="float-left font-size-12">20 Apr</small>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/03.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Why do we use it?</h6>
                                                      <small className="float-left font-size-12">30 Jun</small>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/04.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Variations Passages</h6>
                                                      <small className="float-left font-size-12">12 Sep</small>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="#" className="iq-sub-card">
                                              <div className="media align-items-center">
                                                  <div className="">
                                                      <img className="avatar-40 rounded" src="/images/user/05.jpg" alt="" />
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                                                      <small className="float-left font-size-12">5 Dec</small>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </li>
                      </ul>
                      <ul className="navbar-list">
                          <li className="">
                              <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                  <i className="ri-arrow-down-s-fill"></i>
                              </a>
                              <div className="iq-sub-dropdown iq-user-dropdown">
                                  <div className="iq-card shadow-none m-0">
                                      <div className="iq-card-body p-0 ">
                                          <div className="bg-primary p-3 line-height">
                                              <h5 className="mb-0 text-white line-height">Hello Bni Cyst</h5>
                                              <span className="text-white font-size-12">Available</span>
                                          </div>
                                          <a href="profile.html" className="iq-sub-card iq-bg-primary-hover">
                                              <div className="media align-items-center">
                                                  <div className="rounded iq-card-icon iq-bg-primary">
                                                      <i className="ri-file-user-line"></i>
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">My Profile</h6>
                                                      <p className="mb-0 font-size-12">View personal profile details.</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="profile-edit.html" className="iq-sub-card iq-bg-warning-hover">
                                              <div className="media align-items-center">
                                                  <div className="rounded iq-card-icon iq-bg-warning">
                                                      <i className="ri-profile-line"></i>
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Edit Profile</h6>
                                                      <p className="mb-0 font-size-12">Modify your personal details.</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="account-setting.html" className="iq-sub-card iq-bg-info-hover">
                                              <div className="media align-items-center">
                                                  <div className="rounded iq-card-icon iq-bg-info">
                                                      <i className="ri-account-box-line"></i>
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Account settings</h6>
                                                      <p className="mb-0 font-size-12">Manage your account parameters.</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <a href="privacy-setting.html" className="iq-sub-card iq-bg-danger-hover">
                                              <div className="media align-items-center">
                                                  <div className="rounded iq-card-icon iq-bg-danger">
                                                      <i className="ri-lock-line"></i>
                                                  </div>
                                                  <div className="media-body ml-3">
                                                      <h6 className="mb-0 ">Privacy Settings</h6>
                                                      <p className="mb-0 font-size-12">Control your privacy parameters.</p>
                                                  </div>
                                              </div>
                                          </a>
                                          <div className="d-inline-block w-100 text-center p-3">
                                              <a className="bg-primary iq-sign-btn" href="sign-in.html" role="button">Sign out<i className="ri-login-box-line ml-2"></i></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
              </nav>
          </div>
      </div>
  )
}

export default Header
