import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ message: 'No autenticado' });
  if (user.role !== 'admin') return res.status(403).json({ message: 'Requiere rol admin' });
  next();
};