import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

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
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
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

const MembersIcon = styled.svg`
    width: 20px;
    height: 20px;
    color: #2563eb;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: #666;
`;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: #dc3545;
    text-align: center;
`;

const MembersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const MemberItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    transition: all 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const MemberAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e0e0e0;
`;

const DefaultAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-weight: 500;
    font-size: 14px;
`;

const MemberInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const MemberName = styled.div`
    font-weight: 500;
    color: #1a1a1a;
    font-size: 14px;
`;

const MemberEmail = styled.div`
    color: #666;
    font-size: 12px;
`;

const MemberRole = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const RoleBadge = styled.span`
    background-color: ${props => props.isCreator ? '#2563eb' : '#6c757d'};
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
`;

const JoinedDate = styled.div`
    color: #888;
    font-size: 11px;
`;

const RemoveButton = styled.button`
    background: none;
    border: 1px solid #dc3545;
    color: #dc3545;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        background-color: #dc3545;
        color: white;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
`;

const MemberCount = styled.div`
    margin-bottom: 16px;
    color: #666;
    font-size: 14px;
`;

const ConfirmRemoveModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    padding: 20px;
`;

const ConfirmContent = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ConfirmTitle = styled.h3`
    margin: 0 0 16px 0;
    color: #1a1a1a;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ConfirmMessage = styled.p`
    margin: 0 0 24px 0;
    color: #4a4a4a;
    line-height: 1.5;
`;

const ConfirmActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const ConfirmButton = styled.button`
    padding: 8px 16px;
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
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const AddMemberSection = styled.div`
    border-top: 1px solid #e0e0e0;
    padding-top: 16px;
    margin-top: 16px;
`;

const AddMemberButton = styled.button`
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;

    &:hover {
        background: #1d4ed8;
    }
`;

const SearchContainer = styled.div`
    margin-top: 16px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;

    &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    &::placeholder {
        color: #999;
    }
`;

const SearchResults = styled.div`
    max-height: 300px;
    overflow-y: auto;
    margin-top: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    background: white;
`;

const SearchResultItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.2s;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f8f9fa;
    }
`;

const UserInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const UserName = styled.div`
    font-weight: 500;
    color: #1a1a1a;
    font-size: 14px;
`;

const UserEmail = styled.div`
    color: #666;
    font-size: 12px;
`;

const AddButton = styled.button`
    background: #10b981;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        background: #059669;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: #94a3b8;
    }
`;

const NoResults = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
    font-size: 14px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    margin-bottom: 16px;
    transition: all 0.2s;

    &:hover {
        color: #2563eb;
        background-color: #f0f4ff;
    }
`;

