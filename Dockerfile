FROM node:8-alpine
RUN mkdir /app
WORKDIR /app
ADD dist /app
RUN npm install
ENTRYPOINT ["node", "index.js"]
