import { Router } from 'express';

import { addcategory, getAll } from '../controllers/categoryController.js';

const router = Router();

router.post('/add', addcategory);

router.route('/').get(getAll);

export default router;
