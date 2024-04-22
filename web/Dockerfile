FROM node:20
LABEL authors="g-yachts"

WORKDIR /usr/src/web

COPY web/package*.json ./

RUN npm install

COPY web/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]