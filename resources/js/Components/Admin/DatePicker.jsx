import React, { useState, useEffect, useRef } from 'react';

const DatePicker = ({ value, onChange }) => {
  const today = new Date().toISOString().split('T')[0];
  const datePickerRef = useRef(null);

  // Parse the initial date value or use today
  const parseInitialDate = () => {
    if (!value) return new Date();
    return new Date(value);
  };

  const initialDate = parseInitialDate();

  const [selectedDate, setSelectedDate] = useState(value || today + " 00:00:00");
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [selectedHour, setSelectedHour] = useState(initialDate.getHours().toString().padStart(2, '0'));
  const [selectedMinute, setSelectedMinute] = useState(initialDate.getMinutes().toString().padStart(2, '0'));

  // Update states when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(value);
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
      setSelectedHour(date.getHours().toString().padStart(2, '0'));
      setSelectedMinute(date.getMinutes().toString().padStart(2, '0'));
    }
  }, [value]);

  const handleDateClick = (date) => {
    const newDate = `${date} ${selectedHour}:${selectedMinute}:00`;
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(Number(event.target.value));
  };

  const handleYearChange = (event) => {
    setCurrentYear(Number(event.target.value));
  };

  const handleHourChange = (event) => {
    const hour = event.target.value;
    setSelectedHour(hour);
    const newDate = `${selectedDate.split(' ')[0]} ${hour}:${selectedMinute}:00`;
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  const handleMinuteChange = (event) => {
    const minute = event.target.value;
    setSelectedMinute(minute);
    const newDate = `${selectedDate.split(' ')[0]} ${selectedHour}:${minute}:00`;
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isSelected = selectedDate.startsWith(currentDay);

      days.push(
        <button
          type="button"
          key={i}
          onClick={() => handleDateClick(currentDay)}
          className={`duration-200 w-10 h-10 flex items-center justify-center text-sm border rounded-lg ${isSelected
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-200'
            }`}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 100 }, (_, i) => currentYear + i);
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="relative" ref={datePickerRef}>
      <input
        type="hidden"
        className="w-full p-3 border rounded-lg cursor-pointer"
        value={selectedDate}
        readOnly
        placeholder="Select Date and Time"
      />

      <div className="top-full left-0 mt-2 bg-white border rounded-lg shadow-sm p-4 w-full">
        <div className="flex items-center mb-2 gap-3">
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="p-2 border border-gray-300 rounded-md w-1/2"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-2 mt-6">
          <div className="text-center font-semibold">Sun</div>
          <div className="text-center font-semibold">Mon</div>
          <div className="text-center font-semibold">Tue</div>
          <div className="text-center font-semibold">Wed</div>
          <div className="text-center font-semibold">Thu</div>
          <div className="text-center font-semibold">Fri</div>
          <div className="text-center font-semibold">Sat</div>
          {generateCalendar()}
        </div>

        <h1 className="mt-4 mb-1 text-sm font-medium text-gray-600">Select Time</h1>
        <div className="flex gap-2">
          <select
            value={selectedHour}
            onChange={handleHourChange}
            className="p-2 border border-gray-300 rounded-md w-1/2 text-center font-bold text-gray-700"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
          <select
            value={selectedMinute}
            onChange={handleMinuteChange}
            className="p-2 border border-gray-300 rounded-md w-1/2 text-center font-bold text-gray-700"
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>{minute}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;