import SelectionItem from './SelectionItem';

const SelectionSummary = ({ selectedStaff, selectedService }) => {
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
