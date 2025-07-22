import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select, type SelectOption } from '../components/ui/Select';
import { Card, CardBody } from '../components/ui/Card';

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions: SelectOption[] = [
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      
      // Mock registration - in real app, this would be an API call
      console.log('Registration successful:', formData);
      
      // Redirect to login page
      navigate('/auth/login');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
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
          <h1 style={titleStyles}>Create Account</h1>
          <p style={subtitleStyles}>Join the School Time Scheduler platform</p>
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

              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                error={errors.name}
                required
                fullWidth
              />

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
                placeholder="Create a password"
                error={errors.password}
                required
                fullWidth
              />

              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
                fullWidth
              />

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardBody>
        </Card>

        <div style={footerStyles}>
          <p>
            Already have an account?{' '}
            <Link to="/auth/login" style={linkStyles}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 