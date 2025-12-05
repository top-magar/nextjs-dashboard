# Architecture Diagrams
## Multi-Tenant SaaS E-commerce Platform

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Vendor     │  │   Customer   │  │    Admin     │         │
│  │  Dashboard   │  │    Store     │  │    Portal    │         │
│  │  (Next.js)   │  │  (Next.js)   │  │  (Next.js)   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
┌─────────────────────────────┼─────────────────────────────────┐
│                    APPLICATION LAYER                           │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              Next.js App Router (SSR/SSG)                 │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Middleware (Auth, RBAC, Tenant Isolation)               │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Product   │  │    Order    │  │   Payment   │           │
│  │   Service   │  │   Service   │  │   Service   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │    File     │  │    Auth     │  │  Analytics  │           │
│  │   Service   │  │   Service   │  │   Service   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────┼─────────────────────────────────┐
│                      DATA LAYER                                │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │         PostgreSQL (Vercel Postgres)                      │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │ │
│  │  │  Vendors   │  │  Products  │  │   Orders   │         │ │
│  │  │  (RLS)     │  │   (RLS)    │  │   (RLS)    │         │ │
│  │  └────────────┘  └────────────┘  └────────────┘         │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │ │
│  │  │  Payments  │  │ Downloads  │  │   Users    │         │ │
│  │  │   (RLS)    │  │   (RLS)    │  │            │         │ │
│  │  └────────────┘  └────────────┘  └────────────┘         │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┼─────────────────────────────────┐
│                   EXTERNAL SERVICES                            │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   AWS S3    │  │   Khalti    │  │   eSewa     │           │
│  │  (Storage)  │  │  (Payment)  │  │  (Payment)  │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │  FonePay    │  │  SendGrid   │  │   Sentry    │           │
│  │  (Payment)  │  │   (Email)   │  │ (Monitoring)│           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Navigation Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    NAVIGATION SYSTEM                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      VENDOR DASHBOARD                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌────────────────────────────────────────┐  │
│  │              │  │         TOP HEADER                      │  │
│  │   SIDEBAR    │  │  ┌──────┐ ┌────────┐ ┌──────┐ ┌─────┐ │  │
│  │              │  │  │Toggle│ │ Search │ │ Bell │ │User │ │  │
│  │ ┌──────────┐ │  │  └──────┘ └────────┘ └──────┘ └─────┘ │  │
│  │ │  Store   │ │  └────────────────────────────────────────┘  │
│  │ │ Switcher │ │                                               │
│  │ └──────────┘ │  ┌────────────────────────────────────────┐  │
│  │              │  │                                         │  │
│  │ ┌──────────┐ │  │                                         │  │
│  │ │Dashboard │ │  │          MAIN CONTENT                   │  │
│  │ └──────────┘ │  │                                         │  │
│  │ ┌──────────┐ │  │                                         │  │
│  │ │Products  │ │  │                                         │  │
│  │ │  ├─All   │ │  │                                         │  │
│  │ │  ├─Add   │ │  │                                         │  │
│  │ │  └─Cat   │ │  │                                         │  │
│  │ └──────────┘ │  │                                         │  │
│  │ ┌──────────┐ │  │                                         │  │
│  │ │Orders    │ │  │                                         │  │
│  │ └──────────┘ │  │                                         │  │
│  │ ┌──────────┐ │  │                                         │  │
│  │ │Customers │ │  │                                         │  │
│  │ └──────────┘ │  │                                         │  │
│  │ ┌──────────┐ │  │                                         │  │
│  │ │Analytics │ │  │                                         │  │
│  │ └──────────┘ │  │                                         │  │
│  │              │  └────────────────────────────────────────┘  │
│  │ ┌──────────┐ │                                               │
│  │ │Settings  │ │  ┌────────────────────────────────────────┐  │
│  │ └──────────┘ │  │      MOBILE BOTTOM NAV (< 768px)       │  │
│  │              │  │  [Home] [Products] [Orders] [Account]  │  │
│  └──────────────┘  └────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER STOREFRONT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  [Logo]  Products  Collections  About  [Search] [Cart] [👤]│ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │                    STORE CONTENT                            │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  About | Contact | Returns | Shipping | Social | Newsletter│ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN PORTAL                                │
├─────────────────────────────────────────────────────────────────┤
│  (Similar to Vendor Dashboard but with different theme & items) │
│  - Vendors Management                                            │
│  - Platform Analytics                                            │
│  - Content Management                                            │
│  - Payment Oversight                                             │
│  - System Settings                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Flow: Product Purchase

