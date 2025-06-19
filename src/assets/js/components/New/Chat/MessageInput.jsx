import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { RiSendPlane2Fill, RiAttachment2, RiEmotionHappyLine, RiImageLine } from '@remixicon/react';

const InputContainer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
`;

const InputForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  position: relative;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
  background: white;
  border-radius: 24px;
  border: 2px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  ${props => props.disabled && `
    opacity: 0.6;
    pointer-events: none;
  `}
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 44px;
  max-height: 120px;
  border: none;
  border-radius: 24px;
  padding: 12px 50px 12px 18px;
  font-size: 14px;
  outline: none;
  resize: none;
  font-family: inherit;
  line-height: 1.4;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SendButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  
  &:hover {
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const UtilityButton = styled(ActionButton)`
  background: #f3f4f6;
  color: #6b7280;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const EmojiButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
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

const AttachmentPreview = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 12px;
  color: #374151;
  
  .remove {
    cursor: pointer;
    color: #ef4444;
    font-weight: bold;
  }
`;

const CharCounter = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 11px;
  color: ${props => props.warning ? '#ef4444' : '#9ca3af'};
`;

const OfflineNotice = styled.div`
  text-align: center;
  padding: 12px;
  background: #fef3c7;
  color: #92400e;
  font-size: 13px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const maxLength = 5000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text.trim(), 'text', null, attachments.length > 0 ? attachments : null);
      setText('');
      setAttachments([]);
      textareaRef.current.style.height = '44px';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    
    // Auto-resize textarea
    const textarea = textareaRef.current;
    textarea.style.height = '44px';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <InputContainer>
      {disabled && (
        <OfflineNotice>
          🔌 You're offline. Messages will be sent when connection is restored.
        </OfflineNotice>
      )}
      
      {attachments.length > 0 && (
        <AttachmentPreview>
          {attachments.map(att => (
            <AttachmentItem key={att.id}>
              <RiImageLine size={14} />
              <span>{att.name} ({formatFileSize(att.size)})</span>
              <span className="remove" onClick={() => removeAttachment(att.id)}>×</span>
            </AttachmentItem>
          ))}
        </AttachmentPreview>
      )}
      
      <InputForm onSubmit={handleSubmit}>
        <UtilityButton 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          title="Attach file"
        >
          <RiAttachment2 size={20} />
        </UtilityButton>
        
        <InputWrapper disabled={disabled}>
          <TextInput
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Connecting..." : "Type a message..."}
            disabled={disabled}
            maxLength={maxLength}
            rows={1}
          />
          <EmojiButton type="button" title="Add emoji">
            <RiEmotionHappyLine size={18} />
          </EmojiButton>
          {text.length > maxLength * 0.8 && (
            <CharCounter warning={text.length > maxLength * 0.95}>
              {text.length}/{maxLength}
            </CharCounter>
          )}
        </InputWrapper>
        
        <SendButton 
          type="submit" 
          disabled={!text.trim() || disabled}
          title="Send message"
        >
          <RiSendPlane2Fill size={20} />
        </SendButton>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </InputForm>
    </InputContainer>
  );
};

export default MessageInput;