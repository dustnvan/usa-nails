import ServiceCategory from './ServiceCategory';
import ServiceOption from './ServiceOption';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({
  category,
  setSelectedService,
  selectedStaff = null,
  services,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let filteredServiceData = services;

  if (selectedStaff) {
    const staffServiceIds = selectedStaff.services.map(
      (service) => service._id
    );
    filteredServiceData = services.filter((service) =>
      staffServiceIds.includes(service._id)
    );
  }
  // Check if there are any services in the category that are visible
  const hasVisibleServices = filteredServiceData.some(
    (service) => service.category.name === category.name
  );

  if (!hasVisibleServices) return null;

  return (
    <div>
      <ServiceCategory
        category={category}
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
              .filter((service) => service.category.name === category.name)
              .map((service) => (
                <ServiceOption
                  key={service._id}
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
