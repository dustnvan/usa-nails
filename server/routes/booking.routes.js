import { Router } from 'express';
import bookingControllers from '../controllers/booking.controllers.js';

const router = Router();

const { getBookings, postBooking } = bookingControllers;

router.get('/', getBookings);
router.post('/', postBooking);

export default router;
