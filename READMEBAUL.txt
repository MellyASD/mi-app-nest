# 🧰 Módulo Baúl

Este módulo gestiona los ítems disponibles en el inventario del juego, incluyendo atributos, restricciones y relaciones con roles.

---

## 📁 Estructura

- `src/modules/chest-re2/`: Controlador y servicio del baúl
- `src/entities/item.entity.ts`: Entidad `Item`
- `src/entities/role.entity.ts`: Entidad `Role` (ManyToMany con `Item`)
- `src/migrations/BaulInitSchema.ts`: Migraciones del módulo

---

## ⚙️ Migraciones con TypeORM CLI (v0.3.x)

Este proyecto usa TypeORM CLI con configuración en `typeorm.config.ts` (TypeScript), y rutas alias habilitadas vía `tsconfig-paths`.

### 🧪 Generar migración

```bash
npx ts-node -r tsconfig-paths ./node_modules/typeorm/cli.js migration:generate src/migrations/BaulInitSchema -d typeorm.config.ts

Ejecutar migracion
npx ts-node -r tsconfig-paths ./node_modules/typeorm/cli.js migration:run -d typeorm.config.ts

Revertir migración
npx ts-node -r tsconfig-paths ./node_modules/typeorm/cli.js migration:revert -d typeorm.config.ts

Endpoints principales:
- GET /items: Lista todos los ítems
- POST /items: Crea un nuevo ítem
- GET /roles: Lista todos los roles
- POST /roles: Crea un nuevo rol
- GET /roles/:id/items: Lista los ítems asignados a un rol

Configuración .env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_clave
DB_NAME=mi_app_nest


