# PlayZone - Sistema Completo de Reservas de Canchas Deportivas

## 🏟️ Descripción

PlayZone es una aplicación web completa para la gestión y reserva de canchas deportivas. Permite a los propietarios de canchas registrar y gestionar sus instalaciones, mientras que los usuarios pueden buscar, filtrar, reservar y pagar canchas para diferentes deportes. Incluye un sistema completo de autenticación, pagos con Stripe y dashboards diferenciados.

## 🚀 Características Principales

### Backend (Spring Boot)
- ✅ **Gestión de Canchas**: CRUD completo para canchas deportivas
- ✅ **Sistema de Reservas**: Gestión completa de reservas con validaciones
- ✅ **Autenticación JWT**: Sistema seguro de autenticación y autorización
- ✅ **Integración Stripe**: Procesamiento de pagos seguro
- ✅ **Gestión de Usuarios**: Roles diferenciados (Admin/Jugador)
- ✅ **Configuración de Horarios**: Sistema flexible de horarios por cancha
- ✅ **Filtros Avanzados**: Por deporte, disponibilidad y ubicación
- ✅ **Validaciones**: Bean Validation para integridad de datos
- ✅ **API RESTful**: Endpoints bien estructurados y documentados
- ✅ **Base de Datos**: MySQL con JPA/Hibernate
- ✅ **CORS Configurado**: Para comunicación con frontend
- ✅ **Seguridad**: Variables de entorno para claves sensibles

### Frontend (React + Vite)
- ✅ **Interfaz Moderna**: Diseño responsivo con Tailwind CSS
- ✅ **Autenticación Completa**: Login, registro y gestión de sesiones
- ✅ **Dashboards Diferenciados**: Admin y Jugador con funcionalidades específicas
- ✅ **Sistema de Reservas**: Formularios intuitivos con validaciones
- ✅ **Integración de Pagos**: Checkout con Stripe Elements
- ✅ **Gestión de Canchas**: Panel administrativo completo
- ✅ **Configuración de Horarios**: Interface para gestionar disponibilidad
- ✅ **Rutas Protegidas**: Navegación basada en roles
- ✅ **Filtros Dinámicos**: Por deporte en tiempo real
- ✅ **Galería de Imágenes**: Navegación con carrusel
- ✅ **Navegación Intuitiva**: React Router con rutas organizadas
- ✅ **Estados de Carga**: Loading y error handling
- ✅ **Componentes Reutilizables**: Arquitectura modular

## 🏆 Deportes Soportados

- 🎾 **Pádel** - Canchas profesionales con iluminación LED
- 🎾 **Tenis** - Superficies de arcilla y graderías
- ⚽ **Fútbol** - Canchas de fútbol 5 y 11
- 🏀 **Básquet** - Canchas indoor con parquet profesional
- 🏓 **Squash** - Canchas con paredes de cristal
- 🏐 **Voleibol** - Canchas de arena y indoor
- 🏸 **Bádminton** - Canchas especializadas
- 🎯 **Y más...** - Fácilmente extensible

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 24** - Lenguaje principal
- **Spring Boot 3.2.0** - Framework de aplicación
- **Spring Security** - Autenticación y autorización
- **JWT** - Tokens de autenticación
- **Spring Data JPA** - Persistencia de datos
- **MySQL 8.0** - Base de datos
- **Maven** - Gestión de dependencias
- **Hibernate** - ORM
- **Bean Validation** - Validaciones de datos
- **Stripe API** - Procesamiento de pagos

### Frontend
- **React 18.2.0** - Biblioteca de UI
- **Vite 4.1.0** - Build tool y dev server
- **React Router Dom 6.8.0** - Navegación
- **Axios 1.3.0** - Cliente HTTP
- **Tailwind CSS 3.2.7** - Framework CSS
- **Stripe Elements** - Componentes de pago
- **React Context** - Gestión de estado global
- **Node.js 16.20.2** - Runtime

## 📁 Estructura del Proyecto

