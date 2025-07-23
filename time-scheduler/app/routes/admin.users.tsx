import React, { useState } from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select, type SelectOption } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  isActive: boolean;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@school.com',
    role: 'ADMIN',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@school.com',
    role: 'TEACHER',
    isActive: true,
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@school.com',
    role: 'STUDENT',
    isActive: true,
    createdAt: '2024-02-01',
  },
  {
    id: 4,
    name: 'Lisa Brown',
    email: 'lisa.brown@school.com',
    role: 'PARENT',
    isActive: false,
    createdAt: '2024-02-10',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');

  const roleOptions: SelectOption[] = [
    { value: '', label: 'All Roles' },
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'PARENT', label: 'Parent' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleToggleUserStatus = (user: User) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, isActive: !u.isActive } : u
    ));
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id ? { ...u, ...userData } : u
      ));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'STUDENT',
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers(prev => [...prev, newUser]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
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

  const filtersStyles = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap' as const,
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const thStyles = {
    backgroundColor: '#f9fafb',
    padding: '0.75rem 1rem',
    textAlign: 'left' as const,
    fontWeight: 600,
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
  };

  const tdStyles = {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#111827',
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'error';
      case 'TEACHER': return 'primary';
      case 'STUDENT': return 'success';
      case 'PARENT': return 'warning';
      default: return 'default';
    }
  };

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <Layout>
        <div style={pageStyles}>
          <div style={headerStyles}>
            <h1 style={titleStyles}>User Management</h1>
            <Button
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
            >
              Add New User
            </Button>
          </div>

          <Card>
            <CardBody>
              <div style={filtersStyles}>
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                  options={roleOptions}
                  value={roleFilter}
                  onChange={(value) => setRoleFilter(value as string)}
                  placeholder="Filter by role"
                />
              </div>

              <table style={tableStyles}>
                <thead>
                  <tr>
                    <th style={thStyles}>Name</th>
                    <th style={thStyles}>Role</th>
                    <th style={thStyles}>Status</th>
                    <th style={thStyles}>Created</th>
                    <th style={thStyles}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td style={tdStyles}>
                        <div>
                          <div style={{ fontWeight: 600, color: '#111827' }}>{user.name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</div>
                        </div>
                      </td>
                      <td style={tdStyles}>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td style={tdStyles}>
                        <Badge variant={user.isActive ? 'success' : 'error'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td style={tdStyles}>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td style={tdStyles}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditUser(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant={user.isActive ? 'outline' : 'primary'}
                            onClick={() => handleToggleUserStatus(user)}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No users found matching your criteria.
                </div>
              )}
            </CardBody>
          </Card>

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingUser(null);
            }}
            title={editingUser ? 'Edit User' : 'Add New User'}
            size="md"
          >
            <UserForm
              user={editingUser}
              onSave={handleSaveUser}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingUser(null);
              }}
            />
          </Modal>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

interface UserFormProps {
  user: User | null;
  onSave: (userData: Partial<User>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'STUDENT' as const,
  });

  const roleOptions: SelectOption[] = [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'PARENT', label: 'Parent' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  };

  const buttonStyles = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
        fullWidth
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
        fullWidth
      />

      <Select
        label="Role"
        options={roleOptions}
        value={formData.role}
        onChange={(value) => setFormData(prev => ({ ...prev, role: value as 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' }))}
        required
        fullWidth
      />

      <div style={buttonStyles}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}; 