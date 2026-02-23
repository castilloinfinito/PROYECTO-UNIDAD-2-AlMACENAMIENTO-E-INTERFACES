MANUAL DE USUARIO DE UNA APP PARA GESTIONAR UNA LABORATORIO CLINICO
DESDE EL BACKEND DE LA APLICACION FASE 2.


MATERIA INGENIERIA DE PROGRAMACION 2026A
ALUMNOS : 
MARIA LUISA VARGAS CI 32.550.647
GABRIEL HUMBRIA C.I 31.866.400
ROBERT GONZALEZ  C.I 32.289.549
SIMON VIELMA      C.I 31.622.352
FEBRERO 2026


IMPORTANTE
El presente manual explica  de manera detallada el manejo y uso de la aplicacion backend de una gestinadora de base de datos de un laboratorio clinico, partiendo de la definicion de cinco principales tipos de archivos donde es necesario almacenar y mantener las operaciones rutinarias de un laboratorio, estos archivos-entidades son medicos, pacientes , ususarios (administacion), examanes , resultados. 
 1. Manual de Ejecución .
Este manual detalla los pasos para levantar el entorno de desarrollo y poner en marcha el servidor Node.js.
1.1 Requisitos Previos
Node.js: Versión 18.x o superior.
NPM: Gestor de paquetes (incluido con Node).
Thuners client o Postman / Insomnia: Para pruebas de endpoints.
1.2 Estructura del Proyecto
1.2.1 Pasos de Instalación 
1.2.2 Clonar/Descargar el proyecto: Sitúate en la carpeta raíz.
1.2.3 Instalar dependencias: Ejecuta en la terminal:
1.3Configurar Variables de Entorno: Crea un archivo .env y define el puerto:
1.3.1Modo producción: npm start
1.3.2Modo desarrollo (con reinicio automático): npm run dev
1.4 Iniciar el servidor node app.js
2. Manual de Usuario (Guía de la API)
El objetivo de la API es permitir la gestión de recursos mediante el protocolo HTTP y arquitectura REST.
Conceptos Básicos
Base URL: http://localhost:3000/api/v1
Formato de datos: Todas las peticiones y respuestas utilizan JSON.
Diccionario de Endpoints
Manejo de Errores:
La API utiliza códigos de estado estándar:
200 OK: Operación exitosa.
201 Created: Recurso creado con éxito.
400 Bad Request: Datos de entrada inválidos.
404 Not Found: El recurso solicitado no existe.
500 Internal Server Error: Error en el servidor.

3. Arquitectura del Sistema
La API sigue un patrón de Capas, lo que separa las responsabilidades para facilitar el mantenimiento:
Capa de Rutas: Recibe la petición HTTP y la deriva al controlador correspondiente.
Capa de Controladores: Valida los datos y contiene la lógica de negocio.
Capa de Modelos: Interactúa con la base de datos (Persistencia).

Recomendaciones Finales
CORS: Si vas a conectar esta API con un frontend (React, Vue, etc.), asegúrate de configurar el middleware cors.


