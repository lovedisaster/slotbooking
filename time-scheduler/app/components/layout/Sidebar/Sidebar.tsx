import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/authStore';
import { Badge } from '../../ui/Badge';

export interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const getSidebarStyles = (isOpen: boolean = true) => {
  return {
    width: isOpen ? '280px' : '64px',
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'width 200ms ease-in-out',
    overflow: 'hidden',
  };
};

const getHeaderStyles = () => {
  return {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };
};

const getLogoStyles = () => {
  return {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#2563eb',
    textDecoration: 'none',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    letterSpacing: '-0.025em',
  };
};

const getNavStyles = () => {
  return {
    flex: 1,
    padding: '1rem 0',
    overflowY: 'auto' as const,
  };
};

const getNavItemStyles = (isActive: boolean, hasChildren: boolean = false) => {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    color: isActive ? '#2563eb' : '#374151',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 500,
    backgroundColor: isActive ? '#eff6ff' : 'transparent',
    borderRight: isActive ? '3px solid #2563eb' : '3px solid transparent',
    transition: 'all 150ms ease-in-out',
    cursor: 'pointer',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ...(hasChildren && {
      justifyContent: 'space-between',
    }),
  };
};

const getIconStyles = () => {
  return {
    width: '20px',
    height: '20px',
    marginRight: '0.75rem',
    flexShrink: 0,
  };
};

const getChildrenStyles = () => {
  return {
    marginLeft: '2.5rem',
    borderLeft: '1px solid #e5e7eb',
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
  };
};

const getFooterStyles = () => {
  return {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  };
};

const getUserInfoStyles = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
  };
};

const getAvatarStyles = () => {
  return {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
};

const getUserDetailsStyles = () => {
  return {
    flex: 1,
    minWidth: 0,
  };
};

const getUserNameStyles = () => {
  return {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '0.125rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
};

const getUserRoleStyles = () => {
  return {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
};

// Icon components
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" fill="currentColor"/>
  </svg>
);

const ScheduleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" fill="currentColor"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12a3 3 0 100-6 3 3 0 000 6zM17 12a3 3 0 100-6 3 3 0 000 6zM1 12a3 3 0 100-6 3 3 0 000 6z" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" fill="currentColor"/>
  </svg>
);

const getNavigationItems = (role: string): SidebarItem[] => {
  const baseItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
    },
  ];

  const roleSpecificItems: Record<string, SidebarItem[]> = {
    ADMIN: [
      {
        label: 'School Management',
        path: '/admin/school',
        icon: <UsersIcon />,
        children: [
          { label: 'Users', path: '/admin/users' },
          { label: 'Classes', path: '/admin/classes' },
          { label: 'Subjects', path: '/admin/subjects' },
        ],
      },
      {
        label: 'Scheduling',
        path: '/admin/scheduling',
        icon: <ScheduleIcon />,
        children: [
          { label: 'Create Schedule', path: '/admin/schedule/create' },
          { label: 'View Schedules', path: '/admin/schedules' },
          { label: 'Constraints', path: '/admin/constraints' },
        ],
      },
      {
        label: 'Reports',
        path: '/admin/reports',
        icon: <SettingsIcon />,
      },
    ],
    TEACHER: [
      {
        label: 'My Classes',
        path: '/teacher/classes',
        icon: <UsersIcon />,
      },
      {
        label: 'Schedule',
        path: '/teacher/schedule',
        icon: <ScheduleIcon />,
      },
      {
        label: 'Availability',
        path: '/teacher/availability',
        icon: <SettingsIcon />,
      },
    ],
    STUDENT: [
      {
        label: 'My Schedule',
        path: '/student/schedule',
        icon: <ScheduleIcon />,
      },
      {
        label: 'Classes',
        path: '/student/classes',
        icon: <UsersIcon />,
      },
    ],
    PARENT: [
      {
        label: 'Children',
        path: '/parent/children',
        icon: <UsersIcon />,
      },
      {
        label: 'Schedules',
        path: '/parent/schedules',
        icon: <ScheduleIcon />,
      },
    ],
  };

  return [...baseItems, ...(roleSpecificItems[role] || [])];
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  className,
}) => {
  const location = useLocation();
  const [user] = useAtom(userAtom);

  if (!user) {
    return null;
  }

  const navigationItems = getNavigationItems(user.role);

  const renderNavItem = (item: SidebarItem, level: number = 0) => {
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.path}>
        <Link
          to={item.path}
          style={getNavItemStyles(isActive, hasChildren)}
          onClick={onClose}
        >
          {item.icon && <span style={getIconStyles()}>{item.icon}</span>}
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge && (
            <Badge size="sm" variant="primary">
              {item.badge}
            </Badge>
          )}
        </Link>
        
        {hasChildren && (
          <div style={getChildrenStyles()}>
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarStyles = getSidebarStyles(isOpen);

  return (
    <div style={sidebarStyles} className={className}>
      <div style={getHeaderStyles()}>
        <Link to="/" style={getLogoStyles()}>
          {isOpen ? 'School Scheduler' : 'SS'}
        </Link>
      </div>

      <nav style={getNavStyles()}>
        {navigationItems.map(item => renderNavItem(item))}
      </nav>

      <div style={getFooterStyles()}>
        <div style={getUserInfoStyles()}>
          <div style={getAvatarStyles()}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          {isOpen && (
            <div style={getUserDetailsStyles()}>
              <div style={getUserNameStyles()}>{user.name}</div>
              <div style={getUserRoleStyles()}>{user.role}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 