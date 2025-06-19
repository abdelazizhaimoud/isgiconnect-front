import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

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
    padding: 20px;
    backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    transform: scale(1);
    animation: modalAppear 0.2s ease-out;

    @keyframes modalAppear {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
    margin: 0;
    color: #1a1a1a;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: all 0.2s;

    &:hover {
        color: #333;
        background-color: #f0f0f0;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-weight: 500;
    color: #333;
    font-size: 14px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
`;

const TextArea = styled.textarea`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
`;

const CheckboxGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Checkbox = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`;

const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #333;
    cursor: pointer;
    user-select: none;

    &:has(input:disabled) {
        cursor: not-allowed;
        color: #999;
    }
`;

const ImageUploadSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const CurrentImage = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
`;

const ImagePreview = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ddd;
`;

const ImageInfo = styled.div`
    flex: 1;
`;

const ImageName = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

const ImageSize = styled.div`
    font-size: 12px;
    color: #666;
`;

const FileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: all 0.2s;

    &:hover {
        background-color: #e9ecef;
        border-color: #adb5bd;
    }
`;

const RemoveImageButton = styled.button`
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 12px;
    transition: all 0.2s;

    &:hover {
        background-color: #f8d7da;
    }
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid ${props => props.primary ? '#2563eb' : '#e0e0e0'};
    background-color: ${props => props.primary ? '#2563eb' : 'white'};
    color: ${props => props.primary ? 'white' : '#333'};
    font-size: 14px;

    &:hover {
        ${props => props.primary ? 
            'background-color: #1d4ed8;' : 
            'background-color: #f5f5f5;'
        }
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
`;

const EditIcon = styled.svg`
    width: 20px;
    height: 20px;
    color: #2563eb;
`;

function EditGroupModal({ group, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: group.name || '',
        description: group.description || '',
        is_private: group.is_private || false,
        avatar: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentAvatar, setCurrentAvatar] = useState(group.avatar);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [removeCurrentAvatar, setRemoveCurrentAvatar] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    avatar: 'Please select a valid image file'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    avatar: 'Image size must be less than 5MB'
                }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                avatar: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target.result);
            };
            reader.readAsDataURL(file);

            // Clear errors
            setErrors(prev => ({
                ...prev,
                avatar: ''
            }));
            
            setRemoveCurrentAvatar(false);
        }
    };

    const handleRemoveCurrentAvatar = () => {
        setRemoveCurrentAvatar(true);
        setCurrentAvatar(null);
        setAvatarPreview(null);
        setFormData(prev => ({
            ...prev,
            avatar: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveNewAvatar = () => {
        setFormData(prev => ({
            ...prev,
            avatar: null
        }));
        setAvatarPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setErrors(prev => ({
            ...prev,
            avatar: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Group name is required';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Group name must be at least 3 characters';
        }

        if (formData.description.trim().length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const submitData = {
                ...formData,
                removeCurrentAvatar
            };
            
            await onSubmit(group.id, submitData);
            onClose();
        } catch (error) {
            console.error('Error updating group:', error);
            setErrors({
                submit: error.message || 'Failed to update group'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Construct current avatar URL
    const getCurrentAvatarUrl = () => {
        if (!currentAvatar) return null;
        
        if (currentAvatar.startsWith('http')) {
            return currentAvatar;
        }
        
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const normalizedBackend = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
        let cleanPath = String(currentAvatar)
            .replace(/^public\//, '')
            .replace(/\\/g, '/')
            .replace(/^\/+/, '');
        
        return `${normalizedBackend}/storage/${cleanPath}`;
    };

    return createPortal(
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>
                        <EditIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </EditIcon>
                        Edit Group
                    </ModalTitle>
                    <CloseButton onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Group Name *</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            placeholder="Enter group name"
                        />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <TextArea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            placeholder="Enter group description (optional)"
                        />
                        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <ImageUploadSection>
                            <Label>Group Avatar</Label>
                            
                            {/* Current Avatar Display */}
                            {currentAvatar && !removeCurrentAvatar && (
                                <CurrentImage>
                                    <ImagePreview src={getCurrentAvatarUrl()} alt="Current avatar" />
                                    <ImageInfo>
                                        <ImageName>Current Avatar</ImageName>
                                        <ImageSize>Click "Change Avatar" to update</ImageSize>
                                    </ImageInfo>
                                    <RemoveImageButton 
                                        type="button" 
                                        onClick={handleRemoveCurrentAvatar}
                                        disabled={isSubmitting}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                        Remove
                                    </RemoveImageButton>
                                </CurrentImage>
                            )}

                            {/* New Avatar Preview */}
                            {avatarPreview && (
                                <CurrentImage>
                                    <ImagePreview src={avatarPreview} alt="New avatar preview" />
                                    <ImageInfo>
                                        <ImageName>New Avatar</ImageName>
                                        <ImageSize>{formData.avatar?.name} ({(formData.avatar?.size / 1024 / 1024).toFixed(2)} MB)</ImageSize>
                                    </ImageInfo>
                                    <RemoveImageButton 
                                        type="button" 
                                        onClick={handleRemoveNewAvatar}
                                        disabled={isSubmitting}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                        Remove
                                    </RemoveImageButton>
                                </CurrentImage>
                            )}

                            {/* File Upload */}
                            <FileInput
                                type="file"
                                id="avatar"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isSubmitting}
                            />
                            <FileInputLabel htmlFor="avatar">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21,15 16,10 5,21"></polyline>
                                </svg>
                                {currentAvatar && !removeCurrentAvatar ? 'Change Avatar' : 'Choose Avatar'}
                            </FileInputLabel>
                            {errors.avatar && <ErrorMessage>{errors.avatar}</ErrorMessage>}
                        </ImageUploadSection>
                    </FormGroup>

                    <FormGroup>
                        <CheckboxGroup>
                            <Checkbox
                                type="checkbox"
                                id="is_private"
                                name="is_private"
                                checked={formData.is_private}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                            />
                            <CheckboxLabel htmlFor="is_private">
                                Make this group private
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>

                    {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

                    <ModalActions>
                        <Button type="button" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" primary disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Group'}
                        </Button>
                    </ModalActions>
                </Form>
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
}

export default EditGroupModal;