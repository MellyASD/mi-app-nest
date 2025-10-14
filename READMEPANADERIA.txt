README_PANADERIA

 Módulo Panadería

Este módulo gestiona los productos y combos disponibles en la panadería, incluyendo precios dinámicos y nombres automáticos.

---

 Estructura

- `src/modules/Panaderia/`: Controlador y servicio de combos
- `src/entities/product.entity.ts`: Entidad `Product`
- `src/entities/combo.entity.ts`: Entidad `Combo` (ManyToMany con `Product`)
- `src/migrations/PanaderiaInitSchema.ts`: Migraciones del módulo

---
 Migraciones con TypeORM CLI (v0.3.x)

Este proyecto usa TypeORM CLI con configuración en `typeorm.config.ts` (TypeScript), y rutas alias habilitadas vía `tsconfig-paths`.

 Generar migración

bash
npx ts-node -r tsconfig-paths ./node_modules/typeorm/cli.js migration:generate src/migrations/PanaderiaInitSchema -d typeorm.config.ts


 Ejecutar migración
npx ts-node -r tsconfig-paths ./node_modules/typeorm/cli.js migration:run -d typeorm.config.ts


 Revertir migración
npx ts-node -r tsconfig-paths ./node_modules/typeorm/cli.js migration:revert -d typeorm.config.ts


 Endpoints principales
- GET /products: Lista todos los productos
- POST /products: Crea un nuevo producto
- GET /combos: Lista todos los combos
- POST /combos: Crea un combo con productos relacionados
- DELETE /combos or prodcuts: Eliminar productos y combos

Configuración .env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_clave
DB_NAME=mi_app_nest




