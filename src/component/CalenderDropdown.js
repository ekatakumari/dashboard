import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import "../Style/MainContainer.css"; // Add your CSS here

const CalendarDropdown = () => {
  const [startDate, setStartDate] = useState(null);
  const minDate = new Date('2022-10-15');
  const maxDate = new Date('2022-10-31');
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsOpen(false); // Close the calendar after selecting a date
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="calendar-container">
      <button onClick={toggleCalendar} className="calendar-button">
        {startDate ? format(startDate, 'yyyy-MM-dd') : 'Select a date'}
      </button>
      {isOpen && (
        <div className="calendar-dropdown">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
