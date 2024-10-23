FROM node:20-buster
LABEL authors="g-yachts"

WORKDIR /app/web

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_API=http://beta.g-yachts.com
ENV NEXT_PUBLIC_ADMIN_BASE_URI=https://www.g-yachts.com
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

#RUN apt-get update && apt-get install curl gnupg -y \
#  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#  && apt-get update \
#  && apt-get install google-chrome-stable -y --no-install-recommends \
#  && rm -rf /var/lib/apt/lists/*

RUN dpkg --add-architecture amd64 && apt-get update

RUN apt-get install -y \
    wget \
    libdrm2:amd64 \
    libexpat1:amd64 \
    libgbm1:amd64 \
    libglib2.0-0:amd64 \
    libgtk-3-0:amd64 \
    libnspr4:amd64 \
    libnss3:amd64 \
    libpango-1.0-0:amd64 \
    libudev1:amd64 \
    libvulkan1:amd64 \
    libx11-6:amd64 \
    libxcb1:amd64 \
    libxcomposite1:amd64 \
    libxdamage1:amd64 \
    libxext6:amd64 \
    libxfixes3:amd64 \
    libxkbcommon0:amd64 \
    libxrandr2:amd64 \
    xdg-utils:amd64

RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
