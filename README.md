# Simple Aplicación CRUD con PHP LARAVEL + MYSQL + VITE + VUE

Una aplicación simple CRUD hecho con LARAVEL 9 y Mysql

## Pre-requisitos

- [PHP 8](https://www.php.net/downloads.php)
- Servidor PHP/Mysql: Para el ejemplo se uso [laragon](https://laragon.org/download/index.html)
- [Nodejs](https://nodejs.org/es/download/)

Para el ejercicio se uso [laragon](https://laragon.org/download/index.html) para levantar un servidor PHP/MySQL y PHP 8.

## Instalación

Clonar el repositorio y guardar en carpeta local dentro del directorio raiz de su servidor PHP, en el caso de laragon debe copiar la carpeta en [C:\laragon\www]. Abrir la carpeta desde la terminal e instalar los siguientes paquetes de python.

Cargamos las dependecias
```
composer install
npm install
```

Ahora debe configurar la conexion a mysql abra el archivo .env en la linea 11 encontrará la configuración de Mysql, cambiar según su configuración local. Por defecto la base de datos a usar es simpleappcrud, sino existe la base de datos el interprete de artisan deberia de crearla en caso contrario, debe crear manualmente la base de datos.


Ahora cargamos las migraciones a la base de datos con
```
php artisan migrate
```

Levantamos el servidor con
```
php artisan serve
```

o También puede acceder desde el servidor PHP, para el caso de laragon este genera una url personalizada, si lo guarda en la carpeta simpleappcrud la url será [http://simpleappcrud.test/](http://simpleappcrud.test/) mientras que otros servidores como XAMPP debe ingresar a [http://localhost/simpleappcrud/](http://localhost/simpleappcrud/)

La primera vista que aparecera sera para agregar un nuevo usuario. Rellenamos el formulario y si vamos a consultar veremos todos los usuarios registrados hasta el momento, en dicha vista  podemos buscar, actualizar y eliminar usuarios. Las busquedas de usuarios son filtradas netamente por el correo electrónico.


## Entorno Desarrollo

Para levantar el servidor en entorno de desarrollo debe ejecutar el siguiente comando
```
npm run dev
```
Esto es para compilar los archivos del fontend en tiempo real, mientras que la compilación para entornos de produción no


## Entorno Producción

El codigo por defecto viene compilado para entorno de produción, para compilar los archivos del frontend ejecute
```
npm run build
```