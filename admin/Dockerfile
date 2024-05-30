FROM node:20
LABEL authors="g-yachts"

WORKDIR /app/admin

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
