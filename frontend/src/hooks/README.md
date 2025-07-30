# 🎣 Hooks de API - PlayZone Frontend

## 📖 Descripción

Este directorio contiene hooks personalizados para manejar todas las peticiones al backend de PlayZone. Los hooks proporcionan una interfaz consistente y reutilizable para las operaciones de API.

## 🏗️ Estructura

```
hooks/
├── index.js          # Exportaciones centralizadas
├── useAuth.js        # Autenticación y usuarios
├── useClub.js        # Gestión de clubes
├── useCanchas.js     # Gestión de canchas
├── useReservas.js    # Gestión de reservas
└── useProductos.js   # Gestión de productos
```

## 🚀 Uso Básico

### Importación

```javascript
// Importar hooks individuales
import { useAuthAPI, useClubAPI, useCanchasAPI } from '../hooks';

// O importar desde el index
import { useAuthAPI } from '../hooks/useAuth';
```

### Ejemplo de uso en componente

```javascript
import React, { useState, useEffect } from 'react';
import { useClubAPI } from '../hooks';

const MiComponente = () => {
  const clubAPI = useClubAPI();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const cargarClub = async () => {
      const result = await clubAPI.getMiClub();
      if (result.success) {
        setClub(result.data.club);
      } else {
        console.error('Error:', result.error);
      }
    };

    cargarClub();
  }, []);

  const handleCrearClub = async (clubData) => {
    const result = await clubAPI.createClub(clubData);
    if (result.success) {
      setClub(result.data);
    } else {
      alert('Error: ' + result.error);
    }
  };

  return (
    <div>
      {/* Tu componente aquí */}
    </div>
  );
};
```

## 📚 Hooks Disponibles

### 🔐 useAuthAPI

Maneja autenticación y gestión de usuarios.

**Métodos:**
- `login(email, password)` - Iniciar sesión
- `register(nombre, email, password, tipo)` - Registrar usuario
- `getMe()` - Obtener datos del usuario actual

**Estados:**
- `loading` - Indica si hay una petición en curso
- `error` - Último error ocurrido
- `clearError()` - Limpiar errores

### 🏢 useClubAPI

Gestión de clubes deportivos.

**Métodos:**
- `getMiClub()` - Obtener club del usuario
- `createClub(clubData)` - Crear nuevo club
- `updateClub(clubId, clubData)` - Actualizar club
- `getAllClubes()` - Obtener todos los clubes

### 🏟️ useCanchasAPI

Gestión de canchas deportivas.

**Métodos:**
- `getMisCanchas()` - Obtener canchas del club
- `getAllCanchas()` - Obtener todas las canchas
- `createCancha(canchaData)` - Crear nueva cancha
- `createCanchaAdmin(canchaData)` - Crear cancha (admin)
- `deleteCancha(canchaId)` - Eliminar cancha
- `toggleDisponibilidad(canchaId)` - Cambiar disponibilidad
- `getCanchaById(canchaId)` - Obtener cancha específica
- `getDeportes()` - Obtener lista de deportes

### 📅 useReservasAPI

Gestión de reservas.

**Métodos:**
- `getAllReservas()` - Obtener todas las reservas
- `getMisReservas()` - Obtener reservas del usuario
- `createReserva(reservaData)` - Crear nueva reserva
- `cancelReserva(reservaId)` - Cancelar reserva
- `getHorariosDisponibles(canchaId, fecha)` - Obtener horarios disponibles

### 🛍️ useProductosAPI

Gestión de productos.

**Métodos:**
- `getAllProductos()` - Obtener todos los productos
- `createProducto(productoData)` - Crear nuevo producto
- `updateProducto(productoId, productoData)` - Actualizar producto
- `deleteProducto(productoId)` - Eliminar producto
- `toggleDisponibilidad(productoId)` - Cambiar disponibilidad

## 📋 Formato de Respuesta

Todos los hooks devuelven un objeto con el siguiente formato:

```javascript
// Respuesta exitosa
{
  success: true,
  data: { /* datos de la respuesta */ }
}

// Respuesta con error
{
  success: false,
  error: "Mensaje de error"
}
```

## ✅ Ventajas

1. **Reutilización**: Los hooks pueden usarse en múltiples componentes
2. **Consistencia**: Interfaz uniforme para todas las peticiones
3. **Manejo de errores**: Gestión centralizada de errores
4. **Estados de carga**: Loading states incluidos
5. **Mantenibilidad**: Fácil de actualizar y mantener
6. **Tipado**: Preparado para TypeScript en el futuro

## 🔄 Migración desde fetch/axios directo

### Antes (fetch directo):
```javascript
const response = await fetch('/api/clubes/mi-club', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const data = await response.json();
```

### Después (con hook):
```javascript
const clubAPI = useClubAPI();
const result = await clubAPI.getMiClub();
if (result.success) {
  const data = result.data;
}
```

## 🛠️ Configuración

Los hooks utilizan axios con interceptores configurados automáticamente para:
- Agregar tokens de autorización
- Manejar errores de red
- Usar el proxy de Vite configurado

## 📝 Notas

- Todos los hooks manejan automáticamente los tokens de autorización
- Los errores se capturan y formatean consistentemente
- Los estados de loading están disponibles para mostrar indicadores de carga
- Compatible con el proxy de Vite configurado en `vite.config.js`