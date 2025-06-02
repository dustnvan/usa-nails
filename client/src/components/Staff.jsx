import StaffBtn from './StaffBtn';
import staffData from '../data/staff';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Staff = ({ searchQuery, setSelectedStaff, selectedService = null }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${process.env.VITE_RENDER_API}/api/staff`
        );
        setStaff(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStaff();
  });

  if (loading) return;
  if (error) return <div>Error: {error}</div>;

  // Filter staff data based on selected service
  let filteredStaff = selectedService
    ? staff.filter((staff) =>
        staff.servicesProvided.includes(selectedService.name)
      )
    : staff;

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
