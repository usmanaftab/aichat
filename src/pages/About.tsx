import { Box, Card, CardContent, Container, Grid2, Typography } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Welcome to AI Chat!
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            AI ChatHub is an interactive platform designed to showcase the power of AI while highlighting a fully integrated full-stack web application. Whether you're here to explore AI's conversational capabilities, test advanced models, or enjoy engaging chats, this is the perfect place to start.
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            What You Can Do:
          </Typography>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="h6">Create Your Profile</Typography>
                <Typography variant="body2" color="textSecondary">
                  Begin your journey by signing up and creating your personalized profile. It's quick, secure, and ensures a tailored experience.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="h6">Engage with AI</Typography>
                <Typography variant="body2" color="textSecondary">
                  Interact with an intelligent AI model <strong>(Meta Llama 3.2)</strong> designed for meaningful and dynamic conversations. Each user is allowed up to <strong>15 requests per day</strong>, giving you the freedom to explore the AI's full potential.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="h6">Secure and Private Communication</Typography>
                <Typography variant="body2" color="textSecondary">
                  All interactions are encrypted with <strong>end-to-end security</strong>, ensuring your data and conversations remain private.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="h6">Manage Chat History</Typography>
                <Typography variant="body2" color="textSecondary">
                  Access your recent interactions effortlessly. Chat histories are stored for <strong>2 days</strong> and are automatically deleted afterward to enhance privacy and optimize system performance.
                </Typography>
              </Box>
            </Grid2>
          </Grid2>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Cutting-Edge Technology:
          </Typography>
          <Box>
            <Typography variant="body1" color="textSecondary">
              <strong>Frontend:</strong> Built with <strong>React</strong> and <strong>TypeScript</strong>, the website offers a seamless and dynamic user experience. The design leverages <strong>Material UI</strong> for responsive and aesthetically pleasing layouts across all devices.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Backend:</strong> A reliable backend powered by <strong>Python Flask</strong> and <strong>MongoDB</strong> ensures secure data handling and efficient performance.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Deployment:</strong> The frontend is deployed as a <strong>Single Page Application (SPA)</strong> on <strong>GitHub Pages</strong> for accessibility and speed. The backend server is hosted on <strong>AWS Elastic Beanstalk</strong>, providing scalability and reliability.
            </Typography>
          </Box>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Why AI Chat?
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            AI ChatHub is not just a demonstration of AI—it’s a showcase of modern full-stack web development. Combining the latest in <strong>AI technology</strong>, <strong>responsive design</strong>, and <strong>secure architecture</strong>, this platform provides a glimpse into the future of intelligent and interactive web applications.
          </Typography>
          <Typography variant="h6" color="primary">
            Start your journey today and experience the perfect blend of AI innovation and full-stack engineering!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;