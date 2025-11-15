Tienda Zamis — Backend + Frontend

Proyecto que incluye backend en Node.js + Express + MySQL, un sistema de autenticación con JWT, manejo de productos, pagos y contactos, y un frontend estático dentro de /public.

📁 Estructura del proyecto

├── server.js                ← Inicia el servidor
├── db.js                    ← Conexión a MySQL
├── .env                     ← Variables de entorno
├── package.json
├── package-lock.json
├── ZamisBD.sql              ← Script para crear la base de datos
│
├── controllers/             ← Lógica de negocio
│   ├── contactosController.js
│   ├── pagosController.js
│   ├── productosController.js
│   └── usuariosController.js
│
├── middlewares/
│   └── auth.js              ← Middleware de autenticación JWT
│
├── routes/                  ← Endpoints del backend
│   ├── contactos.js
│   ├── pagos.js
│   ├── productos.js
│   └── usuarios.js
│
├── public/                  ← Frontend estático
│   ├── index.html
│   ├── estilos.css
│   ├── archivo.js
│   └── admin/
│       ├── index.html
│       ├── estilos.css
│       └── app.js
│
└── README.md

1. Instalación

Ejecutar en la carpeta del proyecto:

npm install


Dependencias necesarias:

npm install express mysql2 dotenv bcrypt jsonwebtoken cors helmet express-rate-limit
npm install --save-dev nodemon

2. Archivo .env

Crear un archivo llamado .env en la raíz:

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=tienda
DB_PORT=3306

PORT=3000

JWT_SECRET=(Nombre de la llave)


Cambia TU_PASSWORD por tu contraseña de MySQL.

3. Base de datos

Abre MySQL Workbench o consola.

Ejecuta el archivo ZamisBD.sql, o al menos estas tablas base:

CREATE DATABASE tienda;
USE tienda;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  correo VARCHAR(100) UNIQUE,
  contraseña VARCHAR(200),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


(Otras tablas están en el archivo SQL.)

🚀 4. Iniciar servidor

Modo normal:

node server.js


Modo de desarrollo:

npx nodemon server.js


El servidor se ejecuta en:

http://localhost:3000


El frontend se sirve automáticamente desde /public.

5. Probar API con Postman

Registrar usuario
POST http://localhost:3000/api/usuarios/register


Body → JSON:

{
  "nombre": "Alejo",
  "correo": "alejo@gmail.com",
  "contraseña": "12345"
}

Login:
POST http://localhost:3000/api/usuarios/login


Obtendrás un token JWT.

Rutas protegidas (necesitan token)

En Postman → Headers:

Authorization: Bearer TU_TOKEN


Ejemplo ruta protegida:

GET http://localhost:3000/api/usuarios

6. Frontend

Todo lo que está dentro de la carpeta:

/public


se abre desde el navegador con:

http://localhost:3000/


Si entras a /public/admin:

http://localhost:3000/admin

7. Carpeta por carpeta (explicación)
✔ /controllers

Aquí está la lógica de cada módulo:

Registro/login de usuarios

CRUD de productos

Procesamiento de pagos

Guardado de mensajes de contacto

✔ /routes

Define cada endpoint que se puede llamar desde Postman o el frontend.

Ejemplo:

/api/usuarios
/api/productos
/api/pagos
/api/contactos

✔ /middlewares/auth.js

Valida el token JWT y protege rutas privadas.

✔ /public

Todo el frontend está aquí:

HTML

CSS

JS

Carpeta /admin con panel interno

🎉 8. Proyecto funcionando

Con esto tendrás:

✔ Servidor Express funcionando
✔ Conexión MySQL estable
✔ Registro/Login con JWT
✔ Autenticación en rutas privadas
✔ Frontend sirviéndose desde /public
✔ Rutas listas para Postman