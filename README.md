# Proyecto NestJS

Bienvenido a tu nuevo proyecto NestJS. A continuación, encontrarás información útil para comenzar.

## Descripción del Proyecto

Este proyecto es una plantilla de autenticación NestJS con características como JWT, Prisma ORM, Docker, PostgreSQL, y otras funcionalidades clave.

## Características Principales

- Autenticación de usuario con JWT (Access Token y Refresh Token).
- Inicio de sesión, registro y manejo de tokens.
- Integración con Prisma para la gestión de la base de datos.
- Uso de Docker para la configuración de PostgreSQL y pgAdmin.
- Configuración de variables de entorno para una fácil personalización.

## Requisitos Previos

- Node.js
- npm
- Docker

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tu-proyecto-nestjs.git
    cd tu-proyecto-nestjs
    ```

2. Instala las dependencias:

    ```bash
    pnpm install
    ```

## Configuración

Asegúrate de configurar adecuadamente las variables de entorno y cualquier otra configuración necesaria.

3. Copia el archivo de variables de entorno de ejemplo y configúralo según tus necesidades:

    ```bash
    cp .env.example .env
    ```

    Personaliza el archivo `.env` con la configuración específica de tu proyecto.


## Uso

Para ejecutar el proyecto en modo de **desarrollo**:

```bash
pnpm start:dev
```
Para construir y ejecutar en modo de **producción**:

```bash
pnpm build
pnpm start:prod
```

## Docker

Para la configuración del contenedor, corre el siguiente comando:

```bash
docker-compose up -d --build
```

## Estructura del proyecto 
* `src/auth`: Lógica de autenticación.
* `src/database`: Configuración de prisma.
* `src/user`: Manejo de usuarios y controladores relacionados.
* `src/app.module.ts`: Configuración principal del módulo de la 
aplicación.
* `config`: Configuración de las variables de entorno.
* `pgadmin` y `postgres`: Volumen para el contenedor de Docker. (Borrar el contenido y sólo crear las carpetas antes de ejecutar el contenedor)

## Paquetes de NPM principales
* Zod
* Nestjs-zod
* Nestjs/config
* Bcrypt
* Nestjs-prisma
* Nestjs/jwt
* Passport-jwt
* Nestjs/passport
