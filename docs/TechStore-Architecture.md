# 📁 TechStore - Project Architecture

## **Project Structure Overview**

```
techstore/
├── routes/                    # 🌐 SSR Pages + API Routes
├── islands/                   # ⚡ Interactive Components
├── components/                # 🎨 Static Components
├── lib/                       # 🛠️ Business Logic & Utilities
├── tests/                     # 🧪 Testing Suite
├── static/                    # 📁 Static Assets
├── docs/                      # 📚 Documentation
├── .github/                   # ⚙️ CI/CD Workflows
└── config files               # ⚙️ Configuration
```

---

## **Detailed Directory Structure**

### **🌐 Routes (Pages & API)**

```
routes/
├── index.tsx                  # Homepage with featured products
├── products/
│   ├── index.tsx             # Product catalog with filters
│   └── [id].tsx              # Individual product details
├── cart.tsx                   # Shopping cart management
├── checkout.tsx               # Checkout process
├── orders/
│   └── [id].tsx              # Order confirmation & tracking
├── admin/                     # Administrative interface
│   ├── index.tsx             # Admin dashboard
│   ├── products.tsx          # Product management
│   └── orders.tsx            # Order management
└── api/                       # REST API endpoints
    ├── products.ts           # Products CRUD operations
    ├── cart.ts               # Cart management
    ├── orders.ts             # Order processing
    └── auth.ts               # Authentication endpoints
```

### **⚡ Islands (Interactive Components)**

```
islands/
├── AddToCartButton.tsx        # Product purchase interaction
├── SearchBar.tsx              # Real-time product search
├── CartCounter.tsx            # Cart item counter
├── ProductForm.tsx            # Admin product form
├── LoginForm.tsx              # User authentication
├── CategoryFilter.tsx         # Product filtering
└── OrderStatusTracker.tsx     # Order status updates
```

### **🎨 Components (Static UI)**

```
components/
├── Layout.tsx                 # Main application layout
├── Header.tsx                 # Navigation header
├── Footer.tsx                 # Site footer
├── ProductCard.tsx            # Product display card
├── OrderSummary.tsx           # Order details summary
├── AdminNav.tsx               # Admin navigation
├── ErrorBoundary.tsx          # Error handling component
└── LoadingSpinner.tsx         # Loading states
```

### **🛠️ Library (Business Logic)**

```
lib/
├── db/                        # Database layer
│   ├── connection.ts         # PostgreSQL connection
│   ├── products.ts           # Product queries
│   ├── orders.ts             # Order queries
│   ├── users.ts              # User queries
│   └── migrations.ts         # Database migrations
├── schemas/                   # Validation schemas
│   ├── product.ts            # Product validation
│   ├── order.ts              # Order validation
│   └── user.ts               # User validation
├── middleware/                # Security & processing
│   ├── auth.ts               # JWT authentication
│   ├── rateLimit.ts          # Rate limiting
│   ├── csrf.ts               # CSRF protection
│   ├── security.ts           # Security headers
│   └── validation.ts         # Input validation
├── cache/                     # Caching system
│   ├── redis.ts              # Redis configuration
│   ├── strategies.ts         # Cache strategies
│   └── invalidation.ts       # Cache invalidation
├── utils/                     # Utility functions
│   ├── auth.ts               # Auth utilities
│   ├── session.ts            # Session management
│   ├── format.ts             # Data formatting
│   ├── logger.ts             # Structured logging
│   ├── errors.ts             # Error handling
│   └── imageUpload.ts        # Image processing
└── types/
    └── index.ts              # TypeScript definitions
```

### **🧪 Testing Suite**

```
tests/
├── unit/                      # Unit tests
│   ├── products.test.ts      # Product logic tests
│   ├── orders.test.ts        # Order logic tests
│   ├── auth.test.ts          # Authentication tests
│   └── utils.test.ts         # Utility function tests
├── integration/               # Integration tests
│   ├── api.test.ts           # API endpoint tests
│   ├── db.test.ts            # Database integration
│   └── auth.test.ts          # Auth flow tests
├── e2e/                       # End-to-end tests
│   ├── shopping.test.ts      # Complete purchase flow
│   ├── admin.test.ts         # Admin functionality
│   └── auth.test.ts          # User authentication
├── fixtures/                  # Test data
│   └── testData.ts           # Mock data sets
└── helpers/                   # Test utilities
    └── testUtils.ts          # Common test helpers
```