function GroupMembersModal({ group, onClose, onRemoveMember }) {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removingMemberId, setRemovingMemberId] = useState(null);
    const [showConfirmRemove, setShowConfirmRemove] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [addingMemberId, setAddingMemberId] = useState(null);
    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        fetchMembers();
    }, [group.id]);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const timeoutId = setTimeout(() => {
                searchUsers();
            }, 300);
            return () => clearTimeout(timeoutId);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const fetchMembers = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const axios = (await import('../../../api/getUser')).default;
            const response = await axios.get(`/api/groups/${group.id}/members`);
            
            if (response.data.success) {
                setMembers(response.data.data.data || []);
            } else {
                throw new Error(response.data.message || 'Failed to fetch members');
            }
        } catch (err) {
            console.error('Error fetching group members:', err);
            setError(err.response?.data?.message || err.message || 'Failed to load group members');
        } finally {
            setIsLoading(false);
        }
    };

    const searchUsers = async () => {
        if (!searchTerm.trim()) return;
        
        setIsSearching(true);
        try {
            const axios = (await import('../../../api/getUser')).default;
            const response = await axios.get(`/api/users/search?search=${encodeURIComponent(searchTerm)}`);
            
            if (response.data.status === 'success') {
                // Filter out users who are already members
                const memberIds = new Set(members.map(m => m.id));
                const filteredUsers = response.data.data.filter(user => !memberIds.has(user.id));
                setSearchResults(filteredUsers);
            } else {
                setSearchResults([]);
            }
        } catch (err) {
            console.error('Error searching users:', err);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddMember = async (userId) => {
        setAddingMemberId(userId);
        
        try {
            const axios = (await import('../../../api/getUser')).default;
            const response = await axios.post(`/api/groups/${group.id}/members`, {
                user_id: userId,
                role: 'member'
            });
            
            if (response.data.success) {
                // Refetch members to update the list and count
                await fetchMembers();
                
                // Show success animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #10b981;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 1100;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    animation: slideIn 0.3s ease-out;
                `;
                
                successMessage.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Member added successfully!
                `;
                
                document.body.appendChild(successMessage);
                
                // Remove user from search results
                setSearchResults(prev => prev.filter(user => user.id !== userId));
                
                // Close the modal after a short delay
                setTimeout(() => {
                    // Animate out the success message
                    successMessage.style.animation = 'fadeOut 0.3s ease-out forwards';
                    
                    // Close the modal after animation completes
                    setTimeout(() => {
                        onClose();
                    }, 300);
                    
                    // Clean up the success message
                    setTimeout(() => {
                        if (document.body.contains(successMessage)) {
                            document.body.removeChild(successMessage);
                        }
                    }, 1000);
                }, 1000);
                
                // Add CSS for animations
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes slideIn {
                        from { transform: translate(-50%, -30px); opacity: 0; }
                        to { transform: translate(-50%, 0); opacity: 1; }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; transform: translate(-50%, 0); }
                        to { opacity: 0; transform: translate(-50%, -30px); }
                    }
                `;
                document.head.appendChild(style);
                
                // Clean up style element after use
                setTimeout(() => {
                    if (document.head.contains(style)) {
                        document.head.removeChild(style);
                    }
                }, 2000);
            } else {
                throw new Error(response.data.message || 'Failed to add member');
            }
        } catch (error) {
            console.error('Error adding member:', error);
            // Show error toast
            const toast = document.createElement('div');
            toast.className = 'error-toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #ef4444;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1100;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: slideIn 0.3s ease-out;
            `;
            
            toast.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                ${error.response?.data?.message || error.message || 'Failed to add member'}
            `;
            
            document.body.appendChild(toast);
            
            // Remove toast after delay
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    toast.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        if (document.body.contains(toast)) {
                            document.body.removeChild(toast);
                        }
                    }, 300);
                }
            }, 3000);
        } finally {
            setAddingMemberId(null);
        }
    };

    const handleRemoveClick = (member) => {
        setMemberToRemove(member);
        setShowConfirmRemove(true);
    };

    const handleConfirmRemove = async () => {
        if (!memberToRemove || !onRemoveMember) return;

        setRemovingMemberId(memberToRemove.id);
        
        try {
            await onRemoveMember(group.id, memberToRemove.id);
            setMembers(prev => prev.filter(m => m.id !== memberToRemove.id));
            setShowConfirmRemove(false);
            setMemberToRemove(null);
        } catch (error) {
            console.error('Error removing member:', error);
        } finally {
            setRemovingMemberId(null);
        }
    };

    const handleCancelRemove = () => {
        setShowConfirmRemove(false);
        setMemberToRemove(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isGroupCreator = group.created_by === currentUser?.id;

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatJoinDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return '';
        }
    };

    const getUserAvatarUrl = (avatar) => {
        if (!avatar) return null;
        
        if (avatar.startsWith('http')) {
            return avatar;
        }
        
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const normalizedBackend = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
        let cleanPath = String(avatar)
            .replace(/^public\//, '')
            .replace(/\\/g, '/')
            .replace(/^\/+/, '');
        
        return `${normalizedBackend}/storage/${cleanPath}`;
    };

    const getUserAvatarFromSearch = (avatarUrl) => {
        if (!avatarUrl || avatarUrl === '/images/user/default.jpg') return null;
        
        if (avatarUrl.startsWith('http')) {
            return avatarUrl;
        }
        
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const normalizedBackend = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
        
        if (avatarUrl.startsWith('/storage/')) {
            return `${normalizedBackend}${avatarUrl}`;
        }
        
        return `${normalizedBackend}${avatarUrl}`;
    };

    return createPortal(
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>
                        <MembersIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </MembersIcon>
                        {showAddMember ? 'Add Group Members' : 'Group Members'}
                    </ModalTitle>
                    <CloseButton onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </CloseButton>
                </ModalHeader>

                {showAddMember ? (
                    <>
                        <BackButton onClick={() => setShowAddMember(false)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5"></path>
                                <path d="M12 19l-7-7 7-7"></path>
                            </svg>
                            Back to Members
                        </BackButton>
                        
                        <SearchContainer>
                            <SearchInput
                                type="text"
                                placeholder="Search users by name, email, or username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                            {isSearching && (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                    Searching...
                                </div>
                            )}
                            
                            {searchTerm.length >= 2 && !isSearching && (
                                <SearchResults>
                                    {searchResults.length > 0 ? (
                                        searchResults.map((user) => (
                                            <SearchResultItem key={user.id}>
                                                {user.avatar_url && user.avatar_url !== '/images/user/default.jpg' ? (
                                                    <MemberAvatar 
                                                        src={getUserAvatarFromSearch(user.avatar_url)} 
                                                        alt={user.name}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <DefaultAvatar style={{ display: (user.avatar_url && user.avatar_url !== '/images/user/default.jpg') ? 'none' : 'flex' }}>
                                                    {getInitials(user.name)}
                                                </DefaultAvatar>
                                                
                                                <UserInfo>
                                                    <UserName>{user.name}</UserName>
                                                    <UserEmail>{user.email}</UserEmail>
                                                    {user.username && (
                                                        <UserEmail>@{user.username}</UserEmail>
                                                    )}
                                                </UserInfo>
                                                
                                                <AddButton
                                                    onClick={() => handleAddMember(user.id)}
                                                    disabled={addingMemberId === user.id}
                                                >
                                                    {addingMemberId === user.id ? (
                                                        'Adding...'
                                                    ) : (
                                                        <>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                                                <line x1="23" y1="11" x2="17" y2="11"></line>
                                                            </svg>
                                                            Add
                                                        </>
                                                    )}
                                                </AddButton>
                                            </SearchResultItem>
                                        ))
                                    ) : (
                                        <NoResults>
                                            No users found matching "{searchTerm}"
                                        </NoResults>
                                    )}
                                </SearchResults>
                            )}
                            
                            {searchTerm.length > 0 && searchTerm.length < 2 && (
                                <NoResults>
                                    Type at least 2 characters to search
                                </NoResults>
                            )}
                        </SearchContainer>
                    </>
                ) : (
                    <>
                        {isLoading ? (
                            <LoadingContainer>
                                <div>Loading members...</div>
                            </LoadingContainer>
                        ) : error ? (
                            <ErrorContainer>
                                <div>{error}</div>
                            </ErrorContainer>
                        ) : members.length === 0 ? (
                            <EmptyState>
                                <div>No members found in this group.</div>
                            </EmptyState>
                        ) : (
                            <>
                                <MemberCount>
                                    {members.length} member{members.length !== 1 ? 's' : ''}
                                </MemberCount>
                                
                                <MembersList>
                                    {members.map((member) => (
                                        <MemberItem key={member.id}>
                                            {member.avatar ? (
                                                <MemberAvatar 
                                                    src={getUserAvatarUrl(member.avatar)} 
                                                    alt={member.name}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <DefaultAvatar style={{ display: member.avatar ? 'none' : 'flex' }}>
                                                {getInitials(member.name)}
                                            </DefaultAvatar>
                                            
                                            <MemberInfo>
                                                <MemberName>{member.name || 'Unknown User'}</MemberName>
                                                <MemberEmail>{member.email || ''}</MemberEmail>
                                                <MemberRole>
                                                    <RoleBadge isCreator={member.id === group.created_by}>
                                                        {member.id === group.created_by ? 'Creator' : 'Member'}
                                                    </RoleBadge>
                                                    {member.pivot?.created_at && (
                                                        <JoinedDate>
                                                            Joined {formatJoinDate(member.pivot.created_at)}
                                                        </JoinedDate>
                                                    )}
                                                </MemberRole>
                                            </MemberInfo>

                                            {isGroupCreator && member.id !== group.created_by && member.id !== currentUser?.id && (
                                                <RemoveButton
                                                    onClick={() => handleRemoveClick(member)}
                                                    disabled={removingMemberId === member.id}
                                                    title="Remove member from group"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M3 6h18"></path>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                    {removingMemberId === member.id ? 'Removing...' : 'Remove'}
                                                </RemoveButton>
                                            )}
                                        </MemberItem>
                                    ))}
                                </MembersList>
                            </>
                        )}

                        {isGroupCreator && (
                            <AddMemberSection>
                                <AddMemberButton onClick={() => setShowAddMember(true)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                    Add Members
                                </AddMemberButton>
                            </AddMemberSection>
                        )}
                    </>
                )}

                {showConfirmRemove && memberToRemove && (
                    <ConfirmRemoveModal onClick={handleCancelRemove}>
                        <ConfirmContent onClick={e => e.stopPropagation()}>
                            <ConfirmTitle>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#dc3545' }}>
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                Remove Member
                            </ConfirmTitle>
                            <ConfirmMessage>
                                Are you sure you want to remove <strong>{memberToRemove.name}</strong> from the group <strong>"{group.name}"</strong>? 
                                They will lose access to all group content and will need to be re-invited to rejoin.
                            </ConfirmMessage>
                            <ConfirmActions>
                                <ConfirmButton onClick={handleCancelRemove}>
                                    Cancel
                                </ConfirmButton>
                                <ConfirmButton danger onClick={handleConfirmRemove} disabled={removingMemberId === memberToRemove.id}>
                                    {removingMemberId === memberToRemove.id ? 'Removing...' : 'Remove Member'}
                                </ConfirmButton>
                            </ConfirmActions>
                        </ConfirmContent>
                    </ConfirmRemoveModal>
                )}
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
}

export default GroupMembersModal;