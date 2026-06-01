# Task Manager App · Prueba Técnica Senior Full Stack

> Este archivo es la fuente de verdad para el agente. Léelo completo antes de escribir cualquier línea de código. No inferir, no asumir, no improvisar fuera de lo definido aquí y siempre siguiendo los principios SOLID, al igual que siempre utilizar patrones de diseño de software.

---

## 1. CONTEXTO DEL PROYECTO

Aplicación de gestión de tareas por proyectos. Permite:
- Crear y administrar proyectos
- Asociar tareas a proyectos con estados y niveles de prioridad
- Visualizar la información de forma clara e interactiva

---

## 2. STACK TECNOLÓGICO — OBLIGATORIO Y NO NEGOCIABLE

### Backend
| Tecnología | Versión mínima | Rol |
|---|---|---|
| Node.js | 20.x LTS | Runtime |
| NestJS | 10.x | Framework principal |
| Prisma | 5.x | ORM |
| PostgreSQL | 15.x | Base de datos |
| Zod | 3.x | Validación de schemas y DTOs |
| Passport.js + JWT | — | Autenticación |
| @nestjs/passport, @nestjs/jwt | — | Guards y estrategias |

### Frontend
| Tecnología | Versión mínima | Rol |
|---|---|---|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Tipado estático |
| Vite | 5.x | Build tool |
| Zustand | 4.x | Estado global |
| React Router DOM | 6.x | Enrutamiento |
| Zod | 3.x | Validación de formularios |
| TanStack Query | 5.x | Server state / fetching |
| Axios | — | Cliente HTTP |
| TailwindCSS | 3.x | Estilos |

> ⛔ NO usar: Redux, MobX, Context API como store global, class components, Mongoose, Sequelize, TypeORM, fetch nativo en lugar de Axios.

---

## 3. ESTRUCTURA DE DIRECTORIOS

### Backend (`/backend`)
```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   ├── projects/
│   │   ├── projects.module.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── dto/
│   │       ├── create-project.dto.ts
│   │       └── update-project.dto.ts
│   ├── tasks/
│   │   ├── tasks.module.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── dto/
│   │       ├── create-task.dto.ts
│   │       └── update-task.dto.ts
│   ├── common/
│   │   ├── pipes/
│   │   │   └── zod-validation.pipe.ts
│   │   └── decorators/
│   │       └── current-user.decorator.ts
│   ├── prisma/
│   │   └── prisma.service.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env.example
└── package.json
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.ts          # instancia base con interceptors
│   │   ├── auth.api.ts
│   │   ├── projects.api.ts
│   │   └── tasks.api.ts
│   ├── components/
│   │   ├── ui/               # componentes genéricos reutilizables
│   │   └── layout/
│   │       ├── AppLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── schemas/
│   │   │       └── auth.schema.ts   # schemas Zod
│   │   ├── projects/
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── schemas/
│   │   │       └── project.schema.ts
│   │   └── tasks/
│   │       ├── TaskList.tsx
│   │       ├── TaskCard.tsx
│   │       ├── TaskForm.tsx
│   │       └── schemas/
│   │           └── task.schema.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProjects.ts
│   │   └── useTasks.ts
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── router/
│   │   ├── index.tsx         # definición de rutas
│   │   └── ProtectedRoute.tsx
│   ├── store/
│   │   └── authStore.ts      # Zustand store
│   ├── types/
│   │   └── index.ts          # tipos compartidos
│   └── main.tsx
└── package.json
```

---

