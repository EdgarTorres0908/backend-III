# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de tu aplicación al contenedor
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
