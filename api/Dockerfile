FROM node:20
LABEL authors="g-yachts"

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=5001
ENV WEB_URL="http://51.75.16.185"

EXPOSE 5001

CMD ["npm", "start"]
