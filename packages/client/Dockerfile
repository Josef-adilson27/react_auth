FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/client/package.json ./packages/client/

RUN npm ci

COPY . .

RUN npm run build --workspace=client

EXPOSE 5173

CMD ["npm", "run", "dev:client"]