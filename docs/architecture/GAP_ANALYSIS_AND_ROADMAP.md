# Gap Analysis & MVP Roadmap
## Multi-Tenant SaaS E-commerce Platform

**Project**: Pasaal - Digital Marketplace for Nepal  
**Timeline**: 60 days to MVP  
**Current Date**: December 5, 2025  
**Target Launch**: February 3, 2026

---

## Executive Summary

**Current State**: Next.js tutorial-based dashboard with basic invoices/customers management  
**Target State**: Full multi-vendor digital marketplace with AI features, payment integration, and store customization

**Critical Path**: Navigation → Products → Orders → Payments → Store Editor → AI Integration

---

## 1. Current State Analysis

### 1.1 What's Working

✅ **Infrastructure**
- Next.js 15 with App Router (modern, performant)
- TypeScript configuration (type safety)
- shadcn/ui component library (comprehensive UI primitives)
- Tailwind CSS with design tokens (themeable)
- NextAuth.js v5 (authentication foundation)
- Vercel Postgres (database connection)
- Dark mode support
- Responsive design foundation

✅ **Components**
- Basic sidebar navigation (2 versions)
- Mobile bottom navigation
- User authentication (login/signup)
- Dashboard layout structure
- Theme toggle
- Form components (React Hook Form + Zod)
- Data tables (@tanstack/react-table)
- Charts (recharts)
- Drag & drop (@dnd-kit)

✅ **Features**
- User authentication flow
- Basic dashboard overview
- Invoices CRUD (placeholder for orders)
- Customers list (placeholder for buyers)

### 1.2 Critical Gaps

❌ **E-commerce Core** (BLOCKING MVP)
- No product management system
- No real order processing
- No shopping cart
- No checkout flow
- No inventory tracking
- No digital product delivery

❌ **Multi-Tenancy** (BLOCKING MVP)
- No vendor/store isolation in database
- No tenant-specific data access
- No store customization
- No multi-store support
- No vendor onboarding flow

❌ **Payments** (BLOCKING MVP)
- No payment gateway integration (Khalti, eSewa, FonePay)
- No payment processing logic
- No transaction records
- No payout system

❌ **File Management** (BLOCKING MVP)
- No S3 integration
- No file upload system
- No secure download links
- No digital asset management

❌ **AI Features** (MVP ENHANCEMENT)
- No OpenAI integration
- No auto-description generation
- No image generation
- No AI-assisted store setup

❌ **Store Editor** (POST-MVP)
- No visual store builder
- No page management
- No theme customization
- No preview/publish workflow

❌ **Admin Portal** (POST-MVP)
- No platform admin interface
- No vendor approval system
- No marketplace oversight
- No platform-wide analytics

### 1.3 Data Model Gaps

**Current Schema** (Tutorial-based):
```sql
users (id, name, email, password)
customers (id, name, email, image_url)
invoices (id, customer_id, amount, date, status)
revenue (month, revenue)
```

**Required Schema** (Marketplace):
```sql
-- Multi-tenancy
vendors (id, user_id, store_name, store_slug, status, created_at)
stores (id, vendor_id, name, slug, domain, theme_config, created_at)

-- Products
products (id, vendor_id, title, description, price, currency, file_path, thumbnail_url, status, created_at)
product_categories (id, name, slug)
product_tags (id, name)

-- Orders
orders (id, vendor_id, customer_id, total, currency, status, payment_status, created_at)
order_items (id, order_id, product_id, quantity, price)

-- Payments
payments (id, order_id, amount, currency, gateway, transaction_id, status, created_at)

-- Digital Delivery
downloads (id, order_id, product_id, download_url, expires_at, downloaded_at)

-- Admin
platform_settings (key, value)
vendor_applications (id, user_id, business_info, status, created_at)
```

---

## 2. Gap Prioritization Matrix

