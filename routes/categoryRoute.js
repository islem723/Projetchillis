import { Router } from 'express';

import { addcategory } from '../controllers/categoryController.js';

const router = Router();

router.post('/add', addcategory);

export default router;
