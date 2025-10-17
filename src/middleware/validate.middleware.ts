import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * Middleware genérico de validación con Joi.
 * @param schema - Objeto Joi que define la forma esperada del body.
 */
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      return res.status(400).json({ message: `Errores de validación: ${messages}` });
    }
    next();
  };
};
