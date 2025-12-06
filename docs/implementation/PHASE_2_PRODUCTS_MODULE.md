# Phase 2: Products Module Implementation
## Week 3-4 (Dec 12-25, 2025)

**Status**: Ready to Start  
**Duration**: 2 weeks  
**Priority**: P0 (Critical for MVP)

---

## 🎯 Objectives

Build a complete product management system for digital products including:
1. Product CRUD operations
2. File upload with AWS S3
3. Product listing with filters
4. Categories and collections
5. Draft management

---

## 📋 Prerequisites

### Completed ✅
- [x] Navigation system
- [x] Authentication & RBAC
- [x] Dashboard layout
- [x] Products menu structure

### Required Before Starting
- [ ] AWS account setup
- [ ] S3 bucket creation
- [ ] Database schema design
- [ ] API route structure

---

## 🗓️ Week-by-Week Breakdown

### Week 3: Database & File Upload (Dec 12-18)

#### Day 11-12: Database Schema & AWS S3 Setup
**Goal**: Set up data models and file storage

**Tasks**:
1. **Database Schema Design**
   ```sql
   -- Products table
   CREATE TABLE products (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     vendor_id UUID NOT NULL REFERENCES vendors(id),
     title VARCHAR(255) NOT NULL,
     slug VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10,2) NOT NULL,
     currency VARCHAR(3) DEFAULT 'NPR',
     status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
     file_path TEXT,
     file_size BIGINT,
     file_type VARCHAR(100),
     thumbnail_url TEXT,
     download_count INT DEFAULT 0,
     view_count INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW(),
     published_at TIMESTAMP,
     UNIQUE(vendor_id, slug)
   );

   -- Categories table
   CREATE TABLE categories (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     vendor_id UUID NOT NULL REFERENCES vendors(id),
     name VARCHAR(100) NOT NULL,
     slug VARCHAR(100) NOT NULL,
     description TEXT,
     parent_id UUID REFERENCES categories(id),
     sort_order INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(vendor_id, slug)
   );

   -- Product-Category junction
   CREATE TABLE product_categories (
     product_id UUID REFERENCES products(id) ON DELETE CASCADE,
     category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
     PRIMARY KEY (product_id, category_id)
   );

   -- Collections table
   CREATE TABLE collections (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     vendor_id UUID NOT NULL REFERENCES vendors(id),
     name VARCHAR(100) NOT NULL,
     slug VARCHAR(100) NOT NULL,
     description TEXT,
     image_url TEXT,
     sort_order INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(vendor_id, slug)
   );

   -- Product-Collection junction
   CREATE TABLE product_collections (
     product_id UUID REFERENCES products(id) ON DELETE CASCADE,
     collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
     sort_order INT DEFAULT 0,
     PRIMARY KEY (product_id, collection_id)
   );

   -- Vendors table (if not exists)
   CREATE TABLE IF NOT EXISTS vendors (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id),
     store_name VARCHAR(255) NOT NULL,
     store_slug VARCHAR(255) NOT NULL UNIQUE,
     status VARCHAR(20) DEFAULT 'pending', -- pending, active, suspended
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **AWS S3 Setup**
   - Create S3 bucket: `pasaal-products-{env}`
   - Configure CORS policy
   - Set bucket policies (private)
   - Generate IAM access keys
   - Add to environment variables

3. **Environment Variables**
   ```env
   # AWS S3
   AWS_REGION=ap-south-1
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_S3_BUCKET=pasaal-products-dev
   AWS_S3_BUCKET_URL=https://pasaal-products-dev.s3.ap-south-1.amazonaws.com

   # File Upload Limits
   MAX_FILE_SIZE=104857600  # 100MB
   ALLOWED_FILE_TYPES=.pdf,.zip,.psd,.ai,.sketch,.fig,.mp3,.wav,.mp4
   ```

**Deliverables**:
- ✅ Database migration files
- ✅ S3 bucket configured
- ✅ Environment variables set
- ✅ AWS SDK installed

---

#### Day 13-14: File Upload API
**Goal**: Build secure file upload system

**Tasks**:
1. **Install Dependencies**
   ```bash
   pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
   pnpm add -D @types/node
   ```

2. **Create S3 Utility** (`src/lib/s3.ts`)
   ```typescript
   import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
   import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

   const s3Client = new S3Client({
     region: process.env.AWS_REGION!,
     credentials: {
       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
     },
   });

   export async function generateUploadUrl(
     fileName: string,
     fileType: string,
     vendorId: string
   ) {
     const key = `vendors/${vendorId}/products/${Date.now()}-${fileName}`;
     
     const command = new PutObjectCommand({
       Bucket: process.env.AWS_S3_BUCKET!,
       Key: key,
       ContentType: fileType,
     });

     const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
     
     return { uploadUrl, key };
   }

   export async function generateDownloadUrl(key: string, expiresIn = 3600) {
     const command = new GetObjectCommand({
       Bucket: process.env.AWS_S3_BUCKET!,
       Key: key,
     });

     return await getSignedUrl(s3Client, command, { expiresIn });
   }

   export async function deleteFile(key: string) {
     const command = new DeleteObjectCommand({
       Bucket: process.env.AWS_S3_BUCKET!,
       Key: key,
     });

     await s3Client.send(command);
   }
   ```

3. **Create Upload API Route** (`src/app/api/upload/route.ts`)
   ```typescript
   import { NextRequest, NextResponse } from 'next/server';
   import { auth } from '@/auth';
   import { generateUploadUrl } from '@/lib/s3';

   export async function POST(request: NextRequest) {
     try {
       const session = await auth();
       if (!session?.user) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }

       const { fileName, fileType, fileSize } = await request.json();

       // Validate file
       if (!fileName || !fileType) {
         return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
       }

       // Check file size (100MB limit)
       if (fileSize > 104857600) {
         return NextResponse.json({ error: 'File too large' }, { status: 400 });
       }

       // Check file type
       const allowedTypes = [
         'application/pdf',
         'application/zip',
         'image/vnd.adobe.photoshop',
         'audio/mpeg',
         'audio/wav',
         'video/mp4',
       ];

       if (!allowedTypes.includes(fileType)) {
         return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
       }

       // Generate upload URL
       const vendorId = session.user.vendorId; // TODO: Get from session
       const { uploadUrl, key } = await generateUploadUrl(fileName, fileType, vendorId);

       return NextResponse.json({ uploadUrl, key });
     } catch (error) {
       console.error('Upload error:', error);
       return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
     }
   }
   ```

4. **Create File Upload Component** (`src/components/products/file-upload.tsx`)
   ```typescript
   'use client';

   import { useState } from 'react';
   import { Upload, File, X } from 'lucide-react';
   import { Button } from '@/components/ui/button';
   import { Progress } from '@/components/ui/progress';

   export function FileUpload({ onUploadComplete }: { onUploadComplete: (key: string) => void }) {
     const [uploading, setUploading] = useState(false);
     const [progress, setProgress] = useState(0);
     const [file, setFile] = useState<File | null>(null);

     const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
       const selectedFile = e.target.files?.[0];
       if (selectedFile) {
         setFile(selectedFile);
       }
     };

     const handleUpload = async () => {
       if (!file) return;

       setUploading(true);
       setProgress(0);

       try {
         // Get upload URL
         const response = await fetch('/api/upload', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             fileName: file.name,
             fileType: file.type,
             fileSize: file.size,
           }),
         });

         const { uploadUrl, key } = await response.json();

         // Upload to S3
         const uploadResponse = await fetch(uploadUrl, {
           method: 'PUT',
           body: file,
           headers: { 'Content-Type': file.type },
         });

         if (uploadResponse.ok) {
           onUploadComplete(key);
           setProgress(100);
         }
       } catch (error) {
         console.error('Upload failed:', error);
       } finally {
         setUploading(false);
       }
     };

     return (
       <div className="space-y-4">
         <div className="border-2 border-dashed rounded-lg p-8 text-center">
           <input
             type="file"
             onChange={handleFileSelect}
             className="hidden"
             id="file-upload"
           />
           <label htmlFor="file-upload" className="cursor-pointer">
             <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
             <p className="mt-2 text-sm text-muted-foreground">
               Click to upload or drag and drop
             </p>
           </label>
         </div>

         {file && (
           <div className="flex items-center gap-2 p-4 border rounded-lg">
             <File className="h-8 w-8" />
             <div className="flex-1">
               <p className="text-sm font-medium">{file.name}</p>
               <p className="text-xs text-muted-foreground">
                 {(file.size / 1024 / 1024).toFixed(2)} MB
               </p>
             </div>
             <Button onClick={handleUpload} disabled={uploading}>
               Upload
             </Button>
           </div>
         )}

         {uploading && <Progress value={progress} />}
       </div>
     );
   }
   ```

**Deliverables**:
- ✅ S3 utility functions
- ✅ Upload API route
- ✅ File upload component
- ✅ File validation

---

### Week 4: Product CRUD & UI (Dec 19-25)

#### Day 15-17: Product API Routes
**Goal**: Build complete product API

**Tasks**:
1. **Create Product API** (`src/app/api/products/route.ts`)
2. **Update Product API** (`src/app/api/products/[id]/route.ts`)
3. **Delete Product API**
4. **List Products API** (with filters)

#### Day 18-20: Product UI
**Goal**: Build product management interface

**Tasks**:
1. **Product List Page** (`src/app/dashboard/products/page.tsx`)
2. **Create Product Page** (`src/app/dashboard/products/create/page.tsx`)
3. **Edit Product Page** (`src/app/dashboard/products/[id]/edit/page.tsx`)
4. **Product Form Component**

#### Day 21: Categories & Collections
**Goal**: Build organization features

**Tasks**:
1. **Categories Page** (`src/app/dashboard/products/categories/page.tsx`)
2. **Collections Page** (`src/app/dashboard/products/collections/page.tsx`)

---

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── products/
│   │       ├── route.ts (GET, POST)
│   │       └── [id]/
│   │           └── route.ts (GET, PATCH, DELETE)
│   └── dashboard/
│       └── products/
│           ├── page.tsx (list)
│           ├── create/
│           │   └── page.tsx
│           ├── [id]/
│           │   └── edit/
│           │       └── page.tsx
│           ├── categories/
│           │   └── page.tsx
│           └── collections/
│               └── page.tsx
├── components/
│   └── products/
│       ├── file-upload.tsx
│       ├── product-form.tsx
│       ├── product-list.tsx
│       ├── product-card.tsx
│       ├── category-form.tsx
│       └── collection-form.tsx
├── lib/
│   ├── s3.ts
│   ├── products.ts (data access)
│   └── validations/
│       └── product.ts (Zod schemas)
└── types/
    └── product.ts
```

