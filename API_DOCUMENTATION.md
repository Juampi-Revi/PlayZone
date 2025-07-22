# API Documentation - ReservApp

## Base URL
```
http://localhost:8082/api
```

## Endpoints

### 1. Canchas (Courts)

#### Endpoints Públicos

**GET /api/canchas**
- Descripción: Obtiene todas las canchas
- Respuesta: Lista de canchas
```json
[
  {
    "id": 1,
    "nombre": "Cancha de Pádel Premium",
    "descripcion": "Cancha de pádel profesional...",
    "deporte": "Pádel",
    "ubicacion": "Club Deportivo Central...",
    "precioPorHora": 2500.0,
    "horario": "Lunes a Domingo 8:00 - 23:00",
    "imagenes": ["url1", "url2"],
    "disponible": true
  }
]
```

**GET /api/canchas/{id}**
- Descripción: Obtiene una cancha específica por ID
- Parámetros: `id` (Long)
- Respuesta: Cancha individual

**GET /api/canchas/disponibles**
- Descripción: Obtiene solo las canchas disponibles
- Respuesta: Lista de canchas disponibles

**GET /api/canchas/deporte/{deporte}**
- Descripción: Obtiene canchas por deporte específico
- Parámetros: `deporte` (String)
- Respuesta: Lista de canchas del deporte

**GET /api/canchas/deporte/{deporte}/disponibles**
- Descripción: Obtiene canchas disponibles por deporte
- Parámetros: `deporte` (String)
- Respuesta: Lista de canchas disponibles del deporte

**GET /api/canchas/deportes**
- Descripción: Obtiene lista de deportes disponibles
- Respuesta: Lista de strings con nombres de deportes

**PATCH /api/canchas/{id}/toggle-disponibilidad**
- Descripción: Cambia la disponibilidad de una cancha
- Parámetros: `id` (Long)
- Respuesta: Cancha actualizada

**POST /api/canchas**
- Descripción: Crea una nueva cancha
- Body: Objeto Cancha
- Respuesta: Cancha creada

**PUT /api/canchas/{id}**
- Descripción: Actualiza una cancha existente
- Parámetros: `id` (Long)
- Body: Objeto Cancha
- Respuesta: Cancha actualizada

**DELETE /api/canchas/{id}**
- Descripción: Elimina una cancha
- Parámetros: `id` (Long)
- Respuesta: 204 No Content

#### Endpoints de Administración

**GET /api/canchas/admin**
- Descripción: Obtiene todas las canchas (para administración)
- Respuesta: Lista de canchas

**POST /api/canchas/admin**
- Descripción: Crea una nueva cancha (para administración)
- Body: Objeto Cancha
- Respuesta: Cancha creada

**PUT /api/canchas/admin/{id}**
- Descripción: Actualiza una cancha (para administración)
- Parámetros: `id` (Long)
- Body: Objeto Cancha
- Respuesta: Cancha actualizada

**DELETE /api/canchas/admin/{id}**
- Descripción: Elimina una cancha (para administración)
- Parámetros: `id` (Long)
- Respuesta: 204 No Content

### 2. Autenticación (Auth)

**POST /api/auth/login**
- Descripción: Inicia sesión de usuario
- Body:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```
- Respuesta:
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "jwt_token_simulado_1234567890",
  "user": {
    "id": 1,
    "nombre": "Usuario Demo",
    "email": "usuario@ejemplo.com",
    "tipo": "club"
  }
}
```

