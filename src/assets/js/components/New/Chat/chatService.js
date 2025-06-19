import axios from '../../../api/getUser';

class ChatService {
    constructor() {
      this.baseURL = '/api/chat'; // Remove the full URL since axios client already has baseURL configured
    }
  
    async request(endpoint, options = {}) {
      const url = `${this.baseURL}${endpoint}`;
      
      try {
        const response = await axios({
          url,
          method: options.method || 'GET',
          data: options.body ? JSON.parse(options.body) : undefined,
          params: options.params,
          ...options
        });
        
        return response.data;
      } catch (error) {
        console.error('API request failed:', error);
        // Handle axios error format
        if (error.response) {
          throw new Error(error.response.data?.message || `HTTP error! status: ${error.response.status}`);
        }
        throw error;
      }
    }
  
    async getConversations(page = 1, perPage = 20) {
      return this.request(`/conversations`, {
        params: { page, per_page: perPage }
      });
    }
  
    async getMessages(conversationId, page = 1, perPage = 50) {
      return this.request(`/conversations/${conversationId}/messages`, {
        params: { page, per_page: perPage }
      });
    }
  
    async sendMessage(conversationId, content, type = 'text', replyToId = null, attachments = null) {
      // If attachments include File objects, use FormData, else send JSON
      let hasFiles = Array.isArray(attachments) && attachments.some(att => att.file instanceof File);
      if (hasFiles) {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('type', type);
        if (replyToId !== null && replyToId !== undefined) {
          formData.append('reply_to_id', replyToId);
        }
        attachments.forEach((att, i) => {
          if (att.file instanceof File) {
            formData.append('attachments[]', att.file, att.name || att.file.name);
          }
        });
        // Debug: log FormData contents
        for (let pair of formData.entries()) {
          console.log('FormData:', pair[0], pair[1]);
        }
        return this.request(`/conversations/${conversationId}/messages`, {
          method: 'POST',
          data: formData,
          // DO NOT set Content-Type manually; let Axios handle it
        });
      } else {
        // No files, send as JSON
        const payload = {
          content,
          type,
          attachments: Array.isArray(attachments) ? attachments : [],
        };
        if (replyToId !== null && replyToId !== undefined) {
          payload.reply_to_id = replyToId;
        }
        return this.request(`/conversations/${conversationId}/messages`, {
          method: 'POST',
          data: payload,
        });
      }
    }
  
    async startDirectConversation(userId) {
      const response = await this.request('/conversations/direct', {
        method: 'POST',
        data: { user_id: userId }
      });
      // Return the conversation object from the response
      return response.conversation || {
        id: response.conversation_id,
        type: 'direct',
        name: 'Unnamed Conversation',
        is_active: true,
        created_at: new Date().toISOString(),
        participants: []
      };
    }
  
    async searchUsers(query) {
      return this.request(`/users/search`, {
        params: { q: query }
      });
    }
}

const chatService = new ChatService();

export default chatService;