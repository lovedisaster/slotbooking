import React from 'react';

export interface ButtonComponentProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  as?: React.ElementType;
}

const getButtonStyles = (variant: string = 'primary', size: string = 'md', fullWidth: boolean = false) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: 'all 150ms ease-in-out',
    cursor: 'pointer',
    userSelect: 'none' as const,
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    borderRadius: '0.25rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    letterSpacing: '-0.025em',
  };

  const sizeStyles = {
    sm: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.5rem 1rem', fontSize: '1rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: '1px solid #2563eb',
    },
    secondary: {
      backgroundColor: '#16a34a',
      color: '#ffffff',
      border: '1px solid #16a34a',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#2563eb',
      border: '1px solid #2563eb',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#111827',
      border: '1px solid transparent',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      border: '1px solid #ef4444',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

export const Button: React.FC<ButtonComponentProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  as,
  to,
  ...props
}) => {
  const styles = getButtonStyles(variant, size, fullWidth);
  
  if (disabled) {
    (styles as any).opacity = 0.5;
    (styles as any).cursor = 'not-allowed';
    (styles as any).pointerEvents = 'none';
  }

  const Component = as || 'button';
  
  return (
    <Component
      style={styles}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...(to && { to })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button; 