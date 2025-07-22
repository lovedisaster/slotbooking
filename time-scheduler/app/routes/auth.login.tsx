import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { userAtom, loginAtom } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select, type SelectOption } from '../components/ui/Select';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [, login] = useAtom(loginAtom);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions: SelectOption[] = [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'PARENT', label: 'Parent' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login - in real app, this would be an API call
      const mockUser = {
        id: 1,
        email: formData.email,
        name: formData.email.split('@')[0], // Use email prefix as name
        role: formData.role as 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT',
        avatar: undefined,
        phone: undefined,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      login({ email: formData.email, password: formData.password, role: formData.role });
      
      // Redirect based on role
      switch (formData.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'TEACHER':
          navigate('/teacher/dashboard');
          break;
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        case 'PARENT':
          navigate('/parent/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f9fafb',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const containerStyles = {
    width: '100%',
    maxWidth: '400px',
  };

  const headerStyles = {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.5rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const subtitleStyles = {
    fontSize: '1rem',
    color: '#6b7280',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  };

  const footerStyles = {
    textAlign: 'center' as const,
    marginTop: '2rem',
    color: '#6b7280',
    fontSize: '0.875rem',
  };

  const linkStyles = {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 500,
  };

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h1 style={titleStyles}>Welcome Back</h1>
          <p style={subtitleStyles}>Sign in to your School Time Scheduler account</p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} style={formStyles}>
              {errors.general && (
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                }}>
                  {errors.general}
                </div>
              )}

              <Select
                label="Role"
                options={roleOptions}
                value={formData.role}
                onChange={(value) => handleInputChange('role', value as string)}
                placeholder="Select your role"
                error={errors.role}
                required
                fullWidth
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                error={errors.email}
                required
                fullWidth
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                error={errors.password}
                required
                fullWidth
              />

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardBody>
        </Card>

        <div style={footerStyles}>
          <p>
            Don't have an account?{' '}
            <Link to="/auth/register" style={linkStyles}>
              Sign up here
            </Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <Link to="/auth/forgot-password" style={linkStyles}>
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 