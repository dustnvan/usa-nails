import Staff from '../models/staff.model.js';

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({}).populate('services', 'name');
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getStaff };
