# 🛒 TechStore - E-commerce Full-Stack Project

> **⚠️ DEPRECATED**: This single-file documentation has been restructured for
> better organization.\
> **Please use the new modular documentation structure starting with
> [`TechStore-Overview.md`](./TechStore-Overview.md)**

---

## 🔄 **Migration Notice**

This comprehensive project specification has been broken down into focused,
manageable documents:

- **[📋 Project Overview](./TechStore-Overview.md)** - Start here for project
  introduction
- **[🚀 Technology Stack](./TechStore-Stack.md)** - Complete tech stack details
- **[📁 Architecture](./TechStore-Architecture.md)** - Project structure and
  patterns
- **[🗃️ Database Design](./TechStore-Database.md)** - Schema and database
  architecture
- **[📅 Development Phases](./TechStore-Phases.md)** - Structured development
  approach
- **[🎯 Evaluation Criteria](./TechStore-Evaluation.md)** - Assessment framework

---

## 💡 **Why This Change?**

**Benefits of the new structure:**

- **Easier Navigation** - Find specific information quickly
- **Better Maintenance** - Update individual sections without affecting others
- **Clearer Focus** - Each document has a specific purpose
- **Scalable Documentation** - Add new sections without bloating core files
- **Team Collaboration** - Multiple people can work on different sections

---

## 🚀 **Quick Migration Guide**

1. **Start with Overview** - [`TechStore-Overview.md`](./TechStore-Overview.md)
2. **Review Stack** - [`TechStore-Stack.md`](./TechStore-Stack.md)
3. **Understand Architecture** -
   [`TechStore-Architecture.md`](./TechStore-Architecture.md)
4. **Study Database** - [`TechStore-Database.md`](./TechStore-Database.md)
5. **Plan Development** - [`TechStore-Phases.md`](./TechStore-Phases.md)
6. **Review Evaluation** -
   [`TechStore-Evaluation.md`](./TechStore-Evaluation.md)

---

_This file will be removed in a future update. Please update your bookmarks and
references to use the new modular documentation._

---

## **🚀 Stack Tecnológico**

### **Core**

- **Deno 2.x** - Runtime con TypeScript nativo
- **Fresh 2.0** - Framework SSR con Islands Architecture
- **TypeScript** - Tipado estático
- **PostgreSQL** - Base de datos (Supabase para cloud)

### **Frontend**

- **Preact** - Biblioteca de componentes
- **Tailwind CSS** - Framework de utilidades CSS
- **Fresh Islands** - Hidratación selectiva
- **Lucide Preact** - Iconos

### **Backend & Utilidades**

- **Postgres Driver** - Cliente oficial Deno
- **Zod** - Validación de esquemas
- **Fresh Sessions** - Manejo de sesiones
- **Date-fns** - Manipulación de fechas

### **Security & Performance**

- **Bcrypt** - Hash de contraseñas seguro
- **Fresh CSRF** - Protección contra CSRF
- **Redis** - Cache y sesiones distribuidas
- **JWT** - Tokens de autenticación
- **Rate Limiter** - Protección contra ataques DoS

### **Testing & Quality**

- **Deno Test** - Framework de testing nativo
- **Puppeteer** - Tests E2E automatizados
- **MSW** - Mock Service Worker para API mocking
- **Coverage** - Análisis de cobertura de código

---

## **📁 Estructura del Proyecto**

