import { Router } from 'express';
import categoryControllers from '../controllers/category.controllers.js';

const router = Router();
const { getCategories, postCategory, updateCategory, deleteCategory } =
  categoryControllers;

router.get('/', getCategories);
router.post('/', postCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
