# Tienda AIE — API REST

## Descripción

API REST desarrollada en **Node.js + TypeScript + Express** con **MongoDB**, diseñada para la gestión completa de una tienda en línea (usuarios, productos, carritos, pedidos, envíos y notificaciones). Cumple con los requerimientos del **Entregable #2** del Proyecto Integrador.

---

## Tecnologías y versiones

* **Node.js** 20.x
* **TypeScript** ^5.2.2
* **Express** ^5.1.0
* **Mongoose** ^8.19.1
* **JWT** ^9.0.2
* **Swagger UI** ^5.0.1
* **Jest** ^30.2.0 / **Supertest** ^7.1.4

---

## Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPO>
cd Tienda_AIE

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

---

## Inicio rápido

* La API se inicia por defecto en: **[http://localhost:3000/](http://localhost:3000/)**
* Documentación Swagger: **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

---

## Estructura del proyecto

```text
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
```

---

## Reglas de negocio implementadas

* Email único y autenticación con **JWT**.
* Gestión completa de **productos (CRUD)**.
* **Control de stock** al crear órdenes.
* **Validación de stock** al agregar ítems al carrito.
* **Generación y actualización de envíos**.
* **Notificaciones** mockeadas con **WebSocket**.
* *(Pendiente)* Cálculo automático del total.
* *(Pendiente)* Confirmación de correo y bloqueo por intentos fallidos.
* *(Pendiente)* Expiración del carrito y congelamiento de precios.

---

## Pruebas

Ejecutar las pruebas unitarias:

```bash
npm test
```

> Cobertura actual **> 75%** en controladores principales (Auth, Products, Orders, Cart).

---

## Variables de entorno

Crea un archivo **.env** en la raíz (usa valores reales en tu entorno; **no** subas credenciales al repo):

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/tienda_aie?retryWrites=true&w=majority&appName=E-comerce
PORT=3000
JWT_SECRET=mi_super_secreto
```

---

## Flujo principal del usuario

* Registro y autenticación (**JWT**).
* Consulta de productos activos.
* Gestión de carrito (agregar, editar, eliminar).
* Creación de orden y verificación de stock.
* Simulación de envío y notificación por **WebSocket** mockeado.

---

## Integrantes

**Estiven Quintero**
**Alvaro Pelaez**

> Proyecto **Tienda AIE** — Entregable #2 — Desarrollo Backend con Node.js y TypeScript.
