import React from 'react';

export interface Column<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
  emptyMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'striped' | 'bordered';
  hoverable?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (rowId: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  className?: string;
}

const getTableStyles = (size: string = 'md', variant: string = 'default') => {
  const baseStyles = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sizeStyles = {
    sm: {
      fontSize: '0.875rem',
    },
    md: {
      fontSize: '1rem',
    },
    lg: {
      fontSize: '1.125rem',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
  };
};

const getHeaderStyles = (size: string = 'md', variant: string = 'default') => {
  const baseStyles = {
    backgroundColor: '#f9fafb',
    fontWeight: 600,
    textAlign: 'left' as const,
    color: '#374151',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderBottom: '1px solid #e5e7eb',
  };

  const sizeStyles = {
    sm: {
      padding: '0.5rem 0.75rem',
    },
    md: {
      padding: '0.75rem 1rem',
    },
    lg: {
      padding: '1rem 1.25rem',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
  };
};

const getCellStyles = (size: string = 'md', variant: string = 'default') => {
  const baseStyles = {
    borderBottom: variant === 'bordered' ? '1px solid #e5e7eb' : 'none',
    padding: '0.75rem 1rem',
    color: '#111827',
  };

  const sizeStyles = {
    sm: {
      padding: '0.5rem 0.75rem',
    },
    md: {
      padding: '0.75rem 1rem',
    },
    lg: {
      padding: '1rem 1.25rem',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
  };
};

const getRowStyles = (variant: string = 'default', hoverable: boolean = false, isEven: boolean = false) => {
  const baseStyles = {
    transition: hoverable ? 'background-color 150ms ease-in-out' : 'none',
  };

  const variantStyles = {
    default: {
      backgroundColor: 'transparent',
      '&:hover': hoverable ? { backgroundColor: '#f9fafb' } : {},
    },
    striped: {
      backgroundColor: isEven ? '#f9fafb' : 'transparent',
      '&:hover': hoverable ? { backgroundColor: '#f3f4f6' } : {},
    },
    bordered: {
      backgroundColor: 'transparent',
      '&:hover': hoverable ? { backgroundColor: '#f9fafb' } : {},
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  sortable = false,
  onSort,
  sortKey,
  sortDirection,
  loading = false,
  emptyMessage = 'No data available',
  size = 'md',
  variant = 'default',
  hoverable = false,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  className,
}: TableProps<T>) => {
  const handleSort = (key: string) => {
    if (!sortable || !onSort) return;
    
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectAll) return;
    onSelectAll(e.target.checked);
  };

  const handleRowSelect = (rowId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onRowSelect) return;
    onRowSelect(rowId, e.target.checked);
  };

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

  const tableStyles = getTableStyles(size, variant);
  const headerStyles = getHeaderStyles(size, variant);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyles} className={className}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ ...headerStyles, width: '48px' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                  style={{ margin: 0 }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  ...headerStyles,
                  width: column.width,
                  textAlign: column.align || 'left',
                  cursor: sortable && column.sortable ? 'pointer' : 'default',
                }}
                onClick={() => handleSort(column.key)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {column.header}
                  {sortable && column.sortable && sortKey === column.key && (
                    <span style={{ fontSize: '0.75rem' }}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowId = row.id || rowIndex.toString();
            const isSelected = selectedRows.includes(rowId);
            const cellStyles = getCellStyles(size, variant);
            const rowStyles = getRowStyles(variant, hoverable, rowIndex % 2 === 0);

            return (
              <tr
                key={rowId}
                style={{
                  ...rowStyles,
                  backgroundColor: isSelected ? '#eff6ff' : rowStyles.backgroundColor,
                }}
              >
                {selectable && (
                  <td style={{ ...cellStyles, width: '48px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleRowSelect(rowId, e)}
                      style={{ margin: 0 }}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      ...cellStyles,
                      textAlign: column.align || 'left',
                    }}
                  >
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 