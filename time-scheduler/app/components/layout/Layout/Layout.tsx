import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/authStore';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const getLayoutStyles = (sidebarOpen: boolean) => {
  return {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
};

const getMainStyles = (sidebarOpen: boolean) => {
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    marginLeft: sidebarOpen ? '280px' : '64px',
    transition: 'margin-left 200ms ease-in-out',
  };
};

const getContentStyles = () => {
  return {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto' as const,
  };
};

const getOverlayStyles = () => {
  return {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
    display: 'none',
  };
};

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [user] = useAtom(userAtom);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If no user is logged in, render without layout
  if (!user) {
    return <>{children}</>;
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSidebarClose = () => {
    setMobileMenuOpen(false);
  };

  const layoutStyles = getLayoutStyles(sidebarOpen);
  const mainStyles = getMainStyles(sidebarOpen);
  const contentStyles = getContentStyles();
  const overlayStyles = getOverlayStyles();

  return (
    <div style={layoutStyles} className={className}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose}
      />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          style={overlayStyles} 
          onClick={handleSidebarClose}
        />
      )}

      {/* Main Content */}
      <div style={mainStyles}>
        <Header 
          onSidebarToggle={handleSidebarToggle}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        
        <main style={contentStyles}>
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 200,
        }}>
          <Sidebar 
            isOpen={true} 
            onClose={handleSidebarClose}
          />
        </div>
      )}
    </div>
  );
};

export default Layout; 