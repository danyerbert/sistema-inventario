# Usa la imagen oficial optimizada para Laravel y PHP 8.3
FROM serversideup/php:8.3-fpm-nginx

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto
COPY --chown=www-data:www-data . .

# Ignorar el chequeo de la extensión GD en el build
RUN composer install --no-dev --optimize-autoloader --ignore-platform-req=ext-gd

# Ajustar permisos de directorios clave de Laravel
RUN chmod -R 775 storage bootstrap/cache