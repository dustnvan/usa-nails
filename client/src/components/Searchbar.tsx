import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchbarProps {
  view: string;
  setSearchQuery: (searchQuery: string) => void;
}

const Searchbar = ({ view, setSearchQuery }: SearchbarProps) => {
  return (
    <div className="relative mt-5 max-w-100 mx-auto">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        className="py-2 pl-14 bg-light-gray rounded-full w-full placeholder:font-normal placeholder:text-base"
        type="text"
        placeholder={
          view === 'service' || view === 'staffService'
            ? 'Search for services'
            : 'Search for staff'
        }
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
export default Searchbar;
