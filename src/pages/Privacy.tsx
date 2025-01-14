import { Card, CardContent, Container, Grid2, Typography } from '@mui/material';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            This Privacy Policy describes how we handle your personal information in compliance with EU laws.
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Information Collection and Use
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            We collect and use your personal information only to operate the website and provide our services. The information we collect includes:
          </Typography>
          <Grid2 container spacing={2} sx={{ pl: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">• User Name</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">• Email Address</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">• Cookies</Typography>
            </Grid2>
          </Grid2>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Cookies
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            We use necessary cookies to operate the website. These cookies do not share user information with any third party. The cookies we use include:
          </Typography>
          <Grid2 container spacing={2} sx={{ pl: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">
                • <strong>Session Cookies:</strong> Used to maintain your session and login state.
              </Typography>
            </Grid2>
          </Grid2>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Data Retention
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            We do not keep chat history for more than 2 days. Users have the right to delete their account along with all chat history at any time.
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            User Rights
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            Users have the following rights regarding their personal data:
          </Typography>
          <Grid2 container spacing={2} sx={{ pl: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">• <strong>Right to Access:</strong> You have the right to request access to your personal data.</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">• <strong>Right to Rectification:</strong> You have the right to request correction of any inaccurate or incomplete data.</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="body2">• <strong>Right to Erasure:</strong> You have the right to request deletion of your personal data.</Typography>
            </Grid2>
          </Grid2>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:usman.aftab@gmail.com" target='top'>usman.aftab@gmail.com</a>.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;