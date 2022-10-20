# PFBACKEND
PROYECTO FINAL CURSO BACKEND - CODERHOUSE

(Español)
La aplicación puede iniciar con node o nodemon server
parámetros opcionales por línea de comando:
- mode (-m): cluster, por default fork
- port (-p): por default 8080
- persistenceType (-t): opciones: mongoDb/memory/file/firebase 
                         por default mongoDb
- sessionTime (-s): por default 10 minutos                         

Variables de entorno:
para Windows: >set VARIABLE=valor
- NODE_ENV: setear en PROD para producción (por ahora solo lo utiliza el logger). Si no se setea en PROD por default es desarrollo
- ADMIN: =true para entrar en modo administrador y poder realizar cambios en el listado de productos
- CLUSTER: para entrar en modo cluster desde variable de entorno


(English)
The application can start with node or nodemon server
optional parameters per command line:
- mode (-m): cluster, default fork
- port (-p) : default 8080
- persistenceType (-t): options: mongoDb/memory/file/firebase 
                         default mondoDb
- sessionTime (-s): default 10 minutes                             

Environment Variables:
for Windows: >set VARIABLE=value
- NODE_ENV: set to PROD for production (for now only used by the logger). If it is not set to PROD by default it is development
- ADMIN: =true to enter administrator mode and be able to make changes to the product list
- CLUSTER: to enter cluster mode from environment variable
