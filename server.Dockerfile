FROM node:21-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN npm install -g @nestjs/cli@10
WORKDIR /app/packages/server
RUN cp sample.docker.env .env
EXPOSE 3000
CMD ["yarn", "run", "start"]
