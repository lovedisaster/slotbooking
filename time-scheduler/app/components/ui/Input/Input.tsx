import React, { forwardRef } from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

const getInputStyles = (
  size: string = 'md',
  variant: string = 'default',
  fullWidth: boolean = false,
  disabled: boolean = false
) => {
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: '1px solid',
    borderRadius: '0.375rem',
    transition: 'all 150ms ease-in-out',
    outline: 'none',
    backgroundColor: disabled ? '#f9fafb' : '#ffffff',
    color: disabled ? '#6b7280' : '#111827',
  };

  const sizeStyles = {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      minHeight: '32px',
    },
    md: {
      padding: '0.5rem 0.75rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      minHeight: '40px',
    },
    lg: {
      padding: '0.75rem 1rem',
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      minHeight: '48px',
    },
  };

  const variantStyles = {
    default: {
      borderColor: '#d1d5db',
      '&:hover': {
        borderColor: '#9ca3af',
      },
      '&:focus': {
        borderColor: '#2563eb',
        boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
      },
    },
    error: {
      borderColor: '#ef4444',
      '&:hover': {
        borderColor: '#dc2626',
      },
      '&:focus': {
        borderColor: '#dc2626',
        boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
      },
    },
    success: {
      borderColor: '#22c55e',
      '&:hover': {
        borderColor: '#16a34a',
      },
      '&:focus': {
        borderColor: '#16a34a',
        boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.1)',
      },
    },
    warning: {
      borderColor: '#f59e0b',
      '&:hover': {
        borderColor: '#d97706',
      },
      '&:focus': {
        borderColor: '#d97706',
        boxShadow: '0 0 0 3px rgba(217, 119, 6, 0.1)',
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

const getLabelStyles = (size: string = 'md', variant: string = 'default') => {
  const baseStyles = {
    display: 'block',
    fontWeight: 500,
    marginBottom: '0.375rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sizeStyles = {
    sm: { fontSize: '0.875rem' },
    md: { fontSize: '0.875rem' },
    lg: { fontSize: '1rem' },
  };

  const variantStyles = {
    default: { color: '#374151' },
    error: { color: '#dc2626' },
    success: { color: '#16a34a' },
    warning: { color: '#d97706' },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

const getHelperTextStyles = (size: string = 'md', variant: string = 'default') => {
  const baseStyles = {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const variantStyles = {
    default: { color: '#6b7280' },
    error: { color: '#dc2626' },
    success: { color: '#16a34a' },
    warning: { color: '#d97706' },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      readOnly = false,
      required = false,
      name,
      id,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      leftIcon,
      rightIcon,
      label,
      helperText,
      error,
      className,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      ...props
    },
    ref
  ) => {
    const inputVariant = error ? 'error' : variant;
    const inputStyles = getInputStyles(size, inputVariant, fullWidth, disabled);
    const labelStyles = getLabelStyles(size, inputVariant);
    const helperTextStyles = getHelperTextStyles(size, inputVariant);

    const containerStyles = {
      display: 'flex',
      flexDirection: 'column' as const,
      width: fullWidth ? '100%' : 'auto',
    };

    const inputContainerStyles = {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
    };

    const iconStyles = {
      position: 'absolute' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280',
      zIndex: 10,
    };

    const leftIconStyles = {
      ...iconStyles,
      left: '0.75rem',
    };

    const rightIconStyles = {
      ...iconStyles,
      right: '0.75rem',
    };

    const inputWithIconStyles = {
      ...inputStyles,
      paddingLeft: leftIcon ? (size === 'sm' ? '2.25rem' : size === 'lg' ? '3rem' : '2.5rem') : (inputStyles as any).paddingLeft,
      paddingRight: rightIcon ? (size === 'sm' ? '2.25rem' : size === 'lg' ? '3rem' : '2.5rem') : (inputStyles as any).paddingRight,
    };

    return (
      <div style={containerStyles} className={className}>
        {label && (
          <label htmlFor={id} style={labelStyles}>
            {label}
            {required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
          </label>
        )}
        
        <div style={inputContainerStyles}>
          {leftIcon && (
            <div style={leftIconStyles}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            style={inputWithIconStyles}
            {...props}
          />
          
          {rightIcon && (
            <div style={rightIconStyles}>
              {rightIcon}
            </div>
          )}
        </div>
        
        {(helperText || error) && (
          <div style={helperTextStyles}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 