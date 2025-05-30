const SelectionItem = ({ selectedStaff, selectedService }) => {
  return (
    <div className="border-2 border-light-gray max-w-100 mx-auto w-full flex flex-col text-lg p-2 rounded-lg">
      <span className="">{selectedService}</span>
      <span className="text-red font-bold">{selectedStaff}</span>
    </div>
  );
};
export default SelectionItem;
