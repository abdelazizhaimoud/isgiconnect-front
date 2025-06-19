import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserSearch from './UserSearch';
import { RiAddLine, RiSearch2Line } from '@remixicon/react';
import chatService from './chatService';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ChatContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background-color: #FAFAFB;
`;

const ChatWrapper = styled.div`
  width: 985px;
  padding: 10px;
  display: flex;
  gap: 20px;
  height: 100%;
  max-height: calc(100vh - 120px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Sidebar = styled.div`
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  position: relative;
`;

const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
  max-height: calc(100vh - 200px);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #50b5ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin: 16px;
  text-align: center;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6b7280;
  font-size: 16px;
  gap: 16px;

  .icon {
    font-size: 48px;
    opacity: 0.5;
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.online ? '#10b981' : '#f59e0b'};
  color: white;
  animation: ${pulse} 2s infinite;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [pendingConversationId, setPendingConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // --- DATA FETCHING & MANAGEMENT ---

  const fetchMessages = useCallback(async (conversationId, page = 1, isInitial = false) => {
    if (!conversationId) return;
    setMessagesLoading(true);
    try {
      const data = await chatService.getMessages(conversationId, page);
      // Laravel paginator: messages are at data.data.data
      let fetchedMessages = (data.data && Array.isArray(data.data.data)) ? data.data.data : [];
      if (page === 1 || isInitial) {
        fetchedMessages = fetchedMessages.reverse(); // Show latest at bottom
        setMessages(fetchedMessages);
      } else {
        // For pagination (older messages), prepend to top
        setMessages(prev => [...fetchedMessages.reverse(), ...prev]);
      }
      setHasMoreMessages(data.current_page < data.last_page);
      setMessagesPage(data.current_page);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages.');
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const handleSelectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
    setMessagesPage(1);
    setHasMoreMessages(true);
    fetchMessages(conversation.id, 1, true);
  }, [fetchMessages]);

  // Effect to handle conversation selection after fetching
  useEffect(() => {
    if (pendingConversationId && conversations.length > 0) {
      const pendingConv = conversations.find(conv => conv.id === pendingConversationId);
      if (pendingConv) {
        handleSelectConversation(pendingConv);
        setPendingConversationId(null);
      }
    }
  }, [conversations, pendingConversationId, handleSelectConversation]);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await chatService.getConversations();
      // Laravel pagination: data.data.data is the array
      const convos = (data.data && Array.isArray(data.data.data)) ? data.data.data : [];
      
      // Update conversations state
      setConversations(convos);
      
      // Only auto-select first conversation if:
      // 1. We have conversations
      // 2. No conversation is selected
      // 3. We don't have a pending conversation ID
      if (convos.length > 0 && !selectedConversation && !pendingConversationId) {
        handleSelectConversation(convos[0]);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations.');
    } finally {
      setLoading(false);
    }
  }, [selectedConversation, handleSelectConversation]);

  // --- EVENT HANDLERS ---

  const handleSendMessage = async (text, type = 'text', replyToId = null, attachments = null) => {
    if (!selectedConversation) return;

    // 1. Create optimistic message with proper sender info
    const tempId = 'temp-' + Date.now();
    const optimisticMsg = {
      id: tempId,
      content: text,
      type,
      attachments: attachments || [],
      sender: {
        id: localStorage.getItem('user_id'),
        name: localStorage.getItem('user_name'),
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
      },
      created_at: new Date().toISOString(),
      is_own_message: true,
      pending: true,
    };

    // Add optimistic message to the list
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const response = await chatService.sendMessage(
        selectedConversation.id,
        text,
        type,
        replyToId,
        attachments
      );
      
      const newMsg = response.data || response;
      
      // Update messages list by replacing the optimistic message
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...newMsg, pending: false } : msg
      ));

      // Update conversation's last message
      setConversations(prevConvs =>
        prevConvs.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, last_message: newMsg }
            : conv
        )
      );
    } catch (err) {
      // Remove optimistic message only on error
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      setError(err.message || 'Failed to send message');
    }
  };

  const handleStartConversation = useCallback(async (user) => {
    try {
      const newConversation = await chatService.startDirectConversation(user.id);
      
      // Track the conversation we're trying to select
      setPendingConversationId(newConversation.id);
      
      // Update conversations state with proper name for direct conversations
      setConversations(prev => {
        // First check if conversation already exists
        const existingConv = prev.find(c => c.id === newConversation.id);
        if (existingConv) {
          // If it exists, just return the current list
          return prev;
        }
        
        // For direct conversations, set the name to the other participant's name
        const otherParticipant = newConversation.participants.find(p => p.id !== user.id);
        const conversationWithName = {
          ...newConversation,
          name: otherParticipant?.name || 'Unnamed User',
          type: 'direct'
        };
        
        // Add to the beginning of the list
        return [conversationWithName, ...prev];
      });
      
      // Select the conversation now, but it might get updated later
      handleSelectConversation(newConversation);
      
      // Close the search overlay
      setShowUserSearch(false);
      
      // Fetch conversations to update the list
      fetchConversations();
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Failed to start conversation.');
    }
  }, [handleSelectConversation]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0 && hasMoreMessages && !messagesLoading) {
        const nextPage = messagesPage + 1;
        setMessagesPage(nextPage);
        fetchMessages(selectedConversation.id, nextPage);
      }
    }
  };

  // --- EFFECTS ---

  // Initial conversation load
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Network status
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Polling for messages in the active conversation
  useEffect(() => {
    if (!isOnline || !selectedConversation) return;

    const poll = setInterval(async () => {
      try {
        // Background polling: do NOT set messagesLoading
        const data = await chatService.getMessages(selectedConversation.id, 1);
        let latestMessages = (data.data && Array.isArray(data.data.data)) ? data.data.data : [];
        latestMessages = latestMessages.reverse();

        // Preserve optimistic messages when updating
        setMessages(prevMessages => {
          // Keep any pending messages
          const pendingMessages = prevMessages.filter(msg => msg.pending);
          
          // Filter out any messages that are now confirmed
          const confirmedMessages = latestMessages.filter(newMsg => 
            !pendingMessages.some(pendingMsg => 
              pendingMsg.content === newMsg.content && 
              pendingMsg.created_at === newMsg.created_at
            )
          );

          // Combine confirmed and pending messages
          return [...confirmedMessages, ...pendingMessages];
        });
      } catch (err) {
        console.error('Message polling error:', err);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(poll);
  }, [isOnline, selectedConversation]);

  if (loading && conversations.length === 0) {
    return (
      <ChatContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <LoadingSpinner />
        </div>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <StatusIndicator online={isOnline}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </StatusIndicator>
      
      <ChatWrapper>
        <Sidebar>
          <ConversationList
            conversations={Array.isArray(conversations) ? conversations : []}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onNewConversation={() => setShowUserSearch(true)}
          />
          {showUserSearch && (
            <UserSearch
              onStartConversation={handleStartConversation}
              onClose={() => setShowUserSearch(false)}
            />
          )}
        </Sidebar>
        
        <MainContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {selectedConversation ? (
            <>
              <MessageList 
                messages={messages} 
                conversation={selectedConversation}
                loading={messagesLoading}
                onScroll={handleScroll}
                containerRef={messagesContainerRef}
              />
              <MessageInput 
                onSendMessage={handleSendMessage}
                disabled={!isOnline}
              />
              <div ref={messagesEndRef} />
            </>
          ) : (
            <EmptyState>
              <div className="icon">💬</div>
              <div>Select a conversation to start chatting</div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                or start a new conversation
              </div>
            </EmptyState>
          )}
        </MainContent>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default Chat;