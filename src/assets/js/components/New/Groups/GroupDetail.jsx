import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../api/getUser';
import { toast } from 'react-toastify';

const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
`;

const GroupInfo = styled.div`
    flex: 1;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 24px;
    color: #333;
`;

const Description = styled.p`
    color: #666;
    margin: 5px 0 0 0;
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
    padding: 10px 20px;
    background: none;
    border: none;
    border-bottom: 2px solid ${props => props.active ? '#4CAF50' : 'transparent'};
    color: ${props => props.active ? '#4CAF50' : '#666'};
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: #4CAF50;
    }
`;

const Content = styled.div`
    padding: 20px 0;
`;

function GroupDetail() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await axios.get(`/api/users/groups/${groupId}`);
                if (response.data.success) {
                    setGroup(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch group');
                }
            } catch (error) {
                console.error('Error fetching group:', error);
                toast.error(error.response?.data?.message || 'Failed to load group');
                navigate('/student/dashboard/group');
            } finally {
                setLoading(false);
            }
        };

        if (groupId) {
            fetchGroup();
        }
    }, [groupId, navigate]);

    const isActive = (path) => {
        return location.pathname.endsWith(path);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!group) {
        return <div>Group not found</div>;
    }

    return (
        <Container>
            <Header>
                <Avatar 
                    src={group.avatar ? `/storage/${group.avatar}` : '/default-group-avatar.png'} 
                    alt={group.name}
                />
                <GroupInfo>
                    <Title>{group.name}</Title>
                    <Description>{group.description}</Description>
                </GroupInfo>
            </Header>

            <Tabs>
                <Tab 
                    active={isActive('overview')}
                    onClick={() => navigate(`/student/dashboard/group/${groupId}/overview`)}
                >
                    Overview
                </Tab>
                <Tab 
                    active={isActive('members')}
                    onClick={() => navigate(`/student/dashboard/group/${groupId}/members`)}
                >
                    Members
                </Tab>
                {group.is_admin && (
                    <Tab 
                        active={isActive('settings')}
                        onClick={() => navigate(`/student/dashboard/group/${groupId}/settings`)}
                    >
                        Settings
                    </Tab>
                )}
            </Tabs>

            <Content>
                <Outlet context={{ group, setGroup }} />
            </Content>
        </Container>
    );
}

export default GroupDetail;
