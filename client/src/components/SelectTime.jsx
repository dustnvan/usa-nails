import React, { useEffect, useState } from 'react';
import { toZonedTime } from 'date-fns-tz';
import axios from 'axios';
import Loading from './Loading';

const TimeSelector = ({
  setSelectedDateTime,
  selectedDateTime,
  setFinishedSelections,
}) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const startHour = 9;
  const endHour = 19;
  const interval = 15;
  const apptHoursBuffer = 1; // hour buffer before appointments start
  const timeZone = 'America/Chicago'; // Adjust to your desired time zone

  let apptStartTime = new Date(); // appointments start time in central time
  apptStartTime = toZonedTime(apptStartTime, timeZone);
  apptStartTime.setHours(apptStartTime.getHours() + apptHoursBuffer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER_API}/api/bookings`
        );

        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateTimeSlots = () => {
    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = new Date(selectedDateTime);
        time.setHours(hour);
        time.setMinutes(minute);

        if (hour < 12) {
          morningSlots.push(time);
        } else if (hour <= 17) {
          afternoonSlots.push(time);
        } else {
          eveningSlots.push(time);
        }
      }
    }
    return {
      Morning: morningSlots,
      Afternoon: afternoonSlots,
      Evening: eveningSlots,
    };
  };

  const slots = generateTimeSlots();
  const selectedTime = selectedDateTime.getTime();

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 ">
      {Object.entries(slots).map(([period, timeSlots]) => (
        <React.Fragment key={[period]}>
          {' '}
          <div className="text-center text-gray-600 font-semibold col-span-full">
            {period}
          </div>
          {timeSlots.map((slot, index) => {
            const slotString = slot.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            const bookedSlots = bookings.map((booking) =>
              toZonedTime(booking.date, timeZone).getTime()
            );
            const isBooked = bookedSlots.includes(slot.getTime());

            if (slot < apptStartTime || isBooked) {
              return (
                <button
                  key={index}
                  className="py-2 px-2 border-2 border-gray-300 bg-gray-300 rounded-xl"
                >
                  {slotString}
                </button>
              );
            } else
              return (
                <button
                  key={index}
                  className={`py-2 px-2 border-2  rounded-xl cursor-pointer hover:bg-gray-200 ${
                    selectedTime === slot.getTime()
                      ? 'border-red text-red'
                      : 'border-light-gray'
                  }`}
                  onClick={() => {
                    setSelectedDateTime(slot);
                    setFinishedSelections(true);
                  }}
                >
                  {slotString}
                </button>
              );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};
export default TimeSelector;
