# GoPass Task Manager - Prueba Técnica Senior Full Stack

¡Bienvenido/a a la aplicación GoPass Task Manager! Esta es una aplicación full-stack de gestión de tareas por proyectos, diseñada para demostrar habilidades avanzadas en desarrollo de software con un stack tecnológico moderno. Además, integra un asistente de IA (usando Google Gemini) para sugerir tareas relevantes basadas en la descripción de cada proyecto, agilizando la planificación.

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
| **@google/genai** | Asistente de IA para sugerencia de tareas |

#### Descripción de Tecnologías (Backend)

-   **Node.js (v20.x):** Entorno de ejecución de JavaScript del lado del servidor, basado en el motor V8 de Chrome. Permite construir aplicaciones de red rápidas y escalables.
-   **NestJS (v10.x):** Framework progresivo de Node.js para construir aplicaciones eficientes, fiables y escalables. Utiliza TypeScript y sigue patrones de arquitectura como la Inyección de Dependencias, Módulos y Controladores.
-   **Prisma (v5.x):** ORM de nueva generación para Node.js y TypeScript. Facilita la interacción con la base de datos mediante un schema declarativo y un cliente de base de datos auto-generado y totalmente tipado.
-   **PostgreSQL (v15.x):** Potente sistema de gestión de bases de datos relacionales de código abierto, conocido por su robustez, extensibilidad y cumplimiento de estándares.
-   **Zod (v3.x):** Librería de validación de schemas con inferencia de tipos estáticos. Se utiliza para validar los DTOs (Data Transfer Objects) en los controladores, asegurando que los datos de entrada sean correctos.
-   **Passport.js + JWT:** Estrategia de autenticación estándar para proteger endpoints. Passport.js es un middleware de autenticación modular, y se usa junto a JSON Web Tokens (JWT) para gestionar sesiones de usuario sin estado.
-   **Swagger (OpenAPI):** Herramienta para diseñar, construir, documentar y consumir APIs RESTful. En este proyecto, se usa para generar una documentación interactiva de la API, facilitando las pruebas.
-   **@google/genai:** SDK oficial para interactuar con los modelos de IA de Google, como Gemini. Se utiliza para la funcionalidad de sugerencia inteligente de tareas.

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
| **React Beautiful DnD** (v13.x) | Funcionalidad de arrastrar y soltar (Drag and Drop) |

#### Descripción de Tecnologías (Frontend)

-   **React (v18.x):** Librería de JavaScript para construir interfaces de usuario interactivas y reutilizables. Su enfoque declarativo y basado en componentes facilita el desarrollo de UIs complejas.
-   **TypeScript (v5.x):** Superset de JavaScript que añade tipado estático opcional. Mejora la robustez del código, la autocompletación y la detección temprana de errores.
-   **Vite (v5.x):** Herramienta de desarrollo y construcción de frontend extremadamente rápida. Proporciona un servidor de desarrollo con Hot Module Replacement (HMR) instantáneo y optimiza el empaquetado para producción.
-   **Zustand (v4.x):** Solución de gestión de estado global minimalista y potente para React. Se utiliza para gestionar el estado del cliente, como la información del usuario autenticado y el token JWT.
-   **TanStack Query (v5.x):** Librería para la gestión del estado del servidor. Simplifica el fetching, caching, sincronización y actualización de datos, proporcionando una experiencia de usuario optimista y reactiva.
-   **React Router DOM (v6.x):** Librería estándar para el enrutamiento en aplicaciones React. Permite la navegación declarativa entre las diferentes páginas de la aplicación.
-   **Axios:** Cliente HTTP basado en promesas para el navegador y Node.js. Se utiliza para realizar peticiones a la API del backend, con una instancia configurada con interceptores para manejar la autenticación y los errores de forma global.
-   **TailwindCSS (v3.x):** Framework de CSS "utility-first" que permite construir diseños personalizados rápidamente sin salir del HTML. Facilita la creación de un sistema de diseño consistente.
-   **Zod (v3.x):** Utilizado en el frontend para la validación de esquemas de formularios, asegurando que los datos enviados por el usuario cumplan con el formato esperado antes de enviarlos a la API.
-   **React Beautiful DnD (v13.x):** Librería para crear funcionalidades de arrastrar y soltar (drag and drop) accesibles y de alto rendimiento. En este proyecto, se utiliza para permitir al usuario reorganizar las tareas entre diferentes estados (ej. "Pendiente", "En Progreso", "Hecho").

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

