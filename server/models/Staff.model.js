import { Schema, model } from 'mongoose';

const staffSchema = new Schema({
  name: { type: String, required: true },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
});

export default model('Staff', staffSchema, 'staff');