## 4. MODELO DE DATOS (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String
  password  String
  projects  Project[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Project {
  id          String   @id @default(uuid())
  name        String
  description String?
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks       Task[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Task {
  id          String      @id @default(uuid())
  title       String
  description String?
  status      TaskStatus  @default(PENDING)
  priority    TaskPriority @default(MEDIUM)
  projectId   String
  project     Project     @relation(fields: [projectId], references: [id], onDelete: Cascade)
  dueDate     DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  DONE
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
}
```

> ⛔ NO agregar campos extra al schema sin actualizar este archivo primero.
> ⛔ NO usar `Int` como ID — siempre `String` con `@default(uuid())`.

---

## 5. API ENDPOINTS

### Auth
```
POST   /api/auth/register    → { name, email, password }
POST   /api/auth/login       → { email, password } → { access_token, user }
GET    /api/auth/me          → [JWT] → usuario actual
```

### Projects (todos requieren JWT)
```
GET    /api/projects         → lista de proyectos del usuario autenticado
POST   /api/projects         → crear proyecto
GET    /api/projects/:id     → detalle con tareas incluidas
PATCH  /api/projects/:id     → actualizar proyecto
DELETE /api/projects/:id     → eliminar proyecto
```

### Tasks (todos requieren JWT)
```
GET    /api/tasks?projectId=:id  → tareas de un proyecto
POST   /api/tasks                → crear tarea
PATCH  /api/tasks/:id            → actualizar tarea (incluye cambio de status/priority)
DELETE /api/tasks/:id            → eliminar tarea
```

> ⛔ Todos los endpoints de Projects y Tasks deben estar protegidos con `JwtAuthGuard`.
> ⛔ Un usuario solo puede ver/modificar sus propios proyectos. Validar ownership en el service.

---

## 6. AUTENTICACIÓN Y RUTAS PROTEGIDAS

### Backend — JWT Guard

```typescript
// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

```typescript
// Aplicar en controllers protegidos
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController { ... }
```

### Frontend — ProtectedRoute

```typescript
// src/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
```

### Zustand Auth Store

```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth-storage' }
  )
);
```

> ⛔ NO usar `localStorage` directamente fuera del store de Zustand.
> ⛔ El middleware `persist` de Zustand es suficiente para persistir el token.

---

## 7. VALIDACIÓN CON ZOD

### Backend — Pipe personalizado

```typescript
// src/common/pipes/zod-validation.pipe.ts
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }
    return result.data;
  }
}
```

### Backend — Schema ejemplo

```typescript
// src/tasks/dto/create-task.dto.ts
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).default('PENDING'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  projectId: z.string().uuid(),
  dueDate: z.string().datetime().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
```

### Frontend — Schema ejemplo con react-hook-form

```typescript
// src/features/tasks/schemas/task.schema.ts
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
```

> ⛔ NO validar con `if (!value)` manualmente. Siempre usar Zod.
> ⛔ Los tipos de los DTOs SIEMPRE deben ser inferidos con `z.infer<typeof schema>` — nunca definir interfaces duplicadas.

---

## 8. AXIOS — INSTANCIA BASE CON INTERCEPTORS

```typescript
// src/api/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 9. REGLAS DE CÓDIGO OBLIGATORIAS

### General
- Usar **TypeScript estricto** en todo el proyecto. `strict: true` en `tsconfig.json`.
- Ningún `any` implícito. Si se necesita un tipo dinámico, usar `unknown` y hacer type narrowing.
- Todos los archivos de componentes React usan extensión `.tsx`.
- Todos los archivos de lógica pura usan extensión `.ts`.

### NestJS
- Cada recurso tiene su propio módulo: `ProjectsModule`, `TasksModule`, `AuthModule`.
- Los módulos son autocontenidos. Importar solo lo necesario.
- Toda la lógica de negocio va en el **Service**, no en el Controller.
- Los Controllers solo reciben la petición, llaman al service y retornan la respuesta.
- Usar `@CurrentUser()` decorator para obtener el usuario del JWT en los controllers.

### Prisma
- El `PrismaService` se inyecta, nunca se instancia directamente.
- Siempre manejar errores de Prisma con `try/catch` y lanzar las excepciones de NestJS correspondientes (`NotFoundException`, `ConflictException`, etc.).
- Las queries con relaciones se hacen con `include`, no con queries separadas.

### React / Frontend
- Componentes funcionales únicamente. Prohibido `class Component`.
- Props siempre tipadas con interfaces TypeScript.
- Custom hooks para toda la lógica de fetching (TanStack Query dentro de hooks).
- No hacer llamadas a `api` directamente desde componentes — siempre a través de hooks.
- No usar `useEffect` para fetching — usar TanStack Query.

### Zustand
- Un solo store para auth: `authStore.ts`.
- Si se necesita más estado global (ej. UI state), crear un `uiStore.ts` separado.
- No mezclar server state con client state en Zustand — el server state va en TanStack Query.

---

## 10. VARIABLES DE ENTORNO

### Backend (`.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
JWT_SECRET="super-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### Frontend (`.env`)
```env
VITE_API_URL="http://localhost:3000/api"
```

> ⛔ NUNCA hardcodear URLs, secrets o credenciales en el código.
> ⛔ Siempre usar `import.meta.env.VITE_*` en el frontend para variables de entorno.

---

## 11. RESPUESTAS DE LA API — FORMATO ESTÁNDAR

```typescript
// Éxito con datos
{ data: T, message?: string }

// Éxito sin datos (DELETE)
{ message: 'Recurso eliminado correctamente' }

// Error (manejado por NestJS exception filters)
{
  statusCode: number,
  message: string | string[],
  error: string
}
```

---

## 12. FLUJOS DE USUARIO COMPLETOS

### Flujo 1: Autenticación
1. Usuario accede a `/login` o `/register`
2. Completa formulario (validado con Zod en tiempo real)
3. Submit → llamada a `/api/auth/login` o `/api/auth/register`
4. Respuesta exitosa → guardar `token` y `user` en Zustand store (persiste en localStorage vía middleware)
5. Redirect a `/dashboard`
6. Si token inválido o expirado → interceptor de Axios llama `logout()` y redirige a `/login`

### Flujo 2: Gestión de Proyectos
1. Dashboard muestra lista de proyectos del usuario
2. Botón "Nuevo Proyecto" abre modal/formulario
3. Formulario validado con Zod → POST `/api/projects`
4. TanStack Query invalida cache de `projects` → lista se actualiza automáticamente
5. Click en proyecto → navega a `/projects/:id`

### Flujo 3: Gestión de Tareas
1. Vista de detalle del proyecto muestra sus tareas agrupadas por status
2. Botón "Nueva Tarea" → formulario con campos: título, descripción, prioridad, fecha límite
3. POST `/api/tasks` con `projectId`
4. Drag & drop o selector para cambiar status → PATCH `/api/tasks/:id`
5. Filtros por prioridad y status disponibles en la UI

---

## 13. LO QUE EL AGENTE NO DEBE HACER

- ❌ Inventar librerías que no están en el stack definido
- ❌ Usar `fetch` nativo en el frontend (usar Axios)
- ❌ Usar `Context API` como reemplazo de Zustand
- ❌ Escribir lógica de negocio en Controllers de NestJS
- ❌ Crear interfaces TypeScript duplicadas cuando se puede usar `z.infer<>`
- ❌ Hardcodear datos, URLs o tokens
- ❌ Omitir el guard JWT en endpoints protegidos
- ❌ Hacer queries N+1 en Prisma (usar `include` correctamente)
- ❌ Usar `any` como tipo sin justificación explícita
- ❌ Saltarse la validación Zod en cualquier endpoint o formulario
- ❌ Modificar el schema de Prisma sin actualizar este archivo
- ❌ Acceder a `localStorage` directamente fuera del store de Zustand

---

## 14. CHECKLIST DE ENTREGA

- [ ] Backend corre con `npm run start:dev` sin errores
- [ ] Frontend corre con `npm run dev` sin errores
- [ ] `prisma migrate dev` ejecuta sin errores
- [ ] `prisma db seed` poblará datos de ejemplo
- [ ] Todos los endpoints documentados funcionan
- [ ] Rutas protegidas redirigen a `/login` sin token
- [ ] Validaciones Zod activas en backend y frontend
- [ ] Variables de entorno documentadas en `.env.example`
- [ ] README con instrucciones de instalación y ejecución
- [ ] Repositorio en GitHub con commits descriptivos

---

## 🤖 Módulo de Inteligencia Artificial (AiModule)

Se integrará una funcionalidad nativa de IA en el backend para actuar como asistente de proyectos.

### Configuración e Implementación:
* **Dependencia:** `@google/genai` (SDK oficial de Google Gen AI).
* **Modelo a utilizar:** `gemini-2.5-flash`.
* **Seguridad:** La API Key se leerá estrictamente desde las variables de entorno (`process.env.GEMINI_API_KEY`).
* **Estructura:** Crear un módulo independiente llamado `AiModule` con su propio `AiService` y `AiController`.

### Flujo de Trabajo y Endpoint:
* **Ruta:** `POST /projects/:id/suggest-tasks`
* **Lógica del Service:** 1. Obtener los detalles del proyecto (nombre y descripción) desde la base de datos usando `PrismaService`.
  2. Enviar un prompt optimizado a Gemini solicitando ideas de tareas lógicas para ese proyecto.
  3. **Structured Outputs:** Obligar al modelo a responder estrictamente en formato JSON que coincida con el DTO de creación de tareas (arreglo de objetos con `title`, `description`, `priority` y `status: 'TODO'`).
  4. Devolver las tareas sugeridas al frontend para que el usuario elija cuáles agregar.

## 🐳 Dockerización y Despliegue Cloud (AWS Requerido)

El proyecto debe estar diseñado bajo el principio de "Twelve-Factor App", preparado para ser contenedorizado y desplegado en la nube.

### Configuración de Docker:
* **Backend:** Crear un `Dockerfile` multi-stage para Node.js/NestJS que use una imagen base ligera (`node:20-alpine`), ejecute `prisma generate`, separe las dependencias de desarrollo de las de producción y exponga el puerto correspondiente.
* **Frontend:** Crear un `Dockerfile` que compile la SPA de React con Vite y use **Nginx** (imagen `nginx:alpine`) para servir los archivos estáticos en producción.
* **Orquestación Local:** Proveer un archivo `docker-compose.yml` en la raíz que levante tres servicios: `postgres` (base de datos con volumen persistente), `backend` y `frontend` interconectados en la misma red.

### Arquitectura de Despliegue en AWS:
* El código del Backend debe aceptar variables de entorno (`DATABASE_URL`, `PORT`, `GEMINI_API_KEY`) inyectadas externamente, permitiendo su despliegue directo en servicios de contenedores de AWS como **AWS App Runner** o **AWS Elastic Beanstalk**.

*Última actualización: generado para prueba técnica Senior Full Stack Developer — React · NestJS · PostgreSQL*