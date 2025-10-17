import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Campos faltantes' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const profile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const user = await User.findById(userId).select('-password');
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
};
