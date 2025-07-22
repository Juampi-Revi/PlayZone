# ReservApp Frontend

Frontend de la aplicación ReservApp construido con React, Vite, Tailwind CSS y React Router.

## 🚀 Características

- **React 18** con Vite para desarrollo rápido
- **React Router DOM** para navegación entre páginas
- **Tailwind CSS** para estilos responsivos y modernos
- **Axios** para comunicación con el backend
- **Componentes reutilizables** y bien estructurados
- **Diseño responsivo** para móviles y desktop
- **Validación de formularios** con feedback visual
- **Manejo de errores** y estados de carga

## 📁 Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── assets/          # Imágenes y recursos estáticos
│   ├── components/      # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CardProducto.jsx
│   │   └── GaleriaImagenes.jsx
│   ├── pages/          # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── AgregarProducto.jsx
│   │   └── ListadoProductos.jsx
│   ├── App.jsx         # Componente principal con rutas
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales con Tailwind
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida para desarrollo
- **React Router DOM** - Enrutamiento para aplicaciones React
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para realizar peticiones al backend

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend de ReservApp ejecutándose en `http://localhost:8082`

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd playZone/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=http://localhost:8082
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   La aplicación estará disponible en `http://localhost:5173`

## 📱 Páginas y Funcionalidades

### 🏠 Página de Inicio (`/`)
- Muestra productos aleatorios en un diseño atractivo
- Hero section con llamadas a la acción
- Grid responsivo de productos
- Manejo de estados de carga y error

### 📄 Detalle de Producto (`/detalle/:id`)
- Vista detallada de un producto específico
- Galería de imágenes con navegación
- Información completa del producto
- Breadcrumb para navegación

### ⚙️ Panel de Administración (`/administracion`)
- Dashboard con estadísticas
- Acceso rápido a funciones administrativas
- Tarjetas de navegación interactivas
- Sección de ayuda y soporte

### ➕ Agregar Producto (`/administracion/agregar`)
- Formulario completo para crear productos
- Validación en tiempo real
- Preview de imágenes
- Manejo de errores del backend

### 📋 Listado de Productos (`/administracion/listado`)
- Tabla con todos los productos
- Estadísticas en tiempo real
- Acciones de ver y eliminar
- Diseño responsivo para móviles

## 🎨 Componentes Principales

### Header
- Navegación principal
- Logo y enlaces
- Diseño responsivo con menú móvil

### Footer
- Información de contacto
- Enlaces a redes sociales
- Copyright y branding

### CardProducto
- Tarjeta de producto reutilizable
- Imagen, título, descripción
- Botón de acción
- Manejo de errores de imagen

### GaleriaImagenes
- Galería interactiva con navegación
- Controles de anterior/siguiente
- Miniaturas para navegación rápida
- Indicadores de posición

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye para producción
npm run preview      # Previsualiza la construcción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🌐 Configuración de la API

El frontend se conecta al backend de Spring Boot en `http://localhost:8082`. Asegúrate de que:

1. El backend esté ejecutándose
2. CORS esté configurado correctamente
3. Las rutas de la API coincidan con las del backend

### Endpoints Utilizados

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto específico
- `POST /api/products` - Crear nuevo producto
- `DELETE /api/products/:id` - Eliminar producto

## 🎯 Características de UX/UI

- **Diseño responsivo** que se adapta a todos los dispositivos
- **Estados de carga** con spinners y mensajes informativos
- **Manejo de errores** con mensajes claros y opciones de reintento
- **Transiciones suaves** entre páginas y estados
- **Feedback visual** en formularios y acciones
- **Accesibilidad** con etiquetas ARIA y navegación por teclado

## 🔒 Validaciones

- **Frontend**: Validación en tiempo real en formularios
- **Backend**: Validación de datos con Bean Validation
- **Manejo de errores**: Mensajes claros para el usuario
- **Fallbacks**: Imágenes por defecto y estados de error

## 🚀 Despliegue

### Construcción para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Variables de Entorno

```env
VITE_API_URL=http://localhost:8082  # URL del backend
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- Abre un issue en el repositorio
- Contacta al equipo de desarrollo
- Revisa la documentación del backend

---

**Desarrollado con ❤️ para ReservApp**
