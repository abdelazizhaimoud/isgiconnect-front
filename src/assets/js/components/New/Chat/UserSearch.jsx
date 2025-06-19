import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RiSearchLine, RiCloseLine, RiUserAddLine } from '@remixicon/react';
import chatService from './chatService';

const SearchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f1f5f9;
`;

const SearchHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SearchTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const SearchInputContainer = styled.div`
  padding: 0 20px 20px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  
  .search-icon {
    position: absolute;
    left: 32px;
    color: #6b7280;
    z-index: 1;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px 0 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
  width: 100%;
  max-height: calc(100vh - 200px);
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
  margin-bottom: 8px;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
  margin-right: 12px;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const UserUsername = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const UserStatus = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const StartChatButton = styled.button`
  padding: 6px 12px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const SearchState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 14px;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserSearch = ({ onStartConversation, onClose }) => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeoutRef = useRef(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Add escape key handler
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const searchUsers = async (query) => {
    if (!query.trim() || query.length < 2) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await chatService.searchUsers(query);
      if (response.success) {
        setUsers(response.data || []);
      } else {
        setUsers([]);
        setError(response.message || 'Search failed');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If search term is empty, clear users immediately
    if (!searchTerm.trim()) {
      setUsers([]);
      setLoading(false);
      setError(null);
      return;
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      searchUsers(searchTerm);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleStartChat = async (user) => {
    try {
      await onStartConversation(user);
      onClose();
    } catch (err) {
      setError('Failed to start chat');
      console.error('Start chat error:', err);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div ref={searchRef}>
      <SearchOverlay>
        <SearchHeader>
          <SearchTitle>New Conversation</SearchTitle>
          <CloseButton onClick={onClose}>
            <RiCloseLine size={20} />
          </CloseButton>
        </SearchHeader>
        
        <SearchInputContainer>
          <RiSearchLine size={20} className="search-icon" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </SearchInputContainer>
        
        <SearchResults>
          {loading && (
            <SearchState>
              <LoadingSpinner />
              <div style={{ marginTop: '8px' }}>Searching...</div>
            </SearchState>
          )}
          
          {error && (
            <SearchState style={{ color: '#ef4444' }}>
              {error}
            </SearchState>
          )}
          
          {!loading && !error && searchTerm.length > 0 && searchTerm.length < 2 && (
            <SearchState>
              Type at least 2 characters to search
            </SearchState>
          )}
          
          {!loading && !error && searchTerm.length >= 2 && users.length === 0 && (
            <SearchState>
              No users found for "{searchTerm}"
            </SearchState>
          )}
          
          {!loading && !error && searchTerm.length === 0 && (
            <SearchState>
              Enter a name, username, or email to search for users
            </SearchState>
          )}
          
          {users.map(user => (
            <UserItem key={user.id}>
              <UserAvatar src={user.avatar}>
                {!user.avatar && getInitials(user.name)}
              </UserAvatar>
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserUsername>@{user.username}</UserUsername>
                {user.status && <UserStatus>{user.status}</UserStatus>}
              </UserInfo>
              <StartChatButton onClick={() => handleStartChat(user)}>
                <RiUserAddLine size={14} />
                Chat
              </StartChatButton>
            </UserItem>
          ))}
        </SearchResults>
      </SearchOverlay>
    </div>
  );
};

export default UserSearch;