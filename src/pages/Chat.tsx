import AddIcon from '@mui/icons-material/Add';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { chatService, Message } from '../services/chatService';
import About from './About';
import LoadingScreen from './shared-theme/loadingScreen';

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
  const { logout, user, token, isAuthenticated, loading } = useAuth();
  const userName = user?.fullName() || 'Anonymous'; // You can replace this with actual user name from your auth system
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useNotification();
  const navigate = useNavigate();
  const [remainingRequests, setRemainingRequests] = useState<number | null>(null);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [userScrolled, setUserScrolled] = useState(false);

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = sessionStorage.getItem('chatMessages');
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
          sessionStorage.removeItem('chatMessages');
        }
      }
    };

    loadMessages();
  }, []); // Keep the empty dependency array

  // Modify the save messages useEffect
  useEffect(() => {
    // Only save if we have messages to save
    if (messages.length > 0) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    } else {
      // If messages array is empty, remove the item from sessionStorage
      sessionStorage.removeItem('chatMessages');
    }

    const remainingRequests = sessionStorage.getItem('remainingRequests');
    if (remainingRequests) {
      setRemainingRequests(parseInt(remainingRequests));
    }

    if (!userScrolled && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // focus on input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const atBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 5;
    setUserScrolled(!atBottom);
  };

  // Re-enable auto-scroll when the user returns to the bottom
  const handleScrollToBottom = () => {
    setUserScrolled(false);
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        if (!token) {
          showError('You are not logged in');
          return;
        }

        setIsLoading(true);

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
    // This will trigger the useEffect that saves to sessionStorage,
    // automatically clearing stored messages as well
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <React.Fragment>
        <About />
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Sign In to chat with AI
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          onScroll={handleScroll}
          sx={{
            height: '70vh',
            mb: 2,
            overflow: 'auto',
            p: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
            elevation: 1,
          }}>
          <List>
            {messages.map((message, index) => (
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
                <MessageBubble
                  isUser={message.userName !== 'LLM (llama3.2)'}
                >
                  <ReactMarkdown>{message.message}</ReactMarkdown>
                </MessageBubble>
              </MessageContainer>
            ))}
            <div ref={lastMessageRef} />
          </List>
        </Paper>
        {userScrolled && (
          <Button onClick={handleScrollToBottom} variant="text" sx={{ width: '100%', textAlign: 'center' }}>
            <ArrowCircleDownIcon />
          </Button>
        )}
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
              inputRef={inputRef}
              sx={{ fontSize: 16 }}
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
    </Box>
  );
}

export default Chat;