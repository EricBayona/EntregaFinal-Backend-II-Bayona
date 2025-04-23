# E-commerce

## Descripción

Este es un proyecto de comercio electrónico donde los usuarios pueden registrar sus cuentas, iniciar sesión y gestionar su carrito de compras. Los administradores pueden gestionar productos y ver todos los carritos. El sistema de autenticación está basado en JWT (JSON Web Tokens), y las rutas están protegidas para garantizar que solo los usuarios adecuados tengan acceso a las funcionalidades correspondientes.

## Características

- **Usuarios:** Pueden crear cuentas, iniciar sesión, gestionar su carrito de compras y realizar compras.
- **Administradores:** Pueden gestionar productos, ver todos los carritos de compras y gestionar los usuarios.
- **Autenticación:** Implementada mediante JWT (JSON Web Tokens).
- **Protección de rutas:** Rutas protegidas para garantizar que solo los usuarios y administradores adecuados puedan acceder a ellas.
- **Base de Datos:** Utiliza MongoDB para almacenar información de usuarios, productos y carritos.

## Tecnologías

- **Backend:**
  - Node.js
  - Express
  - MongoDB y Mongoose
  - Passport.js (para la autenticación)
  - JWT (JSON Web Tokens)

## Instalación

Pasos para instalar y ejecutar el proyecto de manera local:

1. Clona este repositorio:

   git clone https://github.com/EricBayona/EntregaFinal-Backend-II-Bayona.git

Navega al directorio del proyecto:

cd e-commerce
Instala las dependencias:
npm install

Configura las variables de entorno. Crea un archivo .env y agrega las siguientes configuraciones:

PORT = tu_Puerto
MONGO_URL = tu_url_de_mongo
SESSION_SECRET= tu_clave_secreta
JWT_SECRET=tu_clave_secreta

Levanta el servidor:

npm run dev

El servidor se ejecutará en http://localhost:3000. por defecto

Uso
Registro de usuario
Realiza una solicitud POST a /api/sessions/register con los siguientes datos:

{
"first_name": "Juan",
"last_name": "Pérez",
"email": "juan.perez@ejemplo.com",
"password": "contraseña123!"
}
Inicio de sesión
Realiza una solicitud POST a /api/sessions/login con tu correo y contraseña:

{
"email": "juan.perez@ejemplo.com",
"password": "contraseña123!"
}
Carrito de compras
Ver el carrito:

Realiza una solicitud GET a /api/cart/mycart para ver los productos en tu carrito.

Agregar un producto al carrito:

Realiza una solicitud POST a /api/cart/:cid/product/:pid para agregar un producto a tu carrito.

Eliminar un producto del carrito:

Realiza una solicitud DELETE a /api/cart/:cid/product/:pid para eliminar un producto de tu carrito.

Actualizar la cantidad de un producto en el carrito:

Realiza una solicitud PUT a /api/cart/:cid/product/:pid para actualizar la cantidad de un producto en tu carrito.

Limpiar el carrito:

Realiza una solicitud DELETE a /api/cart/:cid para eliminar todos los productos del carrito.

Realizar la compra:

Realiza una solicitud POST a /api/cart/purchase para comprar los productos del carrito.

Endpoints

Método Ruta Descripción
GET /api/cart/mycart Ver el carrito de compras del usuario.
POST /api/cart/:cid/product/:pid Agregar un producto al carrito.
PUT /api/cart/:cid/product/:pid Actualizar la cantidad de un producto en el carrito.
DELETE /api/cart/:cid/product/:pid Eliminar un producto del carrito.
DELETE /api/cart/:cid Eliminar todos los productos del carrito.
POST /api/cart/purchase Realizar la compra del carrito y generar un ticket.
