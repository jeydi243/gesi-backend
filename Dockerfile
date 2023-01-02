FROM node:16.17

WORKDIR /usr/src/gesi_backend

COPY package*.json ./
COPY . .

RUN npm install --force
EXPOSE 3000

CMD ["npm", "run", "sd"]