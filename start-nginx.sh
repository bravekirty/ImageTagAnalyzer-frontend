#!/bin/sh
envsubst '\$PROXY_PASS' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec nginx -g 'daemon off;