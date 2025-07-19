import React from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router';
import { Button } from '../../ui/Button';
import { userAtom, logoutAtom } from '../../../stores/authStore';
import { HeaderContainer, Logo, Nav, UserInfo } from './Header.styles';

export const Header: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [, logout] = useAtom(logoutAtom);

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">School Scheduler</Link>
      </Logo>
      
      <Nav>
        {user ? (
          <>
            <UserInfo>
              <span>Welcome, {user.name}</span>
              <span>({user.role})</span>
            </UserInfo>
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
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 