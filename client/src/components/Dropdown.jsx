import ServiceCategory from './ServiceCategory';
import ServiceOption from './ServiceOption';
import serviceData from '../data/services';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({
  serviceCategoryName,
  setSelectedService,
  selectedStaff = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter service data based on selected staff
  const filteredServiceData = selectedStaff
    ? serviceData.filter((service) =>
        selectedStaff.servicesProvided.includes(service.name)
      )
    : serviceData;

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
