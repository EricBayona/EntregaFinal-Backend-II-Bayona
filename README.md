# Primera Pre-Entrega Backend II

## Descripción del Proyecto

Este proyecto es parte de la primera pre-entrega del curso Backend II. El objetivo es implementar una aplicación basada en Node.js utilizando MongoDB como base de datos, con funcionalidades clave como autenticación, autorización y manejo de usuarios y carritos de compras. Todo está diseñado siguiendo buenas prácticas de desarrollo backend.

---

## Tecnologías Utilizadas

- **Node.js:** Framework para desarrollo del servidor.
- **Express.js:** Framework para gestionar rutas y middleware.
- **MongoDB:** Base de datos NoSQL utilizada para almacenar usuarios y carritos.
- **Mongoose:** ODM para interactuar con MongoDB.
- **Passport.js:** Librería para manejo de autenticación y autorización.
- **jsonwebtoken:** Utilizado para generar y verificar tokens JWT.
- **cookie-parser:** Middleware para manejar cookies en las solicitudes HTTP.
- **Postman:** Herramienta utilizada para probar el backend.

---

## Funcionalidades Implementadas

### **Autenticación y Autorización**
1. **JWT Strategy:**  
   - Implementación de la estrategia JWT para validar tokens en cookies o encabezado `Authorization`.
   - Los tokens incluyen información como `id`, `email` y `role`.
   - Los tokens tienen un tiempo de expiración configurable (actualmente 5 minutos).

2. **Middleware de Autenticación:**
   - `passportCall`: Middleware personalizado para manejar la lógica de autenticación con Passport.
   - `authRole`: Middleware para validar roles de usuario (`admin` o `user`).

### **Usuarios**
1. **Creación de Usuarios:**
   - Los usuarios son creados con información básica como:
     - `first_name`
     - `last_name`
     - `email`
     - `age`
     - `password`
     - Rol predeterminado: `user`.
   - Relación entre usuarios y carritos implementada con un campo `cart`.

2. **Registro y Login:**
   - `/register`: Ruta para registrar usuarios nuevos utilizando la estrategia `register`.
   - `/login`: Ruta para iniciar sesión, que genera un token JWT y lo guarda en una cookie.

3. **Consulta de Usuario Actual:**
   - `/current`: Ruta que verifica si el usuario está autenticado y devuelve su información.

### **Carrito de Compras**
- Los usuarios están relacionados con un carrito mediante el campo `cart`.
- Los carritos pueden incluir una lista de productos con detalles como cantidad y precio total.

---

## Instrucciones para Ejecutar el Proyecto

### **Requisitos Previos**
1. Tener instalado Node.js.
2. Tener MongoDB configurado y corriendo localmente o en la nube.

### **Instalación**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/EricBayona/PrimeraEntregaBackend-II.git
