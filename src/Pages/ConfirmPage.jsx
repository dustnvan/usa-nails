import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import SelectionSummary from '../components/SelectionSummary';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedStaff, selectedService } = location.state || {};

  return (
    <div className="bg-white px-2 font-display h-screen">
      <Header />
      <SubHeader
        text="Your Appointment"
        backButtonAction={() => {
          navigate('/');
        }}
      />

      <SelectionSummary
        selectedStaff={selectedStaff}
        selectedService={selectedService}
      />

      <div className="border-2 border-red text-red font-semibold text-lg py-2 px-4 rounded-lg mt-5 mx-auto max-w-100 text-center cursor-pointer hover:bg-gray-200">
        Add another service
      </div>

      <nav>
        <div className="flex justify-center mt-50 gap-4">
          <button className="border-2 border-red  text-red font-semibold py-3 px-4 rounded-lg cursor-pointer max-w-40 w-full">
            Back
          </button>
          <button className="border-2 border-red bg-red text-white font-semibold py-3 px-4 rounded-lg cursor-pointer max-w-40 w-full">
            Next
          </button>
        </div>
      </nav>
    </div>
  );
};
export default ConfirmPage;
