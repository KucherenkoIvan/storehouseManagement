FROM nginx

COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

VOLUME [ "/usr/share/nginx" ]