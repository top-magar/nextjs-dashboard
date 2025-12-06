# Phase 2 Setup Guide
## Products Module Quick Start

**Date**: December 5, 2025  
**Estimated Time**: 30 minutes

---

## 🎯 What We Built

Phase 2 implementation includes:
- ✅ Complete database schema for products, categories, and collections
- ✅ AWS S3 file upload system with pre-signed URLs
- ✅ Product CRUD API routes
- ✅ File upload component with drag-and-drop
- ✅ Create product page with full form
- ✅ Product list page (basic)

---

## 📋 Prerequisites

Before you start, make sure you have:
- [x] AWS account (free tier is fine)
- [x] PostgreSQL database (Vercel Postgres or Neon)
- [x] Node.js 18+ and pnpm installed
- [x] Project dependencies installed (`pnpm install`)

---

## 🚀 Setup Steps

### Step 1: Install Dependencies (Already Done ✅)

The AWS SDK packages have been installed:
```bash
pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Step 2: Create AWS S3 Bucket

1. **Log in to AWS Console**: https://console.aws.amazon.com/s3/

2. **Create Bucket**:
   - Click "Create bucket"
   - Bucket name: `pasaal-products-dev` (or your preferred name)
   - Region: `ap-south-1` (Mumbai - closest to Nepal)
   - Block all public access: ✅ (keep files private)
   - Click "Create bucket"

3. **Configure CORS** (for direct browser uploads):
   - Go to your bucket → Permissions → CORS
   - Click "Edit"
   - **IMPORTANT**: Paste ONLY the array (no CORSRules wrapper):
   
   **For specific origins:**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
       "AllowedOrigins": [
         "http://localhost:3000",
         "http://localhost:3001",
         "https://your-domain.vercel.app"
       ],
       "ExposeHeaders": ["ETag"]
     }
   ]
   ```
   
   **Or for development (allow all origins):**
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
   
   - Click "Save changes"
   - **Note**: The configuration is just an array `[...]`, NOT `{"CORSRules": [...]}`

4. **Create IAM User**:
   - Go to IAM → Users → Create user
   - User name: `pasaal-s3-uploader`
   - Attach policy: `AmazonS3FullAccess` (or create custom policy)
   - Create access key → Application running outside AWS
   - Save the Access Key ID and Secret Access Key

### Step 3: Configure Environment Variables

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Add AWS credentials to `.env.local`**:
   ```env
   # AWS S3 Configuration
   AWS_REGION=ap-south-1
   AWS_ACCESS_KEY_ID=your_access_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_key_here
   AWS_S3_BUCKET=pasaal-products-dev
   AWS_S3_BUCKET_URL=https://pasaal-products-dev.s3.ap-south-1.amazonaws.com

   # File Upload Limits
   MAX_FILE_SIZE=104857600
   ALLOWED_FILE_TYPES=.pdf,.zip,.psd,.ai,.sketch,.fig,.mp3,.wav,.mp4,.mov
   ```

3. **Verify database connection** (should already be set):
   ```env
   POSTGRES_URL=your_database_url
   ```

### Step 4: Run Database Migration

1. **Connect to your database**:
   ```bash
   # If using Vercel Postgres
   psql $POSTGRES_URL

   # Or if using Neon
   psql "your_connection_string"
   ```

2. **Run the migration**:
   ```sql
   \i scripts/migrations/002_products.sql
   ```

   Or copy and paste the SQL from `scripts/migrations/002_products.sql`

3. **Verify tables created**:
   ```sql
   \dt
   ```
   
   You should see:
   - vendors
   - products
   - categories
   - collections
   - product_categories
   - product_collections

### Step 5: Start Development Server

```bash
pnpm dev
```

The server should start at http://localhost:3000

### Step 6: Test the Implementation

1. **Navigate to Products**:
   - Go to http://localhost:3000/dashboard/products
   - You should see the products page

2. **Create a Product**:
   - Click "Add Product"
   - Fill in the form:
     - Title: "Test Product"
     - Price: 999
     - Description: "This is a test product"
   - Upload a file (try a PDF or ZIP)
   - Click "Create Product"

3. **Verify Upload**:
   - Check AWS S3 bucket for the uploaded file
   - Should be in: `vendors/{user-id}/products/`

---

## ✅ Verification Checklist

- [ ] AWS S3 bucket created
- [ ] CORS configured on S3 bucket
- [ ] IAM user created with access keys
- [ ] Environment variables set in `.env.local`
- [ ] Database migration executed successfully
- [ ] Dev server running without errors
- [ ] Can access `/dashboard/products`
- [ ] Can access `/dashboard/products/create`
- [ ] Can upload a file successfully
- [ ] Can create a product

---

## 🐛 Troubleshooting

### Issue: "Unauthorized" error when uploading

**Solution**: Make sure you're logged in. The upload API requires authentication.

### Issue: "File type not allowed"

**Solution**: Check that your file type is in the allowed list:
- Documents: PDF, ZIP
- Design: PSD, AI, Sketch, Figma
- Audio: MP3, WAV
- Video: MP4, MOV

### Issue: "Failed to generate upload URL"

**Possible causes**:
1. AWS credentials not set in `.env.local`
2. AWS credentials invalid
3. S3 bucket doesn't exist
4. IAM user doesn't have S3 permissions

**Solution**: Double-check your AWS setup and environment variables.

### Issue: Database migration fails

**Possible causes**:
1. Tables already exist
2. Database connection issue
3. Missing users table

**Solution**: 
- Check if tables exist: `\dt`
- Verify database connection
- Make sure you ran the initial migration first

### Issue: "Cannot find module '@aws-sdk/client-s3'"

**Solution**: Run `pnpm install` to install dependencies.

---

## 📚 What's Next?

After setup is complete, you can:

1. **Complete Product UI**:
   - Product list with data fetching
   - Edit product page
   - Delete functionality
   - Filters and search

2. **Add Categories**:
   - Category management page
   - Category API routes
   - Assign products to categories

3. **Add Collections**:
   - Collection management page
   - Collection API routes
   - Organize products in collections

4. **Testing**:
   - Test different file types
   - Test large files (up to 100MB)
   - Test on mobile devices
   - Test error scenarios

---

## 🎯 Success Criteria

You've successfully completed setup when:
- ✅ You can create a product
- ✅ You can upload a file
- ✅ File appears in S3 bucket
- ✅ Product appears in database
- ✅ No console errors

---

## 📞 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Check AWS CloudWatch logs
5. Review the implementation files for comments

---

## 📖 Related Documentation

- [Phase 2 Implementation Plan](../implementation/PHASE_2_PRODUCTS_MODULE.md)
- [Phase 2 Progress Tracker](../implementation/PHASE_2_PROGRESS.md)
- [Database Schema](../../scripts/migrations/002_products.sql)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)

---

**Last Updated**: December 5, 2025  
**Status**: Ready for Setup  
**Estimated Setup Time**: 30 minutes
