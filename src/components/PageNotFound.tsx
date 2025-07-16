import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(45deg, #f3f4f6 30%, #e5e7eb 90%)',
  padding: theme.spacing(2),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: 700,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '4rem',
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const HomeButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 3),
    fontSize: '0.9rem',
  },
}));

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ErrorCode variant="h1">404</ErrorCode>
      <ErrorMessage variant="h5">
        Oops! The page you're looking for doesn't exist.
      </ErrorMessage>
      <HomeButton
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Back to Home
      </HomeButton>
    </PageContainer>
  );
};

export default PageNotFound;