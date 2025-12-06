# Setup Checklist - Quick Start

**Status**: Ready to test Phase 2 Products Module  
**Time Required**: 15-20 minutes

---

## ✅ Completed

- [x] AWS S3 bucket created (`pasaal-marketplace-storage`)
- [x] AWS credentials added to `.env.local`
- [ ] CORS configuration set on S3 bucket (needs fixing - see below)
- [x] Product module code complete (65%)
- [x] Dev server running

---

## 🔧 Remaining Setup Steps

### 0. Fix CORS Configuration (2 min) ⚠️

The CORS configuration format was incorrect. Use this:

**Go to AWS S3 → pasaal-marketplace-storage → Permissions → CORS → Edit**

Paste this (just the array, no wrapper):

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

**Important**: It's an array `[...]`, NOT `{"CORSRules": [...]}`

### 1. Add Database Connection (5 min)

Your `.env.local` needs the database connection string. Add this:

```bash
# Database Configuration
POSTGRES_URL=your_database_connection_string_here
```

**Where to find it:**
- If using Vercel Postgres: Vercel Dashboard → Storage → Your Database → .env.local tab
- If using Neon: Neon Dashboard → Connection String

### 2. Add Auth Secret (2 min)

Generate and add an auth secret:

```bash
# Generate the secret
openssl rand -base64 32

# Add to .env.local
AUTH_SECRET=your_generated_secret_here
AUTH_URL=http://localhost:3000
```

### 3. Restart Dev Server (1 min)

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Start it again
pnpm dev
```

### 4. Verify Configuration (2 min)

Navigate to: http://localhost:3000/dashboard/setup-check

This page will show you:
- ✅ Which environment variables are set
- ❌ Which ones are missing
- 📝 Next steps if anything is missing

### 5. Run Database Migration (5 min)

Once database connection is working:

```bash
# Option 1: Using psql command
psql $POSTGRES_URL -f scripts/migrations/002_products.sql

# Option 2: Copy and paste SQL
# Open scripts/migrations/002_products.sql
# Copy all the SQL
# Paste into your database console (Vercel/Neon dashboard)
```

This creates:
- `products` table
- `categories` table
- `collections` table
- Junction tables
- Indexes and triggers

### 6. Test the System (5 min)

1. **Go to Products Page**
   - Navigate to: http://localhost:3000/dashboard/products
   - Should see empty state with "Add Product" button

2. **Create a Product**
   - Click "Add Product"
   - Fill in:
     - Title: "Test Product"
     - Price: 999
     - Description: "This is a test"
   - Upload a small file (PDF, ZIP, etc.)
   - Click "Create Product"

3. **Verify Upload**
   - Check AWS S3 console
   - Look in: `vendors/{user-id}/products/`
   - File should be there!

4. **Test Edit**
   - Click on the product
   - Update any field
   - Click "Save Changes"

5. **Test Delete**
   - Click menu (⋮) on product card
   - Click "Delete"
   - Confirm deletion

---

## 🐛 Troubleshooting

### "Unauthorized" error
- Make sure you're logged in
- Check that AUTH_SECRET is set

### "Failed to generate upload URL"
- Verify AWS credentials in `.env.local`
- Check S3 bucket name matches
- Verify CORS is configured

### "Database connection failed"
- Check POSTGRES_URL is correct
- Test connection in database console
- Verify database is running

### File upload fails
- Check file size (< 100MB)
- Check file type is allowed
- Check browser console for errors
- Verify CORS configuration

---

## 📊 Current Configuration

Based on your `.env.local`:

```bash
✅ AWS_ACCESS_KEY_ID: Set
✅ AWS_SECRET_ACCESS_KEY: Set
✅ AWS_REGION: us-west-2
✅ AWS_S3_BUCKET: pasaal-marketplace-storage
✅ AWS_S3_BUCKET_URL: Set
✅ MAX_FILE_SIZE: 104857600 (100MB)
✅ ALLOWED_FILE_TYPES: Set

⏳ POSTGRES_URL: Need to add
⏳ AUTH_SECRET: Need to add
```

---

## 🎯 Success Criteria

You'll know setup is complete when:

1. ✅ Setup check page shows all green
2. ✅ Can create a product
3. ✅ File uploads to S3
4. ✅ Product appears in list
5. ✅ Can edit product
6. ✅ Can delete product

---

## 📚 Documentation

- **Full Setup Guide**: `docs/guides/PHASE_2_SETUP.md`
- **Progress Tracker**: `docs/implementation/PHASE_2_PROGRESS.md`
- **Latest Update**: `docs/status/PHASE_2_UPDATE.md`

---

## 🚀 Quick Commands

```bash
# Check setup status
open http://localhost:3000/dashboard/setup-check

# Run database migration
psql $POSTGRES_URL -f scripts/migrations/002_products.sql

# Test products page
open http://localhost:3000/dashboard/products

# Create product
open http://localhost:3000/dashboard/products/create

# Restart dev server
pnpm dev
```

---

## ✨ What's Working

- ✅ Navigation system (100%)
- ✅ Product CRUD API (100%)
- ✅ File upload system (100%)
- ✅ Product UI (100%)
- ✅ Search & filters (100%)
- 🚧 Categories (20% - placeholders)
- 🚧 Collections (20% - placeholders)

**Overall Phase 2: 65% Complete**

---

**Next Action**: Add POSTGRES_URL and AUTH_SECRET to `.env.local`, then visit `/dashboard/setup-check`

**Estimated Time to Complete**: 15 minutes

**Last Updated**: December 6, 2025
