import StaffBtn from './StaffBtn';
import staffData from '../data/staff';

const Staff = ({ searchQuery, setSelectedStaff }) => {
  const filteredStaff = searchQuery
    ? staffData.filter((staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : staffData;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-y-6 mt-10 max-w-5xl mx-auto">
        {filteredStaff.map((staff) => (
          <StaffBtn
            key={staff.name}
            name={staff.name}
            setSelectedStaff={setSelectedStaff}
          />
        ))}
      </div>
    </div>
  );
};
export default Staff;
