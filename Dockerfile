FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext

COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

COPY --from=build /app/build /usr/share/nginx/html

RUN echo '#!/bin/sh' > /start-nginx.sh && \
    echo 'envsubst '\''\$PROXY_PASS'\'' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf' >> /start-nginx.sh && \
    echo 'exec nginx -g "daemon off;"' >> /start-nginx.sh && \
    chmod +x /start-nginx.sh

EXPOSE 3000

CMD ["/start-nginx.sh"]