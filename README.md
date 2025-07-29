<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">API RESTful de tareas con autenticación JWT y PostgreSQL construida con NestJS.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/common"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

---

## 📋 Descripción

Este proyecto es una API REST construida con [NestJS](https://nestjs.com/) que permite:

- Registro y login de usuarios con JWT
- Crear, listar, actualizar y eliminar tareas personales
- Control de acceso para evitar modificar tareas de otros usuarios

---

## ⚙️ Requisitos

- Node.js 18+
- PostgreSQL
- npm

---

## 🚀 Instalación

```bash
$ npm install


▶️ Ejecutar la aplicación
# Modo desarrollo
$ npm run start:dev

# Modo producción
$ npm run start:prod

🧪 Pruebas
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Cobertura
$ npm run test:cov


📦 Características principales
  🛡️ Autenticación JWT
  
  🔐 Rutas protegidas con guards
  
  📄 DTOs y validación con class-validator
  
  🗃️ Persistencia con TypeORM + PostgreSQL
  
  👤 Relación uno-a-muchos entre User y Task
  
  📤 Middleware para manejo de errores


📌 Endpoints principales
Método	Ruta	              Descripción
POST	  /auth/register	    Crear nuevo usuario
POST	  /auth/login	        Obtener token JWT
GET	    /tasks	            Listar tareas del usuario
POST	  /tasks	            Crear nueva tarea
PUT	    /tasks/:id	        Actualizar tarea
DELETE	/tasks/:id	        Eliminar tarea
