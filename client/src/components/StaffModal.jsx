import { motion, AnimatePresence } from 'framer-motion';
import Staff from './Staff';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const StaffModal = ({
  selectedService,
  setSelectedService,
  setSelectedStaff,
}) => {
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <AnimatePresence>
      {selectedService && (
        <motion.div
          className="fixed inset-0 z-1 flex items-end justify-center"
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            className="bg-white rounded-lg w-full max-w-5xl h-140 overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-4 py-3 ">
              <div className="flex mt-8 relative justify-center items-center">
                <h1 className="text-xl font-bold">Select Staff</h1>
                <span className="w-6 cursor-pointer absolute right-6 text-center">
                  <FontAwesomeIcon
                    icon={faX}
                    size="lg"
                    onClick={() => setSelectedService(null)}
                  />
                </span>
              </div>
            </div>
            <Staff
              setSelectedStaff={setSelectedStaff}
              selectedService={selectedService}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default StaffModal;
