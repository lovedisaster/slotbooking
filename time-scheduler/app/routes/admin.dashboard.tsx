import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../stores/authStore';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';

export default function AdminDashboardPage() {
  const [user] = useAtom(userAtom);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>You need admin privileges to access this page.</p>
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

  return (
    <Layout>
      <div style={pageStyles}>
        <h1 style={titleStyles}>Administration Dashboard</h1>
        <p style={subtitleStyles}>
          Manage your school's scheduling system and user accounts.
        </p>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Quick Actions</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" as="a" to="/admin/users">
                Manage Users
              </Button>
              <Button variant="secondary" as="a" to="/admin/schedule/create">
                Create Schedule
              </Button>
              <Button variant="outline" as="a" to="/admin/classes">
                Manage Classes
              </Button>
              <Button variant="outline" as="a" to="/admin/reports">
                View Reports
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <div style={gridStyles}>
          <Card>
            <CardBody>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280', 
                    margin: '0 0 0.5rem 0',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    Total Users
                  </p>
                  <p style={{ 
                    fontSize: '2rem', 
                    fontWeight: 700, 
                    color: '#111827', 
                    margin: 0,
                    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    1,234
                  </p>
                </div>
                <Badge variant="success" size="sm">
                  +12%
                </Badge>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280', 
                    margin: '0 0 0.5rem 0',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    Active Classes
                  </p>
                  <p style={{ 
                    fontSize: '2rem', 
                    fontWeight: 700, 
                    color: '#111827', 
                    margin: 0,
                    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    45
                  </p>
                </div>
                <Badge variant="success" size="sm">
                  +3%
                </Badge>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280', 
                    margin: '0 0 0.5rem 0',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    Schedules Created
                  </p>
                  <p style={{ 
                    fontSize: '2rem', 
                    fontWeight: 700, 
                    color: '#111827', 
                    margin: 0,
                    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    89
                  </p>
                </div>
                <Badge variant="success" size="sm">
                  +8%
                </Badge>
              </div>
            </CardBody>
          </Card>
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
                  New teacher account created: Sarah Johnson
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: 'auto' }}>
                  1 hour ago
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
                  backgroundColor: '#f59e0b',
                }} />
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                  New classroom added: Room 205
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: 'auto' }}>
                  3 hours ago
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
} 