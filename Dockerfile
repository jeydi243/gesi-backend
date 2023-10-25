FROM node:20-alpine

WORKDIR /usr/src/gesi_backend

COPY package*.json ./
COPY . .

RUN npm install --force && npm run build
EXPOSE 9000/tcp

CMD ["npm", "run", "sd"]