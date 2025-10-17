import { Router } from 'express';
import { getNotifications, createNotification, deleteNotification } from '../controllers/notification.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route GET /api/notifications
 * @desc Obtener notificaciones del usuario autenticado
 */
router.get('/', verifyToken, getNotifications);

/**
 * @route POST /api/notifications
 * @desc Crear una notificación
 */
router.post('/', verifyToken, createNotification);

/**
 * @route DELETE /api/notifications/:id
 * @desc Eliminar una notificación
 */
router.delete('/:id', verifyToken, deleteNotification);

export default router;
