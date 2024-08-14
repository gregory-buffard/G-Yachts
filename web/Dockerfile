FROM node:20
LABEL authors="g-yachts"

WORKDIR /app/web

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_API=http://beta.g-yachts.com

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
