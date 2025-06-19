import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
const PolicyModal = ({ setPolicyModal, policyModal }) => {
  return (
    <AnimatePresence>
      {policyModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          onClick={() => setPolicyModal(null)}
        >
          <motion.div
            className="bg-white rounded-lg w-full max-w-5xl h-140 overflow-y-auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-4 py-3 ">
              <div className="flex mt-8 relative justify-center items-center">
                <h1 className="text-xl font-bold">Cancellation Policy</h1>
                <span className="w-6 cursor-pointer absolute right-6 text-center">
                  <FontAwesomeIcon
                    icon={faX}
                    size="lg"
                    onClick={() => setPolicyModal(null)}
                  />
                </span>
              </div>
            </div>
            <div className="px-2 pb-20 sm:px-20 flex flex-col gap-5 ">
              <section>
                <h3 className="text-lg font-semibold">
                  ❗ Cancellations & Rescheduling
                </h3>
                <ul className="list-disc list-inside">
                  <li>
                    We kindly ask for at least 24 hours notice if you need to
                    cancel or reschedule your appointment.
                  </li>
                  <li>
                    Appointments canceled or rescheduled within 24 hours of the
                    scheduled time may be subject to a 50% cancellation fee.
                  </li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-semibold">🚫 No-Shows</h3>
                <ul className="list-disc list-inside">
                  <li>
                    If you miss your appointment without notifying us, it will
                    be considered a no-show.
                  </li>
                  <li>
                    No-shows will be charged 100% of the service fee and may
                    require a deposit for future bookings.
                  </li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-semibold">💳 Late Arrivals</h3>
                <ul className="list-disc list-inside">
                  <li>
                    If you arrive more than 10 minutes late, your appointment
                    may need to be rescheduled and a fee may apply.
                  </li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-semibold">
                  💖 We Appreciate Your Understanding!
                </h3>
                <p>
                  This policy helps us manage our schedule and serve every
                  client with the care and attention they deserve. Thank you for
                  supporting our business!
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default PolicyModal;