```
techstore/
├── routes/                    # Páginas SSR + API Routes
│   ├── index.tsx             # 🏠 Homepage
│   ├── products/
│   │   ├── index.tsx         # 📦 Catálogo de productos
│   │   └── [id].tsx          # 🔍 Detalle de producto
│   ├── cart.tsx              # 🛒 Carrito de compras
│   ├── checkout.tsx          # 💳 Proceso de compra
│   ├── orders/
│   │   └── [id].tsx          # 📋 Detalle de pedido
│   ├── admin/
│   │   ├── index.tsx         # 🏢 Dashboard admin
│   │   ├── products.tsx      # 📝 Gestión productos
│   │   └── orders.tsx        # 📊 Gestión pedidos
│   └── api/                  # 🔧 API REST Backend
│       ├── products.ts       # CRUD productos
│       ├── cart.ts           # Manejo carrito
│       ├── orders.ts         # Crear/consultar pedidos
│       └── auth.ts           # Autenticación
├── islands/                  # ⚡ Componentes Interactivos
│   ├── AddToCartButton.tsx   # Agregar al carrito
│   ├── SearchBar.tsx         # Búsqueda en vivo
│   ├── CartCounter.tsx       # Contador items carrito
│   ├── ProductForm.tsx       # Formulario admin productos
│   └── LoginForm.tsx         # Formulario login
├── components/               # 🎨 Componentes Estáticos
│   ├── Layout.tsx            # Layout principal
│   ├── Header.tsx            # Navegación
│   ├── Footer.tsx            # Pie de página
│   ├── ProductCard.tsx       # Tarjeta de producto
│   ├── OrderSummary.tsx      # Resumen de pedido
│   └── AdminNav.tsx          # Navegación admin
├── lib/                      # 🛠️ Lógica Backend
│   ├── db/
│   │   ├── connection.ts     # Conexión PostgreSQL
│   │   ├── products.ts       # Queries productos
│   │   ├── orders.ts         # Queries pedidos
│   │   ├── users.ts          # Queries usuarios
│   │   └── migrations.ts     # Scripts de migración
│   ├── schemas/
│   │   ├── product.ts        # Validación productos
│   │   ├── order.ts          # Validación pedidos
│   │   └── user.ts           # Validación usuarios
│   ├── middleware/           # 🔒 Middleware de Seguridad
│   │   ├── auth.ts           # Autenticación JWT
│   │   ├── rateLimit.ts      # Rate limiting
│   │   ├── csrf.ts           # Protección CSRF
│   │   ├── security.ts       # Headers de seguridad
│   │   └── validation.ts     # Validación centralizada
│   ├── cache/                # ⚡ Sistema de Cache
│   │   ├── redis.ts          # Configuración Redis
│   │   ├── strategies.ts     # Estrategias de cache
│   │   └── invalidation.ts   # Invalidación automática
│   ├── utils/
│   │   ├── auth.ts           # Utilidades autenticación
│   │   ├── session.ts        # Manejo sesiones
│   │   ├── format.ts         # Formateo datos
│   │   ├── logger.ts         # Sistema de logging
│   │   ├── errors.ts         # Manejo de errores
│   │   └── imageUpload.ts    # Subida y validación imágenes
│   └── types/
│       └── index.ts          # Tipos TypeScript
├── tests/                    # 🧪 Suite de Testing
│   ├── unit/                 # Tests unitarios
│   │   ├── products.test.ts  # Tests productos
│   │   ├── orders.test.ts    # Tests pedidos
│   │   ├── auth.test.ts      # Tests autenticación
│   │   └── utils.test.ts     # Tests utilidades
│   ├── integration/          # Tests de integración
│   │   ├── api.test.ts       # Tests API routes
│   │   ├── db.test.ts        # Tests base de datos
│   │   └── auth.test.ts      # Tests flujo autenticación
│   ├── e2e/                  # Tests end-to-end
│   │   ├── shopping.test.ts  # Flujo de compra completo
│   │   ├── admin.test.ts     # Panel administrativo
│   │   └── auth.test.ts      # Flujos de usuario
│   ├── fixtures/             # Datos de prueba
│   │   └── testData.ts       # Mock data para tests
│   └── helpers/              # Utilidades de testing
│       └── testUtils.ts      # Helpers comunes
├── static/                   # 📁 Assets Estáticos
│   ├── images/
│   │   └── products/         # Imágenes de productos
│   └── favicon.ico
├── docs/                     # 📚 Documentación
│   ├── API.md                # Documentación API
│   ├── DEPLOYMENT.md         # Guía de despliegue
│   ├── SECURITY.md           # Guías de seguridad
│   └── TESTING.md            # Estrategias de testing
├── .github/                  # ⚙️ GitHub Workflows
│   └── workflows/
│       ├── ci.yml            # Integración continua
│       ├── deploy.yml        # Despliegue automático
│       └── security.yml      # Análisis de seguridad
├── fresh.config.ts           # Configuración Fresh
├── deno.json                 # Configuración Deno
├── .env.example              # Variables de entorno ejemplo
├── docker-compose.yml        # Configuración Docker local
└── README.md
```

