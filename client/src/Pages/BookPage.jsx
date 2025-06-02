import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { InputMask } from '@react-input/mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import { validatePhoneNum, validateName } from '../utils/validation';
import Confetti from 'react-confetti';

const BookPage = () => {
  const submitButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selections = [], selectedDateTime } = location.state || {};

  const [phoneNum, setPhoneNum] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const validateForm = () => {
    return !nameError && !phoneError && name && phoneNum && agreed;
  };

  const handleSubmit = (e) => {
    console.log(window.innerWidth);
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out the form correctly.');
    }

    const formattedDate = selectedDateTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const newBooking = {
      clientName: name,
      clientPhone: phoneNum,
      service: selections,
    };

    setFormSubmitted(true);

    // alert(
    //   `Thank you ${name}! Your appointment has been booked on ${formattedDate}.`
    // );

    // navigate('/');
  };

  return (
    <>
      <Header />
      <SubHeader
        text="Book your appointment"
        backButtonAction={() =>
          navigate('/select-date', { state: { selections } })
        }
      />
      <form
        className="flex flex-col items-center gap-6 mt-10"
        onSubmit={handleSubmit}
      >
        <div className="w-full  max-w-sm relative">
          <input
            type="text"
            placeholder="Enter your name"
            className={`bg-light-gray rounded-lg px-2 py-3 w-full  focus:outline-red ${
              nameError ? 'outline-2 outline-red' : ''
            }`}
            name="name"
            onChange={(e) => {
              setName(e.target.value);
              setNameError(() => validateName(e.target.value));
            }}
          />
          {nameError && (
            <p className="text-xs text-red absolute ">{nameError}</p>
          )}
        </div>
        <div className="w-full  max-w-sm relative">
          <InputMask
            type="tel"
            mask="(___) ___-____"
            replacement={{ _: /\d/ }}
            placeholder="Enter your phone number"
            className={`bg-light-gray rounded-lg pl-2 py-3 w-full focus:outline-red ${
              phoneError ? 'outline-2 outline-red' : ''
            }`}
            name="phone"
            onChange={(e) => {
              setPhoneNum(e.target.value);
              setPhoneError(() => validatePhoneNum(e.target.value));
            }}
          />
          {phoneError && (
            <p className="text-xs text-red absolute">{phoneError}</p>
          )}
        </div>
        <div className="w-full max-w-sm mt-8">
          <label className="flex items-center gap-2 cursor-pointer ">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="hidden"
            />
            <div
              className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition ${
                agreed ? 'bg-red border-red' : 'border-gray-300'
              }`}
            >
              {agreed && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-sm"
                />
              )}
            </div>
            <span className="text-sm">
              I have read and agree to the{' '}
              <span className="text-red">cancellation policy</span> of USA
              Nails.
            </span>
          </label>
        </div>
        <div className="relative">
          <input
            type="submit"
            className={`rounded-lg p-2 w-full mt-8 max-w-xs font-bold text-xl ${
              validateForm()
                ? 'bg-red text-white cursor-pointer'
                : 'bg-light-gray text-mid-gray opacity-50'
            }`}
            value="Book Appointment"
            disabled={!validateForm()}
            ref={submitButtonRef}
          />
        </div>
      </form>
      {formSubmitted && (
        <div>
          <Confetti
            numberOfPieces={100}
            width={window.innerWidth - 1}
            height={window.innerHeight - 1}
            initialVelocityY={20}
            initialVelocityX={20}
            confettiSource={{
              x:
                submitButtonRef.current.getBoundingClientRect().left +
                submitButtonRef.current.offsetWidth / 2,
              y:
                submitButtonRef.current.getBoundingClientRect().top +
                submitButtonRef.current.offsetHeight / 2,
            }}
            recycle={false}
            tweenDuration={300}
            onConfettiComplete={() => {
              navigate('/');
            }}
            gravity={0.3}
          />
        </div>
      )}
      ;
    </>
  );
};
export default BookPage;
