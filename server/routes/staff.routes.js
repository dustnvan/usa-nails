import { Router } from 'express';
import staffControllers from '../controllers/staff.controllers.js';

const { getStaff } = staffControllers;
const router = Router();

router.get('/', getStaff);

export default router;
