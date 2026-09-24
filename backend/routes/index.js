import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import productRouter from './product.js';
import categoryRoutes from './category.js';

const router = express.Router({ mergeParams: true });

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRoutes);

export default router;
