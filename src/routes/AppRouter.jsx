import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import TasksPage from '../pages/TasksPage';

export function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default AppRouter;
