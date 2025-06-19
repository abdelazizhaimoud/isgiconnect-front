import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    color: #333;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.label`
    font-weight: 500;
    color: #333;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    min-height: 100px;
    resize: vertical;
`;

const CheckboxGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const SubmitButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    opacity: ${props => props.disabled ? 0.6 : 1};
    transition: opacity 0.3s;

    &:hover {
        background-color: #45a049;
        opacity: ${props => props.disabled ? 0.6 : 0.9};
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.span`
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
`;

function CreateGroupModal({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        is_private: false,
        avatar: null
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const { name, description, avatar } = formData;
        
        // Name validation
        if (!name?.trim()) {
            newErrors.name = 'Group name is required';
        } else if (name.length < 3) {
            newErrors.name = 'Group name must be at least 3 characters';
        } else if (name.length > 50) {
            newErrors.name = 'Group name cannot exceed 50 characters';
        }
        
        // Description validation
        if (!description?.trim()) {
            newErrors.description = 'Description is required';
        } else if (description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        } else if (description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }
        
        // Avatar validation
        if (!avatar) {
            newErrors.avatar = 'Group avatar is required';
        } else {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validImageTypes.includes(avatar.type.toLowerCase())) {
                newErrors.avatar = 'Please upload a valid image (JPEG, PNG, GIF)';
            } else if (avatar.size > maxSize) {
                newErrors.avatar = 'Image size should not exceed 5MB';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the form errors before submitting');
            return;
        }
        
        try {
            setIsSubmitting(true);
            
            // Create form data with all fields
            const submitData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                is_private: formData.is_private || false,
                avatar: formData.avatar
            };
            
            await onSubmit(submitData);
        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.errors?.join('\n') || 
                              'Failed to create group. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Create New Group</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Group Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <TextArea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={errors.description ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="avatar">Group Avatar</Label>
                        <Input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleChange}
                            accept="image/jpeg, image/png, image/gif, image/jpg"
                            disabled={isSubmitting}
                            aria-invalid={!!errors.avatar}
                            aria-describedby={errors.avatar ? 'avatar-error' : undefined}
                        />
                        {errors.avatar && <ErrorMessage id="avatar-error">{errors.avatar}</ErrorMessage>}
                        {formData.avatar && (
                            <div style={{ marginTop: '10px', fontSize: '0.875rem' }}>
                                Selected file: {formData.avatar.name}
                            </div>
                        )}
                    </FormGroup>

                    <CheckboxGroup>
                        <Input
                            type="checkbox"
                            id="is_private"
                            name="is_private"
                            checked={formData.is_private || false}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            aria-checked={formData.is_private || false}
                        />
                        <Label htmlFor="is_private">Private Group</Label>
                    </CheckboxGroup>

                    <SubmitButton 
                        type="submit" 
                        disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Group'}
                    </SubmitButton>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}

export default CreateGroupModal; 