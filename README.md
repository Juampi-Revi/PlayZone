# ReservApp - Sistema de Reservas de Canchas Deportivas

## 🏟️ Descripción

ReservApp es una aplicación web completa para la gestión y reserva de canchas deportivas. Permite a los propietarios de canchas registrar y gestionar sus instalaciones, mientras que los usuarios pueden buscar, filtrar y reservar canchas para diferentes deportes.

## 🚀 Características Principales

### Backend (Spring Boot)
- ✅ **Gestión de Canchas**: CRUD completo para canchas deportivas
- ✅ **Filtros Avanzados**: Por deporte, disponibilidad y ubicación
- ✅ **Validaciones**: Bean Validation para integridad de datos
- ✅ **API RESTful**: Endpoints bien estructurados y documentados
- ✅ **Base de Datos**: MySQL con JPA/Hibernate
- ✅ **CORS Configurado**: Para comunicación con frontend

### Frontend (React + Vite)
- ✅ **Interfaz Moderna**: Diseño responsivo con Tailwind CSS
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
- **Spring Data JPA** - Persistencia de datos
- **MySQL 8.0** - Base de datos
- **Maven** - Gestión de dependencias
- **Hibernate** - ORM
- **Bean Validation** - Validaciones de datos

### Frontend
- **React 18.2.0** - Biblioteca de UI
- **Vite 4.1.0** - Build tool y dev server
- **React Router Dom 6.8.0** - Navegación
- **Axios 1.3.0** - Cliente HTTP
- **Tailwind CSS 3.2.7** - Framework CSS
- **Node.js 16.20.2** - Runtime

## 📁 Estructura del Proyecto

```
playZone/
├── src/main/java/com/reservapp/
│   ├── config/
│   │   └── CorsConfig.java
│   ├── controller/
│   │   └── CanchaController.java
│   ├── entity/
│   │   └── Cancha.java
│   ├── repository/
│   │   └── CanchaRepository.java
│   ├── service/
│   │   └── CanchaService.java
│   └── ReservappApplication.java
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CardCancha.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GaleriaImagenes.jsx
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AgregarProducto.jsx
│   │   │   ├── DetalleCancha.jsx
│   │   │   ├── Home.jsx
│   │   │   └── ListadoProductos.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── pom.xml
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 24 o superior
- MySQL 8.0
- Node.js 16 o superior
- Maven 3.6+

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

3. **Ejecutar la aplicación**
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

2. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   El frontend estará disponible en: `http://localhost:5173`

## 📡 API Endpoints

### Canchas
- `GET /api/canchas` - Obtener todas las canchas
- `GET /api/canchas/{id}` - Obtener cancha por ID
- `GET /api/canchas/disponibles` - Obtener canchas disponibles
- `GET /api/canchas/deporte/{deporte}` - Filtrar por deporte
- `GET /api/canchas/deportes` - Listar deportes disponibles
- `POST /api/canchas` - Crear nueva cancha
- `PUT /api/canchas/{id}` - Actualizar cancha
- `DELETE /api/canchas/{id}` - Eliminar cancha
- `PATCH /api/canchas/{id}/toggle-disponibilidad` - Cambiar disponibilidad

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] CRUD completo de canchas
- [x] Filtros por deporte y disponibilidad
- [x] Galería de imágenes con navegación
- [x] Interfaz responsiva y moderna
- [x] Validaciones de datos
- [x] Manejo de errores
- [x] Estados de carga
- [x] Navegación entre páginas
- [x] Configuración CORS

### 🚧 En Desarrollo
- [ ] Sistema de reservas
- [ ] Calendario de disponibilidad
- [ ] Sistema de pagos
- [ ] Autenticación de usuarios
- [ ] Panel de propietarios
- [ ] Notificaciones
- [ ] Sistema de calificaciones

## 🎨 Características de UX/UI

- **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- **Filtros Intuitivos**: Botones para filtrar por deporte
- **Galería de Imágenes**: Carrusel con navegación
- **Estados Visuales**: Indicadores de disponibilidad
- **Información Detallada**: Precios, horarios y ubicaciones
- **Navegación Clara**: Breadcrumbs y enlaces organizados

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/reservapp
spring.datasource.username=reservapp_user
spring.datasource.password=reservapp_password
server.port=8082
```

### Scripts Disponibles
```bash
# Backend
mvn clean compile
mvn spring-boot:run
mvn test

# Frontend
npm run dev
npm run build
npm run preview
```

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

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Juampi Revi**
- GitHub: [@Juampi-Revi](https://github.com/Juampi-Revi)

## 🙏 Agradecimientos

- Spring Boot Team por el excelente framework
- React Team por la biblioteca de UI
- Tailwind CSS por el framework de estilos
- Vite por las herramientas de desarrollo

---

**ReservApp** - Transformando la forma de reservar canchas deportivas 🏆 