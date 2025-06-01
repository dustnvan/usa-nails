import { Router } from 'express';
import routeControllers from '../controllers/service.controllers.js';

const { createService } = routeControllers;
const router = Router();

router.post('/', createService);

export default router;
