import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from '../../../api/getUser';
import CreateGroupModal from './CreateGroupModal';
import GroupCard from './GroupCard';
import Pagination from '../Content/Pagination';

const GroupsContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const CreateButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #45a049;
    }
`;

const GroupsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    color: #333;
    margin: 30px 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #eee;
`;

const Section = styled.div`
    margin-bottom: 30px;
`;

function Groups() {
    console.log('Groups component rendered');
    const [myGroups, setMyGroups] = useState([]);
    const [publicGroups, setPublicGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const currentUser = useSelector(state => state.user);
    
    console.log('Current user:', currentUser);

    useEffect(() => {
        fetchGroups();
    }, [currentPage]);

    const fetchGroups = async () => {
        if (!currentUser?.id) {
            console.log('No current user, cannot fetch groups');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            // Fetch user's groups
            const [myGroupsRes, publicGroupsRes] = await Promise.all([
                axios.get(`/api/users/${currentUser.id}/groups?page=${currentPage}`),
                axios.get('/api/groups')
            ]);
            
            if (myGroupsRes.data.success) {
                console.log('My groups data:', myGroupsRes.data.data);
                setMyGroups(myGroupsRes.data.data.data || []);
                setTotalPages(myGroupsRes.data.data.last_page || 1);
            }

            if (publicGroupsRes.data.success) {
                console.log('Public groups data:', publicGroupsRes.data.data);
                // Filter out groups that the user is already a member of
                const myGroupIds = new Set((myGroupsRes.data.data.data || []).map(g => g.id));
                const filteredPublicGroups = (publicGroupsRes.data.data.data || []).filter(
                    group => !myGroupIds.has(group.id)
                );
                setPublicGroups(filteredPublicGroups);
            }
        } catch (error) {
            console.error('Error in fetchGroups:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load groups';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateGroup = async (groupData) => {
        if (!currentUser?.id) {
            toast.error('You must be logged in to create a group');
            return;
        }

        try {
            const formData = new FormData();
            
            // Append all group data to formData
            Object.entries(groupData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    // For files, append directly
                    if (value instanceof File) {
                        formData.append(key, value);
                    } 
                    // Convert boolean values to proper boolean strings
                    else if (key === 'is_private') {
                        formData.append(key, value === true || value === 'true' ? '1' : '0');
                    }
                    // For other non-object values, append directly
                    else if (typeof value !== 'object') {
                        formData.append(key, value);
                    }
                    // For objects, stringify
                    else {
                        formData.append(key, JSON.stringify(value));
                    }
                }
            });

            console.log('Creating group with data:', Object.fromEntries(formData));
            
            const response = await axios.post('/api/groups', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });

            console.log('Create group response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to create group');
            }

            toast.success('Group created successfully');
            setShowCreateModal(false);
            fetchGroups(); // Refresh the groups list
        } catch (error) {
            console.error('Error creating group:', error);
            const errorMessage = error.response?.data?.message || 
                              (error.response?.data?.errors ? 
                               Object.values(error.response.data.errors).flat().join('\n') : 
                               error.message) || 
                              'Failed to create group';
            toast.error(errorMessage);
        }
    };

    const handleEditGroup = async (groupId, editData) => {
        try {
            const formData = new FormData();
            
            // Append all edit data to formData
            Object.entries(editData).forEach(([key, value]) => {
                if (key === 'removeCurrentAvatar') {
                    if (value) {
                        formData.append('remove_avatar', '1');
                    }
                } else if (value !== null && value !== undefined) {
                    // For files, append directly
                    if (value instanceof File) {
                        formData.append(key, value);
                    } 
                    // Convert boolean values to proper boolean strings
                    else if (key === 'is_private') {
                        formData.append(key, value === true || value === 'true' ? '1' : '0');
                    }
                    // For other non-object values, append directly
                    else if (typeof value !== 'object') {
                        formData.append(key, value);
                    }
                    // For objects, stringify
                    else {
                        formData.append(key, JSON.stringify(value));
                    }
                }
            });

            // Add method override for PUT request
            formData.append('_method', 'PUT');

            console.log('Updating group with data:', Object.fromEntries(formData));
            
            const response = await axios.post(`/api/groups/${groupId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });

            console.log('Update group response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update group');
            }

            toast.success('Group updated successfully');
            fetchGroups(); // Refresh the groups list
        } catch (error) {
            console.error('Error updating group:', error);
            const errorMessage = error.response?.data?.message || 
                              (error.response?.data?.errors ? 
                               Object.values(error.response.data.errors).flat().join('\n') : 
                               error.message) || 
                              'Failed to update group';
            toast.error(errorMessage);
            throw error; // Re-throw to let the modal handle it
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            const response = await axios.delete(`/api/groups/${groupId}`);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete group');
            }
            
            toast.success('Group deleted successfully');
            fetchGroups();
        } catch (error) {
            console.error('Error deleting group:', error);
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Failed to delete group';
            toast.error(errorMessage);
        }
    };

    const handleJoinGroup = async (groupId) => {
        if (isProcessing) return;
        
        setIsProcessing(true);
        try {
            const response = await axios.post(`/api/groups/${groupId}/members/join`);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to join group');
            }
            
            toast.success(response.data.message || 'Successfully joined the group');
            fetchGroups(); // Refresh the groups list
        } catch (error) {
            console.error('Error joining group:', error);
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Failed to join group';
            toast.error(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLeaveGroup = async (groupId) => {
        console.log('A. handleLeaveGroup called with groupId:', groupId);
        
        if (isProcessing) {
            console.log('B. Already processing, skipping');
            return;
        }
        
        console.log('C. Setting isProcessing to true');
        setIsProcessing(true);
        
        try {
            console.log('D. Sending leave request to /api/groups/' + groupId + '/members/leave');
            const response = await axios.post(`/api/groups/${groupId}/members/leave`);
            console.log('F. Received response:', response.data);
            
            if (!response.data.success) {
                const errorMsg = response.data.message || 'Failed to leave group';
                console.error('G. Server returned error:', errorMsg);
                throw new Error(errorMsg);
            }
            
            const successMsg = response.data.message || 'Successfully left the group';
            console.log('H. Success:', successMsg);
            toast.success(successMsg);
            
            console.log('I. Refreshing groups list...');
            await fetchGroups();
            console.log('J. Groups list refreshed');
            
            return true;
        } catch (error) {
            console.error('K. Error in handleLeaveGroup:', {
                error: error,
                message: error.message,
                response: error.response?.data
            });
            
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Failed to leave group';
            toast.error(errorMessage);
            throw error;
        } finally {
            console.log('L. Setting isProcessing to false');
            setIsProcessing(false);
        }
    };

    const handleRemoveMember = async (groupId, memberId) => {
        try {
            console.log('Removing member:', memberId, 'from group:', groupId);
            const response = await axios.delete(`/api/groups/${groupId}/members/${memberId}`);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to remove member');
            }
            
            toast.success(response.data.message || 'Member removed successfully');
            // Note: The GroupMembersModal will handle updating its own state
            // If you need to refresh the group lists, uncomment the next line:
            // fetchGroups();
        } catch (error) {
            console.error('Error removing member:', error);
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Failed to remove member';
            toast.error(errorMessage);
            throw error; // Re-throw to let the modal handle it
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <GroupsContainer>
            <Header>
                <Title>Groups</Title>
                <CreateButton onClick={() => setShowCreateModal(true)}>Create Group</CreateButton>
            </Header>

            
            {isLoading ? (
                <div>Loading groups...</div>
            ) : (
                <>
                    {/* My Groups Section */}
                    <Section>
                        <SectionTitle>My Groups</SectionTitle>
                        {myGroups.length > 0 ? (
                            <GroupsGrid>
                                {myGroups.map(group => (
                                    <GroupCard 
                                        key={group.id} 
                                        group={group} 
                                        onDelete={handleDeleteGroup}
                                        onEdit={handleEditGroup}
                                        onJoin={(groupId) => {
                                            console.log('onJoin called with groupId:', groupId);
                                            return handleJoinGroup(groupId);
                                        }}
                                        onLeave={(groupId) => {
                                            console.log('onLeave called with groupId:', groupId);
                                            return handleLeaveGroup(groupId);
                                        }}
                                        onRemoveMember={handleRemoveMember}
                                        isMember={group.members?.some(member => member.id === currentUser?.id) || false}
                                        isCreator={group.created_by === currentUser?.id}
                                    />
                                ))}
                            </GroupsGrid>
                        ) : (
                            <p>You haven't created any groups yet.</p>
                        )}
                    </Section>

                    {/* Public Groups Section */}
                    <Section>
                        <SectionTitle>Public Groups</SectionTitle>
                        {publicGroups.length > 0 ? (
                            <GroupsGrid>
                                {publicGroups.map(group => (
                                    <GroupCard 
                                        key={group.id} 
                                        group={group} 
                                        onDelete={null}
                                        onEdit={null}
                                        onJoin={(groupId) => {
                                            console.log('onJoin called with groupId:', groupId);
                                            return handleJoinGroup(groupId);
                                        }}
                                        onLeave={(groupId) => {
                                            console.log('onLeave called with groupId:', groupId);
                                            return handleLeaveGroup(groupId);
                                        }}
                                        onRemoveMember={handleRemoveMember}
                                        isMember={group.members?.some(member => member.id === currentUser?.id) || false}
                                        isCreator={group.created_by === currentUser?.id}
                                    />
                                ))}
                            </GroupsGrid>
                        ) : (
                            !isLoading && <p>No public groups available.</p>
                        )}
                    </Section>

                    {myGroups.length > 0 && totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                        />
                    )}
                </>
            )}
            {showCreateModal && (
                <CreateGroupModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateGroup}
                />
            )}
        </GroupsContainer>
    );
}

export default Groups;