```
playZone/
├── src/main/java/com/reservapp/
│   ├── config/
│   │   ├── CorsConfig.java
│   │   ├── SecurityConfig.java
│   │   └── StripeConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── CanchaController.java
│   │   ├── ReservaController.java
│   │   └── UsuarioController.java
│   ├── entity/
│   │   ├── Cancha.java
│   │   ├── ConfiguracionHorarios.java
│   │   ├── Reserva.java
│   │   └── Usuario.java
│   ├── repository/
│   │   ├── CanchaRepository.java
│   │   ├── ConfiguracionHorariosRepository.java
│   │   ├── ReservaRepository.java
│   │   └── UsuarioRepository.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── CanchaService.java
│   │   ├── ReservaService.java
│   │   └── UsuarioService.java
│   ├── security/
│   │   ├── JwtAuthenticationFilter.java
│   │   └── JwtUtil.java
│   └── ReservappApplication.java
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CardCancha.jsx
│   │   │   ├── ConfiguracionHorarios.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormularioReserva.jsx
│   │   │   ├── GaleriaImagenes.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StripeCheckout.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── FinanzasReportes.jsx
│   │   │   │   ├── GestionClub.jsx
│   │   │   │   └── GestionReservas.jsx
│   │   │   ├── jugador/
│   │   │   │   ├── FavoritosJugador.jsx
│   │   │   │   ├── PagosJugador.jsx
│   │   │   │   ├── PartidosJugados.jsx
│   │   │   │   └── PerfilJugador.jsx
│   │   │   ├── AgregarCancha.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardAdmin.jsx
│   │   │   ├── DashboardJugador.jsx
│   │   │   ├── DetalleCancha.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ListadoCanchas.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MisCanchas.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── PagarReserva.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── .env.example
├── .vercel/
│   └── project.json
├── actualizacion_horarios.sql
├── datos_prueba.sql
├── fix_configuraciones.sql
├── pom.xml
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 24 o superior
- MySQL 8.0
- Node.js 16 o superior
- Maven 3.6+
- Cuenta de Stripe (para pagos)

### Backend

1. **Clonar el repositorio**
   ```bash
   git clone git@github.com:Juampi-Revi/PlayZone.git
   cd PlayZone
   ```

2. **Configurar base de datos**
   ```bash
   mysql -u root -p
   CREATE DATABASE reservapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'reservapp_user'@'localhost' IDENTIFIED BY 'reservapp_password';
   GRANT ALL PRIVILEGES ON reservapp.* TO 'reservapp_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Configurar variables de entorno**
   
   Copia el archivo `.env.example` y configura las variables:
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus valores:
   ```properties
   # Base de datos
   DB_URL=jdbc:mysql://localhost:3306/reservapp
   DB_USERNAME=reservapp_user
   DB_PASSWORD=reservapp_password
   
   # Stripe (obtener de tu dashboard de Stripe)
   STRIPE_API_KEY=sk_test_tu_clave_secreta_aqui
   STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
   STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui
   
   # JWT
   JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
   JWT_EXPIRATION=86400000
   
   # Servidor
   SERVER_PORT=8082
   ```

4. **Ejecutar scripts de base de datos**
   ```bash
   mysql -u reservapp_user -p reservapp < actualizacion_horarios.sql
   mysql -u reservapp_user -p reservapp < fix_configuraciones.sql
   mysql -u reservapp_user -p reservapp < datos_prueba.sql
   ```

5. **Ejecutar la aplicación**
   ```bash
   mvn spring-boot:run
   ```

   El backend estará disponible en: `http://localhost:8082`

### Frontend

1. **Instalar dependencias**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurar variables de entorno del frontend**
   
   Crea un archivo `.env` en el directorio `frontend/`:
   ```bash
   VITE_API_URL=http://localhost:8082
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   El frontend estará disponible en: `http://localhost:5173`

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener información del usuario actual

### Canchas
- `GET /api/canchas` - Obtener todas las canchas
- `GET /api/canchas/{id}` - Obtener cancha por ID
- `GET /api/canchas/disponibles` - Obtener canchas disponibles
- `GET /api/canchas/deporte/{deporte}` - Filtrar por deporte
- `GET /api/canchas/deportes` - Listar deportes disponibles
- `POST /api/canchas` - Crear nueva cancha (Admin)
- `PUT /api/canchas/{id}` - Actualizar cancha (Admin)
- `DELETE /api/canchas/{id}` - Eliminar cancha (Admin)
- `PATCH /api/canchas/{id}/toggle-disponibilidad` - Cambiar disponibilidad

### Reservas
- `GET /api/reservas` - Obtener todas las reservas (Admin)
- `GET /api/reservas/usuario/{usuarioId}` - Obtener reservas de un usuario
- `GET /api/reservas/{id}` - Obtener reserva por ID
- `POST /api/reservas` - Crear nueva reserva
- `PUT /api/reservas/{id}` - Actualizar reserva
- `DELETE /api/reservas/{id}` - Cancelar reserva
- `PATCH /api/reservas/{id}/confirmar` - Confirmar reserva (Admin)

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios (Admin)
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `PUT /api/usuarios/{id}` - Actualizar perfil de usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario (Admin)

### Configuración de Horarios
- `GET /api/configuracion-horarios/cancha/{canchaId}` - Obtener horarios de una cancha
- `POST /api/configuracion-horarios` - Crear configuración de horarios (Admin)
- `PUT /api/configuracion-horarios/{id}` - Actualizar horarios (Admin)
- `DELETE /api/configuracion-horarios/{id}` - Eliminar configuración (Admin)

