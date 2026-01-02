# Backend – API con Express y Prisma

Backend desarrollado con **Node.js**, **Express** y **Prisma ORM**, conectado a una **base de datos PostgreSQL existente**.

El proyecto expone una API REST y utiliza Prisma únicamente como **cliente ORM**, reflejando el esquema de la base de datos mediante introspección (`db pull`).

---

## 🚀 Tecnologías usadas

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JavaScript (ES Modules)

---

## 📁 Estructura del proyecto

```text

backend/
├── prisma/
│ └── schema.prisma
├── src/
│ └── prisma.js
├── index.js
├── package.json
├── .env.example
└── README.md
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
