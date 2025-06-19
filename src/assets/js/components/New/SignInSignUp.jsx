import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Loader from './Loader.jsx';
import auth from '../../secured/auth.js';
import { useDispatch } from 'react-redux';
import { set_user } from './Store/actions';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.span`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button`
  flex: 1;
  padding-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  color: ${props => props.$active ? '#2563eb' : '#6b7280'};
  border-bottom: ${props => props.$active ? '2px solid #2563eb' : 'none'};
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: ${props => props.$active ? '#2563eb' : '#374151'};
  }
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SignInSignUp({flag}) {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();

  // ---------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const authResult = await auth(dispatch); // auth() should return user object or null
      if (authResult) {
        const userType = localStorage.getItem('user_type');
        if (userType === 'student') {
          navigate('/student/dashboard');
        } else if (userType === 'admin') {
          navigate('/admin/dashboard');
        } else if (userType === 'company') {
          navigate('/company/dashboard');
        }
      } else {
        // If not authenticated, show the login/signup page
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, dispatch]);
  // ---------------------------------------------------------------------

  useEffect(() => {
    if (flag) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, [flag]);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <Card>
        <Logo>
          <LogoText>ISGI CONNECT</LogoText>
        </Logo>

        <FormContainer>
          <TabContainer>
            <Tab $active={isSignIn} onClick={() => [setIsSignIn(true),navigate('/login')]}>
              <TabContent>Sign In</TabContent>
            </Tab>
            <Tab $active={!isSignIn} onClick={() => [setIsSignIn(false),navigate('/signup')]}>
              <TabContent>Sign Up</TabContent>
            </Tab>
          </TabContainer>

          {isSignIn ? <SignIn /> : <SignUp />}
        </FormContainer>
      </Card>
    </Container>
  );
}

export default SignInSignUp;