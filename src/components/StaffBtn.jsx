import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const StaffBtn = ({ name, setSelectedStaff }) => {
  return (
    <div
      className="border border-2 border-light-gray max-w-120 w-full h-20 flex items-center justify-between rounded-lg cursor-pointer gap-3 font-semibold text-lg px-10"
      onClick={() => setSelectedStaff(name)}
    >
      <span className="p-4">{name}</span>
      <FontAwesomeIcon
        icon={faUser}
        className="bg-red text-white p-4 rounded-full"
      />
    </div>
  );
};
export default StaffBtn;
