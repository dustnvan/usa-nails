import SelectionItem from './SelectionItem';
import { Service, Staff } from '../types/booking';

interface SelectionSummaryProps {
  selectedStaff: Staff;
  selectedService: Service;
}

const SelectionSummary = ({
  selectedStaff,
  selectedService,
}: SelectionSummaryProps) => {
  return (
    <div className="mt-4">
      <SelectionItem
        selectedStaff={selectedStaff}
        selectedService={selectedService}
      />
    </div>
  );
};
export default SelectionSummary;
