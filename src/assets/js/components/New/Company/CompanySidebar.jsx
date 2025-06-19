import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiAddBoxLine, RiFileList2Line, RiUserSearchLine, RiBarChart2Line, RiLogoutBoxRLine } from '@remixicon/react';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
`;

const LogoContainer = styled.div`
  padding: 0 24px 24px 24px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
`;

const Menu = styled.nav`
  flex-grow: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => (props.$isActive ? '#1d4ed8' : '#4b5563')};
  background-color: ${props => (props.$isActive ? '#eff6ff' : 'transparent')};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #eff6ff;
    color: #1d4ed8;
  }

  svg {
    color: ${props => (props.$isActive ? '#2563eb' : '#9ca3af')};
  }
`;

const LogoutButton = styled(MenuItem)`
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
  margin: 24px 16px 0 16px;
  border-radius: 0;
`;

const CompanySidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/company/dashboard/create-posting', icon: <RiAddBoxLine size={20} />, text: 'Create Job Posting' },
    { path: '/company/dashboard/job-postings', icon: <RiFileList2Line size={20} />, text: 'View Job Postings' },
    { path: '/company/dashboard/applications', icon: <RiUserSearchLine size={20} />, text: 'Manage Applications' },
    { path: '/company/dashboard/analytics', icon: <RiBarChart2Line size={20} />, text: 'Recruitment Analytics' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <LogoContainer>ISGI CONNECT</LogoContainer>
      <Menu>
        {menuItems.map(item => (
          <MenuItem
            key={item.path}
            $isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.text}</span>
          </MenuItem>
        ))}
      </Menu>
      <LogoutButton onClick={handleLogout}>
        <RiLogoutBoxRLine size={20} />
        <span>Logout</span>
      </LogoutButton>
    </SidebarContainer>
  );
};

export default CompanySidebar;
