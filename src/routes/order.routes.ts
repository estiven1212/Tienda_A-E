import { Router } from 'express';
import { createOrder, listOrders, getOrder } from '../controllers/order.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Órdenes
 *   description: Creación y gestión de órdenes de compra
 */

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', verifyToken, createOrder);

router.get('/', verifyToken, listOrders);


router.get('/:id', verifyToken, getOrder);

export default router;
