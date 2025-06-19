import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../api/getUser';
import { toast } from 'react-toastify';

const MembersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const MemberCard = styled.div`
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
`;

const MemberAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
`;

const MemberInfo = styled.div`
    flex: 1;
`;

const MemberName = styled.h4`
    margin: 0;
    font-size: 16px;
    color: #333;
`;

const MemberRole = styled.span`
    display: inline-block;
    font-size: 12px;
    color: #666;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 10px;
    margin-top: 4px;
`;

function GroupMembers() {
    const { groupId } = useParams();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`/api/users/groups/${groupId}/members`);
                if (response.data.success) {
                    setMembers(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch members');
                }
            } catch (error) {
                console.error('Error fetching group members:', error);
                toast.error('Failed to load group members');
            } finally {
                setLoading(false);
            }
        };

        if (groupId) {
            fetchMembers();
        }
    }, [groupId]);

    if (loading) {
        return <div>Loading members...</div>;
    }

    return (
        <div>
            <h3>Group Members ({members.length})</h3>
            <MembersContainer>
                {members.map(member => (
                    <MemberCard key={member.id}>
                        <MemberAvatar 
                            src={member.avatar ? `/storage/${member.avatar}` : '/default-avatar.png'} 
                            alt={member.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                        <MemberInfo>
                            <MemberName>{member.name}</MemberName>
                            <MemberRole>{member.pivot?.role || 'member'}</MemberRole>
                        </MemberInfo>
                    </MemberCard>
                ))}
            </MembersContainer>
        </div>
    );
}

export default GroupMembers;
