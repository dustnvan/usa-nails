import HomeOptionNav from '../components/HomeOptionsNav';
import Services from '../components/Services';
import StaffModal from '../components/StaffModal';
import Header from '../components/Header';
import Staff from '../components/Staff';
import SubHeader from '../components/SubHeader';
import Searchbar from '../components/Searchbar';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [view, setView] = useState('service'); // could be: 'service', 'staff', 'staffService'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const location = useLocation();
  const [selections, setSelections] = useState(
    location.state?.selections || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery('');
  }, [view]);

  // staff->service navigation logic
  useEffect(() => {
    if (selectedStaff && view === 'staff') {
      setView('staffService');
      return;
    }

    // Finished selecting service and staff
    if (selectedStaff && selectedService) {
      const newSelection = {
        service: selectedService,
        staff: selectedStaff,
      };

      // to close modal and reset states before navigating
      setSelectedStaff(null);
      setSelectedService(null);

      if (view === 'staffService') {
        navigate('/confirm', {
          state: { selections: [...selections, newSelection] },
        });
      } else {
        setTimeout(() => {
          navigate('/confirm', {
            state: { selections: [...selections, newSelection] },
          });
        }, 500);
      }
    }
  }, [selectedStaff, selectedService, view]);

  return (
    <>
      <Header />
      <div className="text-lg font-bold text-dark-gray ">
        {selections.length > 0 ? (
          // User is adding services to existing selections
          <>
            <Searchbar view={view} setSearchQuery={setSearchQuery} />
            <SubHeader
              text="Select Service"
              backButtonAction={() => {
                navigate('/confirm', {
                  state: { selections: selections },
                });
              }}
            />
            <Services
              searchQuery={searchQuery}
              setSelectedService={setSelectedService}
            />
          </>
        ) : (
          <>
            {
              // If no selections, show the main service selection view
              view === 'service' && (
                <>
                  <HomeOptionNav view={view} setView={setView} />
                  <Searchbar view={view} setSearchQuery={setSearchQuery} />
                  <Services
                    searchQuery={searchQuery}
                    setSelectedService={setSelectedService}
                  />
                </>
              )
            }
          </>
        )}

        {
          // Selecting staff first, then service
          view === 'staff' && (
            <>
              <HomeOptionNav view={view} setView={setView} />
              <Searchbar view={view} setSearchQuery={setSearchQuery} />
              <Staff
                searchQuery={searchQuery}
                setSelectedStaff={setSelectedStaff}
              />
            </>
          )
        }
        {
          // Selecting service after staff
          view === 'staffService' && (
            <>
              <Searchbar view={view} setSearchQuery={setSearchQuery} />
              <SubHeader
                text="Select Service"
                backButtonAction={() => {
                  setView('staff');
                  setSelectedStaff(null);
                }}
              />
              <Services
                searchQuery={searchQuery}
                setSelectedService={setSelectedService}
                selectedStaff={selectedStaff}
              />
            </>
          )
        }
      </div>

      <StaffModal
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        setSelectedStaff={setSelectedStaff}
      />
    </>
  );
};
export default HomePage;
