import StaffBtn from './StaffBtn';
import staffData from '../data/staff';

const Staff = ({ searchQuery, setSelectedStaff, selectedService = null }) => {
  // Filter staff data based on selected service
  let filteredStaff = selectedService
    ? staffData.filter((staff) =>
        staff.servicesProvided.includes(selectedService.name)
      )
    : staffData;

  // Further filter staff based on search query
  filteredStaff = searchQuery
    ? filteredStaff.filter((staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredStaff;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-y-6 mt-10 max-w-5xl mx-auto">
        {filteredStaff.map((staff) => (
          <StaffBtn
            key={staff.name}
            staff={staff}
            setSelectedStaff={setSelectedStaff}
          />
        ))}
      </div>
    </div>
  );
};
export default Staff;
