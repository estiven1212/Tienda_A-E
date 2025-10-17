import { Router } from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
