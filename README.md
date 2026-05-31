# GoPass Task Manager - Prueba Técnica Senior Full Stack

¡Bienvenido/a a la aplicación GoPass Task Manager! Esta es una aplicación full-stack de gestión de tareas por proyectos, diseñada para demostrar habilidades avanzadas en desarrollo de software con un stack tecnológico moderno.

## 📝 Descripción del Proyecto

La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar sus proyectos personales. Dentro de cada proyecto, pueden crear, actualizar, eliminar y organizar tareas, asignándoles estados y prioridades. El objetivo es ofrecer una experiencia de usuario fluida y en tiempo real, con una arquitectura robusta, escalable y mantenible.

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto sigue una arquitectura de monorepo con dos componentes principales: un **backend** desacoplado y un **frontend** interactivo.

### Backend

Construido con **NestJS**, sigue una arquitectura modular y orientada a servicios, utilizando patrones de diseño para garantizar un código limpio y escalable.

| Tecnología | Rol |
|---|---|
| **Node.js** (v20.x) | Entorno de ejecución |
| **NestJS** (v10.x) | Framework principal |
| **Prisma** (v5.x) | ORM para la interacción con la base de datos |
| **PostgreSQL** (v15.x) | Base de datos relacional |
| **Zod** (v3.x) | Validación de DTOs y schemas |
| **Passport.js + JWT** | Autenticación basada en tokens |
| **Swagger (OpenAPI)** | Documentación y prueba de API |

### Frontend

Desarrollado con **React** y **Vite**, se enfoca en una experiencia de usuario moderna, reactiva y optimista.

| Tecnología | Rol |
|---|---|
| **React** (v18.x) | Librería para la interfaz de usuario |
| **TypeScript** (v5.x) | Tipado estático para robustez |
| **Vite** (v5.x) | Herramienta de construcción y desarrollo ultrarrápida |
| **Zustand** (v4.x) | Gestión de estado global (cliente) |
| **TanStack Query** (v5.x) | Gestión de estado del servidor (fetching, caching, etc.) |
| **React Router DOM** (v6.x) | Enrutamiento del lado del cliente |
| **Axios** | Cliente HTTP con interceptores |
| **TailwindCSS** (v3.x) | Framework de CSS utility-first |
| **Zod** (v3.x) | Validación de formularios |

## 📁 Estructura de Directorios

La estructura del monorepo está organizada para separar claramente las responsabilidades del backend y del frontend.

```
/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── ...
│   ├── src/
│   │   ├── auth/         # Lógica de autenticación
│   │   ├── projects/     # Lógica de proyectos
│   │   ├── tasks/        # Lógica de tareas
│   │   ├── common/       # Decoradores y pipes reutilizables
│   │   ├── prisma/       # Servicio de Prisma
│   │   └── main.ts       # Punto de entrada
│   └── ...
└── frontend/
    ├── src/
    │   ├── api/          # Cliente Axios y llamadas a la API
    │   ├── components/   # Componentes UI y de layout
    │   ├── features/     # Componentes de lógica de negocio (formularios, etc.)
    │   ├── hooks/        # Custom hooks para la lógica de fetching
    │   ├── pages/        # Páginas de la aplicación
    │   ├── router/       # Configuración de rutas
    │   ├── store/        # Store de Zustand para el estado del cliente
    │   └── ...
    └── ...
```

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- **Node.js** (v20 o superior)
- **npm** (o tu gestor de paquetes preferido)
- **Docker** y **Docker Compose** (para la base de datos)

### 1. Configuración del Backend

1.  **Navega al directorio del backend:**
    ```bash
    cd backend
    ```

2.  **Crea el archivo de variables de entorno:**
    Copia el contenido de `.env.example` a un nuevo archivo llamado `.env` y ajústalo si es necesario.

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run start:dev
    ```
    El backend estará disponible en `http://localhost:3000`.

### 2. Configuración del Frontend

1.  **Navega al directorio del frontend en otra terminal:**
    ```bash
    cd frontend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo de Vite:**
    ```bash
    npm run dev
    ```
    El frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 📖 Documentación de la API

La API del backend está documentada con Swagger (OpenAPI). Una vez que el servidor del backend esté en funcionamiento, puedes acceder a la documentación interactiva en:

**http://localhost:3000/api/docs**

Desde allí, puedes probar todos los endpoints, incluyendo el registro y el login para obtener un token JWT para las rutas protegidas.

