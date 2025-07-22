import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../stores/authStore';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';

export default function DashboardPage() {
  const [user] = useAtom(userAtom);

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Please log in to access the dashboard</h1>
      </div>
    );
  }

  const pageStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '1rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const subtitleStyles = {
    fontSize: '1.125rem',
    color: '#6b7280',
    marginBottom: '2rem',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  };

  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'ADMIN':
        return 'Welcome to the School Administration Dashboard';
      case 'TEACHER':
        return 'Welcome to your Teacher Dashboard';
      case 'STUDENT':
        return 'Welcome to your Student Dashboard';
      case 'PARENT':
        return 'Welcome to your Parent Dashboard';
      default:
        return 'Welcome to your Dashboard';
    }
  };

  const getQuickActions = () => {
    switch (user.role) {
      case 'ADMIN':
        return [
          { label: 'Manage Users', path: '/admin/users', variant: 'primary' as const },
          { label: 'Create Schedule', path: '/admin/schedule/create', variant: 'secondary' as const },
          { label: 'View Reports', path: '/admin/reports', variant: 'outline' as const },
        ];
      case 'TEACHER':
        return [
          { label: 'View My Classes', path: '/teacher/classes', variant: 'primary' as const },
          { label: 'My Schedule', path: '/teacher/schedule', variant: 'secondary' as const },
          { label: 'Set Availability', path: '/teacher/availability', variant: 'outline' as const },
        ];
      case 'STUDENT':
        return [
          { label: 'My Schedule', path: '/student/schedule', variant: 'primary' as const },
          { label: 'My Classes', path: '/student/classes', variant: 'secondary' as const },
        ];
      case 'PARENT':
        return [
          { label: 'View Children', path: '/parent/children', variant: 'primary' as const },
          { label: 'View Schedules', path: '/parent/schedules', variant: 'secondary' as const },
        ];
      default:
        return [];
    }
  };

  const getStats = () => {
    switch (user.role) {
      case 'ADMIN':
        return [
          { label: 'Total Users', value: '1,234', change: '+12%', changeType: 'positive' as const },
          { label: 'Active Classes', value: '45', change: '+3%', changeType: 'positive' as const },
          { label: 'Schedules Created', value: '89', change: '+8%', changeType: 'positive' as const },
        ];
      case 'TEACHER':
        return [
          { label: 'My Classes', value: '6', change: '0%', changeType: 'neutral' as const },
          { label: 'Students', value: '180', change: '+5%', changeType: 'positive' as const },
          { label: 'Hours This Week', value: '25', change: '-2%', changeType: 'negative' as const },
        ];
      case 'STUDENT':
        return [
          { label: 'My Classes', value: '8', change: '0%', changeType: 'neutral' as const },
          { label: 'Hours This Week', value: '32', change: '+1%', changeType: 'positive' as const },
          { label: 'Assignments Due', value: '3', change: '+1', changeType: 'negative' as const },
        ];
      case 'PARENT':
        return [
          { label: 'Children', value: '2', change: '0%', changeType: 'neutral' as const },
          { label: 'Classes Monitored', value: '16', change: '+2%', changeType: 'positive' as const },
          { label: 'Upcoming Events', value: '5', change: '+1', changeType: 'positive' as const },
        ];
      default:
        return [];
    }
  };

  const welcomeMessage = getWelcomeMessage();
  const quickActions = getQuickActions();
  const stats = getStats();

  return (
    <Layout>
      <div style={pageStyles}>
        <h1 style={titleStyles}>{welcomeMessage}</h1>
        <p style={subtitleStyles}>
          Hello {user.name}, here's what's happening today.
        </p>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Quick Actions</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                             {quickActions.map((action, index) => (
                 <Button
                   key={index}
                   variant={action.variant}
                   as="a"
                   to={action.path}
                 >
                   {action.label}
                 </Button>
               ))}
            </div>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <div style={gridStyles}>
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280', 
                      margin: '0 0 0.5rem 0',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}>
                      {stat.label}
                    </p>
                    <p style={{ 
                      fontSize: '2rem', 
                      fontWeight: 700, 
                      color: '#111827', 
                      margin: 0,
                      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}>
                      {stat.value}
                    </p>
                  </div>
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'success' : stat.changeType === 'negative' ? 'error' : 'default'}
                    size="sm"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Recent Activity</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.375rem',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }} />
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Schedule updated for Class 10A
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: 'auto' }}>
                  2 hours ago
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.375rem',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                }} />
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                  New assignment posted in Mathematics
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: 'auto' }}>
                  4 hours ago
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.375rem',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                }} />
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Parent meeting scheduled for tomorrow
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: 'auto' }}>
                  1 day ago
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
} 