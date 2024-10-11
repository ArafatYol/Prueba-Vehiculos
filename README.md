# Proyecto de Gestión de Vehículos

Este proyecto es un sistema de gestión de vehículos que permite agregar, actualizar, eliminar y visualizar información sobre vehículos. Incluye autenticación de usuarios y una interfaz web para interactuar con el sistema.

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Uso](#uso)
6. [API Endpoints](#api-endpoints)
7. [Base de Datos](#base-de-datos)
8. [Solución de Problemas](#solución-de-problemas)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (versión 12 o superior)
- MySQL Server
- Git

Para instalar Node.js:
1. Ve a https://nodejs.org/
2. Descarga e instala la versión LTS (Long Term Support) para tu sistema operativo.
3. Verifica la instalación abriendo una terminal y ejecutando:
   ```
   node --version
   npm --version
   ```

Para instalar MySQL:
1. Ve a https://dev.mysql.com/downloads/mysql/
2. Descarga e instala la versión adecuada para tu sistema operativo.
3. Durante la instalación, anota el usuario root y la contraseña que configures.

## Instalación

1. Abre una terminal o línea de comandos.

2. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   ```
   Reemplaza `tu-usuario` y `nombre-del-repo` con los valores correctos de tu repositorio GitHub.

3. Navega al directorio del proyecto:
   ```
   cd nombre-del-repo
   ```

4. Instala las dependencias del proyecto:
   ```
   npm install
   ```

5. Instala nodemon globalmente (para desarrollo):
   ```
   npm install -g nodemon
   ```

## Configuración

1. En el directorio raíz del proyecto, crea un archivo llamado `.env` con el siguiente contenido:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña_de_mysql
   DB_NAME=Prueba
   PORT=3000
   JWT_SECRET=una_clave_secreta_larga_y_segura
   ```
   Reemplaza `tu_contraseña_de_mysql` con la contraseña que configuraste para el usuario root de MySQL.

2. Configura la base de datos:
   - Abre MySQL Workbench o tu cliente MySQL preferido.
   - Conéctate a tu servidor MySQL local.
   - Crea una nueva base de datos llamada `Prueba`:
     ```sql
     CREATE DATABASE Prueba;
     ```
   - Selecciona la base de datos `Prueba`:
     ```sql
     USE Prueba;
     ```
   - Ejecuta los siguientes scripts SQL para crear las tablas necesarias:

     ```sql
     CREATE TABLE vehiculos (
         id INT AUTO_INCREMENT PRIMARY KEY,
         Marca VARCHAR(100) NOT NULL,
         Modelo VARCHAR(100) NOT NULL,
         anio INT CHECK (anio BETWEEN 1880 AND 2025) NOT NULL,
         placa VARCHAR(8) NOT NULL,
         estado ENUM ('Perfecto','Daño menor','Reparacion urgente','En reparacion','Descarte') NOT NULL DEFAULT 'Daño menor',
         CONSTRAINT chk_placa CHECK (placa REGEXP '^[A-Z]-[A-Z]{3}[0-9]{3}$')
     );

     CREATE TABLE usuarios (
         id INT PRIMARY KEY AUTO_INCREMENT,
         username VARCHAR(50) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         nombre_completo VARCHAR(100),
         email VARCHAR(100) UNIQUE,
         rol ENUM('admin', 'usuario') DEFAULT 'usuario',
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     INSERT INTO usuarios (username, password, nombre_completo, email, rol)
     VALUES ('admin', '$2b$10$.UvFo4oWuipEvhL5C/w6guDojhYXG349yKON3.Dp.Dsm0U6VofDou', 'Administrador', 'admin@ejemplo.com', 'admin');
     ```

## Uso

1. Inicia el servidor en modo de desarrollo:
   ```
   npm run dev
   ```
   Deberías ver un mensaje indicando que el servidor está corriendo en `http://localhost:3000`.

2. Abre tu navegador web y accede a la aplicación:
   ```
   http://localhost:3000/views/login.html
   ```

3. Inicia sesión con las credenciales por defecto:
   - Usuario: admin
   - Contraseña: admin123

4. Ahora puedes usar la aplicación para gestionar vehículos.

## Solución de Problemas

Si encuentras algún problema al configurar o ejecutar el proyecto, aquí hay algunas soluciones comunes:

1. **Error de conexión a la base de datos:**
   - Asegúrate de que MySQL Server esté en ejecución.
   - Verifica que las credenciales en el archivo `.env` sean correctas.
   - Comprueba que la base de datos `Prueba` exista.

2. **El servidor no inicia:**
   - Asegúrate de que no haya otro proceso usando el puerto 3000.
   - Verifica que todas las dependencias estén instaladas correctamente con `npm install`.

3. **No se puede iniciar sesión:**
   - Asegúrate de haber ejecutado el script SQL que inserta el usuario admin.
   - Verifica que estés usando las credenciales correctas (admin/admin123).

4. **Errores de CORS:**
   - Si estás accediendo desde un dominio diferente, asegúrate de que CORS esté configurado correctamente en el backend.

Si hay muchos problemas, verifica los logs del servidor en la consola donde ejecutaste `npm run dev` para obtener más información sobre posibles errores.

---