FROM node:20-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 8080

# Comando padrão (pode ser sobrescrito no docker-compose)
CMD ["npm", "run", "start:dev"]