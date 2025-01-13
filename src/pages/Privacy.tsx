import { Container, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        This Privacy Policy describes how we handle your personal information in compliance with EU laws.
      </Typography>

      <Divider />

      <Typography variant="h4" gutterBottom>
        Information Collection and Use
      </Typography>
      <Typography variant="body1" paragraph>
        We collect and use your personal information only to operate the website and provide our services. The information we collect includes:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="User Name" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email Address" />
        </ListItem>
      </List>

      <Divider />

      <Typography variant="h4" gutterBottom>
        Cookies
      </Typography>
      <Typography variant="body1" paragraph>
        We use necessary cookies to operate the website. These cookies do not share user information with any third party. The cookies we use include:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Session Cookies" secondary="Used to maintain your session and login state." />
        </ListItem>
      </List>

      <Divider />

      <Typography variant="h4" gutterBottom>
        Data Retention
      </Typography>
      <Typography variant="body1" paragraph>
        We do not keep chat history for more than 2 days. Users have the right to delete their account along with all chat history at any time.
      </Typography>

      <Divider />

      <Typography variant="h4" gutterBottom>
        User Rights
      </Typography>
      <Typography variant="body1" paragraph>
        Users have the following rights regarding their personal data:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Right to Access" secondary="You have the right to request access to your personal data." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Right to Rectification" secondary="You have the right to request correction of any inaccurate or incomplete data." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Right to Erasure" secondary="You have the right to request deletion of your personal data." />
        </ListItem>
      </List>

      <Divider />

      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:usman.aftab@gmail.com" target="_top">usman.aftab@gmail.com</a>
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;