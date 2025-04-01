#Docker file 

FROM node:22

RUN npm install -g nodemon

WORKDIR /app

COPY package.json  ./

RUN npm install

COPY backend/ ./backend

EXPOSE 8000

CMD ["node", "backend/server.js"]