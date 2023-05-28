FROM node:lts

WORKDIR /home/api

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
EXPOSE 6060
CMD npm run start
