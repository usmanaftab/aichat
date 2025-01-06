import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
}

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
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
              <ListItemText
                primary={message.text}
                secondary={message.timestamp.toLocaleTimeString()}
              />
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