import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function Calendar({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs().startOf('day');
  const maxDate = today.add(1, 'month'); 
  const minDate = today; 

  const handleDateChange = (date) => {
    if (dayjs(date).isBetween(minDate, maxDate, null, '[]')) { 
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="Día de la reserva" value={selectedDate} onChange={handleDateChange} minDate={minDate} maxDate={maxDate} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
