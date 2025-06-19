import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { RiReplyLine, RiMoreLine } from '@remixicon/react';

// Simple loading spinner
const LoadingSpinner = () => (
  <div style={{width:24,height:24,border:'3px solid #f3f4f6',borderTop:'3px solid #50b5ff',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto'}} />
);


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.own ? 'flex-end' : 'flex-start'};
  gap: 4px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${props => props.own 
    ? '20px 20px 4px 20px' 
    : '20px 20px 20px 4px'
  };
  line-height: 1.5;
  font-size: 14px;
  position: relative;
  word-wrap: break-word;
  background: ${props => props.own 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : '#ffffff'
  };
  color: ${props => props.own ? 'white' : '#1f2937'};
  box-shadow: ${props => props.own 
    ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)'
  };
  border: ${props => props.own ? 'none' : '1px solid #f1f5f9'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.own 
      ? '0 6px 16px rgba(102, 126, 234, 0.4)' 
      : '0 4px 12px rgba(0, 0, 0, 0.15)'
    };
  }
`;

const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 11px;
  color: #9ca3af;
  ${props => props.own ? 'justify-content: flex-end;' : ''}
`;

const SenderName = styled.span`
  font-weight: 600;
  color: #6b7280;
`;

const Timestamp = styled.span`
  font-size: 11px;
`;

const ReplyPreview = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-left: 3px solid ${props => props.own ? '#ffffff' : '#667eea'};
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 12px;
  opacity: 0.9;
`;

const ChatHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HeaderAvatar = styled.div`
  width: 44px;
  height: 44px;
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
  border: 3px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const HeaderName = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #111827;
  margin-bottom: 2px;
`;

const HeaderStatus = styled.div`
  font-size: 13px;
  color: #10b981;
  font-weight: 500;
`;

const LoadingMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 20px 20px 20px 4px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 80px;
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9ca3af;
    animation: typing 1.4s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
  
  @keyframes typing {
    0%, 80%, 100% { 
      transform: scale(0);
      opacity: 0.5;
    }
    40% { 
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const formatTimestamp = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const MessageList = ({ messages, conversation, loading }) => {
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ChatHeader>
        <HeaderAvatar src={conversation.avatar}>
          {!conversation.avatar && getInitials(conversation.name)}
        </HeaderAvatar>
        <HeaderInfo>
          <HeaderName>{conversation.name}</HeaderName>
          <HeaderStatus>● Online</HeaderStatus>
        </HeaderInfo>
      </ChatHeader>
      
      <MessagesContainer>
        {loading && messages.length === 0 && (
          <LoadingMessages>
            <LoadingSpinner />
            Loading messages...
          </LoadingMessages>
        )}
        
        {messages.map(msg => (
          <MessageGroup key={msg.id} own={msg.is_own_message}>
            <MessageBubble own={msg.is_own_message}>
              {msg.reply_to && (
                <ReplyPreview own={msg.is_own_message}>
                  <strong>{msg.reply_to.sender_name}:</strong> {msg.reply_to.content}
                </ReplyPreview>
              )}
              {msg.content}
            </MessageBubble>
            <MessageMeta own={msg.is_own_message}>
              {!msg.is_own_message && <SenderName>{msg.sender.name}</SenderName>}
              <Timestamp>{formatTimestamp(msg.created_at)}</Timestamp>
              {msg.is_edited && <span>• edited</span>}
            </MessageMeta>
          </MessageGroup>
        ))}
        
        {/* Typing indicator - you can add this when implementing real-time features */}
        {/* <TypingIndicator>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </TypingIndicator> */}
        
        <div ref={endOfMessagesRef} />
      </MessagesContainer>
    </>
  );
};

export default MessageList;