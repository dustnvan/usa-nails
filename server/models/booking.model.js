import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  selections: [
    {
      staff: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
      service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    },
  ],
  date: { type: Date, required: true },
});

export default model('Booking', bookingSchema);
