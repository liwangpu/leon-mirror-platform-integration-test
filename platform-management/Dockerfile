FROM nginx:1.17.8-alpine
WORKDIR /var/platform-management
COPY ./dist/ .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf