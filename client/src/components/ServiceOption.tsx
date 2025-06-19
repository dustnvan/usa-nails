import { Service } from '../types/booking';

interface ServiceOptionProps {
  service: Service;
  setSelectedService: (service: Service) => void;
}
const ServiceOption = ({ service, setSelectedService }: ServiceOptionProps) => {
  return (
    <button
      className="border-2 border-light-gray max-w-90 w-full mx-auto px-4 text-lg py-2 rounded-md cursor-pointer mt-4 flex flex-col items-start"
      onClick={() => setSelectedService(service)}
    >
      <span>{service.name}</span>
      <span className="font-normal text-base text-mid-gray">
        {' '}
        {service.price}
      </span>
    </button>
  );
};
export default ServiceOption;
