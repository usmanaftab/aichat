import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { chatService, Message } from '../services/chatService';
import {
  Container,
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  Button,
  Theme,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNotification } from '../contexts/NotificationContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MessageBubble = styled('div')<{ isUser: boolean }>(({ theme, isUser }) => ({
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[100],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  padding: '8px 16px',
  borderRadius: '12px',
  maxWidth: '70%',
  marginLeft: isUser ? 'auto' : '0',
  marginRight: isUser ? '0' : 'auto',
  wordWrap: 'break-word',
}));

const MessageContainer = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '8px 16px',
});

const MessageHeader = styled('div')<{ isUser: boolean }>(({ isUser }) => ({
  fontSize: '0.8rem',
  color: '#666',
  marginBottom: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: isUser ? 'auto' : '0',
  marginRight: isUser ? '0' : 'auto',
}));

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user , token } = useAuth();
  const userName = user?.fullName() || 'Anonymous'; // You can replace this with actual user name from your auth system
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useNotification();

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Only set messages if we actually have saved messages and messages state is empty
          if (parsedMessages && Array.isArray(parsedMessages) && parsedMessages.length > 0) {
            setMessages(parsedMessages);
          }
        } catch (error) {
          console.error('Error parsing saved messages:', error);
          // If there's an error parsing, clear the corrupted data
          localStorage.removeItem('chatMessages');
        }
      }
    };

    loadMessages();
  }, []); // Keep the empty dependency array

  // Modify the save messages useEffect
  useEffect(() => {
    // Only save if we have messages to save
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    } else {
      // If messages array is empty, remove the item from localStorage
      localStorage.removeItem('chatMessages');
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        setIsLoading(true);

        if (!token) {
          showError('You are not logged in');
          return;
        } 

        // Getting response from LLM
        const message = await chatService.sendMessage(newMessage, token);

        // Setting user message after getting response from LLM
        const userMessage: Message = {
          id: crypto.randomUUID(),
          contextId: '',
          message: newMessage,
          timestamp: Date.now(),
          userName: userName
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Setting LLM response
        setMessages(prevMessages => [...prevMessages, message]);

        // Clearing input field
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
        showError('Failed to send message. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStartNewChat = () => {
    setMessages([]);
    sessionStorage.removeItem('contextId');
    // This will trigger the useEffect that saves to localStorage,
    // automatically clearing stored messages as well
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{
        height: '70vh',
        mb: 2,
        overflow: 'auto',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}>
        <List>
          {messages.map((message) => (
            <MessageContainer
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.userName !== 'LLM (llama3.2)' ? 'flex-end' : 'flex-start'
              }}
            >
              <MessageHeader isUser={message.userName !== 'LLM (llama3.2)'}>
                <span>{message.userName}</span>
              </MessageHeader>
              <MessageHeader isUser={message.userName !== 'LLM (llama3.2)'}>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </MessageHeader>
              <MessageBubble isUser={message.userName !== 'LLM (llama3.2)'}>
                {message.message}
              </MessageBubble>
            </MessageContainer>
          ))}
        </List>
      </Paper>
      <form onSubmit={handleSendMessage}>
        <Box sx={{ display: 'flex', gap: 1, position: 'relative' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: 'white',
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!newMessage.trim() || isLoading}
            sx={{
              borderRadius: '20px',
              px: 3,
              minWidth: '100px',
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleStartNewChat}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              borderRadius: '20px',
              px: 3,
              minWidth: '140px',
              borderColor: 'info.main',
              '&:hover': {
                borderColor: 'info.dark',
                backgroundColor: 'info.lighter',
              },
            }}
          >
            New Chat
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Chat;