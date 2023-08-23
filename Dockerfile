FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN ls -la

COPY . .

CMD ["npm","start"]

