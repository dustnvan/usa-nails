import React, { useEffect, useState } from 'react';
import { toZonedTime } from 'date-fns-tz';
import axios from 'axios';
import Loading from './Loading';
import { ToastContainer, toast } from 'react-toastify';
import { Booking } from '../types/booking';

interface TimeSelectorProps {
  setSelectedDateTime: (date: Date) => void;
  selectedDateTime: Date;
  setFinishedSelections: (bool: boolean) => void;
}

const TimeSelector = ({
  setSelectedDateTime,
  selectedDateTime,
  setFinishedSelections,
}: TimeSelectorProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
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
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
        toast.error('Unable to retrieve bookings');
      } finally {
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

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 ">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick={true}
      />
      {Object.entries(slots).map(([period, timeSlots]) => (
        <React.Fragment key={period}>
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