| Feature | Impact | Effort | Priority | MVP Phase |
|---------|--------|--------|----------|-----------|
| **Navigation System** | High | Medium | P0 | Phase 1 |
| **Product Management** | Critical | High | P0 | Phase 2 |
| **Order Processing** | Critical | High | P0 | Phase 3 |
| **Payment Integration** | Critical | High | P0 | Phase 4 |
| **File Upload/S3** | Critical | Medium | P0 | Phase 2 |
| **Multi-tenant DB** | Critical | High | P0 | Phase 1 |
| **Customer Store** | Critical | High | P0 | Phase 5 |
| **Vendor Onboarding** | High | Medium | P1 | Phase 2 |
| **Digital Delivery** | Critical | Medium | P0 | Phase 4 |
| **Analytics Dashboard** | Medium | Medium | P1 | Phase 6 |
| **AI Description Gen** | Low | Medium | P2 | Phase 7 |
| **Store Editor** | Medium | Very High | P2 | Post-MVP |
| **Admin Portal** | Medium | High | P2 | Post-MVP |

**Legend**:
- P0 = Blocking MVP (must have)
- P1 = Important for MVP (should have)
- P2 = Enhancement (nice to have)

---

## 3. 60-Day MVP Roadmap

### Week 1-2: Foundation & Navigation (Dec 5 - Dec 18)

**Goals**: Set up multi-tenant architecture, implement navigation system

**Tasks**:
- [ ] **Database Schema Migration**
  - [ ] Design complete schema (vendors, products, orders, payments)
  - [ ] Create migration scripts
  - [ ] Set up Row-Level Security (RLS) policies
  - [ ] Add `vendor_id` to all tenant-specific tables
  - [ ] Seed test data

- [ ] **Auth Enhancement**
  - [ ] Add `role` field to users (admin, vendor, customer)
  - [ ] Add `vendor_id` to session
  - [ ] Update middleware for role-based access
  - [ ] Create vendor registration flow

- [ ] **Navigation System** (See IMPLEMENTATION_PLAN.md)
  - [ ] Create navigation types and configs
  - [ ] Build sidebar, header, mobile nav components
  - [ ] Implement command palette (⌘K)
  - [ ] Update dashboard layout
  - [ ] Accessibility audit

**Deliverables**:
- ✅ Multi-tenant database schema
- ✅ Role-based authentication
- ✅ Complete navigation system
- ✅ Vendor dashboard layout

**Risks**:
- Database migration complexity
- RLS policy configuration

---

### Week 3-4: Products & File Management (Dec 19 - Jan 1)

**Goals**: Build product management system, integrate S3 for file uploads

**Tasks**:
- [ ] **S3 Integration**
  - [ ] Set up AWS S3 bucket (or compatible)
  - [ ] Configure CORS and bucket policies
  - [ ] Create upload API route (`/api/upload`)
  - [ ] Implement pre-signed URL generation
  - [ ] Add file validation (type, size)

- [ ] **Product Management**
  - [ ] Create product list page (`/dashboard/products`)
  - [ ] Build product creation form (`/dashboard/products/create`)
  - [ ] Implement file upload component
  - [ ] Add product edit page (`/dashboard/products/[id]/edit`)
  - [ ] Create product detail view
  - [ ] Add product categories/tags
  - [ ] Implement product search/filter

- [ ] **API Routes**
  - [ ] `POST /api/products` - Create product
  - [ ] `GET /api/products` - List products (vendor-scoped)
  - [ ] `GET /api/products/[id]` - Get product
  - [ ] `PATCH /api/products/[id]` - Update product
  - [ ] `DELETE /api/products/[id]` - Delete product

**Deliverables**:
- ✅ S3 file upload system
- ✅ Product CRUD functionality
- ✅ Product management UI
- ✅ Product API endpoints

**Risks**:
- S3 configuration complexity
- File upload performance

---

### Week 5-6: Orders & Customers (Jan 2 - Jan 15)

**Goals**: Build order management system, customer tracking

**Tasks**:
- [ ] **Order Management**
  - [ ] Create order list page (`/dashboard/orders`)
  - [ ] Build order detail view
  - [ ] Add order status workflow (pending → paid → fulfilled)
  - [ ] Implement order search/filter
  - [ ] Add order export (CSV)

