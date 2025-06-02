import ServiceCategory from './ServiceCategory';
import ServiceOption from './ServiceOption';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Dropdown = ({
  serviceCategoryName,
  setSelectedService,
  selectedStaff = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div></div>;
  if (error) return <div>Error: {error}</div>;

  // Filter service data based on selected staff
  const filteredServiceData = selectedStaff
    ? services.filter((service) =>
        selectedStaff.servicesProvided.includes(service.name)
      )
    : services;

  // Check if there are any services in the category that are visible
  const hasVisibleServices = filteredServiceData.some(
    (service) => service.categoryName === serviceCategoryName
  );

  if (!hasVisibleServices) return null;

  return (
    <div>
      <ServiceCategory
        serviceCategoryName={serviceCategoryName}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {filteredServiceData
              .filter((service) => service.categoryName === serviceCategoryName)
              .map((service) => (
                <ServiceOption
                  key={service.name}
                  service={service}
                  setSelectedService={setSelectedService}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Dropdown;
