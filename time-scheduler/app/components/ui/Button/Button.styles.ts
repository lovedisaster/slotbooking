import styled, { css } from 'styled-components';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  as?: React.ElementType;
}

const getVariantStyles = (variant: ButtonProps['variant'] = 'primary') => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary[600]};
        color: ${({ theme }) => theme.colors.text.inverse};
        border: 1px solid ${({ theme }) => theme.colors.primary[600]};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary[700]};
          border-color: ${({ theme }) => theme.colors.primary[700]};
        }

        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.secondary[600]};
        color: ${({ theme }) => theme.colors.text.inverse};
        border: 1px solid ${({ theme }) => theme.colors.secondary[600]};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.secondary[700]};
          border-color: ${({ theme }) => theme.colors.secondary[700]};
        }

        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondary[100]};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary[600]};
        border: 1px solid ${({ theme }) => theme.colors.primary[600]};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary[50]};
        }

        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.text.primary};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.gray[100]};
        }

        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[100]};
        }
      `;
    case 'danger':
      return css`
        background-color: ${({ theme }) => theme.colors.error.main};
        color: ${({ theme }) => theme.colors.text.inverse};
        border: 1px solid ${({ theme }) => theme.colors.error.main};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.error.dark};
          border-color: ${({ theme }) => theme.colors.error.dark};
        }

        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.error.light};
        }
      `;
    default:
      return css``;
  }
};

const getSizeStyles = (size: ButtonProps['size'] = 'md') => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
        font-size: ${({ theme }) => theme.typography.fontSize.sm};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
      `;
    case 'md':
      return css`
        padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
        font-size: ${({ theme }) => theme.typography.fontSize.base};
        border-radius: ${({ theme }) => theme.borderRadius.base};
      `;
    case 'lg':
      return css`
        padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
        font-size: ${({ theme }) => theme.typography.fontSize.lg};
        border-radius: ${({ theme }) => theme.borderRadius.lg};
      `;
    default:
      return css``;
  }
};

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  user-select: none;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }
`; 