### Pagos (Stripe)
- `POST /api/pagos/create-payment-intent` - Crear intención de pago
- `POST /api/pagos/confirm-payment` - Confirmar pago
- `GET /api/pagos/reserva/{reservaId}` - Obtener información de pago

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] **Sistema de Autenticación**: Login, registro, JWT, roles
- [x] **CRUD completo de canchas**: Gestión administrativa
- [x] **Sistema de Reservas**: Creación, gestión y cancelación
- [x] **Integración de Pagos**: Stripe Elements y procesamiento
- [x] **Dashboards Diferenciados**: Admin y Jugador
- [x] **Gestión de Horarios**: Configuración flexible por cancha
- [x] **Filtros por deporte y disponibilidad**: Búsqueda avanzada
- [x] **Galería de imágenes con navegación**: Carrusel interactivo
- [x] **Interfaz responsiva y moderna**: Tailwind CSS
- [x] **Validaciones de datos**: Frontend y backend
- [x] **Manejo de errores**: Estados de error y loading
- [x] **Estados de carga**: UX mejorada
- [x] **Navegación entre páginas**: React Router
- [x] **Configuración CORS**: Comunicación segura
- [x] **Rutas Protegidas**: Autorización basada en roles
- [x] **Variables de Entorno**: Configuración segura
- [x] **Scripts de Base de Datos**: Datos de prueba y configuración

### 🚧 Próximas Mejoras
- [ ] Sistema de notificaciones en tiempo real
- [ ] Calendario de disponibilidad avanzado
- [ ] Sistema de calificaciones y reseñas
- [ ] Chat entre usuarios
- [ ] Reportes y analytics avanzados
- [ ] App móvil (React Native)
- [ ] Integración con redes sociales
- [ ] Sistema de torneos

## 🎨 Características de UX/UI

- **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- **Autenticación Intuitiva**: Login y registro con validaciones en tiempo real
- **Dashboards Personalizados**: Interfaces específicas para Admin y Jugador
- **Filtros Intuitivos**: Botones para filtrar por deporte y disponibilidad
- **Sistema de Reservas**: Formularios paso a paso con validaciones
- **Integración de Pagos**: Checkout seguro con Stripe Elements
- **Galería de Imágenes**: Carrusel con navegación fluida
- **Estados Visuales**: Indicadores de disponibilidad y estados de carga
- **Información Detallada**: Precios, horarios y ubicaciones
- **Navegación Clara**: Breadcrumbs y menús organizados
- **Rutas Protegidas**: Acceso basado en roles de usuario
- **Sidebar Responsivo**: Navegación lateral adaptativa

## 🔧 Configuración de Desarrollo

### Variables de Entorno Backend
```properties
# application.properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/reservapp}
spring.datasource.username=${DB_USERNAME:reservapp_user}
spring.datasource.password=${DB_PASSWORD:reservapp_password}

# Stripe
stripe.api.key=${STRIPE_API_KEY:sk_test_default}
stripe.publishable.key=${STRIPE_PUBLISHABLE_KEY:pk_test_default}
stripe.webhook.secret=${STRIPE_WEBHOOK_SECRET:whsec_default}

# JWT
jwt.secret=${JWT_SECRET:defaultSecretKey}
jwt.expiration=${JWT_EXPIRATION:86400000}

# Servidor
server.port=${SERVER_PORT:8082}
```

### Variables de Entorno Frontend
```bash
# .env (frontend/)
VITE_API_URL=http://localhost:8082
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
```

### Scripts Disponibles

#### Backend
```bash
# Compilar y ejecutar
mvn clean compile
mvn spring-boot:run

# Ejecutar tests
mvn test

# Crear JAR para producción
mvn clean package
```

#### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🚀 Despliegue

### Vercel (Frontend)
El proyecto incluye configuración para Vercel:
```json
{
  "name": "playzone-frontend",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ]
}
```

### Variables de Entorno en Producción
Asegúrate de configurar estas variables en tu plataforma de despliegue:

**Backend:**
- `DB_URL`
- `DB_USERNAME` 
- `DB_PASSWORD`
- `STRIPE_API_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `JWT_SECRET`

**Frontend:**
- `VITE_API_URL`
- `VITE_STRIPE_PUBLISHABLE_KEY`

## 📊 Datos de Ejemplo

La aplicación incluye 5 canchas de ejemplo:
1. **Cancha de Pádel Premium** - $2,500/hora
2. **Cancha de Tenis Profesional** - $3,000/hora
3. **Cancha de Fútbol 5** - $1,800/hora
4. **Cancha de Básquet Indoor** - $1,200/hora
5. **Cancha de Squash** - $1,500/hora

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Juan Pablo Revi** - [Juampi-Revi](https://github.com/Juampi-Revi)

## 🙏 Agradecimientos

- Spring Boot por el excelente framework backend
- React y Vite por las herramientas de frontend
- Tailwind CSS por el sistema de diseño
- Stripe por la integración de pagos
- MySQL por la base de datos robusta

---

**PlayZone** - Transformando la forma de reservar canchas deportivas 🏆