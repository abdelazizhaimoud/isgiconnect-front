import React, { useState } from 'react';
import styled from 'styled-components';
import { RiSearchLine, RiMessage2Line, RiPhoneLine, RiVideoLine, RiDeleteBinLine, RiMoreLine, RiSendPlaneFill, RiEmotionLine, RiAttachment2 } from '@remixicon/react';

// Main container
const ChatPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f5fa;
  font-family: 'Montserrat', sans-serif;
`;

// Wrapper to contain the chat components
const ChatWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

// Channels sidebar
const ChannelsSidebar = styled.div`
  width: 280px;
  background-color: white;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  div {
    margin-left: 10px;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: #323232;
    }
    
    p {
      font-size: 13px;
      color: #777;
      margin: 0;
    }
  }
`;

const ChannelSearch = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border: 1px solid #e6e6e6;
  margin: 15px;
  border-radius: 4px;
  
  svg {
    color: #2aa3fb;
    width: 18px;
    height: 18px;
  }
  
  input {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    margin-left: 10px;
    width: 100%;
  }
`;

const ChannelCategory = styled.div`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  color: #323232;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 15px;
    bottom: 15px;
    width: 3px;
    background-color: #2aa3fb;
    display: ${props => props.active ? 'block' : 'none'};
  }
`;

const ChannelItem = styled.div`
  display: flex;
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.active ? '#f0f5fa' : 'transparent'};
  
  &:hover {
    background-color: #f0f5fa;
  }
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  div {
    margin-left: 10px;
    flex: 1;
    
    h4 {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      display: flex;
      align-items: center;
      color: #323232;
    }
    
    p {
      font-size: 12px;
      color: #777;
      margin: 5px 0 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2aa3fb;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
`;

const MessageTime = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 11px;
  color: #777;
`;

const StatusDot = styled.div`
  position: absolute;
  bottom: 15px;
  left: 45px;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color || '#2aa3fb'};
  border-radius: 50%;
  border: 2px solid white;
`;

// Main chat content
const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f5fa;
  background-image: radial-gradient(#e6e6e6 1px, transparent 1px);
  background-size: 20px 20px;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  
  .chat-user {
    display: flex;
    align-items: center;
    
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: #323232;
    }
  }
  
  .chat-actions {
    display: flex;
    
    button {
      background: none;
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      cursor: pointer;
      color: #2aa3fb;
      
      &:hover {
        background-color: #f0f5fa;
      }
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: ${props => props.sent ? 'row-reverse' : 'row'};
  margin-bottom: 20px;
  
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin: ${props => props.sent ? '0 0 0 10px' : '0 10px 0 0'};
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;

const MessageBubble = styled.div`
  padding: 10px 15px;
  background-color: ${props => props.sent ? '#2aa3fb' : 'white'};
  color: ${props => props.sent ? 'white' : '#323232'};
  border-radius: 18px;
  border-top-left-radius: ${props => props.sent ? '18px' : '4px'};
  border-top-right-radius: ${props => props.sent ? '4px' : '18px'};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 5px;
  font-size: 14px;
`;

const TimeStamp = styled.div`
  font-size: 11px;
  color: #777;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
  margin-top: 2px;
`;

const ChatInputArea = styled.div`
  padding: 15px;
  background-color: white;
  border-top: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  
  button {
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #777;
    
    &:hover {
      color: #2aa3fb;
    }
  }
  
  .send-button {
    background-color: #2aa3fb;
    color: white;
    border-radius: 50%;
    margin-left: 10px;
    
    &:hover {
      background-color: #1a93eb;
      color: white;
    }
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 10px 0;
    font-size: 14px;
  }
`;

const EmptyChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ChatIconCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  svg {
    width: 40px;
    height: 40px;
    color: #2aa3fb;
  }
`;

