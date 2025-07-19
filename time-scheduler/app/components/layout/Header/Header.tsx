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

export const Header: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [, logout] = useAtom(logoutAtom);

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={headerStyles}>
      <div style={logoStyles}>
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