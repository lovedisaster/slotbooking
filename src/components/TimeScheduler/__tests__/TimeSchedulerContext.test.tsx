import { renderHook } from '@testing-library/react';
import { useTimeScheduler } from '../TimeSchedulerContext';

describe('TimeSchedulerContext', () => {
  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useTimeScheduler());
    }).toThrow('useTimeScheduler must be used within a TimeSchedulerProvider');
  });
}); 