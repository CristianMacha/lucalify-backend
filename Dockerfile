# Usa una imagen base oficial de Node.js
FROM node:22.9

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

EXPOSE 3001

# Comando para correr la aplicación
CMD ["sh", "-c", "npx typeorm migration:run && npm start:prod"]