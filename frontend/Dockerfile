# Stage 1: Build - Compila la aplicación de React con Vite.
FROM node:20-alpine AS build

WORKDIR /app

# Copia los archivos de manifiesto del paquete
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Stage 2: Production - Sirve la aplicación construida con Nginx.
FROM nginx:1.25-alpine AS production

# Copia los archivos estáticos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configuración personalizada de Nginx para manejar el enrutamiento de la SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 (puerto por defecto de Nginx)
EXPOSE 80

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]