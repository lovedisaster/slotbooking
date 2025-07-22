import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const getCardStyles = (
  variant: string = 'default',
  size: string = 'md',
  fullWidth: boolean = false
) => {
  const baseStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const variantStyles = {
    default: {
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    elevated: {
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    outlined: {
      border: '1px solid #d1d5db',
      boxShadow: 'none',
    },
    filled: {
      border: 'none',
      backgroundColor: '#f9fafb',
      boxShadow: 'none',
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

const getPaddingStyles = (padding: string = 'md') => {
  const paddingStyles = {
    none: { padding: '0' },
    sm: { padding: '0.75rem' },
    md: { padding: '1rem' },
    lg: { padding: '1.5rem' },
  };

  return paddingStyles[padding as keyof typeof paddingStyles];
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  padding = 'md',
  fullWidth = false,
  className,
}) => {
  const cardStyles = getCardStyles(variant, size, fullWidth);

  return (
    <div style={cardStyles} className={className}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  title,
  subtitle,
  action,
  className,
}) => {
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  };

  const titleStyles = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const subtitleStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: '0.25rem 0 0 0',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const contentStyles = {
    flex: 1,
  };

  return (
    <div style={headerStyles} className={className}>
      {title || subtitle ? (
        <div style={contentStyles}>
          {title && <h3 style={titleStyles}>{title}</h3>}
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      ) : (
        children
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  const bodyStyles = getPaddingStyles('md');

  return (
    <div style={bodyStyles} className={className}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  const footerStyles = {
    ...getPaddingStyles('md'),
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  };

  return (
    <div style={footerStyles} className={className}>
      {children}
    </div>
  );
};

// Compound component pattern
const CardComponent = Card as React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
};

CardComponent.Header = CardHeader;
CardComponent.Body = CardBody;
CardComponent.Footer = CardFooter;

export default CardComponent; 