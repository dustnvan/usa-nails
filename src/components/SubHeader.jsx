import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SelectionSummary from './SelectionSummary';

const SubHeader = ({ text, previousPage }) => {
  return (
    <div className="bg-light-gray flex max-w-140 justify-center items-center mx-auto relative py-2 rounded-lg mt-10  text-lg text-dark-gray">
      <Link
        to={previousPage}
        className="absolute left-4 w-6 text-center cursor-pointer"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Link>
      <span className="font-semibold">{text}</span>
    </div>
  );
};
export default SubHeader;
