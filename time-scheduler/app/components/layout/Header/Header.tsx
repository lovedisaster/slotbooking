import React from 'react';
import { Link } from 'react-router';
import { useAtom } from 'jotai';
import { userAtom, logoutAtom } from '../../../stores/authStore';
import { Button } from '../../ui/Button';

const headerStyles = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  height: '64px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
  zIndex: 1100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1.5rem',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
};

const logoStyles = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#2563eb',
  textDecoration: 'none',
  fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.025em',
};

const navStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const userInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontSize: '0.875rem',
  color: '#4b5563',
};

export interface HeaderProps {
  onSidebarToggle?: () => void;
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSidebarToggle,
  onMobileMenuToggle,
}) => {
  const [user] = useAtom(userAtom);
  const [, logout] = useAtom(logoutAtom);

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={headerStyles}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {onSidebarToggle && (
          <button
            onClick={onSidebarToggle}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4h14M3 10h14M3 16h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Open mobile menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4h14M3 10h14M3 16h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        
        <Link to="/" style={logoStyles}>School Scheduler</Link>
      </div>
      
      <nav style={navStyles}>
        {user ? (
          <>
            <div style={userInfoStyles}>
              <span>Welcome, {user.name}</span>
              <span>({user.role})</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" as={Link} to="/auth/login">
              Login
            </Button>
            <Button variant="primary" size="sm" as={Link} to="/auth/register">
              Register
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 