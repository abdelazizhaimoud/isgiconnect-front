import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Groups from '../components/New/Groups/Groups';
import GroupDetail from '../components/New/Groups/GroupDetail';
import GroupMembers from '../components/New/Groups/GroupMembers';
import GroupSettings from '../components/New/Groups/GroupSettings';
import ProtectedRoute from '../components/New/ProtectedRoute';

const GroupLayout = () => {
    return (
        <ProtectedRoute allowedRoles={['student']}>
            <Outlet />
        </ProtectedRoute>
    );
};

const GroupRoutes = () => {
    return (
        <Routes>
            <Route element={<GroupLayout />}>
                {/* Main groups list */}
                <Route index element={<Groups />} />
                
                {/* Group detail routes */}
                <Route path=":groupId" element={<GroupDetail />}>
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<GroupDetail />} />
                    <Route path="members" element={<GroupMembers />} />
                    <Route 
                        path="settings" 
                        element={
                            <ProtectedRoute allowedRoles={['group_admin']}>
                                <GroupSettings />
                            </ProtectedRoute>
                        } 
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default GroupRoutes;
