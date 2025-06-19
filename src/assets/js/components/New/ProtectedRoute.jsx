import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    // If no token or user, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect to their default dashboard
    let redirectTo = '/'; // Fallback
    switch (user.role) {
      case 'admin':
        redirectTo = '/admin/dashboard';
        break;
      case 'company':
        redirectTo = '/company/dashboard';
        break;
      case 'student':
        redirectTo = '/student/dashboard';
        break;
    }
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated and has the correct role, render the component
  return <Outlet />;
};

export default ProtectedRoute;
