import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  dot?: boolean;
  className?: string;
}

const getBadgeStyles = (
  variant: string = 'default',
  size: string = 'md',
  rounded: boolean = false,
  dot: boolean = false
) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    whiteSpace: 'nowrap' as const,
    borderRadius: rounded ? '9999px' : '0.375rem',
  };

  const sizeStyles = {
    sm: {
      padding: dot ? '0.125rem 0.375rem' : '0.125rem 0.5rem',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      minHeight: '1.25rem',
    },
    md: {
      padding: dot ? '0.25rem 0.5rem' : '0.25rem 0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      minHeight: '1.5rem',
    },
    lg: {
      padding: dot ? '0.375rem 0.75rem' : '0.375rem 1rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      minHeight: '1.75rem',
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
    },
    primary: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
    },
    success: {
      backgroundColor: '#dcfce7',
      color: '#166534',
    },
    warning: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
    },
    error: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
    },
    info: {
      backgroundColor: '#e0f2fe',
      color: '#0c4a6e',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

const getDotStyles = (variant: string = 'default', size: string = 'md') => {
  const dotSize = size === 'sm' ? '0.375rem' : size === 'lg' ? '0.5rem' : '0.4375rem';

  const variantColors = {
    default: '#6b7280',
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  };

  return {
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    backgroundColor: variantColors[variant as keyof typeof variantColors],
    marginRight: '0.375rem',
    flexShrink: 0,
  };
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  dot = false,
  className,
}) => {
  const badgeStyles = getBadgeStyles(variant, size, rounded, dot);

  return (
    <span style={badgeStyles} className={className}>
      {dot && <span style={getDotStyles(variant, size)} />}
      {children}
    </span>
  );
};

export default Badge; 