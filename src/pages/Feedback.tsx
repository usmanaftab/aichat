import { Box, Typography, TextField, Button, Snackbar, Alert, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { config } from 'src/config';
import { useAuth } from 'src/contexts/AuthContext';
import { useNotification } from 'src/contexts/NotificationContext';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useNotification();
  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${config.API_URL}/feedback/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
        mode: 'cors',
      });

      if (response.ok) {
        showSuccess('Thank you for your feedback!');
        setFeedback({ name: '', email: '', message: '' });
      }
    } catch (error) {
      showError('Error submitting feedback');
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Feedback
      </Typography>
      <Typography sx={{ mb: 3 }}>
        We value your feedback! Please let us know your thoughts about our application.
      </Typography>
      
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={feedback.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={feedback.email}
        onChange={handleChange}
        margin="normal"
        required
      />
      
      <TextareaAutosize
        aria-label="Message"
        placeholder="Message"
        name="message"
        minRows={4}
        value={feedback.message}
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '16px',
          marginBottom: '8px',
          fontFamily: 'inherit',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
        }}
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 3 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </Box>
  );
};

export default Feedback; 