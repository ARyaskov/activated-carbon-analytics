FROM node:21-alpine
ARG SERVER_ENDPOINT
ENV SERVER_ENDPOINT=$SERVER_ENDPOINT
WORKDIR /app
COPY . .
RUN apk update && apk add util-linux
RUN npm install -g yarn@berry --force
RUN yarnpkg set version berry
RUN yarnpkg install
WORKDIR /app/packages/ui
RUN yarnpkg build:docker
RUN apk add nginx
COPY packages/ui/default.nginx.conf /etc/nginx/http.d/default.conf
RUN mkdir -p /usr/share/nginx/html
RUN cp -r dist/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
