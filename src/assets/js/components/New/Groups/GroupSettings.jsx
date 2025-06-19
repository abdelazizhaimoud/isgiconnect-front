import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../api/getUser';
import { toast } from 'react-toastify';

const SettingsContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #4CAF50;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    min-height: 100px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #4CAF50;
    }
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
        background-color: #45a049;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const DangerZone = styled.div`
    margin-top: 40px;
    padding: 20px;
    border: 1px solid #ffebee;
    background-color: #fff5f5;
    border-radius: 4px;
`;

const DangerButton = styled(Button)`
    background-color: #f44336;

    &:hover {
        background-color: #d32f2f;
    }
`;

function GroupSettings() {
    const { groupId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        is_private: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await axios.get(`/api/users/groups/${groupId}`);
                if (response.data.success) {
                    const { name, description, is_private } = response.data.data;
                    setFormData({ name, description, is_private });
                } else {
                    throw new Error(response.data.message || 'Failed to fetch group');
                }
            } catch (error) {
                console.error('Error fetching group:', error);
                toast.error('Failed to load group settings');
            } finally {
                setLoading(false);
            }
        };

        if (groupId) {
            fetchGroup();
        }
    }, [groupId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const response = await axios.put(`/api/users/groups/${groupId}`, formData);
            if (response.data.success) {
                toast.success('Group updated successfully');
            } else {
                throw new Error(response.data.message || 'Failed to update group');
            }
        } catch (error) {
            console.error('Error updating group:', error);
            toast.error(error.response?.data?.message || 'Failed to update group');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
            return;
        }

        setDeleting(true);
        
        try {
            const response = await axios.delete(`/api/users/groups/${groupId}`);
            if (response.data.success) {
                toast.success('Group deleted successfully');
                // Redirect to groups list
                window.location.href = '/student/dashboard/group';
            } else {
                throw new Error(response.data.message || 'Failed to delete group');
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            toast.error(error.response?.data?.message || 'Failed to delete group');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <div>Loading settings...</div>;
    }

    return (
        <SettingsContainer>
            <h2>Group Settings</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Group Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <TextArea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>


                <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>

            <DangerZone>
                <h3>Danger Zone</h3>
                <p>Deleting a group is permanent and cannot be undone.</p>
                <DangerButton 
                    type="button" 
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? 'Deleting...' : 'Delete Group'}
                </DangerButton>
            </DangerZone>
        </SettingsContainer>
    );
}

export default GroupSettings;
