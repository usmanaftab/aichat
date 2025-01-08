import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        About Us
      </Typography>
      <Typography>
        Welcome to our application! We are committed to providing the best experience for our users.
      </Typography>
      <Typography>
        This is a modern web application built with React, Material-UI, and TypeScript, designed to help
        users manage their tasks efficiently and effectively.
      </Typography>
    </Box>
  );
};

export default About; 