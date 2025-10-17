import { Request, Response } from 'express';
import Product from '../models/product.model';


export const listProducts = async (req: Request, res: Response) => {
  const { page = '1', limit = '10', search, category, featured, sort } = req.query as any;


  const q: any = {};
  if (search) q.name = { $regex: search, $options: 'i' };
  if (category) q.category = category;
  if (featured) q.featured = featured === 'true';

  let query = Product.find(q);

  if (sort === 'new') query = query.sort({ createdAt: -1 });

  const pageNum = parseInt(page);
  const lim = parseInt(limit);
  const total = await Product.countDocuments(q);
  const products = await query.skip((pageNum - 1) * lim).limit(lim);

  res.json({ page: pageNum, limit: lim, total, items: products });
};


export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const prod = await Product.create(req.body);
  res.status(201).json(prod);
};


export const updateProduct = async (req: Request, res: Response) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(prod);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
