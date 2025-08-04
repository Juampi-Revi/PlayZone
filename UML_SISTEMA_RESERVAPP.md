# UML del Sistema ReservApp

## 📊 **Diagrama de Clases - Estado Actual**

```mermaid
classDiagram
    class Usuario {
        +Long id
        +String nombre
        +String email
        +String password
        +String tipo
        +String telefono
        +LocalDateTime fechaRegistro
        +Boolean activo
    }

    class Club {
        +Long id
        +String nombre
        +String descripcion
        +String direccion
        +String telefono
        +String email
        +String sitioWeb
        +String horarioAtencion
        +List~String~ servicios
        +String politicasCancelacion
        +String reglasGenerales
        +Boolean activo
        +LocalDateTime fechaCreacion
        +LocalDateTime fechaActualizacion
    }

    class Cancha {
        +Long id
        +String nombre
        +String descripcion
        +String deporte
        +String ubicacion
        +Double precioPorHora
        +String horario
        +List~String~ imagenes
        +Boolean disponible
    }

    class ConfiguracionHorario {
        +Long id
        +LocalTime horaApertura
        +LocalTime horaCierre
        +Integer duracionTurnoMinutos
        +String diasDisponibles
        +Integer anticipacionMinimaHoras
        +Integer anticipacionMaximaDias
    }

    class Reserva {
        +Long id
        +LocalDateTime fechaHoraInicio
        +LocalDateTime fechaHoraFin
        +Double montoTotal
        +EstadoReserva estado
        +EstadoPago estadoPago
        +String stripePaymentIntentId
        +String stripeSessionId
        +LocalDateTime fechaCreacion
        +LocalDateTime fechaActualizacion
    }

    class Producto {
        +Long id
        +String nombre
        +String descripcion
        +Double precio
        +Boolean disponible
        +List~String~ imagenes
    }

    %% Relaciones
    Usuario ||--o{ Club : "propietario"
    Usuario ||--o{ Reserva : "usuario"
    Club ||--o{ Cancha : "canchas"
    Cancha ||--|| ConfiguracionHorario : "configuracion"
    Cancha ||--o{ Reserva : "cancha"
    Club ||--o{ Producto : "productos"
```

## 🔄 **Flujo de Relaciones Actual**

### **Club → Canchas → Horarios**
1. **Club** tiene múltiples **Canchas**
2. Cada **Cancha** tiene una **Configuración de Horario** (horarios de apertura, cierre, duración de turnos)
3. **Club** tiene múltiples **Productos** (para venta)

### **Sistema de Reservas Detallado**
1. **Cancha** tiene **Configuración de Horario** que define:
   - Horarios de apertura y cierre
   - Duración de cada turno (60, 90, 120 minutos)
   - Días disponibles
   - Anticipación mínima y máxima para reservar

2. **Reserva** representa un **turno específico**:
   - **Cancha específica**: dónde se juega
   - **Fecha y hora de inicio**: cuándo empieza el turno
   - **Fecha y hora de fin**: cuándo termina el turno
   - **Usuario**: quién reserva
   - **Monto total**: precio del turno
   - **Estados**: de la reserva y del pago

### **Usuario → Reservas**
1. **Usuario** (JUGADOR) hace múltiples **Reservas**
2. Cada **Reserva** está asociada a una **Cancha específica** y un **turno específico** (fecha y hora de inicio/fin)
3. **Reserva** tiene estados de pago y confirmación
4. **Reserva** representa un bloque de tiempo reservado en una cancha específica

## 🚀 **Propuesta de Expansión - Perfil del Jugador**

### **Nueva Entidad: PerfilJugador**

```mermaid
classDiagram
    class Usuario {
        +Long id
        +String nombre
        +String email
        +String password
        +String tipo
        +String telefono
        +LocalDateTime fechaRegistro
        +Boolean activo
    }

    class PerfilJugador {
        +Long id
        +LocalDate fechaNacimiento
        +String deporteFavorito
        +String posicion
        +String nivelExperiencia
        +Integer altura
        +Integer peso
        +Integer anosExperiencia
        +String biografia
        +Double ratingPromedio
        +Integer partidosJugados
        +Integer partidosGanados
        +Integer partidosEmpatados
        +Integer partidosPerdidos
        +LocalDateTime fechaActualizacion
    }

    class Favorito {
        +Long id
        +LocalDateTime fechaAgregado
    }

    class Calificacion {
        +Long id
        +Integer puntuacion
        +String comentario
        +LocalDateTime fechaCalificacion
    }

    class Amigo {
        +Long id
        +LocalDateTime fechaAmistad
        +Boolean activo
    }

    %% Relaciones expandidas
    Usuario ||--|| PerfilJugador : "perfil"
    Usuario ||--o{ Favorito : "favoritos"
    Usuario ||--o{ Calificacion : "calificaciones_dadas"
    Cancha ||--o{ Calificacion : "calificaciones_recibidas"
    Usuario ||--o{ Amigo : "amigos"
    Usuario ||--o{ Amigo : "amigos_de"
```

### **Estructura SQL Propuesta**