```
┌─────────────────────────────────────────────────────────────────┐
│                    PURCHASE FLOW                                 │
└─────────────────────────────────────────────────────────────────┘

Customer                Store              API              Payment         S3
   │                     │                  │               Gateway         │
   │  1. Browse Products │                  │                  │            │
   ├────────────────────>│                  │                  │            │
   │                     │                  │                  │            │
   │  2. Add to Cart     │                  │                  │            │
   ├────────────────────>│                  │                  │            │
   │                     │                  │                  │            │
   │  3. Checkout        │                  │                  │            │
   ├────────────────────>│                  │                  │            │
   │                     │                  │                  │            │
   │                     │  4. Create Order │                  │            │
   │                     ├─────────────────>│                  │            │
   │                     │                  │                  │            │
   │                     │  5. Init Payment │                  │            │
   │                     ├─────────────────>│  6. Redirect     │            │
   │                     │                  ├─────────────────>│            │
   │                     │                  │                  │            │
   │  7. Enter Payment Details              │                  │            │
   ├────────────────────────────────────────┼─────────────────>│            │
   │                     │                  │                  │            │
   │                     │                  │  8. Callback     │            │
   │                     │                  │<─────────────────┤            │
   │                     │                  │                  │            │
   │                     │  9. Verify       │                  │            │
   │                     │<─────────────────┤                  │            │
   │                     │                  │                  │            │
   │                     │  10. Update Order│                  │            │
   │                     │     (status=paid)│                  │            │
   │                     │                  │                  │            │
   │                     │  11. Generate    │                  │            │
   │                     │   Download Link  │                  │  12. Pre-  │
   │                     │                  ├──────────────────┼─signed URL │
   │                     │                  │<─────────────────┤            │
   │                     │                  │                  │            │
   │  13. Download Page  │                  │                  │            │
   │<────────────────────┤                  │                  │            │
   │                     │                  │                  │            │
   │  14. Click Download │                  │                  │            │
   ├────────────────────────────────────────┼──────────────────┼───────────>│
   │                     │                  │                  │  15. File  │
   │<───────────────────────────────────────┼──────────────────┼────────────┤
   │                     │                  │                  │            │
```

---

## 4. Multi-Tenant Data Isolation

```
┌─────────────────────────────────────────────────────────────────┐
│                  ROW-LEVEL SECURITY (RLS)                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      PostgreSQL Database                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Products Table                                             │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  id  │ vendor_id │ title      │ price │ file_path         │ │
│  ├──────┼───────────┼────────────┼───────┼───────────────────┤ │
│  │  1   │  vendor-1 │ Template A │ 1000  │ s3://...          │ │
│  │  2   │  vendor-1 │ Template B │ 1500  │ s3://...          │ │
│  │  3   │  vendor-2 │ Logo Pack  │ 2000  │ s3://...          │ │
│  │  4   │  vendor-2 │ Icon Set   │ 1200  │ s3://...          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  RLS Policy: SELECT * FROM products WHERE vendor_id = current_vendor_id()
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Vendor 1 Session (vendor_id = 'vendor-1')                  ││
│  │  Query: SELECT * FROM products                              ││
│  │  Result: Only rows 1, 2 (vendor-1's products)               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Vendor 2 Session (vendor_id = 'vendor-2')                  ││
│  │  Query: SELECT * FROM products                              ││
│  │  Result: Only rows 3, 4 (vendor-2's products)               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. File Upload Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    FILE UPLOAD FLOW                              │
└─────────────────────────────────────────────────────────────────┘

Vendor              Next.js API          AWS S3           Database
  │                     │                   │                 │
  │  1. Request Upload  │                   │                 │
  ├────────────────────>│                   │                 │
  │                     │                   │                 │
  │                     │  2. Generate      │                 │
  │                     │   Pre-signed URL  │                 │
  │                     ├──────────────────>│                 │
  │                     │<──────────────────┤                 │
  │                     │                   │                 │
  │  3. Upload URL      │                   │                 │
  │<────────────────────┤                   │                 │
  │                     │                   │                 │
  │  4. Upload File (Direct to S3)          │                 │
  ├─────────────────────┼──────────────────>│                 │
  │                     │                   │                 │
  │  5. Upload Complete │                   │                 │
  │<────────────────────┼───────────────────┤                 │
  │                     │                   │                 │
  │  6. Confirm Upload  │                   │                 │
  ├────────────────────>│                   │                 │
  │                     │                   │                 │
  │                     │  7. Save File Reference             │
  │                     ├─────────────────────────────────────>│
  │                     │                   │                 │
  │  8. Success         │                   │                 │
  │<────────────────────┤                   │                 │
  │                     │                   │                 │

Benefits:
- No file passes through Next.js server (saves bandwidth)
- Direct upload to S3 (faster)
- Pre-signed URL expires (secure)
- Server only stores reference (efficient)
```

