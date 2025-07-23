import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../../stores/authStore';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  fallbackPath?: string;
  showUnauthorizedMessage?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallbackPath = '/auth/login',
  showUnauthorizedMessage = true,
}) => {
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    // Redirect to login with return URL
    return (
      <Navigate
        to={fallbackPath}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Check if user has required role
  if (requiredRole && user.role !== requiredRole) {
    if (showUnauthorizedMessage) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#dc2626',
            marginBottom: '1rem',
            fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            Access Denied
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '2rem',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            You don't have permission to access this page.
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#9ca3af',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            Required role: <strong>{requiredRole}</strong><br />
            Your role: <strong>{user.role}</strong>
          </p>
        </div>
      );
    }
    
    // Redirect to dashboard if no message should be shown
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has required role
  return <>{children}</>;
};

export default ProtectedRoute; 