import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const SubHeader = ({ text, backButtonAction }) => {
  return (
    <div className="bg-light-gray flex max-w-140 justify-center items-center mx-auto relative py-2 rounded-lg mt-10  text-lg text-dark-gray">
      <div
        className="absolute left-4 w-6 text-center cursor-pointer"
        onClick={backButtonAction}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <span className="font-semibold">{text}</span>
    </div>
  );
};
export default SubHeader;
