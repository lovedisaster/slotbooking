import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
  fullWidth?: boolean;
  className?: string;
}

const getSelectStyles = (
  size: string = 'md',
  variant: string = 'default',
  fullWidth: boolean = false,
  disabled: boolean = false
) => {
  const baseStyles = {
    position: 'relative' as const,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sizeStyles = {
    sm: { fontSize: '0.875rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.125rem' },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
  };
};

const getTriggerStyles = (
  size: string = 'md',
  variant: string = 'default',
  disabled: boolean = false
) => {
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    border: '1px solid',
    borderRadius: '0.375rem',
    backgroundColor: disabled ? '#f9fafb' : '#ffffff',
    color: disabled ? '#6b7280' : '#111827',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 150ms ease-in-out',
    outline: 'none',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sizeStyles = {
    sm: {
      padding: '0.375rem 0.75rem',
      minHeight: '32px',
    },
    md: {
      padding: '0.5rem 0.75rem',
      minHeight: '40px',
    },
    lg: {
      padding: '0.75rem 1rem',
      minHeight: '48px',
    },
  };

  const variantStyles = {
    default: {
      borderColor: '#d1d5db',
      '&:hover': disabled ? {} : { borderColor: '#9ca3af' },
      '&:focus': disabled ? {} : { borderColor: '#2563eb', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)' },
    },
    error: {
      borderColor: '#ef4444',
      '&:hover': disabled ? {} : { borderColor: '#dc2626' },
      '&:focus': disabled ? {} : { borderColor: '#dc2626', boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)' },
    },
    success: {
      borderColor: '#22c55e',
      '&:hover': disabled ? {} : { borderColor: '#16a34a' },
      '&:focus': disabled ? {} : { borderColor: '#16a34a', boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.1)' },
    },
    warning: {
      borderColor: '#f59e0b',
      '&:hover': disabled ? {} : { borderColor: '#d97706' },
      '&:focus': disabled ? {} : { borderColor: '#d97706', boxShadow: '0 0 0 3px rgba(217, 119, 6, 0.1)' },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

const getDropdownStyles = (size: string = 'md', position: 'top' | 'bottom' = 'bottom') => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 9999,
    maxHeight: '200px',
    overflowY: 'auto',
    minWidth: '100%', // Ensure dropdown is at least as wide as the trigger
  };

  // Position the dropdown above or below based on available space
  if (position === 'top') {
    baseStyles.bottom = '100%';
    baseStyles.marginBottom = '0.25rem';
  } else {
    baseStyles.top = '100%';
    baseStyles.marginTop = '0.25rem';
  }

  const sizeStyles = {
    sm: { fontSize: '0.875rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.125rem' },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
  };
};

const getOptionStyles = (size: string = 'md', selected: boolean = false, disabled: boolean = false) => {
  const baseStyles = {
    padding: size === 'sm' ? '0.375rem 0.75rem' : size === 'lg' ? '0.75rem 1rem' : '0.5rem 0.75rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 150ms ease-in-out',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  if (disabled) {
    return {
      ...baseStyles,
      backgroundColor: '#f9fafb',
      color: '#9ca3af',
    };
  }

  if (selected) {
    return {
      ...baseStyles,
      backgroundColor: '#eff6ff',
      color: '#1e40af',
    };
  }

  return {
    ...baseStyles,
    backgroundColor: 'transparent',
    color: '#111827',
    '&:hover': { backgroundColor: '#f3f4f6' },
  };
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  helperText,
  disabled = false,
  required = false,
  multiple = false,
  searchable = false,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    multiple ? (Array.isArray(value) ? value : value ? [value] : []) : []
  );
  const [singleValue, setSingleValue] = useState<string | number | undefined>(
    multiple ? undefined : (value as string | number | undefined)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const selectVariant = error ? 'error' : variant;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        const position = calculateDropdownPosition();
        setDropdownPosition(position);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  // Calculate dropdown position when opening
  const calculateDropdownPosition = () => {
    if (!containerRef.current) return 'bottom';
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 200; // maxHeight from styles
    const minSpace = 50; // minimum space needed
    
    // If there's not enough space below but enough space above, position above
    if (spaceBelow < (dropdownHeight + minSpace) && spaceAbove > (dropdownHeight + minSpace)) {
      return 'top';
    }
    
    // If there's not enough space in either direction, position where there's more space
    if (spaceBelow < minSpace && spaceAbove < minSpace) {
      return spaceBelow > spaceAbove ? 'bottom' : 'top';
    }
    
    return 'bottom';
  };

  const handleToggleDropdown = () => {
    if (disabled) return;
    
    if (!isOpen) {
      const position = calculateDropdownPosition();
      setDropdownPosition(position);
    }
    
    setIsOpen(!isOpen);
  };

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;

    if (multiple) {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];
      
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSingleValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || placeholder;
      }
      return `${selectedValues.length} items selected`;
    } else {
      if (!singleValue) return placeholder;
      const option = options.find(opt => opt.value === singleValue);
      return option?.label || placeholder;
    }
  };

  const isSelected = (option: SelectOption) => {
    if (multiple) {
      return selectedValues.includes(option.value);
    } else {
      return singleValue === option.value;
    }
  };

  const selectStyles = getSelectStyles(size, selectVariant, fullWidth, disabled);
  const triggerStyles = getTriggerStyles(size, selectVariant, disabled);
  const dropdownStyles = getDropdownStyles(size, dropdownPosition);

  return (
    <div style={selectStyles} ref={containerRef} className={className}>
      {label && (
        <label style={{
          display: 'block',
          fontWeight: 500,
          marginBottom: '0.375rem',
          color: selectVariant === 'error' ? '#dc2626' : '#374151',
          fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      
      <div
        style={triggerStyles}
        onClick={handleToggleDropdown}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleDropdown();
          }
        }}
      >
        <span style={{ color: getDisplayValue() === placeholder ? '#9ca3af' : 'inherit' }}>
          {getDisplayValue()}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 150ms ease-in-out',
            marginLeft: '0.5rem',
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div style={dropdownStyles}>
          {searchable && (
            <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #e5e7eb' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.375rem 0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
                autoFocus
              />
            </div>
          )}
          
          {filteredOptions.length === 0 ? (
            <div style={{
              padding: '0.5rem 0.75rem',
              color: '#6b7280',
              textAlign: 'center',
            }}>
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                style={getOptionStyles(size, isSelected(option), option.disabled)}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}

      {(helperText || error) && (
        <div style={{
          marginTop: '0.25rem',
          fontSize: '0.875rem',
          color: error ? '#dc2626' : '#6b7280',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Select; 