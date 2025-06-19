import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/getUser';
import PostCard from '../Content/ContentCard';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const LoadingContainer = styled.div`
    padding: 40px 0;
    text-align: center;
    color: #666;
`;

function formatDate(dateString) {
    try {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const diffInMs = currentDate - postDate;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return postDate.toLocaleDateString();
    } catch (err) {
        return dateString;
    }
}

const GroupFeed = () => {
    const { groupId } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/groups/${groupId}/posts`);
            if (response.data.success) {
                setPosts(response.data.data.data || response.data.data); // handle pagination data
            } else {
                throw new Error(response.data.message || 'Failed to fetch posts');
            }
        } catch (err) {
            console.error('Error fetching group posts:', err);
            setError(err.response?.data?.message || err.message || 'Failed to load posts');
            toast.error(err.response?.data?.message || 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (groupId) {
            fetchPosts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId]);

    if (loading) {
        return <LoadingContainer>Loading posts...</LoadingContainer>;
    }

    if (error) {
        return (
            <LoadingContainer>
                {error}
                <br />
                <button onClick={fetchPosts} style={{ marginTop: '10px', color: '#2563eb' }}>Retry</button>
            </LoadingContainer>
        );
    }

    if (!posts.length) {
        return <LoadingContainer>No posts from group members yet.</LoadingContainer>;
    }

    return (
        <FeedContainer>
            {posts.map(post => (
                <PostCard key={post.id} post={post} formatDate={formatDate} />
            ))}
        </FeedContainer>
    );
};

export default GroupFeed;
