# Backend – API con Express y Prisma

Backend desarrollado con **Node.js**, **Express** y **Prisma ORM**, conectado a una **base de datos PostgreSQL existente**.

El proyecto expone una API REST y utiliza Prisma únicamente como **cliente ORM**, reflejando el esquema de la base de datos mediante introspección (`db pull`).

---

## 🚀 Tecnologías usadas

- Node.js
- Express.js
- Prisma ORM
- Supabase
- JavaScript (ES Modules)

---

## 📁 Estructura del proyecto

```text

src/
│
├── app.js                 # Inicialización de Express
├── server.js              # Arranque del servidor HTTP / Socket.IO
│
├── config/                # Configuración global
│   ├── env.js
│   ├── database.js
│   └── socket.js
│
├── routes/                # Definición de endpoints REST
│   ├── auth.routes.js
│   ├── users.routes.js
│   ├── students.routes.js
│   ├── routes.routes.js
│   ├── payments.routes.js
│   └── notifications.routes.js
│
├── controllers/           # CAPA DE PRESENTACIÓN
│   ├── auth.controller.js
│   ├── users.controller.js
│   ├── students.controller.js
│   ├── routes.controller.js
│   └── payments.controller.js
│
├── services/              # CAPA DE APLICACIÓN
│   ├── auth.service.js
│   ├── user.service.js
│   ├── student.service.js
│   ├── route.service.js
│   ├── payment.service.js
│   └── notification.service.js
│
├── domain/                # CAPA DE DOMINIO
│   ├── entities/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Route.js
│   │   └── Payment.js
│   │
│   ├── enums/
│   │   ├── roles.enum.js
│   │   └── paymentStatus.enum.js
│   │
│   └── rules/
│       ├── payment.rules.js
│       └── attendance.rules.js
│
├── repositories/          # CAPA DE INFRAESTRUCTURA (Persistencia)
│   ├── user.repository.js
│   ├── student.repository.js
│   ├── route.repository.js
│   └── payment.repository.js
│
├── integrations/          # CAPA DE INFRAESTRUCTURA (Externos)
│   ├── payment.gateway.js
│   ├── fcm.provider.js
│   ├── maps.provider.js
│   └── storage.provider.js
│
├── middlewares/           # Cross-cutting concerns
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
│
├── sockets/               # Tiempo real (Socket.IO)
│   ├── socket.handler.js
│   └── events/
│       ├── route.events.js
│       └── attendance.events.js
│
└── utils/                 # Utilidades generales
    ├── logger.js
    ├── jwt.js
    └── crypto.js

```

---

## ⚙️ Requisitos previos

Antes de iniciar el proyecto asegúrate de tener instalado:

- **Node.js** v18 o superior (recomendado v20+)
- **npm**
- Acceso a una base de datos **PostgreSQL** ya desplegada

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto a partir del ejemplo:

```bash
cp .env.example .env
```

Configura la conexión a la base de datos:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/nombre_bd"
PORT=3000
```

⚠️ **Nunca subas el archivo `.env` al repositorio.**

---

## 📦 Instalación de dependencias

Desde la raíz del proyecto:

```bash
npm install
```

---

## 🔄 Sincronizar Prisma con la base de datos

Este proyecto **no usa migraciones**, ya que trabaja con una base de datos existente.

Para reflejar el esquema actual de la BD:

```bash
npm run pull
```

Luego genera el cliente Prisma:

```bash
npm run generate
```

---

## ▶️ Iniciar el servidor

```bash
npm run dev
```

El servidor se levantará en:

```
http://localhost:3000
```

---

## 🧪 Prisma Studio (opcional)

Para inspeccionar los datos desde una interfaz gráfica:

```bash
npm run studio
```

---

## Tests

This test suite covers the main functionality of the Express API.

```bash
npm test
```

### Test Framework

- **Jest**: Test framework
- **Supertest**: HTTP assertion library for testing Express endpoints
- **ES Modules**: Tests use ES module syntax with Jest's experimental VM modules support

### Notas de los tests

- The Prisma client is mocked in tests to avoid database dependencies
- The BigInt.prototype.toJSON override is applied in the test file to match production behavior
- Error console output during tests is expected for the error handling test case

---

## 🧠 Notas importantes

- Los campos `BIGINT` se serializan automáticamente como `string` en las respuestas JSON.
- Los nombres de los modelos en Prisma coinciden con los definidos en `schema.prisma`.
- El proyecto usa **ES Modules** (`"type": "module"` en `package.json`).

---

## 📌 Scripts disponibles

```bash
npm run dev        # Inicia el servidor
npm run pull       # Ejecuta prisma db pull
npm run generate   # Genera el cliente Prisma
```

---

## 📄 Licencia

Este proyecto es de uso académico / educativo.