---

## 6. Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                   COMPONENT TREE                                 │
└─────────────────────────────────────────────────────────────────┘

App
├── Providers
│   ├── ThemeProvider (dark/light mode)
│   ├── SessionProvider (NextAuth)
│   └── NavigationProvider (nav state)
│
├── Layouts
│   ├── DashboardLayout (vendor)
│   │   ├── SidebarProvider
│   │   ├── NavSidebar
│   │   │   ├── StoreSwitcher
│   │   │   ├── NavMenu
│   │   │   │   ├── NavItem
│   │   │   │   └── NavSubMenu
│   │   │   └── NavUser
│   │   ├── SidebarInset
│   │   │   ├── Header
│   │   │   │   ├── SidebarTrigger
│   │   │   │   ├── SearchBar
│   │   │   │   ├── Notifications
│   │   │   │   └── UserMenu
│   │   │   └── MainContent
│   │   └── MobileNav
│   │
│   ├── StoreLayout (customer)
│   │   ├── StoreHeader
│   │   ├── MainContent
│   │   └── StoreFooter
│   │
│   └── AdminLayout (admin)
│       └── (similar to DashboardLayout)
│
├── Pages
│   ├── Dashboard
│   │   ├── Overview
│   │   ├── Products
│   │   │   ├── ProductList
│   │   │   ├── ProductCreate
│   │   │   └── ProductEdit
│   │   ├── Orders
│   │   ├── Customers
│   │   ├── Analytics
│   │   └── Settings
│   │
│   ├── Store
│   │   ├── Homepage
│   │   ├── ProductList
│   │   ├── ProductDetail
│   │   ├── Cart
│   │   └── Checkout
│   │
│   └── Admin
│       ├── Dashboard
│       ├── Vendors
│       ├── Users
│       └── Settings
│
└── Shared Components
    ├── UI (shadcn/ui)
    │   ├── Button
    │   ├── Input
    │   ├── Dialog
    │   ├── Table
    │   └── ...
    │
    ├── Forms
    │   ├── ProductForm
    │   ├── OrderForm
    │   └── SettingsForm
    │
    └── Data Display
        ├── DataTable
        ├── StatsCard
        └── Chart
```

---

## 7. Routing Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROUTE STRUCTURE                               │
└─────────────────────────────────────────────────────────────────┘

src/app/
│
├── (public)/                    # Public routes (no auth)
│   ├── layout.tsx              # Public layout
│   ├── page.tsx                # Landing page
│   ├── stores/
│   │   └── [slug]/             # Store pages
│   │       ├── page.tsx        # Store home
│   │       ├── products/
│   │       │   └── [id]/       # Product detail
│   │       └── about/
│   └── marketplace/            # Browse all stores
│
├── (auth)/                      # Auth routes
│   ├── layout.tsx              # Minimal layout
│   ├── login/
│   │   └── page.tsx
│   └── sign-up/
│       └── page.tsx
│
├── dashboard/                   # Vendor dashboard (auth required)
│   ├── layout.tsx              # Dashboard layout
│   ├── (overview)/
│   │   └── page.tsx            # Dashboard home
│   ├── products/
│   │   ├── page.tsx            # Product list
│   │   ├── create/
│   │   │   └── page.tsx        # Create product
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx    # Edit product
│   ├── orders/
│   │   ├── page.tsx            # Order list
│   │   └── [id]/
│   │       └── page.tsx        # Order detail
│   ├── customers/
│   │   └── page.tsx
│   ├── analytics/
│   │   └── page.tsx
│   ├── store/
│   │   └── page.tsx            # Store settings
│   └── settings/
│       └── page.tsx            # Account settings
│
├── admin/                       # Admin portal (admin only)
│   ├── layout.tsx              # Admin layout
│   ├── dashboard/
│   ├── vendors/
│   ├── users/
│   └── settings/
│
└── api/                         # API routes
    ├── products/
    │   ├── route.ts            # GET, POST /api/products
    │   └── [id]/
    │       └── route.ts        # GET, PATCH, DELETE /api/products/[id]
    ├── orders/
    ├── payments/
    │   ├── khalti/
    │   ├── esewa/
    │   └── fonepay/
    └── upload/
        └── route.ts            # File upload
```

