import Staff from '../models/Staff.model.js';

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({});
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getStaff };
