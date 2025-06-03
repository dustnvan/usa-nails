import StaffBtn from './StaffBtn';
import Loading from './Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import staffDummyData from '../dummyData/staffDummyData';
import { toast, ToastContainer } from 'react-toastify';

const Staff = ({ searchQuery, setSelectedStaff, selectedService = null }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('component rendered');
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER_API}/api/staff`
        );
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Couldn’t load live staff data. Showing fallback content.');
        setStaff(staffDummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) return <Loading />;

  // Filter staff data based on selected service

  let filteredStaff = staff;

  if (selectedService) {
    filteredStaff = staff.filter((staff) =>
      staff.services.some((service) => service._id === selectedService._id)
    );
  }

  // Further filter staff based on search query

  filteredStaff = searchQuery
    ? filteredStaff.filter((staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredStaff;

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick={true}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-y-6 mt-10 max-w-5xl mx-auto">
        {filteredStaff.map((staff) => (
          <StaffBtn
            key={staff._id}
            staff={staff}
            setSelectedStaff={setSelectedStaff}
          />
        ))}
      </div>
    </div>
  );
};
export default Staff;
