import React, { useEffect, useState } from 'react';
import axios from '../../../api/getUser' // Adjust path if necessary


const CompanyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchApplications = async () => {
        try {
            const response = await axios.get('/api/applications', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setApplications(response.data);
        } catch (err) {
            console.error('Error fetching applications:', err);
            setError(err.response?.data?.message || 'Failed to fetch applications.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (applicationId, newStatus) => {
        setMessage('');
        setError('');
        try {
            await axios.put(`/api/applications/${applicationId}`, { status: newStatus }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Application status updated successfully!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            fetchApplications(); // Re-fetch applications to show updated status
        } catch (err) {
            console.error('Error updating application status:', err);
            setError(err.response?.data?.message || 'Failed to update application status.');
        }
    };

    if (loading) {
        return <p>Loading applications...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="company-applications-container">
            <h2>Applications for Your Job Postings</h2>
            {message && <p className="success-message">{message}</p>}
            {applications.length === 0 ? (
                <p>No applications received yet.</p>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => (
                        <div key={application.id} className="application-item">
                            <h3>Applicant: {application.student?.name || 'N/A'}</h3>
                            <p><strong>Job Posting:</strong> {application.job_posting?.title || 'N/A'}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                            <p>
                                <a href={`${axios.defaults.baseURL}/storage/${application.resume_path}`} target="_blank" rel="noopener noreferrer">
                                    View Resume
                                </a>
                                {application.cover_letter_path && (
                                    <> |
                                    <a href={`${axios.defaults.baseURL}/storage/${application.cover_letter_path}`} target="_blank" rel="noopener noreferrer">
                                        View Cover Letter
                                    </a>
                                    </>
                                )}
                            </p>
                            <div className="status-actions">
                                <label htmlFor={`status-${application.id}`}>Update Status:</label>
                                <select
                                    id={`status-${application.id}`}
                                    value={application.status}
                                    onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompanyApplications; 