import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getUser from '../../api/getUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 0.5rem; */
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;
const EmailError = styled.div`
  color: red;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top:0.25rem;
  margin-left: 0.75rem;
  `;
const PasswordError = styled.div`
  color: red;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top:0.25rem;
  margin-left: 0.75rem;
`;

const RememberForgot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border-color: #d1d5db;
  color: #2563eb;
`;

const Link = styled.a`
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #1d4ed8;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailE, setEmailE] = useState('');
  const [passwordE, setPasswordE] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailE('');
    setPasswordE('');

    const axios = getUser;

    try {
      // Get CSRF cookie
      await axios.get('/sanctum/csrf-cookie');

      // Attempt to login
      const response = await axios.post("/api/login", {email, password});

      if (response.status === 200) {
        const { user, token, user_type } = response.data;

        // Save to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        if (user_type) {
          localStorage.setItem('user_type', user_type);
        }

        // Set the default authorization header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // dispatch(setUser(user)); // Uncomment if using Redux

        // Navigate based on role
        const role = user?.role || user_type;
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'company':
            navigate('/company/dashboard');
            break;
          case 'student':
            navigate('/student/dashboard');
            break;
          default:
            navigate('/login');
        }
      }
    } catch (error) {
      if (error.response) {
        const msg = error.response.data.error;
        if (error.response.status === 422) {
          if (msg.includes('Email')) {
            setEmailE(msg);
          } else if (msg.includes('password')) {
            setPasswordE(msg);
          } else {
            setPasswordE(msg || 'Invalid credentials.');
          }
        } else if (error.response.status === 401) {
          setPasswordE(msg);
        } else {
          setPasswordE("An unexpected error occurred.");
        }
      } else {
        console.error("Login error:", error);
        setPasswordE("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <EmailError>{emailE}</EmailError>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <PasswordError>{passwordE}</PasswordError>
      </FormGroup>

      <RememberForgot>
        <CheckboxContainer>
          <Checkbox
            id="remember-me"
            name="remember-me"
            type="checkbox"
          />
          Remember me
        </CheckboxContainer>

        <Link href="#">Forgot password?</Link>
      </RememberForgot>

      <Button type="submit">{isSubmitting ? 'Signing in ...' : 'Sign In'}</Button>
    </Form>
  );
};

export default SignIn;