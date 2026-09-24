import express from 'express';

import { getCategories } from '../controllers/category.js';
import { authenticated, hasRole } from '../middlewars/index.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await getCategories();

  res.send({
    data: categories,
    error: null,
  });
});

export default router;
