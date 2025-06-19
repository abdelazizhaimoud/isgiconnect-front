import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import CompanySidebar from '../../assets/js/components/New/Company/CompanySidebar';
import CompanyHeader from '../../assets/js/components/New/Company/CompanyHeader';

const DashboardLayout = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  padding: 24px 48px;
  flex-grow: 1;
`;

const CompanyDashboard = () => {
  return (
    <DashboardLayout>
      <CompanySidebar />
      <MainContent>
        <CompanyHeader />
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </DashboardLayout>
  );
};

export default CompanyDashboard; 