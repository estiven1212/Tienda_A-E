import { Router } from "express";
import Joi from "joi";
import { register, login, profile } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

const router = Router();

// ✅ Esquemas de validación con Joi
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El correo debe ser válido.",
    "any.required": "El correo es obligatorio.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// ✅ Rutas con validaciones activas
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", verifyToken, profile);

export default router;
