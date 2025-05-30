import ServiceCategory from './ServiceCategory';
import ServiceOption from './ServiceOption';
import servicesData from '../data/services';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({ serviceCategoryName, setSelectedService }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            {servicesData
              .find((category) => category.name === serviceCategoryName)
              .services.map((service) => (
                <ServiceOption
                  key={service.name}
                  name={service.name}
                  price={service.price}
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
