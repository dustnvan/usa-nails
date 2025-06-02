import Booking from '../models/booking.model.js';

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getBookings, postBooking };
