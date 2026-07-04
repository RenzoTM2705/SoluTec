# SoluTec Monorepo

El proyecto quedó dividido en dos partes:

- [backend](backend) contiene el backend Spring Boot con JWT y endpoints REST.
- [frontend](frontend) contiene la aplicación Angular que consume el backend.

## Arranque del backend

1. Entra a `backend`.
2. Configura MySQL y revisa `backend/db/init.sql`.
3. Ejecuta:

```powershell
cd backend
mvn spring-boot:run
```

## Arranque del frontend

1. Entra a `frontend`.
2. Instala dependencias de Angular.
3. Ejecuta:

```powershell
cd frontend
pnpm install
pnpm start
```

La app Angular consume `http://localhost:8080/api` y usa `POST /api/auth/login` para iniciar sesión. Después de autenticar, la vista protegida consulta `GET /api/dashboard` con el JWT guardado en el navegador.

## Estructura de compilación

El backend Spring Boot genera sus artefactos en `backend/target`, que es la ubicación correcta para el módulo Maven.