-   **Node.js** (v20 o superior)
-   **npm** (o tu gestor de paquetes preferido)
-   **Docker** y **Docker Compose**

### 1. Configuración de Variables de Entorno

Antes de ejecutar la aplicación (ya sea con Docker o manualmente), es crucial configurar las variables de entorno.

#### Backend (`/backend/.env`)

1.  Navega a la carpeta `backend`.
2.  Copia el contenido de `.env.example` a un nuevo archivo llamado `.env`.
3.  Añade tu clave de API para Gemini en `GEMINI_API_KEY`.
4.  **Importante:** La `DATABASE_URL` debe ajustarse dependiendo de cómo ejecutes el proyecto:
    -   **Para Docker (Recomendado):** La URL debe apuntar al nombre del servicio de la base de datos definido en `docker-compose.yml`, que es `postgres`.
        ```env
        DATABASE_URL="postgresql://user:password@postgres:5432/taskmanager"
        ```
    -   **Para Ejecución Manual:** Si tienes PostgreSQL corriendo directamente en tu máquina, usa `localhost`.
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
        ```

#### Frontend (`/frontend/.env`)

1.  Navega a la carpeta `frontend`.
2.  Copia `.env.example` a un nuevo archivo `.env`. El valor por defecto es correcto para la mayoría de los casos.
    ```env
    VITE_API_URL="http://localhost:3000/api"
    ```

### 2. Ejecución con Docker Compose (Método Recomendado)

Este método orquesta la base de datos, el backend y el frontend automáticamente, asegurando un entorno consistente y reproducible. Es la forma ideal de trabajar en este proyecto.

1.  **Navega al directorio del backend:**
    ```bash
    cd / # Asegúrate de estar en la raíz del proyecto
    ```

2.  **Levanta los servicios:**
    Asegúrate de que Docker Desktop esté en ejecución y luego lanza el siguiente comando:
    ```bash
    docker-compose up --build
    ```
    -   El flag `--build` reconstruirá las imágenes si hay cambios en los `Dockerfile` o en el código fuente.
    -   Este comando se encargará de:
        -   Crear una red interna para los servicios.
        -   Levantar un contenedor de **PostgreSQL**.
        -   Construir y levantar el contenedor del **backend**, aplicando las migraciones de Prisma automáticamente.
        -   Construir y levantar el contenedor del **frontend** con Nginx.

3.  **Accede a la aplicación:**
    -   El **Frontend** estará disponible en `http://localhost:5173`.
    -   El **Backend** estará disponible en `http://localhost:3000`.

### 3. Ejecución Manual (Alternativa)

Si prefieres no usar Docker, puedes ejecutar cada parte del proyecto por separado.

#### Backend

1.  Asegúrate de tener una instancia de **PostgreSQL** corriendo y accesible en la URL especificada en `backend/.env` (con `localhost`).
2.  En el directorio `/backend`, instala dependencias (`npm install`).
3.  Aplica las migraciones: `npx prisma migrate dev --name init`.
4.  Inicia el servidor: `npm run start:dev`.

#### Frontend

1.  En otra terminal, ve al directorio `/frontend`.
2.  Instala dependencias (`npm install`).
3.  Inicia el servidor de desarrollo: `npm run dev`.

## 📖 Documentación de la API

La API del backend está documentada con Swagger (OpenAPI). Una vez que el servidor del backend esté en funcionamiento, puedes acceder a la documentación interactiva en:

**http://localhost:3000/api/docs**

Desde allí, puedes probar todos los endpoints, incluyendo el registro y el login para obtener un token JWT para las rutas protegidas.


## 馃 Contribuci贸n

隆Las contribuciones son bienvenidas! Si deseas contribuir, por favor comunicate con el administrador, es decir, conmigo, contactame al correo [dev@jontmarz.com](mailto:dev@jontmarz.com). [Visita mi website](https://jontmarz.com/)

Espero que disfrutes el proyecto.