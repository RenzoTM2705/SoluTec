# SoluTec Backend

Proyecto Spring Boot para gestión de incidencias académica (backend only).

## Estructura del modelo

- Usuarios, roles, departamentos y seguridad JWT.
- Incidencias con estados, prioridades y categorías.
- Comentarios, diagnósticos, derivaciones a proveedores y historial.

## Ejecución rápida

1. Crea la base de datos MySQL y ejecuta `db/init.sql` para cargar el esquema y datos de ejemplo.
2. Ajusta `src/main/resources/application.properties` con la URL, usuario y contraseña de MySQL.
3. Ejecuta:

```bash
mvn spring-boot:run
```

## Ejecutar el backend (rápido)

Requisitos: JDK 17+ instalado (recomendado JDK 21), Maven disponible en `PATH` o `MAVEN_HOME`.

Windows (PowerShell):

```powershell
$env:JAVA_HOME='E:\Java\jdk-21'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd -DskipTests spring-boot:run
```

O usando el JAR generado (recomendado para máquinas que no usan Maven):

```powershell
$env:JAVA_HOME='E:\Java\jdk-21'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd -DskipTests package spring-boot:repackage
java -jar target\solutec-backend-0.0.1-SNAPSHOT.jar --server.port=8081
```

Si ejecutas el comando desde la raíz del workspace, el JAR queda en `backend/target`.

Notas:
- Si el puerto 8080 está ocupado, puedes cambiarlo con `--server.port=<PUERTO>`.
- Evita commitear secretos; `jwt.secret` y credenciales deben salir del repo en producción.

## Endpoints clave

- `POST /api/auth/login` para obtener el token.
- `/api/usuarios`, `/api/roles`, `/api/incidencias`, `/api/comentarios`, `/api/diagnosticos`, `/api/derivaciones`, `/api/proveedores` y `/api/dashboard`.

## Pruebas

Importa `postman_collection.json` en Postman y usa `Bearer {{token}}` tras autenticarte.
