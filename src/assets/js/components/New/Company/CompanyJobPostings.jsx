import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../../../api/getUser'; // Adjust path if necessary

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
`;

const Card = styled.div`
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
`;

const CardTitle = styled.h3`
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #0056b3;
    font-weight: 600;
`;

const CardInfo = styled.p`
    margin-bottom: 0.75rem;
    color: #555;
    line-height: 1.6;

    strong {
        color: #333;
    }
`;

const CardContent = styled.div`
    flex-grow: 1;
`;

const ButtonGroup = styled.div`
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
`;

const CompanyJobPostings = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [message, setMessage] = useState('');

    const fetchJobPostings = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/company/job-postings', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setJobPostings(response.data);
        } catch (err) {
            console.error('Error fetching job postings:', err);
            setError(err.response?.data?.message || 'Failed to fetch job postings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobPostings();
    }, []);

    const handleEdit = (posting) => {
        setEditingId(posting.id);
        setEditForm({ ...posting });
        setMessage('');
        setError('');
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await axios.put(`/api/job-postings/${editingId}`, editForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEditingId(null);
            setEditForm({});
            setMessage('Job posting updated successfully!');
            fetchJobPostings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update job posting.');
        }
    };

    const handleActivate = async (id) => {
        setMessage('');
        setError('');
        try {
            await axios.put(`/api/job-postings/${id}`, { status: 'active' }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Job posting reactivated.');
            fetchJobPostings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reactivate job posting.');
        }
    };

    const handleDeactivate = async (id) => {
        setMessage('');
        setError('');
        try {
            await axios.put(`/api/job-postings/${id}`, { status: 'closed' }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Job posting deactivated.');
            fetchJobPostings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to deactivate job posting.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) return;
        setMessage('');
        setError('');
        try {
            await axios.delete(`/api/job-postings/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Job posting deleted.');
            fetchJobPostings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete job posting.');
        }
    };

    return (
        <div className="company-job-postings-container">
            <h2>Your Job Postings</h2>
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Grid>
                    {jobPostings.map((posting) => (
                        <Card key={posting.id}>
                            {editingId === posting.id ? (
                                <form onSubmit={handleEditSubmit} className="edit-job-posting-form">
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input type="text" name="title" value={editForm.title || ''} onChange={handleEditChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Requirements:</label>
                                        <textarea name="requirements" value={editForm.requirements || ''} onChange={handleEditChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Location:</label>
                                        <input type="text" name="location" value={editForm.location || ''} onChange={handleEditChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Type:</label>
                                        <select name="type" value={editForm.type || ''} onChange={handleEditChange} required>
                                            <option value="internship">Internship</option>
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Application Deadline:</label>
                                        <input type="date" name="application_deadline" value={editForm.application_deadline ? editForm.application_deadline.slice(0,10) : ''} onChange={handleEditChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <select name="status" value={editForm.status || ''} onChange={handleEditChange} required>
                                            <option value="active">Active</option>
                                            <option value="closed">Closed</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                    <ButtonGroup>
                                        <button type="submit" className="btn btn-edit">Save</button>
                                        <button type="button" className="btn btn-delete" onClick={() => setEditingId(null)}>Cancel</button>
                                    </ButtonGroup>
                                </form>
                            ) : (
                                <>
                                    <CardContent>
                                        <CardTitle>{posting.title}</CardTitle>
                                        <CardInfo><strong>Type:</strong> {posting.type}</CardInfo>
                                        <CardInfo><strong>Location:</strong> {posting.location}</CardInfo>
                                        <CardInfo><strong>Deadline:</strong> {new Date(posting.application_deadline).toLocaleDateString()}</CardInfo>
                                        <CardInfo><strong>Status:</strong> {posting.status}</CardInfo>
                                    </CardContent>
                                    <ButtonGroup>
                                        <button className="btn btn-edit" onClick={() => handleEdit(posting)}>Edit</button>
                                        {posting.status === 'active' ? (
                                            <button className="btn btn-deactivate" onClick={() => handleDeactivate(posting.id)}>Deactivate</button>
                                        ) : (
                                            <button className="btn btn-activate" onClick={() => handleActivate(posting.id)}>Reactivate</button>
                                        )}
                                        <button className="btn btn-delete" onClick={() => handleDelete(posting.id)}>Delete</button>
                                    </ButtonGroup>
                                </>
                            )}
                        </Card>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default CompanyJobPostings;