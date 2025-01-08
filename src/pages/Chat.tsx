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
  Typography,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const MessageBubble = styled('div')<{ isUser: boolean }>(({ theme, isUser }) => ({
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  padding: '8px 16px',
  borderRadius: '12px',
  maxWidth: '70%',
  marginLeft: isUser ? 'auto' : '0',
  marginRight: isUser ? '0' : 'auto',
  wordWrap: 'break-word',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
  const { logout, user , token } = useAuth();
  const userName = user?.fullName() || 'Anonymous'; // You can replace this with actual user name from your auth system
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useNotification();
  const navigate = useNavigate();
  const [remainingRequests, setRemainingRequests] = useState<number | null>(null);

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

    const remainingRequests = sessionStorage.getItem('remainingRequests');
    if (remainingRequests) {
      setRemainingRequests(parseInt(remainingRequests));
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

        // Get remaining requests from response headers
        const remaining = message.remainingRequests ?? null;
        setRemainingRequests(remaining);

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
      } catch (error: any) {
        console.error('Failed to send message:', error);
        showError(error.message);
        if (error.status === 401) {
          logout();
          navigate('/login');
        }
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
        backgroundColor: (theme) => theme.palette.background.default,
        boxShadow: (theme) => theme.shadows[3],
        borderRadius: 2,
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
      <Typography color="secondary" >
        Maximum 15 requests allowed per day
        {remainingRequests !== null && (
          <span>
            {' '}• {remainingRequests} requests remaining
          </span>
        )}
      </Typography>
      <form onSubmit={handleSendMessage}>
        <Box sx={{ display: 'flex', gap: 1, position: 'relative' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
          />
          <IconButton 
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            onClick={handleSendMessage}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon color="primary" />}
          </IconButton>
          <IconButton onClick={handleStartNewChat}>
            <AddIcon color="secondary" />
          </IconButton>
        </Box>
      </form>
    </Container>
  );
}

export default Chat;