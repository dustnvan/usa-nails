import Calendar from 'react-calendar';
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';
import TimeSelector from '../components/SelectTime';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SelectDateTime = () => {
  const currentDateTime = new Date();

  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(currentDateTime.getDate() + 30);

  const navigate = useNavigate();
  const location = useLocation();
  const { selections = [] } = location.state || {};

  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  const [finishedSelections, setFinishedSelections] = useState(false);

  // If no selections, redirect to home
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selections.length === 0) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [selections, navigate]);

  if (loading) {
    return;
  }

  return (
    <>
      <Header />
      <SubHeader
        text="Select Date/Time"
        backButtonAction={() => {
          navigate('/confirm', { state: { selections } });
        }}
        className="text-center text-2xl font-bold mt-4"
      />
      <div className="mx-auto mt-10 flex justify-center flex-wrap gap-4">
        <div>
          <Calendar
            onChange={setSelectedDateTime}
            value={selectedDateTime}
            prev2Label={null}
            next2Label={null}
            maxDate={thirtyDaysFromNow}
            minDate={currentDateTime}
            calendarType="hebrew"
            minDetail="month"
            formatShortWeekday={(locale, date) => {
              const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
              return weekdays[date.getDay()];
            }}
          />
        </div>
        <TimeSelector
          setSelectedDateTime={setSelectedDateTime}
          setFinishedSelections={setFinishedSelections}
          selectedDateTime={selectedDateTime}
        />
      </div>{' '}
      <div className="sticky bottom-0 mx-auto py-10 submit-button w-full flex justify-center ">
        <button
          className={`bg-red text-white px-20 py-2 rounded-lg font-semibold text-lg transition-opacity duration-600 ${
            finishedSelections
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => {
            navigate('/book', {
              state: { selections, selectedDateTime },
            });
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default SelectDateTime;
