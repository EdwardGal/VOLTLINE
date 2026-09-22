import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/product.js';
import { ROLES } from '../constants/roles.js';
import { authenticated, hasRole } from '../middlewars/index.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN, ROLES.MANAGER]), async (req, res) => {
  const products = await getProducts();

  res.send({ data: products });
});

router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.MANAGER]), async (req, res) => {
  const product = await addProduct(req.body);

  res.status(201).send({ data: product });
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MANAGER]), async (req, res) => {
  const product = await updateProduct(req.params.id, req.body);

  res.send({ data: product });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MANAGER]), async (req, res) => {
  await deleteProduct(req.params.id);

  res.send({ error: null });
});

export default router;
