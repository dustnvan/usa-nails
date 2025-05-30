const ServiceOption = ({ name, price, setSelectedService }) => {
  return (
    <button
      className="border-2 border-light-gray max-w-90 w-full mx-auto px-4 text-lg py-2 rounded-md cursor-pointer mt-4 flex flex-col items-start"
      onClick={() => setSelectedService(name)}
    >
      <span>{name}</span>
      <span className="font-normal text-base text-mid-gray"> {price}</span>
    </button>
  );
};
export default ServiceOption;
