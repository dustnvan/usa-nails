import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: String,
});

export default model('Service', serviceSchema);
