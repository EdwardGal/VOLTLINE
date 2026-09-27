import express from 'express';

import {
  getProducts,
  getProductsWithTags,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from '../controllers/product.js';

import { ROLES } from '../constants/roles.js';
import { authenticated, hasRole, upload } from '../middlewars/index.js';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  // authenticated,
  // hasRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]),
  async (req, res) => {
    try {
      const products = await getProducts(req.query.search, req.query.category);

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
  }
);

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

router.get('/:id', async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

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
});

router.post(
  '/',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MANAGER]),
  upload.array('images', 10),
  async (req, res) => {
    try {
      const images = req.files.map((file) => `/uploads/products/${file.filename}`);

      const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

      const product = await addProduct({
        ...req.body,
        tags,
        images,
      });

      res.status(201).send({
        data: product,
        error: null,
      });
    } catch (error) {
      console.error(error);

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
      const productData = {
        ...req.body,
      };

      if (req.body.tags !== undefined) {
        productData.tags = JSON.parse(req.body.tags);
      }

      const product = await updateProduct(req.params.id, productData, req.files);

      res.send({
        data: product,
        error: null,
      });
    } catch (error) {
      console.error(error);

      res.status(500).send({
        data: null,
        error: error.message,
      });
    }
  }
);

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MANAGER]), async (req, res) => {
  await deleteProduct(req.params.id);

  res.send({
    error: null,
  });
});

export default router;
