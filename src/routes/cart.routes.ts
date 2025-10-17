import { Router } from 'express';
import { getCart, addItem, updateItem, removeItem, clearCart } from '../controllers/cart.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Carrito
 *   description: Operaciones del carrito de compras
 */

router.use(verifyToken);

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', getCart);

/**
 * @openapi
 * /cart/items:
 *   post:
 *     summary: Agregar producto al carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 */
router.post('/items', addItem);

router.put('/items/:productId', updateItem);
router.delete('/items/:productId', removeItem);
router.delete('/', clearCart);

export default router;