---

## **Architectural Patterns**

### **🏗️ Islands Architecture**

```typescript
// Static page with interactive islands
export default function ProductPage({ product }: PageProps) {
  return (
    <Layout>
      <ProductDetails product={product} />
      {/* Interactive island */}
      <AddToCartButton productId={product.id} />
      <ProductReviews reviews={product.reviews} />
    </Layout>
  );
}
```

### **🔄 Data Flow Pattern**

```
User Action → Island Component → API Route → Database → Response → UI Update
```

### **🛡️ Security Layers**

```
Request → Rate Limiting → CSRF Check → Authentication → Authorization → Handler
```

---

## **Component Organization**

### **📱 Page Components (Routes)**

- **Server-side rendered** by default
- **SEO optimized** with meta tags
- **Minimal JavaScript** for fast loading
- **Progressive enhancement** with islands

### **⚡ Island Components**

- **Client-side interactive** elements only
- **Lazy loaded** when needed
- **State management** for user interactions
- **Event handling** and API calls

### **🎨 Static Components**

- **Presentation only** components
- **No client-side JavaScript**
- **Reusable UI elements**
- **Optimized for SSR**

---

## **API Design Pattern**

### **RESTful Endpoints**

```typescript
// Example API structure
GET    /api/products          # List products
GET    /api/products/:id      # Get product details
POST   /api/products          # Create product (admin)
PUT    /api/products/:id      # Update product (admin)
DELETE /api/products/:id      # Delete product (admin)

POST   /api/cart/add          # Add to cart
GET    /api/cart              # Get cart contents
PUT    /api/cart/:id          # Update cart item
DELETE /api/cart/:id          # Remove from cart

POST   /api/orders            # Create order
GET    /api/orders/:id        # Get order details
PUT    /api/orders/:id        # Update order status (admin)
```

### **Response Format**

```typescript
// Standardized API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}
```

---

## **State Management Strategy**

### **Server State**

- **Database** as source of truth
- **Redis cache** for performance
- **Session storage** for user state

### **Client State**

- **Preact Signals** for reactive updates
- **Local storage** for cart persistence
- **URL state** for filters and pagination

### **State Synchronization**

- **Optimistic updates** for better UX
- **Error rollback** on failed operations
- **Cache invalidation** on mutations

---

## **File Naming Conventions**

### **Components**

- **PascalCase** for component files: `ProductCard.tsx`
- **camelCase** for utility files: `formatPrice.ts`
- **kebab-case** for static assets: `product-placeholder.jpg`

### **Routes**

- **Dynamic routes**: `[id].tsx`, `[slug].tsx`
- **Nested routes**: `products/[id].tsx`
- **API routes**: `api/products.ts`

### **Tests**

- **Unit tests**: `product.test.ts`
- **Integration tests**: `api.integration.test.ts`
- **E2E tests**: `shopping.e2e.test.ts`

---

## **Configuration Files**

### **Core Configuration**

```
├── fresh.config.ts           # Fresh framework config
├── deno.json                 # Deno runtime config
├── tailwind.config.js        # Tailwind CSS config
├── .env.example              # Environment variables template
└── docker-compose.yml        # Local development setup
```

### **CI/CD Configuration**

```
.github/workflows/
├── ci.yml                    # Continuous integration
├── deploy.yml                # Production deployment
└── security.yml              # Security scanning
```

---

## **Development Workflow**

### **Local Development**

1. **Clone repository** and install dependencies
2. **Setup database** with migrations
3. **Configure environment** variables
4. **Start development server** with hot reload
5. **Run tests** continuously during development

### **Code Organization**

- **Feature-based** grouping when possible
- **Separation of concerns** between layers
- **Clear dependencies** between modules
- **Consistent patterns** across codebase

### **Performance Considerations**

- **Code splitting** by route and feature
- **Lazy loading** for non-critical components
- **Optimized imports** to reduce bundle size
- **Efficient re-renders** with proper memoization
