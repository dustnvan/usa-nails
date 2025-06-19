import { Service, Staff } from '../types/booking';

interface SelectionItemProps {
  selectedStaff: Staff;
  selectedService: Service;
}

const SelectionItem = ({
  selectedStaff,
  selectedService,
}: SelectionItemProps) => {
  return (
    <div className="border-2 border-light-gray max-w-100 mx-auto w-full flex flex-col text-lg p-2 rounded-lg">
      <span className="">{selectedService.name}</span>
      <span className="text-red font-bold">{selectedStaff.name}</span>
    </div>
  );
};
export default SelectionItem;
