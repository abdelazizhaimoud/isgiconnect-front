import React from 'react';
import styled from 'styled-components';
import { RiAddLine, RiSearch2Line } from '@remixicon/react';

const ListContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  background-color: ${props => props.selected ? '#f0f9ff' : 'transparent'};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: ${props => props.selected ? '#f0f9ff' : '#f8fafc'};
    transform: translateX(2px);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
  background: ${props => props.src ? `url(${props.src})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid ${props => props.online ? '#10b981' : '#e5e7eb'};
  position: relative;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
`;

const ConversationDetails = styled.div`
  flex: 1;
  overflow: hidden;
  min-width: 0;
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Name = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-left: 8px;
  white-space: nowrap;
`;

const LastMessage = styled.p`
  font-size: 13px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  line-height: 1.4;
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;

const Header = styled.div`
  padding: 20px 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const NewChatButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const SearchContainer = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #e5e7eb;
    padding: 0 16px 0 40px;
    font-size: 14px;
    outline: none;
    background: #f9fafb;
    transition: all 0.2s ease;
    
    &:focus {
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }
`;

const formatTimestamp = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
  
  return date.toLocaleDateString();
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation, 
  onNewConversation 
}) => {
  // Defensive: ensure conversations is always an array
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredConversations = safeConversations.filter(conv =>
    conv.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header>
        <Title>Messages</Title>
        <NewChatButton onClick={onNewConversation} title="New conversation">
          <RiAddLine size={20} />
        </NewChatButton>
      </Header>
      
      <SearchContainer>
        <SearchInput>
          <RiSearch2Line size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
      </SearchContainer>
      
      <ListContainer>
        {filteredConversations.map(convo => (
          <ConversationItem
            key={convo.id}
            selected={selectedConversation && convo.id === selectedConversation.id}
            onClick={() => onSelectConversation(convo)}
          >
            <Avatar src={convo?.avatar} online={true}>
              {!convo?.avatar && getInitials(convo?.name || '')}
              <OnlineIndicator />
            </Avatar>
            
            <ConversationDetails>
              <ConversationHeader>
                <Name>{convo?.name || 'Unknown'}</Name>
                <Timestamp>
                  {convo?.last_message_at && formatTimestamp(convo?.last_message_at)}
                </Timestamp>
              </ConversationHeader>
              <LastMessage>
                {convo?.last_message?.content || 'No messages yet'}
              </LastMessage>
            </ConversationDetails>
            
            {convo?.unread_count > 0 && (
              <UnreadBadge>{convo.unread_count}</UnreadBadge>
            )}
          </ConversationItem>
        ))}
        
        {filteredConversations.length === 0 && (
          <div style={{
            padding: '40px 20px', 
            textAlign: 'center', 
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            {searchTerm ? 'No conversations found' : 'No conversations yet'}
          </div>
        )}
      </ListContainer>
    </>
  );
};

export default ConversationList;