---

## **🗃️ Esquema de Base de Datos**

### **Tablas Principales**

```sql
-- Categorías
categories:
├── id (SERIAL PRIMARY KEY)
├── name (VARCHAR(100))
├── description (TEXT)
└── created_at (TIMESTAMP)

-- Productos
products:
├── id (SERIAL PRIMARY KEY)
├── name (VARCHAR(200))
├── description (TEXT)
├── price (DECIMAL(10,2))
├── stock (INTEGER)
├── category_id (INTEGER FK)
├── image_url (VARCHAR(500))
├── is_active (BOOLEAN)
└── created_at (TIMESTAMP)

-- Usuarios
users:
├── id (SERIAL PRIMARY KEY)
├── email (VARCHAR(255) UNIQUE)
├── password_hash (VARCHAR(255))
├── name (VARCHAR(100))
├── role (ENUM: 'user', 'admin')
└── created_at (TIMESTAMP)

-- Pedidos
orders:
├── id (SERIAL PRIMARY KEY)
├── user_id (INTEGER FK)
├── total (DECIMAL(10,2))
├── status (ENUM: 'pending', 'completed', 'cancelled')
├── shipping_address (TEXT)
└── created_at (TIMESTAMP)

-- Items del pedido
order_items:
├── id (SERIAL PRIMARY KEY)
├── order_id (INTEGER FK)
├── product_id (INTEGER FK)
├── quantity (INTEGER)
├── unit_price (DECIMAL(10,2))
└── subtotal (DECIMAL(10,2))

-- Carrito temporal (para usuarios no autenticados)
cart_items:
├── id (SERIAL PRIMARY KEY)
├── session_id (VARCHAR(255))  # Para usuarios anónimos
├── user_id (INTEGER FK NULL)  # Para usuarios autenticados
├── product_id (INTEGER FK)
├── quantity (INTEGER)
├── created_at (TIMESTAMP)
└── expires_at (TIMESTAMP)

-- Logs de auditoría
audit_logs:
├── id (SERIAL PRIMARY KEY)
├── table_name (VARCHAR(50))
├── operation (ENUM: 'INSERT', 'UPDATE', 'DELETE')
├── record_id (INTEGER)
├── old_values (JSONB)
├── new_values (JSONB)
├── user_id (INTEGER FK)
├── ip_address (INET)
└── created_at (TIMESTAMP)

-- Configuración del sistema
system_config:
├── id (SERIAL PRIMARY KEY)
├── key (VARCHAR(100) UNIQUE)
├── value (TEXT)
├── description (TEXT)
└── updated_at (TIMESTAMP)
```

### **Índices y Constraints**

```sql
-- Índices para rendimiento
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_session ON cart_items(session_id);
CREATE INDEX idx_cart_user ON cart_items(user_id);
CREATE INDEX idx_audit_table_record ON audit_logs(table_name, record_id);

-- Constraints de seguridad
ALTER TABLE products ADD CONSTRAINT chk_price_positive CHECK (price > 0);
ALTER TABLE products ADD CONSTRAINT chk_stock_non_negative CHECK (stock >= 0);
ALTER TABLE order_items ADD CONSTRAINT chk_quantity_positive CHECK (quantity > 0);
ALTER TABLE order_items ADD CONSTRAINT chk_unit_price_positive CHECK (unit_price > 0);
```

---

## **🎯 Funcionalidades por Implementar**

### **👤 Usuario Final**

- [ ] Ver catálogo de productos con paginación
- [ ] Búsqueda de productos por nombre
- [ ] Filtrar productos por categoría
- [ ] Ver detalle completo del producto
- [ ] Agregar/quitar productos del carrito
- [ ] Ver carrito con total actualizado
- [ ] Proceso de checkout con datos de envío
- [ ] Registro y login de usuarios
- [ ] Ver historial de pedidos

### **🔧 Administrador**

- [ ] Login con credenciales de admin
- [ ] Dashboard con estadísticas básicas
- [ ] CRUD completo de productos
- [ ] Gestión de categorías
- [ ] Ver y gestionar pedidos
- [ ] Actualizar stock de productos