---

## 🎯 Success Criteria

### Functional Requirements
- [ ] Vendors can create products
- [ ] Vendors can upload files (up to 100MB)
- [ ] Vendors can edit products
- [ ] Vendors can delete products
- [ ] Vendors can save drafts
- [ ] Vendors can publish products
- [ ] Vendors can organize by categories
- [ ] Vendors can create collections
- [ ] Files stored securely in S3
- [ ] Only vendor can access their products

### Non-Functional Requirements
- [ ] File upload < 30s for 100MB
- [ ] Product list loads < 2s
- [ ] Form validation instant
- [ ] Mobile responsive
- [ ] Accessible (WCAG 2.1 AA)

---

## 🧪 Testing Checklist

- [ ] Upload different file types
- [ ] Upload large files (100MB)
- [ ] Create product with all fields
- [ ] Create product with minimal fields
- [ ] Edit product
- [ ] Delete product
- [ ] Save draft
- [ ] Publish product
- [ ] Create category
- [ ] Create collection
- [ ] Test on mobile
- [ ] Test with slow network

---

## 📊 Progress Tracking

### Week 3 Progress
- [ ] Day 11: Database schema ⏳
- [ ] Day 12: AWS S3 setup ⏳
- [ ] Day 13: Upload API ⏳
- [ ] Day 14: Upload component ⏳

### Week 4 Progress
- [ ] Day 15-17: Product API ⏳
- [ ] Day 18-20: Product UI ⏳
- [ ] Day 21: Categories/Collections ⏳

---

## 🚀 Quick Start

### Step 1: Database Setup
```bash
# Run migration
psql $DATABASE_URL -f migrations/002_products.sql
```

### Step 2: AWS Setup
```bash
# Install AWS CLI
brew install awscli

# Configure AWS
aws configure

# Create S3 bucket
aws s3 mb s3://pasaal-products-dev --region ap-south-1
```

### Step 3: Install Dependencies
```bash
pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Step 4: Start Development
```bash
pnpm dev
```

---

## 📚 Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Next.js File Upload](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Validation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

---

**Document Version**: 1.0  
**Last Updated**: December 5, 2025  
**Status**: Ready to Start  
**Next Review**: December 12, 2025
