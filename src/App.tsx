import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { ProjectManagerDashboard } from './components/ProjectManagerDashboard';
import { InsuranceDashboard } from './components/InsuranceDashboard';

type UserRole = 'Prosjektleder' | 'Forsikringsselskap' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  const handleLogin = (role: 'Prosjektleder' | 'Forsikringsselskap') => {
    setUserRole(role);
  };
  
  const handleLogout = () => {
    setUserRole(null);
  };
  
  // Show login page if not logged in
  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  // Show appropriate dashboard based on role
  if (userRole === 'Prosjektleder') {
    return <ProjectManagerDashboard onLogout={handleLogout} />;
  }
  
  if (userRole === 'Forsikringsselskap') {
    return <InsuranceDashboard onLogout={handleLogout} />;
  }
  
  return null;
}
