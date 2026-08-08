# Sistema de Inventario de Equipos Tecnológicos

MVP para la gestión del inventario de dispositivos tecnológicos de la empresa (teclados, mouses, PCs, pantallas), con control de marcas, puestos de trabajo, estados operativos, roles de usuario y exportación de reportes.

## Stack

- **Backend**: Laravel (starter kit oficial con React)
- **Frontend**: React + TypeScript, Inertia.js v2
- **UI**: shadcn/ui + Tailwind CSS
- **Rutas tipadas**: Laravel Wayfinder
- **Roles y permisos**: `spatie/laravel-permission`
- **Exportación PDF**: `barryvdh/laravel-dompdf`
- **Exportación Excel**: `maatwebsite/excel`

## Funcionalidades

- **Inventario de equipos**: alta, edición, baja y listado con búsqueda y filtros.
- **Marcas**: catálogo administrable (Logitech, HP, Dell, etc.).
- **Puestos de trabajo**: se crean automáticamente al escribir un número nuevo en el formulario de equipo (no requieren alta manual previa).
- **Roles y permisos**: Admin, Editor y Visor, con gestión de usuarios desde la UI.
- **Exportación**: descarga en PDF y Excel del inventario filtrado, con desglose de cantidades por tipo de equipo.
- **Dashboard**: totales generales, desglose por tipo y por estado operativo, últimos equipos agregados.
- **Diseño responsive**: vista de tabla en desktop, tarjetas apiladas en móvil.
- **Confirmaciones con modal**: eliminar un registro requiere confirmación explícita (sin `window.confirm`).

## Modelo de datos

| Tabla | Descripción |
|---|---|
| `type_of_equipment` | Catálogo de tipos (Teclado, Mouse, PC, Pantalla) |
| `brands` | Catálogo de marcas |
| `workstations` | Puestos de trabajo (número libre, se crean bajo demanda) |
| `operational_statuses` | Estados operativos (Operativo, En reparación, De baja, En stock) |
| `equipment_details` | Tabla principal: número de inventario, serial, observaciones, y FKs a tipo, marca, puesto y estado |

`equipment_details` referencia `brands` directamente (`id_brand`) — no existe un catálogo intermedio de "modelos".

## Roles y permisos

| Rol | Permisos |
|---|---|
| **Admin** | Ver, crear, editar y eliminar equipos · administrar marcas · exportar · administrar usuarios |
| **Editor** | Ver, crear y editar equipos · exportar |
| **Visor** | Ver equipos · exportar |

Los permisos se aplican tanto en las rutas del backend (middleware) como en la UI (botones y links ocultos si el usuario no tiene el permiso correspondiente).

## Instalación

```bash
# Clonar e instalar dependencias
composer install
npm install

# Configurar entorno
cp .env.example .env
php artisan key:generate
# completar las credenciales de base de datos en .env

# Base de datos
php artisan migrate:fresh --seed

# Generar rutas tipadas de Wayfinder
php artisan wayfinder:generate

# Levantar en desarrollo
composer run dev
# (o por separado: php artisan serve  /  npm run dev)
```

El seeder crea un usuario Admin de prueba:

- **Email**: `admin@inventario.test`
- **Password**: `password`

> Cambiar esta contraseña antes de usar el sistema en un entorno real.

## Estructura relevante del frontend

```
resources/js/
├── pages/            # Páginas Inertia (Equipment, Brands, Users, dashboard, auth/)
├── layouts/           # app-layout.tsx, auth-layout.tsx
├── components/ui/    # Componentes shadcn/ui
├── routes/            # Rutas tipadas generadas por Wayfinder
└── types/             # Tipos TypeScript compartidos (inventory.ts, users.ts, etc.)
```

Los componentes de página no envuelven manualmente el layout: exportan el JSX y asignan `Componente.layout = { breadcrumbs: [...] }` como propiedad estática; el layout correcto se aplica automáticamente según el nombre de la página.

## Despliegue

Recomendado: **Railway** (contenedor persistente, base de datos MySQL/Postgres integrada, apto para el modelo monolítico de Laravel + Inertia). Vercel no es una buena opción para este proyecto por estar orientado a frontend estático/funciones serverless de corta duración, incompatibles con el modelo de proceso persistente que requiere Laravel.

## Próximos pasos posibles

- Pantalla de historial/auditoría de cambios por equipo.
- Notificaciones cuando un equipo pasa a "En reparación" o "De baja".
- Carga masiva de equipos vía importación de Excel.
