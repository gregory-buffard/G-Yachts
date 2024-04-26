FROM node:20
LABEL authors="g-yachts"

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_API_URL="http://0.0.0.0:5001"

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
