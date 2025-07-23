import React, { useState } from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Class {
  id: number;
  name: string;
  subject: string;
  grade: string;
  students: number;
  schedule: string;
  room: string;
  status: 'active' | 'completed' | 'upcoming';
}

const mockClasses: Class[] = [
  {
    id: 1,
    name: 'Mathematics 101',
    subject: 'Mathematics',
    grade: '10th Grade',
    students: 25,
    schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM',
    room: 'Room 201',
    status: 'active',
  },
  {
    id: 2,
    name: 'Advanced Algebra',
    subject: 'Mathematics',
    grade: '11th Grade',
    students: 18,
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    room: 'Room 205',
    status: 'active',
  },
  {
    id: 3,
    name: 'Calculus Prep',
    subject: 'Mathematics',
    grade: '12th Grade',
    students: 15,
    schedule: 'Mon, Wed 2:00 PM - 3:30 PM',
    room: 'Room 210',
    status: 'upcoming',
  },
];

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredClasses = classes.filter(cls => 
    selectedStatus === 'all' || cls.status === selectedStatus
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'default';
      case 'upcoming': return 'warning';
      default: return 'default';
    }
  };

  const pageStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const filterStyles = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  };

  const cardStyles = {
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    transition: 'all 150ms ease-in-out',
  };

  const cardHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  };

  const cardTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 0.5rem 0',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const cardSubtitleStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const infoGridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const infoItemStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  };

  const infoLabelStyles = {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  };

  const infoValueStyles = {
    fontSize: '0.875rem',
    color: '#111827',
    fontWeight: 500,
  };

  const actionStyles = {
    display: 'flex',
    gap: '0.5rem',
  };

  return (
    <ProtectedRoute requiredRole="TEACHER">
      <Layout>
        <div style={pageStyles}>
          <div style={headerStyles}>
            <h1 style={titleStyles}>My Classes</h1>
            <Button>
              View Schedule
            </Button>
          </div>

          <div style={filterStyles}>
            <Button
              variant={selectedStatus === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('all')}
            >
              All Classes
            </Button>
            <Button
              variant={selectedStatus === 'active' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={selectedStatus === 'upcoming' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={selectedStatus === 'completed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('completed')}
            >
              Completed
            </Button>
          </div>

          <div style={gridStyles}>
            {filteredClasses.map(cls => (
              <Card key={cls.id} variant="outlined">
                <CardBody>
                  <div style={cardHeaderStyles}>
                    <div>
                      <h3 style={cardTitleStyles}>{cls.name}</h3>
                      <p style={cardSubtitleStyles}>{cls.subject} • {cls.grade}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(cls.status)}>
                      {cls.status}
                    </Badge>
                  </div>

                  <div style={infoGridStyles}>
                    <div style={infoItemStyles}>
                      <span style={infoLabelStyles}>Students</span>
                      <span style={infoValueStyles}>{cls.students}</span>
                    </div>
                    <div style={infoItemStyles}>
                      <span style={infoLabelStyles}>Room</span>
                      <span style={infoValueStyles}>{cls.room}</span>
                    </div>
                    <div style={infoItemStyles}>
                      <span style={infoLabelStyles}>Schedule</span>
                      <span style={infoValueStyles}>{cls.schedule}</span>
                    </div>
                  </div>

                  <div style={actionStyles}>
                    <Button size="sm" variant="outline" fullWidth>
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" fullWidth>
                      Manage Students
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <Card>
              <CardBody>
                <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No classes found matching your criteria.
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
} 