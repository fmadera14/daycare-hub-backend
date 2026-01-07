# 🌿 Branch Strategy – Git Flow Simplificado

**Proyecto Backend API (Express + Prisma)**

---

## 🎯 Objetivos de la estrategia

- Separar **desarrollo activo** y **código estable**
- Mantener un flujo simple y fácil de seguir
- Permitir trabajo en paralelo (features y fixes)
- Reducir overhead innecesario para un proyecto académico / equipo pequeño
- Evitar errores con Prisma (`db pull`)

---

## 🌳 Ramas principales (permanentes)

### `main`

**Propósito:**
Código **estable** y **deployable**.

**Características:**

- Solo recibe merges desde:

  - `develop`
  - `hotfix/*`

- Cada merge representa una versión estable
- Nunca se desarrolla directamente aquí

✅ Equivale a **producción**.

---

### `develop`

**Propósito:**
Rama de **integración continua**.

**Características:**

- Rama base para:

  - `feature/*`
  - `bugfix/*`

- Contiene funcionalidades terminadas y probadas
- Cuando `develop` está estable → se mergea a `main`

✅ Equivale a **pre-producción**.

---

## 🌱 Ramas de trabajo

### `feature/*`

**Para:** nuevas funcionalidades

**Ejemplos:**

```bash
feature/auth-jwt
feature/students-crud
feature/payments-integration
feature/socket-attendance
```

**Origen:**

```bash
develop
```

**Destino:**

```bash
develop
```

**Reglas:**

- Una feature = una responsabilidad clara
- Puede tocar:

  - routes
  - controllers
  - services
  - domain
  - repositories

- ❌ Evitar `prisma db pull` en features

---

### `bugfix/*`

**Para:** errores detectados en `develop`

**Ejemplos:**

```bash
bugfix/jwt-expiration
bugfix/payment-status-enum
```

**Origen:**

```bash
develop
```

**Destino:**

```bash
develop
```

---

## 🚑 Ramas de emergencia

### `hotfix/*`

**Para:** bugs críticos en producción

**Ejemplos:**

```bash
hotfix/fix-login-500
hotfix/payment-duplication
```

**Origen:**

```bash
main
```

**Destino:**

```bash
main
develop
```

**Características:**

- Cambios mínimos y urgentes
- Nueva versión **PATCH** (`v1.0.1`, `v1.0.2`)
- Se mergea **siempre** a `develop` después

---

## 🔖 Versionado (Semantic Versioning)

```
MAJOR.MINOR.PATCH
```

| Tipo de cambio      | Incremento |
| ------------------- | ---------- |
| Nueva feature       | MINOR      |
| Bugfix              | PATCH      |
| Cambio incompatible | MAJOR      |

Ejemplos:

```bash
v1.0.0
v1.1.0
v1.1.1
```

---

## 🔄 Flujo típico de trabajo

### Nueva funcionalidad

```bash
git checkout develop
git checkout -b feature/students-crud

# trabajar...

git commit -m "feat: students CRUD endpoints"
git checkout develop
git merge feature/students-crud
```

---

### Publicar una versión estable

```bash
git checkout develop

# verificar que todo esté OK

git checkout main
git merge develop
git tag v1.1.0
```

---

### Hotfix en producción

```bash
git checkout main
git checkout -b hotfix/fix-login

# fix

git commit -m "fix: login error on expired token"
git checkout main
git merge hotfix/fix-login
git tag v1.1.1

git checkout develop
git merge hotfix/fix-login
```

---

## ⚠️ Reglas especiales para Prisma

Dado que **NO usas migraciones**:

✅ **Permitido**

- `prisma db pull` solo en:

  - `develop` (cuando el esquema cambia realmente)
  - `hotfix/*` si el bug es de esquema

❌ **Evitar**

- `db pull` en cada feature
- Commits frecuentes del `schema.prisma` sin cambios reales

📌 **Recomendación**
Documentar cambios de base de datos fuera del repo (README o changelog).

---

## 🧾 Convención de commits (recomendado)

```text
feat: nueva funcionalidad
fix: corrección de bug
refactor: cambio interno
docs: documentación
chore: configuración / scripts
```

Ejemplo:

```bash
feat: add payments service
fix: validate JWT expiration correctly
```

---

## 🏁 Resumen visual

```text
main
 ├── hotfix/*
 ↑
develop
 ├── feature/*
 └── bugfix/*
```
