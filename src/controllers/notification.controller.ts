import { Request, Response } from 'express';
import Notification from '../models/notification.model';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener notificaciones', err });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const userId = (req as any).user.id;
    const notification = await Notification.create({ userId, message });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear notificación', err });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notificación no encontrada' });
    res.json({ message: 'Notificación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar notificación', err });
  }
};
