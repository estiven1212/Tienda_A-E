Tienda AIE - API REST
Descripción
API REST desarrollada en Node.js + TypeScript + Express con MongoDB, diseñada para la gestión completa de una tienda en línea (usuarios, productos, carritos, pedidos, envíos y notificaciones).
Cumple con los requerimientos del Entregable #2 del Proyecto Integrador.
Tecnologías y versiones
Componente Versión
Node.js 20.x
TypeScript ^5.2.2
Express ^5.1.0
Mongoose ^8.19.1
JWT ^9.0.2
Swagger UI ^5.0.1
Jest / Supertest (tests) ^30.2.0 / ^7.1.4
Instalación
git clone <repositorio>
cd Tienda_AIE
npm install
npm run dev

La API se inicia por defecto en
http://localhost:3000/
Estructura del Proyecto
src/
├── config/
│   ├── db.ts
│   └── swagger.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── product.controller.ts
│   ├── cart.controller.ts
│   ├── order.controller.ts
│   ├── shipment.controller.ts
│   └── notification.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── models/
│   ├── user.model.ts
│   ├── product.model.ts
│   ├── cart.model.ts
│   ├── order.model.ts
│   ├── shipment.model.ts
│   └── notification.model.ts
├── routes/
│   ├── auth.routes.ts
│   ├── product.routes.ts
│   ├── cart.routes.ts
│   ├── order.routes.ts
│   ├── shipment.routes.ts
│   └── notification.routes.ts
└── server.ts
Reglas de Negocio Implementadas
Email único y autenticación con JWT
Gestión completa de productos (CRUD)
Control de stock al crear órdenes
Validación de stock al agregar al carrito
Generación y actualización de envíos
Notificaciones mockeadas con WebSocket
(Pendiente) Cálculo automático del total
(Pendiente) Confirmación de correo y bloqueo por intentos fallidos
(Pendiente) Expiración del carrito y congelamiento de precios
Documentación de la API
Swagger disponible en:
http://localhost:3000/api/docs
Pruebas
Ejecutar las pruebas unitarias:
npm test

El proyecto mantiene una cobertura superior al 75% en controladores principales (Auth, Products, Orders, Cart).
Variables de entorno
Archivo .env:
MONGODB_URI=mongodb+srv://estiv:password@e-comerce.afghsbw.mongodb.net/tienda_aie?retryWrites=true&w=majority&appName=E-comerce
PORT=3000
PORT=3000
JWT_SECRET=mi_super_secreto
Flujo principal del usuario
Registro y autenticación (JWT)
Consulta de productos activos
Gestión de carrito (agregar, editar, eliminar)
Creación de orden y verificación de stock
Simulación de envío y notificación por WebSocket mockeado
Estiven Quintero
Alvaro Pelaez
Proyecto Tienda AIE — Entregable #2
Desarrollo Backend con Node.js y TypeScript