```sql
-- Tabla para perfil extendido del jugador
CREATE TABLE perfil_jugador (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL UNIQUE,
    fecha_nacimiento DATE,
    deporte_favorito VARCHAR(50),
    posicion VARCHAR(50),
    nivel_experiencia ENUM('PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO', 'PROFESIONAL'),
    altura INTEGER, -- en cm
    peso INTEGER, -- en kg
    anos_experiencia INTEGER,
    biografia TEXT,
    rating_promedio DECIMAL(3,2) DEFAULT 0.00,
    partidos_jugados INTEGER DEFAULT 0,
    partidos_ganados INTEGER DEFAULT 0,
    partidos_empatados INTEGER DEFAULT 0,
    partidos_perdidos INTEGER DEFAULT 0,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla para favoritos
CREATE TABLE favoritos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    cancha_id BIGINT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorito (usuario_id, cancha_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cancha_id) REFERENCES canchas(id) ON DELETE CASCADE
);

-- Tabla para calificaciones
CREATE TABLE calificaciones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    cancha_id BIGINT NOT NULL,
    puntuacion INTEGER NOT NULL CHECK (puntuacion >= 1 AND puntuacion <= 5),
    comentario TEXT,
    fecha_calificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cancha_id) REFERENCES canchas(id) ON DELETE CASCADE
);

-- Tabla para amigos
CREATE TABLE amigos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    amigo_id BIGINT NOT NULL,
    fecha_amistad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    UNIQUE KEY unique_amistad (usuario_id, amigo_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (amigo_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

## 📈 **UML Completo del Sistema Expandido**

```mermaid
classDiagram
    %% Entidades principales
    class Usuario {
        +Long id
        +String nombre
        +String email
        +String password
        +String tipo
        +String telefono
        +LocalDateTime fechaRegistro
        +Boolean activo
    }

    class PerfilJugador {
        +Long id
        +LocalDate fechaNacimiento
        +String deporteFavorito
        +String posicion
        +String nivelExperiencia
        +Integer altura
        +Integer peso
        +Integer anosExperiencia
        +String biografia
        +Double ratingPromedio
        +Integer partidosJugados
        +Integer partidosGanados
        +Integer partidosEmpatados
        +Integer partidosPerdidos
        +LocalDateTime fechaActualizacion
    }

    class Club {
        +Long id
        +String nombre
        +String descripcion
        +String direccion
        +String telefono
        +String email
        +String sitioWeb
        +String horarioAtencion
        +List~String~ servicios
        +String politicasCancelacion
        +String reglasGenerales
        +Boolean activo
        +LocalDateTime fechaCreacion
        +LocalDateTime fechaActualizacion
    }

    class Cancha {
        +Long id
        +String nombre
        +String descripcion
        +String deporte
        +String ubicacion
        +Double precioPorHora
        +String horario
        +List~String~ imagenes
        +Boolean disponible
    }

    class ConfiguracionHorario {
        +Long id
        +LocalTime horaApertura
        +LocalTime horaCierre
        +Integer duracionTurnoMinutos
        +String diasDisponibles
        +Integer anticipacionMinimaHoras
        +Integer anticipacionMaximaDias
    }

    class Reserva {
        +Long id
        +LocalDateTime fechaHoraInicio
        +LocalDateTime fechaHoraFin
        +Double montoTotal
        +EstadoReserva estado
        +EstadoPago estadoPago
        +String stripePaymentIntentId
        +String stripeSessionId
        +LocalDateTime fechaCreacion
        +LocalDateTime fechaActualizacion
    }

    class Favorito {
        +Long id
        +LocalDateTime fechaAgregado
    }

    class Calificacion {
        +Long id
        +Integer puntuacion
        +String comentario
        +LocalDateTime fechaCalificacion
    }

    class Amigo {
        +Long id
        +LocalDateTime fechaAmistad
        +Boolean activo
    }

    class Producto {
        +Long id
        +String nombre
        +String descripcion
        +Double precio
        +Boolean disponible
        +List~String~ imagenes
    }

    %% Relaciones
    Usuario ||--|| PerfilJugador : "perfil (1:1)"
    Usuario ||--o{ Club : "propietario (1:N)"
    Usuario ||--o{ Reserva : "usuario (1:N)"
    Usuario ||--o{ Favorito : "favoritos (1:N)"
    Usuario ||--o{ Calificacion : "calificaciones_dadas (1:N)"
    Usuario ||--o{ Amigo : "amigos (1:N)"
    Usuario ||--o{ Amigo : "amigos_de (1:N)"
    
    Club ||--o{ Cancha : "canchas (1:N)"
    Club ||--o{ Producto : "productos (1:N)"
    
    Cancha ||--|| ConfiguracionHorario : "configuracion (1:1)"
    Cancha ||--o{ Reserva : "reservas (1:N)"
    Cancha ||--o{ Favorito : "favoritos (1:N)"
    Cancha ||--o{ Calificacion : "calificaciones_recibidas (1:N)"
```

## 🎯 **Beneficios de la Expansión**

### **Para el Jugador:**
- **Perfil completo** con información deportiva
- **Sistema de favoritos** para canchas preferidas
- **Calificaciones y reviews** de experiencias
- **Red social** con amigos
- **Estadísticas personales** de rendimiento

### **Para el Club:**
- **Mejor conocimiento** de sus jugadores
- **Sistema de calificaciones** para mejorar servicios
- **Datos de preferencias** para personalización
- **Métricas de satisfacción** del cliente

### **Para el Sistema:**
- **Recomendaciones personalizadas** de canchas
- **Sistema de matchmaking** para partidos
- **Analytics avanzados** de uso
- **Gamificación** con logros y rankings

## 🚀 **Próximos Pasos Sugeridos**

1. **Crear entidad PerfilJugador** con todos los campos necesarios
2. **Implementar sistema de favoritos** para canchas
3. **Agregar sistema de calificaciones** y reviews
4. **Desarrollar funcionalidad de amigos** y red social
5. **Crear endpoints** para todas las nuevas funcionalidades
6. **Actualizar frontend** para mostrar y editar información expandida
7. **Implementar sistema de recomendaciones** basado en preferencias

¿Te gustaría que empecemos implementando alguna de estas funcionalidades específicas? 