import React from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.styles';

export interface ButtonComponentProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  to?: string;
}

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
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      as={as}
      {...(to && { to })}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 