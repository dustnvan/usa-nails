import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import SelectionSummary from '../components/SelectionSummary';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Selection } from '../types/booking';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selections = [] }: { selections: Selection[] } = location.state || {};

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

  const handleBackButton = () => {
    const updatedSelections = selections.slice(0, -1);
    navigate('/', { state: { selections: updatedSelections } });
  };

  return (
    <>
      <Header />
      <SubHeader text="Your Appointment" backButtonAction={handleBackButton} />

      {selections.map((selection, i) => (
        <SelectionSummary
          key={i}
          selectedStaff={selection.staff}
          selectedService={selection.service}
        />
      ))}

      <div
        className="border-2 border-red text-red font-semibold text-lg py-2 px-4 rounded-lg mt-5 mx-auto max-w-100 text-center cursor-pointer hover:bg-gray-200"
        onClick={() => navigate('/', { state: { selections } })}
      >
        Add another service
      </div>

      <nav>
        <div className="flex justify-center mt-50 gap-4">
          <button
            className="border-2 border-red  text-red font-semibold py-3 px-4 rounded-lg cursor-pointer max-w-40 w-full"
            onClick={handleBackButton}
          >
            Back
          </button>
          <button
            className="border-2 border-red bg-red text-white font-semibold py-3 px-4 rounded-lg cursor-pointer max-w-40 w-full"
            onClick={() => navigate('/select-date', { state: { selections } })}
          >
            Next
          </button>
        </div>
      </nav>
    </>
  );
};
export default ConfirmPage;
