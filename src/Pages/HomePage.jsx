import HomeOptionNav from '../components/HomeOptionsNav';
import Services from '../components/Services';
import StaffModal from '../components/StaffModal';
import Header from '../components/Header';
import Staff from '../components/Staff';
import SubHeader from '../components/SubHeader';
import { useState } from 'react';
import Searchbar from '../components/Searchbar';
import { useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [view, setView] = useState('service'); // could be: 'service', 'staff', 'staffService'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const navigate = useNavigate();

  if (selectedStaff && selectedService) {
    const [staff, service] = [selectedStaff, selectedService];
    // to close modal and reset states before navigating
    setSelectedStaff(null);
    setSelectedService(null);
    setTimeout(() => {
      navigate('/Confirm', {
        state: {
          selectedStaff: staff,
          selectedService: service,
        },
      });
    }, 300);
  }

  useEffect(() => {
    if (view == 'staff') {
      setView('staffService');
    }
  }, [selectedStaff]);
  return (
    <div className="bg-white px-2 font-display h-screen ">
      <Header />
      <div className="text-lg font-bold text-dark-gray">
        {view === 'service' && (
          <>
            <HomeOptionNav view={view} setView={setView} />
            <Searchbar view={view} setSearchQuery={setSearchQuery} />
            <Services
              searchQuery={searchQuery}
              setSelectedService={setSelectedService}
            />
          </>
        )}
        {view === 'staff' && (
          <>
            <HomeOptionNav view={view} setView={setView} />
            <Searchbar view={view} setSearchQuery={setSearchQuery} />
            <Staff
              searchQuery={searchQuery}
              setSelectedStaff={setSelectedStaff}
            />
          </>
        )}
        {view === 'staffService' && (
          <>
            <Searchbar view={view} setSearchQuery={setSearchQuery} />
            <SubHeader text="Select Service" previousPage="/" />
            <Services
              searchQuery={searchQuery}
              setSelectedService={setSelectedService}
            />
          </>
        )}
      </div>

      <StaffModal
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        setSelectedStaff={setSelectedStaff}
      />
    </div>
  );
};
export default HomePage;
