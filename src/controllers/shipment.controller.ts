import { Request, Response } from 'express';
import Shipment from '../models/shipment.model';
import Order from '../models/order.model';

export const getShipments = async (req: Request, res: Response) => {
  try {
    const shipments = await Shipment.find().populate('orderId');
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener envíos', err });
  }
};

export const getShipmentByOrder = async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findOne({ orderId: req.params.orderId }).populate('orderId');
    if (!shipment) return res.status(404).json({ message: 'Envío no encontrado' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener envío', err });
  }
};

export const createShipment = async (req: Request, res: Response) => {
  try {
    const { orderId, tracking, status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(400).json({ message: 'Orden no existe' });

    const shipment = await Shipment.create({ orderId, tracking, status });
    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear envío', err });
  }
};

export const updateShipmentStatus = async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: req.body.status },
      { new: true }
    );
    if (!shipment) return res.status(404).json({ message: 'Envío no encontrado' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar envío', err });
  }
};

export const deleteShipment = async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findOneAndDelete({ orderId: req.params.orderId });
    if (!shipment) return res.status(404).json({ message: 'Envío no encontrado' });
    res.json({ message: 'Envío eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar envío', err });
  }
};
