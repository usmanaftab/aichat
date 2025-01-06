import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

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

interface Message {
  id: string;
  text: string;
  timestamp: number;
  userName: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: crypto.randomUUID(),
        text: newMessage,
        timestamp: Date.now(),
        userName: userName
      };

      setMessages(prevMessages => [...prevMessages, message]);
      setNewMessage('');
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
            <ListItem key={message.id}>
              <div className="message">
                <div className="message-header">
                  <span className="username">{message.userName}</span>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  {message.text}
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