### **⚡ Características Técnicas**

- [ ] SSR para todas las páginas
- [ ] Islands para interactividad específica
- [ ] Validación con Zod en cliente y servidor
- [ ] Manejo de sesiones seguro
- [ ] Responsive design con Tailwind
- [ ] Deploy en Deno Deploy

### **🔒 Seguridad y Performance**

- [ ] Autenticación JWT con refresh tokens
- [ ] Hash de contraseñas con bcrypt
- [ ] Protección CSRF en formularios
- [ ] Rate limiting en API endpoints
- [ ] Validación y sanitización de inputs
- [ ] Cache Redis para productos y sesiones
- [ ] Compresión de imágenes automática
- [ ] Headers de seguridad (HSTS, CSP, etc.)

### **🧪 Testing y Calidad**

- [ ] Tests unitarios (≥80% cobertura)
- [ ] Tests de integración para API
- [ ] Tests E2E para flujos críticos
- [ ] Linting y formateo automático
- [ ] CI/CD con GitHub Actions
- [ ] Análisis de vulnerabilidades
- [ ] Monitoring y alertas básicas
- [ ] Performance testing

### **📊 Monitoreo y Analytics**

- [ ] Logging estructurado
- [ ] Métricas de negocio (ventas, conversión)
- [ ] Health checks automáticos
- [ ] Error tracking y alertas
- [ ] Performance monitoring

---

## **📅 Fases de Desarrollo**

### **Fase 1: Fundamentos y Configuración**

- Setup inicial del proyecto (Deno, Fresh, estructura)
- Configuración de base de datos y migraciones
- Setup de middleware de seguridad y validación
- Implementación de sistema de logging y error handling
- Catálogo de productos (listado básico)

### **Fase 2: Core Features y Seguridad**

- Detalle de productos y búsqueda
- Sistema de carrito con persistencia
- Autenticación JWT completa (login/register/refresh)
- Proceso de checkout con validaciones
- Sistema de pedidos y confirmaciones

### **Fase 3: Admin Panel y Testing**

- Dashboard administrativo con métricas
- CRUD de productos con upload de imágenes
- Gestión de pedidos y usuarios
- Setup de testing (unit + integration)
- Tests E2E para flujos críticos

### **Fase 4: Performance, Deployment y Documentación**

- Implementación de cache y optimizaciones
- CI/CD setup y análisis de seguridad
- Deployment a Deno Deploy + monitoreo
- Documentación técnica completa
- Code review final y presentación

---

## **🎯 Criterios de Evaluación**

### **Funcionalidad (25%)**

- ✅ Todas las features funcionan correctamente
- ✅ Flujos de usuario completos (compra end-to-end)
- ✅ Panel administrativo operativo
- ✅ Manejo correcto de edge cases

### **Código y Arquitectura (25%)**

- ✅ Código limpio y bien estructurado
- ✅ Separación clara de responsabilidades
- ✅ Uso correcto de TypeScript
- ✅ Patrones de diseño apropiados

### **Seguridad y Performance (25%)**

- ✅ Autenticación robusta implementada
- ✅ Validación de inputs completa
- ✅ Performance optimizada (cache, lazy loading)
- ✅ Headers de seguridad configurados

### **Testing y Calidad (25%)**

- ✅ Cobertura de tests ≥80%
- ✅ Tests E2E para flujos críticos
- ✅ CI/CD funcional
- ✅ Documentación técnica completa

---

## **🎓 Objetivos de Aprendizaje Ampliados**

### **Conceptos Técnicos Core**

- **Modern Web Architecture**: SSR + Islands + Progressive Enhancement
- **Full-Stack Integration**: API design, state management, data flow
- **Database Design**: Relational modeling, query optimization, indexing
- **TypeScript Avanzado**: Utility types, generics, conditional types

### **Seguridad y Best Practices**

- **Authentication & Authorization**: JWT, refresh tokens, role-based access
- **Data Validation**: Input sanitization, schema validation, XSS prevention
- **Security Headers**: CSP, HSTS, CSRF protection
- **Error Handling**: Graceful degradation, user-friendly messages

