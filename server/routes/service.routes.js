import { Router } from 'express';
import serviceControllers from '../controllers/service.controllers.js';

const { createService, getServices } = serviceControllers;
const router = Router();

router.get('/', getServices);
router.post('/', createService);

export default router;
