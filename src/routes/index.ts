import { Router } from 'express';
import authRoutes from './auth.routes';
import orderRoutes from './order.routes'; 
import productRoutes from './product.routes';
import shipmentRoutes from './shipment.routes';
import notificationRoutes from './notification.routes';
import cartRoutes from './cart.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/cart', cartRoutes);

export default router;
