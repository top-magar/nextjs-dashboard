# Shopify-Style Product Form

## Overview

Implemented a modern, Shopify-inspired product creation workflow with the following features:

## Key Features

### 1. Modal-Based Workflow
- Opens from products list page
- Full-screen modal on mobile, large modal on desktop
- Can be dismissed without losing progress (auto-save)

### 2. Single-Page Scrolling
- All sections in one scrollable view
- No multi-step wizard confusion
- Smooth scroll to sections

### 3. Collapsible Sections
- **Basic Information** - Title, slug, descriptions
- **Media** - File uploads (images/videos)
- **Pricing** - Price in NPR
- **Publishing** - Status (draft/published/archived)

### 4. Auto-Save Functionality
- Saves draft to localStorage every 2 seconds
- Shows "Saving..." indicator
- Displays last saved time
- Restores draft on page reload
- Clears draft after successful submission

### 5. Desktop Sidebar Navigation
- Quick jump to sections
- Visual indicator of active section
- Shows save status at bottom
- Sticky positioning

### 6. Mobile Bottom Navigation
- Replaces sidebar on mobile
- Icon-based navigation
- Active section highlighting
- Always accessible

### 7. Better UX
- Loading states for all actions
- Success/error toast notifications
- Disabled states during submission
- Form validation with clear error messages
- Sticky footer with action buttons

## Component Structure

```
src/components/products/
├── product-form-modal.tsx          # Modal wrapper
├── product-form-content.tsx        # Main form with auto-save
└── form-sections/
    ├── basic-section.tsx           # Title, slug, descriptions
    ├── media-section.tsx           # File uploads
    ├── pricing-section.tsx         # Price
    └── publish-section.tsx         # Status
```

## Usage

### Opening the Modal

```tsx
import { ProductFormModal } from '@/components/products/product-form-modal';

function ProductsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Add Product
      </Button>

      <ProductFormModal
        open={showModal}
        onOpenChange={setShowModal}
        mode="create"
      />
    </>
  );
}
```

### Editing a Product

```tsx
<ProductFormModal
  open={showModal}
  onOpenChange={setShowModal}
  mode="edit"
  product={selectedProduct}
/>
```

## Auto-Save Implementation

The form automatically saves drafts to localStorage:

1. **Debounced saves** - Waits 2 seconds after user stops typing
2. **Visual feedback** - Shows "Saving..." and "Saved at X:XX"
3. **Draft restoration** - Loads draft on mount if available
4. **Draft cleanup** - Removes draft after successful submission

## Responsive Design

### Desktop (lg+)
- Sidebar navigation on left (192px width)
- Main content centered (max-width: 768px)
- Sticky footer with actions

### Mobile
- No sidebar
- Bottom navigation bar
- Full-width content
- Collapsible sections for better scrolling

## Accessibility

- Keyboard navigation support
- ARIA labels on all interactive elements
- Focus management in modal
- Screen reader friendly

## Future Enhancements

1. **Variants** - Add product variants (size, color, etc.)
2. **Categories** - Multi-select categories
3. **Collections** - Add to collections
4. **SEO** - Meta title and description
5. **Images** - Multiple image uploads with drag-to-reorder
6. **Rich text editor** - For descriptions
7. **Preview** - Live preview of product page
8. **Duplicate** - Clone existing products
9. **Bulk actions** - Edit multiple products at once
10. **History** - Track changes and revisions

## Performance

- Lazy loading of sections
- Debounced auto-save (2s delay)
- Optimistic UI updates
- Minimal re-renders with React Hook Form

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Files

- `/src/app/dashboard/products/page.tsx` - Products list with modal trigger
- `/src/app/dashboard/products/create/page.tsx` - Legacy standalone page (can be removed)
- `/src/app/api/products/route.ts` - API endpoints
- `/src/lib/validations/product.ts` - Form validation schemas
