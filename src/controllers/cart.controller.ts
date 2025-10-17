import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import mongoose from 'mongoose';

export const getCart = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) return res.json({ items: [], total: 0 });

  const total = cart.items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  res.json({ items: cart.items, total });
};

export const addItem = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { productId, quantity } = req.body;

  // ✅ Validaciones de entrada
  if (!productId || typeof quantity !== 'number' || quantity <= 0) {
    return res
      .status(400)
      .json({ message: 'Datos de producto inválidos (productId y quantity requeridos)' });
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'productId inválido' });
  }

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  if (product.stock < quantity)
    return res.status(409).json({ message: 'Stock insuficiente' });

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });

  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx >= 0) {
    cart.items[idx].quantity += quantity;
  } else {
    cart.items.push({ product: product._id, quantity, price: product.price });
  }

  await cart.save();
  res.status(201).json(cart);
};

export const updateItem = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx < 0) return res.status(404).json({ message: 'Item no encontrado' });

  if (quantity <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx].quantity = quantity;
  }

  await cart.save();
  res.json(cart);
};

export const removeItem = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  res.status(204).send();
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
  cart.items = [];
  await cart.save();
  res.status(204).send();
};
