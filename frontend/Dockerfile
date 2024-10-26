# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /frontend

# Copiar los archivos de configuración y dependencias
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]