### **Performance y Escalabilidad**

- **Caching Strategies**: Redis, CDN, browser caching
- **Database Optimization**: Query optimization, connection pooling
- **Code Splitting**: Islands architecture, lazy loading
- **Monitoring**: Performance metrics, error tracking

### **Testing y Quality Assurance**

- **Testing Pyramid**: Unit, integration, E2E testing strategies
- **Test-Driven Development**: Writing testable code, mocking
- **Code Quality**: Linting, formatting, static analysis
- **CI/CD**: Automated testing, deployment pipelines

### **DevOps y Deployment**

- **Environment Management**: Development, staging, production
- **Containerization**: Docker, environment variables
- **Cloud Deployment**: Deno Deploy, environment configuration
- **Monitoring & Logging**: Structured logging, alerting, health checks

### **Soft Skills Desarrolladas**

- **Problem Solving**: Debugging complex issues, architectural decisions
- **Code Review**: Peer review, constructive feedback
- **Documentation**: Technical writing, API documentation
- **Project Management**: Task breakdown, milestone tracking

---

## **📋 Hitos y Objetivos por Fase**

### **Fase 1 Milestones:**

- [ ] Database setup with migrations
- [ ] Products CRUD API complete
- [ ] Product listing page functional
- [ ] Product detail page with routing

### **Fase 2 Milestones:**

- [ ] Cart functionality (add/remove/persist)
- [ ] User authentication flow
- [ ] Checkout process with validation
- [ ] Order creation and confirmation

### **Fase 3 Milestones:**

- [ ] Admin dashboard with statistics
- [ ] Admin product management
- [ ] Order management interface
- [ ] Comprehensive test coverage

### **Fase 4 Milestones:**

- [ ] Performance optimizations implemented
- [ ] CI/CD pipeline operational
- [ ] Production deployment successful
- [ ] Complete technical documentation

---

## **📋 Templates de Código**

### **Security Middleware Example**

```typescript
// lib/middleware/security.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const securityHeaders = (
  req: Request,
  ctx: MiddlewareHandlerContext,
) => {
  const response = ctx.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'",
  );

  return response;
};
```

### **Cache Strategy Example**

```typescript
// lib/cache/strategies.ts
export const cacheStrategies = {
  products: { ttl: 3600, tags: ["products"] },
  categories: { ttl: 86400, tags: ["categories"] },
  userSessions: { ttl: 1800, tags: ["auth"] },
} as const;

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  strategy: keyof typeof cacheStrategies,
): Promise<T> {
  // Implementation...
}
```

### **Error Handling Example**

```typescript
// lib/utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (error: unknown): Response => {
  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({ error: error.message, code: error.code }),
      { status: error.statusCode },
    );
  }

  console.error("Unexpected error:", error);
  return new Response(
    JSON.stringify({ error: "Internal server error" }),
    { status: 500 },
  );
};
```

---

## **🚀 Checklist de Finalización**

### **Funcionalidad Core**

- [ ] Usuario puede navegar productos y categorías
- [ ] Carrito funciona para usuarios anónimos y autenticados
- [ ] Proceso de checkout completo con validación
- [ ] Sistema de autenticación robusto
- [ ] Panel administrativo completamente funcional

### **Seguridad**

- [ ] Contraseñas hasheadas con bcrypt
- [ ] Tokens JWT con expiración y refresh
- [ ] Protección CSRF implementada
- [ ] Rate limiting en endpoints críticos
- [ ] Validación exhaustiva de inputs

### **Performance**

- [ ] Cache implementado para datos frecuentes
- [ ] Imágenes optimizadas y comprimidas
- [ ] Lazy loading en componentes pesados
- [ ] Database queries optimizadas

### **Testing**

- [ ] Cobertura de tests ≥80%
- [ ] Tests E2E para flujos de compra
- [ ] CI/CD pipeline funcionando
- [ ] Tests de seguridad automatizados

### **Deployment y Documentación**

- [ ] Aplicación deployada en Deno Deploy
- [ ] Variables de entorno configuradas
- [ ] Documentación API completa
- [ ] README con instrucciones de setup

---
