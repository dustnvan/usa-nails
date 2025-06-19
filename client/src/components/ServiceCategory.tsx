import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/booking';

interface ServiceCategoryProps {
  category: Category;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ServiceCategory = ({
  category,
  setIsOpen,
  isOpen,
}: ServiceCategoryProps) => {
  return (
    <button
      className="border-2 border-light-gray max-w-100 w-full mx-auto px-4 text-lg py-4 rounded-xl flex items-center justify-between cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {category.name}

      {isOpen ? (
        <FontAwesomeIcon icon={faAngleUp} className="text-red" />
      ) : (
        <FontAwesomeIcon icon={faAngleDown} className="text-red" />
      )}
    </button>
  );
};
export default ServiceCategory;
