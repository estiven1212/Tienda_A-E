import { Router } from 'express';
import { getShipments, getShipmentByOrder, createShipment, updateShipmentStatus, deleteShipment } from '../controllers/shipment.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route GET /api/shipments
 * @desc Obtener todos los envíos (solo autenticado)
 */
router.get('/', verifyToken, getShipments);

/**
 * @route GET /api/shipments/:orderId
 * @desc Obtener envío por ID de orden
 */
router.get('/:orderId', verifyToken, getShipmentByOrder);

/**
 * @route POST /api/shipments
 * @desc Crear un nuevo envío
 */
router.post('/', verifyToken, createShipment);

/**
 * @route PUT /api/shipments/:orderId
 * @desc Actualizar estado del envío
 */
router.put('/:orderId', verifyToken, updateShipmentStatus);

/**
 * @route DELETE /api/shipments/:orderId
 * @desc Eliminar un envío
 */
router.delete('/:orderId', verifyToken, deleteShipment);

export default router;