- [ ] **Customer Management**
  - [ ] Update customer list page
  - [ ] Add customer detail view
  - [ ] Track customer orders
  - [ ] Add customer segments (VIP, new, etc.)

- [ ] **API Routes**
  - [ ] `GET /api/orders` - List orders (vendor-scoped)
  - [ ] `GET /api/orders/[id]` - Get order details
  - [ ] `PATCH /api/orders/[id]` - Update order status
  - [ ] `GET /api/customers` - List customers
  - [ ] `GET /api/customers/[id]` - Get customer details

**Deliverables**:
- ✅ Order management system
- ✅ Customer tracking
- ✅ Order/customer API endpoints

**Risks**:
- Order state management complexity

---

### Week 7-8: Payment Integration (Jan 16 - Jan 29)

**Goals**: Integrate Khalti, eSewa, FonePay payment gateways

**Tasks**:
- [ ] **Payment Gateway Setup**
  - [ ] Register for Khalti merchant account
  - [ ] Register for eSewa merchant account
  - [ ] Register for FonePay merchant account
  - [ ] Store API keys in environment variables

- [ ] **Khalti Integration**
  - [ ] Create Khalti payment initiation endpoint
  - [ ] Implement Khalti callback handler
  - [ ] Add Khalti payment verification
  - [ ] Test with Khalti sandbox

- [ ] **eSewa Integration**
  - [ ] Create eSewa payment initiation endpoint
  - [ ] Implement eSewa callback handler
  - [ ] Add eSewa payment verification
  - [ ] Test with eSewa sandbox

- [ ] **FonePay Integration**
  - [ ] Create FonePay payment initiation endpoint
  - [ ] Implement FonePay callback handler
  - [ ] Add FonePay payment verification
  - [ ] Test with FonePay sandbox

- [ ] **Payment Processing**
  - [ ] Create payment selection UI
  - [ ] Build payment status tracking
  - [ ] Implement webhook handlers
  - [ ] Add payment retry logic
  - [ ] Create payment records in database

- [ ] **Digital Delivery**
  - [ ] Generate secure download links (S3 pre-signed URLs)
  - [ ] Set link expiration (24 hours)
  - [ ] Track download events
  - [ ] Send download email to customer
  - [ ] Implement download page

**Deliverables**:
- ✅ Khalti payment integration
- ✅ eSewa payment integration
- ✅ FonePay payment integration
- ✅ Secure digital delivery system
- ✅ Payment tracking

**Risks**:
- Payment gateway API changes
- Webhook reliability
- Security vulnerabilities

---

### Week 9-10: Customer-Facing Store (Jan 30 - Feb 12)

**Goals**: Build public storefront for customers to browse and purchase

**Tasks**:
- [ ] **Store Frontend**
  - [ ] Create store homepage (`/stores/[slug]`)
  - [ ] Build product listing page
  - [ ] Create product detail page
  - [ ] Add shopping cart
  - [ ] Build checkout flow
  - [ ] Create order confirmation page
  - [ ] Add download page

- [ ] **Store Customization**
  - [ ] Basic theme settings (colors, logo)
  - [ ] Store info (name, description, contact)
  - [ ] Store navigation menu
  - [ ] Footer content

- [ ] **Search & Browse**
  - [ ] Product search
  - [ ] Category filtering
  - [ ] Price filtering
  - [ ] Sort options (price, date, popularity)

- [ ] **Customer Account**
  - [ ] Customer registration
  - [ ] Customer login
  - [ ] Order history
  - [ ] Download history
  - [ ] Profile settings

**Deliverables**:
- ✅ Public storefront
- ✅ Shopping cart & checkout
- ✅ Customer account system
- ✅ Basic store customization

**Risks**:
- SEO optimization
- Performance with many products

---

### Week 11-12: Analytics & Polish (Feb 13 - Feb 26)

**Goals**: Add analytics, testing, bug fixes, launch preparation

**Tasks**:
- [ ] **Analytics Dashboard**
  - [ ] Sales overview (total, trend)
  - [ ] Order statistics
  - [ ] Top products
  - [ ] Customer insights
  - [ ] Revenue charts

