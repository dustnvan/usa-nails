import Calendar from 'react-calendar';
import { useState } from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import { useNavigate } from 'react-router-dom';

const SelectDate = () => {
  const currentDate = new Date();

  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const navigate = useNavigate();

  return (
    <div className="bg-white px-2 font-display h-screen ">
      <Header />
      <SubHeader
        text="Select Date/Time"
        backButtonAction={() => {
          navigate('/confirm');
        }}
        className="text-center text-2xl font-bold mt-4"
      />
      <div className="max-w-100 mx-auto mt-10">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          prev2Label={null}
          next2Label={null}
          maxDate={thirtyDaysFromNow}
          minDate={currentDate}
          calendarType="hebrew"
          minDetail="month"
          formatShortWeekday={(locale, date) => {
            const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            return weekdays[date.getDay()];
          }}
        />
      </div>{' '}
    </div>
  );
};
export default SelectDate;
