// Product types for Pasaal e-commerce platform
// Created: December 5, 2025

export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Product {
  id: string;
  vendorId: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  currency: string;
  status: ProductStatus;
  
  // File information
  filePath: string | null;
  fileSize: number | null;
  fileType: string | null;
  fileName: string | null;
  
  // Media
  thumbnailUrl: string | null;
  previewImages: string[] | null;
  
  // Metadata
  downloadCount: number;
  viewCount: number;
  
  // SEO
  metaTitle: string | null;
  metaDescription: string | null;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface Category {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithRelations extends Product {
  categories?: Category[];
  collections?: Collection[];
}

// Form types
export interface ProductFormData {
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  status: ProductStatus;
  filePath?: string;
  thumbnailUrl?: string;
  categoryIds?: string[];
  collectionIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  sortOrder?: number;
  imageUrl?: string;
}

export interface CollectionFormData {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
}

// API response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UploadResponse {
  uploadUrl: string;
  key: string;
  fileUrl: string;
}

// Filter types
export interface ProductFilters {
  status?: ProductStatus;
  categoryId?: string;
  collectionId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'title' | 'price' | 'downloadCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