- [ ] **Vendor Onboarding**
  - [ ] Multi-step registration wizard
  - [ ] Business info collection
  - [ ] Store setup wizard
  - [ ] Welcome email

- [ ] **Testing**
  - [ ] End-to-end testing (Playwright)
  - [ ] Payment flow testing
  - [ ] Mobile testing (iOS/Android)
  - [ ] Cross-browser testing
  - [ ] Load testing

- [ ] **Polish**
  - [ ] Error handling improvements
  - [ ] Loading states
  - [ ] Empty states
  - [ ] Success/error toasts
  - [ ] Form validation messages
  - [ ] Accessibility fixes

- [ ] **Documentation**
  - [ ] Vendor user guide
  - [ ] Customer help center
  - [ ] API documentation
  - [ ] Deployment guide

- [ ] **Launch Prep**
  - [ ] Set up production environment
  - [ ] Configure domain and SSL
  - [ ] Set up monitoring (Sentry, LogRocket)
  - [ ] Create backup strategy
  - [ ] Prepare marketing materials

**Deliverables**:
- ✅ Analytics dashboard
- ✅ Vendor onboarding flow
- ✅ Comprehensive testing
- ✅ Production deployment
- ✅ Documentation

**Risks**:
- Last-minute bugs
- Performance issues at scale

---

## 4. Post-MVP Roadmap (Phase 2)

### Month 3-4: AI Features & Store Editor

**AI Integration**:
- [ ] OpenAI API integration
- [ ] Auto-generate product descriptions
- [ ] AI-powered store setup
- [ ] Image generation (DALL-E)
- [ ] Content suggestions

**Store Editor**:
- [ ] Visual page builder
- [ ] Drag-drop components
- [ ] Theme customization
- [ ] Preview mode
- [ ] Publish workflow

### Month 5-6: Admin Portal & Advanced Features

**Admin Portal**:
- [ ] Vendor management
- [ ] Platform analytics
- [ ] Content management
- [ ] Payment oversight
- [ ] User management

**Advanced Features**:
- [ ] Multi-store support
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Email marketing
- [ ] Inventory management

---

## 5. Technical Debt & Refactoring

### Immediate (During MVP)
- [ ] Remove old navigation components (dashboard/sidenav.tsx, nav-links.tsx)
- [ ] Consolidate navigation to new system
- [ ] Remove invoice/customer placeholder code
- [ ] Update database schema completely
- [ ] Standardize API response format

### Post-MVP
- [ ] Migrate to tRPC for type-safe APIs
- [ ] Add comprehensive error logging
- [ ] Implement caching strategy (Redis)
- [ ] Add rate limiting
- [ ] Optimize database queries
- [ ] Add database indexes
- [ ] Implement CDN for static assets

---

## 6. Resource Requirements

### Development Team
- **1 Full-Stack Developer** (primary)
- **1 UI/UX Designer** (part-time, weeks 1-4)
- **1 QA Tester** (part-time, weeks 10-12)

### Infrastructure
- **Vercel** (hosting, $20/month)
- **Vercel Postgres** (database, $20/month)
- **AWS S3** (file storage, ~$5/month)
- **OpenAI API** (AI features, ~$50/month)
- **Sentry** (error tracking, free tier)

### Third-Party Services
- **Khalti** (payment gateway, 2-3% fee)
- **eSewa** (payment gateway, 2-3% fee)
- **FonePay** (payment gateway, 2-3% fee)
- **SendGrid** (email, free tier)

**Total Monthly Cost**: ~$100-150 (excluding payment fees)

---

## 7. Risk Mitigation

### High-Risk Items

**1. Payment Gateway Integration**
- **Risk**: API changes, webhook failures, security issues
- **Mitigation**: 
  - Use official SDKs where available
  - Implement comprehensive error handling
  - Add payment retry logic
  - Test extensively in sandbox
  - Monitor webhook delivery

