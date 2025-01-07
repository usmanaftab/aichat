import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { chatService, Message } from '../services/chatService';
import { Navigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  Button,
  Theme,
} from '@mui/material';


function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { isAuthenticated, user , token } = useAuth();
  const userName = user?.fullName() || 'Anonymous'; // You can replace this with actual user name from your auth system

  useEffect(() => {
    // Load messages from localStorage when component mounts
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" />;
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const userMessage: Message = {
          contextId: '',
          message: newMessage,
          timestamp: Date.now(),
          userName: userName
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);

        const message = await chatService.sendMessage(newMessage, token);
        setMessages(prevMessages => [...prevMessages, message]);

        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{
        height: '400px',
        mb: 2,
        overflow: 'auto',
        p: 2
      }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.contextId}>
              <div className="message">
                <div className="message-header">
                  <span className="username">{message.userName}</span>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  {message.message}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
      <form onSubmit={handleSendMessage}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Chat;