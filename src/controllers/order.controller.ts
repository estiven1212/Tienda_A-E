import { Request, Response } from 'express';
import Order from '../models/order.model';
import Product from '../models/product.model';

// 🆕 Crear una nueva orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'La orden no tiene productos.' });
    }

    // ✅ Validar dirección
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return res.status(400).json({ message: 'Debe incluir una dirección de envío válida.' });
    }

    let total = 0;

    // Validar stock de cada producto
    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product)
        return res.status(404).json({ message: `Producto ${it.productId} no existe` });
      if (product.stock < it.quantity)
        return res
          .status(400)
          .json({ message: `Stock insuficiente para ${product.name}` });
      total += product.price * it.quantity;
    }

    const newOrder = await Order.create({
      userId,
      items,
      total,
      address,
      status: 'pendiente',
    });

    // Descontar stock
    for (const it of items) {
      await Product.findByIdAndUpdate(it.productId, { $inc: { stock: -it.quantity } });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('❌ Error al crear la orden:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// 📜 Listar órdenes
export const listOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    let orders;

    if (user.role === 'admin') {
      orders = await Order.find().populate('items.productId').sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ userId: user.id })
        .populate('items.productId')
        .sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (error) {
    console.error('❌ Error al listar órdenes:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// 🔍 Obtener orden por ID
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const order = await Order.findById(id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    if (user.role !== 'admin' && order.userId.toString() !== user.id) {
      return res.status(403).json({ message: 'No tienes permiso para ver esta orden' });
    }

    res.json(order);
  } catch (error) {
    console.error('❌ Error al obtener la orden:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
