import React from 'react';
import styled from 'styled-components';
import { RiLogoutBoxRLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #4b5563;
  transition: color 0.2s;

  &:hover {
    color: #1d4ed8;
  }
`;

const CompanyHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Title>Company Dashboard</Title>
      <LogoutButton onClick={handleLogout}>
        <RiLogoutBoxRLine size={20} />
        <span>Logout</span>
      </LogoutButton>
    </HeaderContainer>
  );
};

export default CompanyHeader;