const StartConversationText = styled.div`
  font-size: 16px;
  color: #323232;
  background-color: white;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

function ChatPage() {
  // Status colors
  const statusColors = {
    online: '#28a745',    
    purple: '#d592ff',    
    orange: '#ffc107'
  };

  // Active chat state
  const [activeChat, setActiveChat] = useState(null);

  const publicChannels = [
    { 
      id: 1, 
      name: 'Team Discussions', 
      message: 'Lorem Ipsum is simply dummy...', 
      time: '05 min', 
      unread: 5, 
      status: 'online',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Good morning team!", time: "9:00", sent: false },
        { id: 2, text: "What's on the agenda for today?", time: "9:05", sent: true },
        { id: 3, text: "We need to finish the dashboard design.", time: "9:07", sent: false },
      ]
    },
    { 
      id: 2, 
      name: 'Announcement', 
      message: 'This Sunday we are going...', 
      time: '10 min', 
      status: 'orange',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "How can we help? We're here for you! 😊", time: "6:45", sent: true },
        { id: 2, text: "Hey John, I am looking for the best admin template. Could you please help me to find it out? 🤔", time: "6:48", sent: false },
        { id: 3, text: "Absolutely! SocialV Dashboard is the responsive bootstrap 4 admin template.", time: "6:49", sent: true },
        { id: 4, text: "Looks clean and fresh UI.", time: "6:52", sent: false },
        { id: 5, text: "Thanks, from ThemeForest.", time: "6:53", sent: true },
        { id: 6, text: "I will purchase it for sure. 👍", time: "6:54", sent: false },
        { id: 7, text: "Okay Thanks..", time: "6:56", sent: true },
      ]
    },
  ];

  const privateChannels = [
    { 
      id: 3, 
      name: 'Designer', 
      message: 'There are many variations...', 
      time: '15 min', 
      status: 'online',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Hey, can you review the new design?", time: "10:15", sent: false },
        { id: 2, text: "Yes, I'll take a look now.", time: "10:18", sent: true },
        { id: 3, text: "The color scheme looks great!", time: "10:22", sent: true },
      ]
    },
    { 
      id: 4, 
      name: 'Developer', 
      message: 'passages of Lorem Ipsum...', 
      time: '22 min', 
      status: 'purple',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Found a bug in the login component", time: "11:22", sent: false },
        { id: 2, text: "Can you share the error logs?", time: "11:25", sent: true },
        { id: 3, text: "Just sent them to your email", time: "11:28", sent: false },
      ]
    },
    { 
      id: 5, 
      name: 'Testing Team', 
      message: 'Lorem Ipsum used since the...', 
      time: '42 min', 
      status: 'online',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "QA testing completed for v2.3", time: "12:30", sent: false },
        { id: 2, text: "Any critical issues?", time: "12:32", sent: true },
        { id: 3, text: "All clear, ready for deployment", time: "12:35", sent: false },
      ]
    },
  ];

  const directMessages = [
    { 
      id: 6, 
      name: 'Paul Molive', 
      message: 'translation by the word...', 
      time: '45 min', 
      status: 'online',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Do you have time for a quick call?", time: "1:45", sent: false },
        { id: 2, text: "Sure, give me 5 minutes", time: "1:47", sent: true },
        { id: 3, text: "Perfect, I'll set up the meeting", time: "1:48", sent: false },
      ]
    },
    { 
      id: 7, 
      name: 'John Doe', 
      message: 'It is a long established...', 
      time: '50 min', 
      status: 'orange',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Have you seen the latest sales report?", time: "2:10", sent: false },
        { id: 2, text: "Yes, the numbers look promising", time: "2:15", sent: true },
        { id: 3, text: "We exceeded our Q2 targets", time: "2:17", sent: false },
      ]
    },
    { 
      id: 8, 
      name: 'Emma Watson', 
      message: 'but also the leap into...', 
      time: '55 min', 
      status: 'online',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Project deadline has been extended", time: "3:05", sent: false },
        { id: 2, text: "That's great news! When is it now?", time: "3:08", sent: true },
        { id: 3, text: "Next Friday instead of Monday", time: "3:10", sent: false },
      ]
    },
    { 
      id: 9, 
      name: 'Sarah Connor', 
      message: 'Lorem Ipsum has been...', 
      time: '1 hour', 
      status: 'purple',
      avatar: '/api/placeholder/40/40',
      messages: [
        { id: 1, text: "Client feedback is in", time: "4:15", sent: false },
        { id: 2, text: "What did they say?", time: "4:18", sent: true },
        { id: 3, text: "They love the new features!", time: "4:20", sent: false },
      ]
    },
  ];

  // get status color
  const getStatusColor = (status) => {
    return statusColors[status] || '#2aa3fb';
  };
  
  // Handle chat selection
  const handleChatSelect = (chat) => {
    setActiveChat(chat);
  };

  // All channels combined for simpler handling
  const allChannels = [...publicChannels, ...privateChannels, ...directMessages];

  return (
    <ChatPageContainer>
      <ChatWrapper>
        {/* Channels Sidebar */}
        <ChannelsSidebar>
          <UserAvatar>
            <img src="/api/placeholder/50/50" alt="Bni Jordan" />
            <div>
              <h3>Bni Jordan</h3>
              <p>Web Designer</p>
            </div>
          </UserAvatar>
          
          <ChannelSearch>
            <RiSearchLine />
            <input type="text" placeholder="Search" />
          </ChannelSearch>
          
          <ChannelCategory active={true}>Public Channels</ChannelCategory>
          
          {publicChannels.map(channel => (
            <ChannelItem 
              key={channel.id} 
              active={activeChat && activeChat.id === channel.id}
              onClick={() => handleChatSelect(channel)}
            >
              <img src={channel.avatar} alt={channel.name} />
              <StatusDot color={getStatusColor(channel.status)} />
              <div>
                <h4>{channel.name}</h4>
                <p>{channel.message}</p>
              </div>
              {channel.unread && <UnreadBadge>{channel.unread}</UnreadBadge>}
              <MessageTime>{channel.time}</MessageTime>
            </ChannelItem>
          ))}
          
          <ChannelCategory>Private Channels</ChannelCategory>
          
          {privateChannels.map(channel => (
            <ChannelItem 
              key={channel.id}
              active={activeChat && activeChat.id === channel.id}
              onClick={() => handleChatSelect(channel)}
            >
              <img src={channel.avatar} alt={channel.name} />
              <StatusDot color={getStatusColor(channel.status)} />
              <div>
                <h4>{channel.name}</h4>
                <p>{channel.message}</p>
              </div>
              <MessageTime>{channel.time}</MessageTime>
            </ChannelItem>
          ))}
          
          <ChannelCategory>Direct Message</ChannelCategory>
          
          {directMessages.map(channel => (
            <ChannelItem 
              key={channel.id}
              active={activeChat && activeChat.id === channel.id}
              onClick={() => handleChatSelect(channel)}
            >
              <img src={channel.avatar} alt={channel.name} />
              <StatusDot color={getStatusColor(channel.status)} />
              <div>
                <h4>{channel.name}</h4>
                <p>{channel.message}</p>
              </div>
              <MessageTime>{channel.time}</MessageTime>
            </ChannelItem>
          ))}
        </ChannelsSidebar>

        {/* Main Chat Content */}
        <ChatContent>
          {activeChat ? (
            <>
              <ChatHeader>
                <div className="chat-user">
                  <img src={activeChat.avatar} alt={activeChat.name} />
                  <h3>{activeChat.name}</h3>
                </div>
                <div className="chat-actions">
                  <button><RiPhoneLine /></button>
                  <button><RiVideoLine /></button>
                  <button><RiDeleteBinLine /></button>
                  <button><RiMoreLine /></button>
                </div>
              </ChatHeader>
              
              <ChatMessages>
                {activeChat.messages.map(message => (
                  <MessageGroup key={message.id} sent={message.sent}>
                    <img src={message.sent ? "/api/placeholder/36/36" : activeChat.avatar} alt={message.sent ? "Me" : activeChat.name} />
                    <MessageContainer>
                      <MessageBubble sent={message.sent}>{message.text}</MessageBubble>
                      <TimeStamp sent={message.sent}>{message.time}</TimeStamp>
                    </MessageContainer>
                  </MessageGroup>
                ))}
              </ChatMessages>
              
              <ChatInputArea>
                <button><RiEmotionLine /></button>
                <button><RiAttachment2 /></button>
                <input type="text" placeholder="Type your message" />
                <button className="send-button"><RiSendPlaneFill /></button>
              </ChatInputArea>
            </>
          ) : (
            <EmptyChatContainer>
              <ChatIconCircle>
                <RiMessage2Line />
              </ChatIconCircle>
              <StartConversationText>Start Conversation!</StartConversationText>
            </EmptyChatContainer>
          )}
        </ChatContent>
      </ChatWrapper>
    </ChatPageContainer>
  );
}

export default ChatPage;