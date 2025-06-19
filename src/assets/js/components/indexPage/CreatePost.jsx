import React, { useState, useRef } from 'react'
import axios from '../../api/getUser'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreatePost({ onPostCreated }) {
    const [globalState, setGlobalState] = useState({
        content: '',
        image: null
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fileInputRef = useRef(null)
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setGlobalState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setGlobalState(prevState => ({
                ...prevState,
                image: e.target.files[0]
            }))
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form submitted', globalState)
        
        if (!globalState.content.trim()) {
            console.log('No content provided')
            toast.error('Please enter some content for your post')
            return
        }
        
        setIsSubmitting(true)
        console.log('Submitting form...')
        
        try {
            const formData = new FormData()
            formData.append('content', globalState.content)
            if (globalState.image) {
                formData.append('image', globalState.image)
                console.log('Image attached:', globalState.image.name)
            }
            
            console.log('Sending request to /api/posts...')
            const response = await axios.post('/posts', formData)
            
            console.log('Response received:', response)
            toast.success('Post created successfully!')
            
            // Reset form
            setGlobalState({ content: '', image: null })
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            
            // Notify parent component about the new post
            if (onPostCreated) {
                onPostCreated(response.data.data)
            }
            
        } catch (error) {
            console.error('Error creating post:', error)
            console.error('Error response:', error.response)
            const errorMessage = error.response?.data?.message || 'Failed to create post. Please try again.'
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
            console.log('Form submission finished')
        }
    }
    
    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }
  return (
    <>
            <div className="col-sm-12">
                <div id="post-modal-data" className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                        <h4 className="card-title">Create Post</h4>
                    </div>
                </div>
                <div className="iq-card-body" data-toggle="modal" data-target="#post-modal">
                    <div className="d-flex align-items-center">
                        <div className="user-img">
                            <img src="/images/user/1.jpg" alt="userimg" className="avatar-60 rounded-circle" />
                        </div>
                        <form className="post-text ml-3 w-100" onSubmit={(e) => {
                            console.log('Form submit event triggered')
                            handleSubmit(e)
                        }}>
                            <textarea 
                                name='content' 
                                className="form-control rounded" 
                                onChange={handleChange} 
                                value={globalState.content || ''} 
                                placeholder="What's on your mind?" 
                                style={{border:'none', resize: 'none', minHeight: '50px'}}
                                disabled={isSubmitting}
                            />
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange} 
                                className="d-none" 
                                accept="image/*"
                            />
                            {globalState.image && (
                                <div className="mt-2">
                                    <img 
                                        src={URL.createObjectURL(globalState.image)} 
                                        alt="Preview" 
                                        style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '8px'}}
                                    />
                                    <button 
                                        type="button" 
                                        className="btn btn-sm btn-link text-danger"
                                        onClick={() => setGlobalState(prev => ({ ...prev, image: null }))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="post-opt-block d-flex align-items-center list-inline m-0 p-0">
                        <li className="iq-bg-primary rounded p-2 pointer mr-3" onClick={triggerFileInput}>
                            <a href="#"></a>
                            <img src="/images/small/07.png" alt="icon" className="img-fluid" />
                            {globalState.image ? 'Change Photo' : 'Photo/Video'}
                        </li>
                        <li className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/08.png" alt="icon" className="img-fluid" /> Tag Friend</li>
                        <li className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/09.png" alt="icon" className="img-fluid" /> Feeling/Activity</li>
                        <li className="iq-bg-primary rounded p-2 pointer">
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                            <div className="dropdown">
                                <span className="dropdown-toggle" id="post-option" data-toggle="dropdown">
                                <i className="ri-more-fill"></i>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="post-option">
                                    <a className="dropdown-item" href="#">Check in</a>
                                    <a className="dropdown-item" href="#">Live Video</a>
                                    <a className="dropdown-item" href="#">Gif</a>
                                    <a className="dropdown-item" href="#">Watch Party</a>
                                    <a className="dropdown-item" href="#">Play with Friend</a>
                                </div>
                            </div>
                            </div>
                        </li>
                    </ul>
                        <button 
                            type="submit"
                            className="btn btn-primary rounded"
                            disabled={isSubmitting || !globalState.content.trim()}
                            onClick={(e) => {
                                console.log('Button click handler')
                                // Let the form's onSubmit handle the submission
                            }}
                        >
                            {isSubmitting ? 'Posting...' : 'Create Post'}
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="post-modal" tabindex="-1" role="dialog" aria-labelledby="post-modalLabel" aria-hidden="true" style={{display:'none'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="post-modalLabel">Create Post</h5>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill"></i></button>
                            </div>
                            <div className="modal-body">
                            <div className="d-flex align-items-center">
                                <div className="user-img">post-text
                                    <img src="/images/user/1.jpg" alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                </div>
                                <form className="post-text ml-3 w-100" action="javascript:void();">
                                    <input type="text" className="form-control rounded" placeholder="Write something here..." style={{border:'none'}}/>
                                </form>
                            </div>
                            <hr></hr>
                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/07.png" alt="icon" className="img-fluid" /> Photo/Video</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/08.png" alt="icon" className="img-fluid" /> Tag Friend</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/09.png" alt="icon" className="img-fluid" /> Feeling/Activity</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/10.png" alt="icon" className="img-fluid" /> Check in</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/11.png" alt="icon" className="img-fluid" /> Live Video</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/12.png" alt="icon" className="img-fluid" /> Gif</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/13.png" alt="icon" className="img-fluid" /> Watch Party</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="#"></a><img src="/images/small/14.png" alt="icon" className="img-fluid" /> Play with Friends</div>
                                </li>
                            </ul>
                            <hr></hr>
                            <div className="other-option">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="user-img mr-3">
                                        <img src="/images/user/1.jpg" alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                        </div>
                                        <h6>Your Story</h6>
                                    </div>
                                    <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                        <span className="btn btn-primary">Friend</span>
                                        </span>
                                        <div className="dropdown-menu m-0 p-0">
                                            <a className="dropdown-item p-3" href="#">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="ri-save-line"></i></div>
                                                    <div className="data ml-2">
                                                    <h6>Public</h6>
                                                    <p className="mb-0">Anyone on or off Facebook</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item p-3" href="#">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="ri-close-circle-line"></i></div>
                                                    <div className="data ml-2">
                                                    <h6>Friends</h6>
                                                    <p className="mb-0">Your Friend on facebook</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item p-3" href="#">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="ri-user-unfollow-line"></i></div>
                                                    <div className="data ml-2">
                                                    <h6>Friends except</h6>
                                                    <p className="mb-0">Don't show to some friends</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item p-3" href="#">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="ri-notification-line"></i></div>
                                                    <div className="data ml-2">
                                                    <h6>Only Me</h6>
                                                    <p className="mb-0">Only me</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary d-block w-100 mt-3">Post</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default CreatePost
