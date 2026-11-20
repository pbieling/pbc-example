
FROM php:8.5-apache

# PHP-Erweiterungen
RUN docker-php-ext-install pdo pdo_mysql

# Apache DocumentRoot
ENV APACHE_DOCUMENT_ROOT=/var/www/pbc-example/htdocs

RUN sed -ri \
    -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Apache konfigurieren
RUN a2enmod rewrite \
    && echo '<Directory /var/www/pbc-example/htdocs>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' >> /etc/apache2/apache2.conf

# Startskripte kopieren
COPY pbc-example/entrypoint.sh /usr/local/bin/docker-custom-entrypoint
COPY pbc-example/bootstrap.php /usr/local/bin/bootstrap.php

RUN sed -i 's/\r$//' /usr/local/bin/docker-custom-entrypoint \
    && sed -i 's/\r$//' /usr/local/bin/bootstrap.php \
    && chmod +x /usr/local/bin/docker-custom-entrypoint \
    && chmod +x /usr/local/bin/bootstrap.php

WORKDIR /var/www/pbc-example

ENTRYPOINT ["docker-custom-entrypoint"]