---

## 8. State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Server State (Database)                                         │
│  - Products, Orders, Customers, Vendors                          │
│  - Managed by: PostgreSQL + Prisma/SQL                           │
│  - Accessed via: API routes                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Session State (Auth)                                            │
│  - User info, Role, Vendor ID                                    │
│  - Managed by: NextAuth.js                                       │
│  - Accessed via: useSession() hook                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Client State (React)                                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Navigation State (Context)                                  ││
│  │  - Sidebar open/collapsed                                    ││
│  │  - Mobile menu open                                          ││
│  │  - Active route                                              ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Form State (React Hook Form)                                ││
│  │  - Product form data                                         ││
│  │  - Validation errors                                         ││
│  │  - Submission status                                         ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  UI State (useState)                                         ││
│  │  - Modal open/closed                                         ││
│  │  - Loading states                                            ││
│  │  - Toast notifications                                       ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────┘

Layer 1: Network Security
├── HTTPS/TLS (SSL Certificate)
├── CORS Configuration
└── Rate Limiting

Layer 2: Authentication
├── NextAuth.js (Session Management)
├── bcrypt (Password Hashing)
└── JWT Tokens (Secure, HttpOnly Cookies)

Layer 3: Authorization
├── Middleware (Route Protection)
├── Role-Based Access Control (RBAC)
│   ├── Admin: Full access
│   ├── Vendor: Own data only
│   └── Customer: Public + own orders
└── API Route Guards

Layer 4: Data Isolation
├── Row-Level Security (RLS)
├── Tenant ID in Session
└── Automatic Filtering by vendor_id

Layer 5: File Security
├── S3 Bucket Policies (Private)
├── Pre-signed URLs (Time-limited)
├── File Type Validation
└── Virus Scanning (Optional)

Layer 6: Payment Security
├── PCI-DSS Compliance (via gateways)
├── No card data storage
├── Webhook Signature Verification
└── Transaction Logging

Layer 7: Monitoring
├── Error Tracking (Sentry)
├── Audit Logs
└── Security Alerts
```

---

## 10. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                               │
└─────────────────────────────────────────────────────────────────┘

Developer                GitHub              Vercel            Production
    │                      │                   │                   │
    │  1. Push Code        │                   │                   │
    ├─────────────────────>│                   │                   │
    │                      │                   │                   │
    │                      │  2. Trigger Build │                   │
    │                      ├──────────────────>│                   │
    │                      │                   │                   │
    │                      │  3. Run Tests     │                   │
    │                      │     Build App     │                   │
    │                      │     Optimize      │                   │
    │                      │                   │                   │
    │                      │  4. Deploy        │                   │
    │                      │                   ├──────────────────>│
    │                      │                   │                   │
    │  5. Deployment URL   │                   │                   │
    │<─────────────────────┼───────────────────┤                   │
    │                      │                   │                   │

Environments:
├── Development (localhost:3000)
├── Preview (vercel-preview-*.vercel.app)
└── Production (pasaal.com)

Infrastructure:
├── Vercel (Hosting, CDN, Edge Functions)
├── Vercel Postgres (Database)
├── AWS S3 (File Storage)
└── CloudFlare (DNS, DDoS Protection)
```

---

**Document Version**: 1.0  
**Last Updated**: December 5, 2025  
**Purpose**: Visual reference for system architecture
