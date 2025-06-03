import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Loading = () => {
  const [showWakingMsg, setShowWakingMsg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWakingMsg(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-center mt-20">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-dark-gray"
          />
        </div>
        <div className="text-center dark-gray mt-2 max-w-sm text-sm w-full mx-auto">
          {showWakingMsg
            ? 'Waking up server — this may take up to a minute.'
            : 'Loading...'}
        </div>
      </div>
    </>
  );
};
export default Loading;
