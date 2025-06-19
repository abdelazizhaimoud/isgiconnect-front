import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import EditGroupModal from './EditGroupModal';
import GroupMembersModal from './GroupMembersModal';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    height: 100%;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const Avatar = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const Content = styled.div`
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
`;

const PostName = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
        color: #2563eb;
        background-color: #f0f4ff;
    }
`;

const Title = styled.h3`
    margin: 0 0 10px 0;
    color: #333;
    font-size: 18px;
`;

const Description = styled.p`
    color: #666;
    margin: 0 0 15px 0;
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #f8f9fa;
    border-top: 1px solid #eee;
`;

const MemberCount = styled.button`
    background: none;
    border: none;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        color: #2563eb;
        background-color: #f0f4ff;
    }
`;

const ActionButton = styled.button`
    background: ${props => props.variant === 'danger' ? 'none' : '#2563eb'};
    color: ${props => props.variant === 'danger' ? '#dc3545' : 'white'};
    border: 1px solid ${props => props.variant === 'danger' ? '#dc3545' : '#2563eb'};
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;

    &:hover {
        background-color: ${props => props.variant === 'danger' ? '#dc3545' : '#1d4ed8'};
        color: white;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

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
    max-width: 400px;
    width: 100%;
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

const ModalTitle = styled.h3`
    margin: 0 0 16px 0;
    color: #1a1a1a;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ModalMessage = styled.p`
    margin: 0 0 24px 0;
    color: #4a4a4a;
    line-height: 1.5;
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const Button = styled.button`
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid ${props => props.danger ? '#dc3545' : '#e0e0e0'};
    background-color: ${props => props.danger ? '#dc3545' : 'white'};
    color: ${props => props.danger ? 'white' : '#333'};
    font-size: 14px;

    &:hover {
        opacity: 0.9;
        ${props => !props.danger && 'background-color: #f5f5f5;'}
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

const PrivateBadge = styled.span`
    background-color: #6c757d;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    margin-left: 8px;
`;

const WarningIcon = styled.svg`
    width: 20px;
    height: 20px;
    color: #dc3545;
`;

const LeaveIcon = styled.svg`
    width: 20px;
    height: 20px;
    color: #f59e0b;
`;

function GroupCard({ group, onDelete, onJoin, onLeave, onEdit, onRemoveMember, isMember = false, isCreator = false }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isCurrentMember, setIsCurrentMember] = useState(isMember);
    const [isGroupCreator, setIsGroupCreator] = useState(isCreator);
    const imgRef = useRef(null);

    useEffect(() => {
        // Only set the avatar URL if we have an avatar and no error yet
        if (group.avatar && !hasError) {
            try {
                // If avatar is already a full URL, use it directly
                if (group.avatar.startsWith('http')) {
                    setAvatarUrl(group.avatar);
                    return;
                }
                
                // For relative paths, construct the full URL
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
                const normalizedBackend = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
                
                // Clean up the path
                let cleanPath = String(group.avatar)
                    .replace(/^public\//, '') // Remove 'public/' prefix if present
                    .replace(/\\/g, '/')      // Convert backslashes to forward slashes
                    .replace(/^\/+/, '');      // Remove leading slashes
                
                const fullUrl = `${normalizedBackend}/storage/${cleanPath}`;
                console.log('Loading avatar from:', fullUrl);
                setAvatarUrl(fullUrl);
            } catch (error) {
                console.error('Error constructing avatar URL:', error);
                setHasError(true);
                setAvatarUrl('/default-group-avatar.png');
            }
        } else {
            setAvatarUrl('/default-group-avatar.png');
        }
    }, [group.avatar, hasError]);

    const handleImageError = (e) => {
        console.error('Error loading image:', {
            currentSrc: e?.target?.currentSrc,
            error: e,
            avatar: group.avatar,
            hasError
        });
        
        if (!hasError) {
            setHasError(true);
            setAvatarUrl('/default-group-avatar.png');
        }
    };
    
    const handleImageLoad = (e) => {
        console.log('Image loaded successfully:', {
            currentSrc: e?.target?.currentSrc,
            naturalWidth: e?.target?.naturalWidth,
            naturalHeight: e?.target?.naturalHeight
        });
        
        // If image has 0 dimensions, treat as error
        if (e?.target?.naturalWidth === 0) {
            console.log('Image has 0 dimensions, treating as error');
            handleImageError(e);
        }
    };

    const handleClick = () => {
        if (!event.target.closest('button')) {
            navigate(`/groups/${group.id}`);
        }
    };

    const handleJoin = async (e) => {
        e.stopPropagation();
        if (!onJoin) return;
        
        setIsJoining(true);
        try {
            await onJoin(group.id);
            setIsCurrentMember(true);
        } catch (error) {
            console.error('Error joining group:', error);
        } finally {
            setIsJoining(false);
        }
    };

    const handleLeaveClick = (e) => {
        console.log('1. Leave button clicked');
        e.stopPropagation();
        setShowLeaveModal(true);
    };

    const handleLeave = async () => {
        console.log('2. Confirming leave group');
        
        if (!onLeave) {
            console.error('Error: onLeave prop is not defined');
            return;
        }
        
        console.log('3. onLeave handler exists, proceeding with leave');
        setIsLeaving(true);
        
        try {
            console.log('4. Calling onLeave handler with group id:', group.id);
            await onLeave(group.id);
            console.log('6. onLeave handler completed successfully');
            setIsCurrentMember(false);
            setShowLeaveModal(false);
            console.log('7. isCurrentMember state set to false, modal closed');
        } catch (error) {
            console.error('8. Error in handleLeave:', {
                error: error,
                message: error.message,
                response: error.response
            });
        } finally {
            console.log('9. Final cleanup - setting isLeaving to false');
            setIsLeaving(false);
        }
    };
    
    const handleEdit = (e) => {
        e.stopPropagation();
        setShowEditModal(true);
    };

    const handleEditSubmit = async (groupId, editData) => {
        if (onEdit) {
            await onEdit(groupId, editData);
        }
    };

    const handleMembersClick = (e) => {
        e.stopPropagation();
        setShowMembersModal(true);
    };

    const handleRemoveMemberSubmit = async (groupId, memberId) => {
        if (onRemoveMember) {
            await onRemoveMember(groupId, memberId);
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        onDelete(group.id);
        setShowDeleteModal(false);
    };

    const cancelDelete = (e) => {
        e?.stopPropagation();
        setShowDeleteModal(false);
    };

    const cancelLeave = (e) => {
        e?.stopPropagation();
        setShowLeaveModal(false);
    };

    return (
        <Card onClick={handleClick}>
            <Avatar
                ref={imgRef}
                src={avatarUrl}
                alt={group.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
            />
            <Content>
                <Header>
                    <PostName>{group.name}</PostName>
                </Header>
                {group.is_private === true && <PrivateBadge>Private</PrivateBadge>}
                <Description>{group.description || 'No description provided.'}</Description>
            </Content>
            <Footer>
                <MemberCount onClick={handleMembersClick} title="View group members">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {group.members?.length || group.members_count || 0} member{((group.members?.length || group.members_count || 0) !== 1) ? 's' : ''}
                </MemberCount>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {/* For group creator - show edit and delete */}
                    {isGroupCreator ? (
                        <>
                            <ActionButton
                                onClick={handleEdit}
                                title="Edit group"
                                style={{ marginRight: '8px' }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit
                            </ActionButton>
                            <ActionButton
                                variant="danger"
                                onClick={handleDeleteClick}
                                title="Delete group"
                                aria-label="Delete group"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                Delete
                            </ActionButton>
                        </>
                    ) : isCurrentMember ? (
                        // For group members - show leave button
                        <ActionButton
                            variant="danger"
                            onClick={handleLeaveClick}
                            disabled={isLeaving}
                            title="Leave group"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            {isLeaving ? 'Leaving...' : 'Leave'}
                        </ActionButton>
                    ) : onJoin ? (
                        // For non-members viewing public groups - show join button
                        <ActionButton
                            onClick={handleJoin}
                            disabled={isJoining}
                            title="Join group"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            {isJoining ? 'Joining...' : 'Join Group'}
                        </ActionButton>
                    ) : null}
                </div>

                {/* Group Members Modal */}
                {showMembersModal && (
                    <GroupMembersModal
                        group={group}
                        onClose={() => setShowMembersModal(false)}
                        onRemoveMember={handleRemoveMemberSubmit}
                    />
                )}

                {/* Edit Group Modal */}
                {showEditModal && (
                    <EditGroupModal
                        group={group}
                        onClose={() => setShowEditModal(false)}
                        onSubmit={handleEditSubmit}
                    />
                )}

                {/* Delete Group Modal */}
                {showDeleteModal && createPortal(
                    <ModalOverlay onClick={cancelDelete}>
                        <ModalContent onClick={e => e.stopPropagation()}>
                            <ModalTitle>
                                <WarningIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </WarningIcon>
                                Delete Group
                            </ModalTitle>
                            <ModalMessage>
                                Are you sure you want to delete the group <strong>"{group.name}"</strong>? 
                                This action cannot be undone and will remove all group content and members.
                            </ModalMessage>
                            <ModalActions>
                                <Button onClick={cancelDelete}>
                                    Cancel
                                </Button>
                                <Button danger onClick={confirmDelete}>
                                    Delete Group
                                </Button>
                            </ModalActions>
                        </ModalContent>
                    </ModalOverlay>,
                    document.body
                )}

                {/* Leave Group Modal */}
                {showLeaveModal && createPortal(
                    <ModalOverlay onClick={cancelLeave}>
                        <ModalContent onClick={e => e.stopPropagation()}>
                            <ModalTitle>
                                <LeaveIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </LeaveIcon>
                                Leave Group
                            </ModalTitle>
                            <ModalMessage>
                                Are you sure you want to leave <strong>"{group.name}"</strong>? 
                                You'll need to request to join again if you want to rejoin this group later.
                            </ModalMessage>
                            <ModalActions>
                                <Button onClick={cancelLeave}>
                                    Cancel
                                </Button>
                                <Button danger onClick={handleLeave} disabled={isLeaving}>
                                    {isLeaving ? 'Leaving...' : 'Leave Group'}
                                </Button>
                            </ModalActions>
                        </ModalContent>
                    </ModalOverlay>,
                    document.body
                )}
            </Footer>
        </Card>
    );
}

export default GroupCard;