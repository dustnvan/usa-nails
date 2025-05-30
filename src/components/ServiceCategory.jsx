import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ServiceCategory = ({ serviceCategoryName, setIsOpen, isOpen }) => {
  return (
    <button
      className="border-2 border-light-gray max-w-100 w-full mx-auto px-4 text-lg py-3 rounded-xl flex items-center justify-between cursor-pointer mt-4"
      onClick={() => setIsOpen(!isOpen)}
    >
      {serviceCategoryName}

      {isOpen ? (
        <FontAwesomeIcon icon={faAngleUp} className="text-red" />
      ) : (
        <FontAwesomeIcon icon={faAngleDown} className="text-red" />
      )}
    </button>
  );
};
export default ServiceCategory;
