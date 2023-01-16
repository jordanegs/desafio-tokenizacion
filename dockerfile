FROM --platform=linux/amd64 node:18.0-slim
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "node", "dist/main.js" ]
