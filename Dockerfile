FROM node:20-alpine

WORKDIR /usr/src/gesi_backend

ENV MONGO_URI_PROD=mongodb://db:27017/gesi-production
ENV MONGO_URI_DEV=mongodb://db:27017/gesi-development
ENV MONGO_ATLAS_URI=mongodb+srv://vscode:tei8kCjDTl1bvCac@sandbox.y9aml.mongodb.net/gesi-production?retryWrites=true&w=majority
ENV NODE_OPTIONS=--max_old_space_size=4000

COPY package*.json ./
COPY . .

RUN npm install --force && npm run build
EXPOSE 9000/tcp

CMD ["node", "dist/main"]