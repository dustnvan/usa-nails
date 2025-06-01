import React from 'react';

const TimeSelector = ({
  setSelectedDateTime,
  selectedDateTime,
  setFinishedSelections,
}) => {
  const startHour = 9;
  const endHour = 19;
  const interval = 15;
  const apptBufferHours = 1; // 1 hour gap from current time for no appointments

  const apptsStartTime = new Date(); // appointments start time
  apptsStartTime.setHours(apptsStartTime.getHours() + apptBufferHours);

  const generateTimeSlots = () => {
    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = new Date(selectedDateTime);
        time.setHours(hour);
        time.setMinutes(minute);

        if (hour < 12) {
          morningSlots.push(time);
        } else if (hour < 17) {
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

            if (slot < apptsStartTime) {
              return (
                <button
                  key={index}
                  className="py-2 border-2 border-gray-300 bg-gray-300 rounded-xl"
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
