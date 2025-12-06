// Product validation schemas using Zod
// Created: December 5, 2025

import { z } from 'zod';

// Product status enum
export const productStatusSchema = z.enum(['draft', 'published', 'archived']);

// Product form validation
export const productFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be less than 255 characters'),
  
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(255, 'Slug must be less than 255 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  
  description: z
    .string()
    .max(5000, 'Description must be less than 5000 characters')
    .optional(),
  
  shortDescription: z
    .string()
    .max(500, 'Short description must be less than 500 characters')
    .optional(),
  
  price: z
    .number()
    .min(0, 'Price must be positive')
    .max(999999.99, 'Price is too high'),
  
  status: productStatusSchema,
  
  filePath: z.string().optional(),
  thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
  
  categoryIds: z.array(z.string().uuid()).optional(),
  collectionIds: z.array(z.string().uuid()).optional(),
  
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().max(500).optional(),
});

// Category form validation
export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  
  description: z.string().max(1000).optional(),
  parentId: z.string().uuid().optional(),
  sortOrder: z.number().int().min(0).optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

// Collection form validation
export const collectionFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  
  description: z.string().max(1000).optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
  sortOrder: z.number().int().min(0).optional(),
  isFeatured: z.boolean().optional(),
});

// File upload validation
export const fileUploadSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().min(1, 'File type is required'),
  fileSize: z.number().positive('File size must be positive'),
});

// Product filters validation
export const productFiltersSchema = z.object({
  status: productStatusSchema.optional(),
  categoryId: z.string().uuid().optional(),
  collectionId: z.string().uuid().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'title', 'price', 'downloadCount']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(100).optional(),
});

// Type exports
export type ProductFormData = z.infer<typeof productFormSchema>;
export type CategoryFormData = z.infer<typeof categoryFormSchema>;
export type CollectionFormData = z.infer<typeof collectionFormSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type ProductFilters = z.infer<typeof productFiltersSchema>;
