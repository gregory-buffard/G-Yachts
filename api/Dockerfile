FROM node:20
LABEL authors="g-yachts"

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5001
ENV WEB_URL="http://51.75.16.185:3000"

RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
