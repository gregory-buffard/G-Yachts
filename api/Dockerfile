FROM node:20
LABEL authors="g-yachts"

WORKDIR /app/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
