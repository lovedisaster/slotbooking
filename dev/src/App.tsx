import { format } from 'date-fns';
import React, { useState } from 'react';
import { CalendarPicker } from '../../src/components/CalendarPicker/CalendarPicker';
import { darkTheme } from '../../src/components/CalendarPicker/themes';
import { mockData } from '../../src/components/CalendarPicker/mockData';
import { TimeScheduler, TimeSchedulerProvider } from '../../src/components/TimeScheduler';
import { mockScheduleData } from '../../src/components/TimeScheduler';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={() => setIsOpen(true)}>
          {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select Date'}
        </button>

        <button onClick={() => setShowScheduler(!showScheduler)}>
          {showScheduler ? 'Hide Scheduler' : 'Show Scheduler'}
        </button>
      </div>

      <CalendarPicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={setSelectedDate}
        theme={darkTheme}
        availableDates={mockData.availableDates}
        minDate={mockData.minDate}
        maxDate={mockData.maxDate}
      />

      {showScheduler && (
        <TimeSchedulerProvider initialScheduleData={mockScheduleData}>
          <TimeScheduler />
        </TimeSchedulerProvider>
      )}
    </div>
  );
};

export default App; 