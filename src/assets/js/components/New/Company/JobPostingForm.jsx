import React, { useState } from 'react';
import axios from '../../../api/getUser' // Adjust path if necessary

const JobPostingForm = ({ onJobPostingCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        type: 'internship', // Default to internship
        application_deadline: '',
        status: 'active', // Default to active
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post('/api/job-postings', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Job posting created successfully!');
            setFormData({ // Clear form after successful submission
                title: '',
                description: '',
                requirements: '',
                location: '',
                type: 'internship',
                application_deadline: '',
                status: 'active',
            });
            if (onJobPostingCreated) {
                onJobPostingCreated(response.data);
            }
        } catch (err) {
            console.error('Error creating job posting:', err);
            setError(err.response?.data?.message || 'Failed to create job posting.');
        }
    };

    return (
        <div className="job-posting-form-container">
            <h2>Create New Job Posting</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="job-posting-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="requirements">Requirements:</label>
                    <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="internship">Internship</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="application_deadline">Application Deadline:</label>
                    <input
                        type="date"
                        id="application_deadline"
                        name="application_deadline"
                        value={formData.application_deadline}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <button type="submit">Create Job Posting</button>
            </form>
        </div>
    );
};

export default JobPostingForm; 