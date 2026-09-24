import express from 'express';
import {
  getProducts,
  getProductsWithTags,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js';
import { ROLES } from '../constants/roles.js';
import { authenticated, hasRole, upload } from '../middlewars/index.js';


const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const products = await getProducts();

    res.send({
      data: products,
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: error.message,
    });
  }
});

router.get('/tagged', async (req, res) => {
  try {
    const products = await getProductsWithTags();

    res.send({
      data: products,
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: error.message,
    });
  }
});

router.post(
  '/',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MANAGER]),
  upload.array('images', 10),
  async (req, res) => {
    try {
      const images = req.files.map((file) => `/uploads/products/${file.filename}`);

      const product = await addProduct({
        ...req.body,
        images,
      });

      res.status(201).send({
        data: product,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        error: error.message,
      });
    }
  }
);

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MANAGER]),
  upload.array('images', 10),
  async (req, res) => {
    try {
      const product = await updateProduct(req.params.id, req.body, req.files);

      res.send({
        data: product,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        error: error.message,
      });
    }
  }
);

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MANAGER]), async (req, res) => {
  await deleteProduct(req.params.id);

  res.send({ error: null });
});

export default router;