**2. Multi-Tenant Data Isolation**
- **Risk**: Data leakage between vendors
- **Mitigation**:
  - Use Row-Level Security (RLS)
  - Add vendor_id to all queries
  - Audit data access patterns
  - Implement automated tests

**3. File Upload Security**
- **Risk**: Malicious file uploads, unauthorized access
- **Mitigation**:
  - Validate file types and sizes
  - Scan for malware
  - Use pre-signed URLs with expiration
  - Implement rate limiting

**4. Timeline Slippage**
- **Risk**: 60-day deadline too aggressive
- **Mitigation**:
  - Focus on P0 features only
  - Cut P2 features (AI, Store Editor)
  - Parallel development where possible
  - Weekly progress reviews

---

## 8. Success Metrics

### MVP Launch Criteria

**Functional**:
- [ ] Vendors can register and create stores
- [ ] Vendors can add/edit/delete products
- [ ] Vendors can upload digital files
- [ ] Customers can browse products
- [ ] Customers can purchase with Khalti/eSewa/FonePay
- [ ] Customers receive secure download links
- [ ] Vendors can view orders and analytics

**Non-Functional**:
- [ ] Page load time < 3s
- [ ] Mobile responsive (all pages)
- [ ] WCAG 2.1 AA compliant
- [ ] 99% uptime
- [ ] Zero critical security vulnerabilities

### Post-Launch Metrics (Month 1)

- **10 active vendors** (stores created)
- **100 products** listed
- **50 transactions** completed
- **NPR 50,000** in GMV (Gross Merchandise Value)
- **< 5% payment failure rate**
- **< 2% support ticket rate**

---

## 9. Decision Log

### Key Architectural Decisions

**1. Monorepo vs Multi-Repo**
- **Decision**: Start with single Next.js app, route-based separation
- **Rationale**: Faster MVP, can split later if needed
- **Date**: Dec 5, 2025

**2. Database: PostgreSQL vs MongoDB**
- **Decision**: PostgreSQL (Vercel Postgres)
- **Rationale**: Better for transactional data, RLS support
- **Date**: Dec 5, 2025

**3. File Storage: S3 vs Vercel Blob**
- **Decision**: AWS S3
- **Rationale**: More control, pre-signed URLs, cheaper at scale
- **Date**: Dec 5, 2025

**4. AI Features in MVP**
- **Decision**: Defer to Post-MVP (Phase 2)
- **Rationale**: Not blocking, high effort, can add later
- **Date**: Dec 5, 2025

**5. Store Editor in MVP**
- **Decision**: Defer to Post-MVP (Phase 2)
- **Rationale**: Very high effort, basic customization sufficient for MVP
- **Date**: Dec 5, 2025

---

## 10. Next Actions (This Week)

### Immediate (Dec 5-6)
1. ✅ Review and approve this roadmap
2. [ ] Set up project management (Linear, Jira, or GitHub Projects)
3. [ ] Create feature branches
4. [ ] Design complete database schema
5. [ ] Start navigation system implementation

### This Week (Dec 7-11)
1. [ ] Complete database migration
2. [ ] Implement role-based auth
3. [ ] Build navigation components
4. [ ] Update dashboard layout
5. [ ] Write tests for navigation

### Next Week (Dec 12-18)
1. [ ] Set up S3 bucket
2. [ ] Create file upload API
3. [ ] Start product management UI
4. [ ] Begin product API endpoints
5. [ ] Weekly progress review

---

## Conclusion

This roadmap provides a clear path from the current tutorial-based dashboard to a fully functional multi-vendor digital marketplace. By focusing on P0 features and deferring AI and Store Editor to Phase 2, we can realistically achieve MVP launch within 60 days.

**Critical Success Factors**:
1. Strict scope control (no feature creep)
2. Weekly progress reviews
3. Early payment gateway testing
4. Continuous deployment
5. User feedback loops

**Recommended Approach**: Follow the week-by-week plan, complete each phase before moving to the next, and maintain focus on the core e-commerce functionality.

---

**Document Version**: 1.0  
**Last Updated**: December 5, 2025  
**Next Review**: December 12, 2025  
**Status**: Approved for Implementation
