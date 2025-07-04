import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { InputMask } from '@react-input/mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import { validatePhoneNum, validateName } from '../utils/validation';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import axios from 'axios';
import { fromZonedTime } from 'date-fns-tz';
import PolicyModal from '../components/PolicyModal';
import { Selection } from '../types/booking';

const BookPage = () => {
  const submitButtonRef = useRef<HTMLInputElement>(null);
  const [phoneNum, setPhoneNum] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);

  // If no selections, redirect to home
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selections = [],
    selectedDateTime,
  }: { selections: Selection[]; selectedDateTime: Date } = location.state || {};
  const timeZone = 'America/Chicago';

  useEffect(() => {
    if (selections.length === 0) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [selections, navigate]);

  const { width, height } = useWindowSize();
  const formattedDate = selectedDateTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (loading) {
    return;
  }

  const validateForm = () => {
    return !nameError && !phoneError && name && phoneNum && agreed;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out the form correctly.');
    }

    const newBooking = {
      clientName: name,
      clientPhone: phoneNum,
      selections: selections.map((selection) => ({
        staff: selection.staff._id,
        service: selection.service._id,
      })),
      date: fromZonedTime(selectedDateTime, timeZone),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RENDER_API}/api/bookings`,
        newBooking
      );
    } catch (error) {
      console.error(error);
      return;
    }

    setTimeout(() => {
      setFormSubmitted(true);
    }, 300);
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
            onKeyDown={(e) => {
              const allowed = /^[a-zA-Z\s-']$/;
              if (e.key.length === 1 && !allowed.test(e.key)) {
                e.preventDefault();
              }
            }}
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
          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
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
            </label>
            <span className="text-sm">
              I have read and agree to the{' '}
              <span
                className="text-red z-20 cursor-pointer"
                onClick={() => setPolicyModal((prev) => !prev)}
              >
                cancellation policy
              </span>{' '}
              of USA Nails.
            </span>
          </div>
        </div>
        <div>
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

      {formSubmitted && submitButtonRef.current && (
        <Confetti
          numberOfPieces={100}
          width={width}
          height={height}
          initialVelocityY={20}
          initialVelocityX={20}
          confettiSource={{
            x:
              submitButtonRef.current.getBoundingClientRect().left +
              submitButtonRef.current.offsetWidth / 2,
            y:
              submitButtonRef.current.getBoundingClientRect().top +
              submitButtonRef.current.offsetHeight / 2,
            w: 0,
            h: 0,
          }}
          recycle={false}
          tweenDuration={300}
          onConfettiComplete={() => {
            alert(
              `Thank you ${name}! Your appointment has been booked on ${formattedDate}.`
            );
            navigate('/');
          }}
          gravity={0.3}
        />
      )}

      <PolicyModal setPolicyModal={setPolicyModal} policyModal={policyModal} />
    </>
  );
};
export default BookPage;
