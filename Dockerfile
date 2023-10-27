FROM node:20-alpine

WORKDIR /usr/src/gesi_backend

ENV MONGO_URI_PROD=mongodb://db:27017/gesi-production
ENV MONGO_URI_DEV=mongodb://db:27017/gesi-development

COPY package*.json ./
COPY . .

RUN npm install --force && npm run build
EXPOSE 9000/tcp

CMD ["npm", "run", "sd"]