**POST /api/auth/register**
- Descripción: Registra un nuevo usuario
- Body:
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "contraseña123",
  "tipo": "club"
}
```
- Respuesta: Similar al login con datos del usuario registrado

**POST /api/auth/logout**
- Descripción: Cierra sesión
- Respuesta:
```json
{
  "success": true,
  "message": "Logout exitoso"
}
```

### 3. Reservas (Reservations)

**GET /api/reservas**
- Descripción: Obtiene todas las reservas del usuario
- Respuesta: Lista de reservas
```json
[
  {
    "id": 1,
    "canchaId": 1,
    "canchaNombre": "Cancha de Pádel Premium",
    "fecha": "2024-01-15",
    "horaInicio": "14:00",
    "horaFin": "16:00",
    "nombreJugador": "Juan Pérez",
    "telefono": "+54 9 11 1234-5678",
    "estado": "confirmada",
    "precioTotal": 5000.0,
    "fechaCreacion": "2025-07-19T23:13:55.417485"
  }
]
```

**POST /api/reservas**
- Descripción: Crea una nueva reserva
- Body:
```json
{
  "canchaId": 1,
  "fecha": "2024-01-25",
  "horaInicio": "15:00",
  "horaFin": "17:00",
  "nombreJugador": "María García",
  "telefono": "+54 9 11 9876-5432"
}
```
- Respuesta: Reserva creada

**GET /api/reservas/{id}**
- Descripción: Obtiene una reserva específica
- Parámetros: `id` (Long)
- Respuesta: Reserva individual

**DELETE /api/reservas/{id}**
- Descripción: Cancela una reserva
- Parámetros: `id` (Long)
- Respuesta:
```json
{
  "success": true,
  "message": "Reserva cancelada exitosamente"
}
```

**PATCH /api/reservas/{id}/estado**
- Descripción: Cambia el estado de una reserva
- Parámetros: `id` (Long)
- Body:
```json
{
  "estado": "confirmada"
}
```
- Estados válidos: "confirmada", "cancelada", "completada"
- Respuesta: Reserva actualizada

### 4. Clubes (Clubs)

**GET /api/clubes**
- Descripción: Obtiene todos los clubes
- Respuesta: Lista de clubes
```json
[
  {
    "id": 1,
    "nombre": "Club Deportivo Central",
    "descripcion": "Club deportivo con instalaciones...",
    "direccion": "Av. Libertador 1234, Buenos Aires",
    "telefono": "+54 11 1234-5678",
    "email": "info@clubcentral.com",
    "horario": "Lunes a Domingo 6:00 - 24:00",
    "deportes": "Pádel, Tenis, Fútbol, Básquet",
    "imagen": "https://images.unsplash.com/...",
    "rating": 4.8,
    "numCanchas": 8,
    "fechaRegistro": "2025-05-21T23:14:01.004627"
  }
]
```

**POST /api/clubes**
- Descripción: Registra un nuevo club
- Body:
```json
{
  "nombre": "Nuevo Club Deportivo",
  "descripcion": "Descripción del club",
  "direccion": "Dirección del club",
  "telefono": "+54 11 1234-5678",
  "email": "info@nuevoclub.com",
  "horario": "Lunes a Domingo 8:00 - 22:00",
  "deportes": "Tenis, Pádel",
  "imagen": "https://ejemplo.com/imagen.jpg"
}
```
- Respuesta: Club creado

**GET /api/clubes/{id}**
- Descripción: Obtiene un club específico
- Parámetros: `id` (Long)
- Respuesta: Club individual

**PUT /api/clubes/{id}**
- Descripción: Actualiza un club existente
- Parámetros: `id` (Long)
- Body: Mismo formato que POST
- Respuesta: Club actualizado

**DELETE /api/clubes/{id}**
- Descripción: Elimina un club
- Parámetros: `id` (Long)
- Respuesta:
```json
{
  "success": true,
  "message": "Club eliminado exitosamente"
}
```

**GET /api/clubes/buscar**
- Descripción: Busca clubes por criterios
- Parámetros de query:
  - `nombre` (opcional): Busca por nombre
  - `deporte` (opcional): Busca por deporte
  - `ubicacion` (opcional): Busca por ubicación
- Ejemplo: `GET /api/clubes/buscar?nombre=tennis&deporte=tenis`
- Respuesta: Lista de clubes que coinciden con los criterios

## Códigos de Respuesta

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Operación exitosa sin contenido
- **400 Bad Request**: Error en los datos enviados
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

## CORS

La API permite peticiones desde los siguientes orígenes:
- http://localhost:5173
- http://127.0.0.1:5173
- http://localhost:5174
- http://127.0.0.1:5174
- http://localhost:5175
- http://127.0.0.1:5175
- http://localhost:3000
- http://127.0.0.1:3000

## Notas de Implementación

### Endpoints Simulados
Los siguientes endpoints están implementados con datos simulados:
- `/api/auth/*` - Autenticación simulada
- `/api/reservas/*` - Reservas simuladas
- `/api/clubes/*` - Clubes simulados

### Endpoints Reales
Los siguientes endpoints están conectados a la base de datos MySQL:
- `/api/canchas/*` - Gestión de canchas

### Próximos Pasos
1. Implementar autenticación real con JWT
2. Crear entidades y repositorios para Reservas y Clubes
3. Implementar validación de roles y permisos
4. Agregar paginación a los endpoints de listado
5. Implementar búsqueda avanzada con filtros
6. Agregar sistema de notificaciones
7. Implementar sistema de pagos 