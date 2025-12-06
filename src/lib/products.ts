// Product data access layer
// Created: December 5, 2025

import { sql } from '@vercel/postgres';
import type { Product, ProductFilters, ProductFormData } from '@/types/product';

/**
 * Get all products for a vendor with optional filters
 */
export async function getProducts(
  vendorId: string,
  filters: ProductFilters = {}
): Promise<{ products: Product[]; total: number }> {
  const {
    status,
    categoryId,
    collectionId,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    pageSize = 20,
  } = filters;

  let query = `
    SELECT DISTINCT p.*
    FROM products p
    WHERE p.vendor_id = $1
  `;
  
  const params: any[] = [vendorId];
  let paramIndex = 2;

  // Apply filters
  if (status) {
    query += ` AND p.status = $${paramIndex}`;
    params.push(status);
    paramIndex++;
  }

  if (search) {
    query += ` AND (p.title ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (categoryId) {
    query += ` AND EXISTS (
      SELECT 1 FROM product_categories pc
      WHERE pc.product_id = p.id AND pc.category_id = $${paramIndex}
    )`;
    params.push(categoryId);
    paramIndex++;
  }

  if (collectionId) {
    query += ` AND EXISTS (
      SELECT 1 FROM product_collections pc
      WHERE pc.product_id = p.id AND pc.collection_id = $${paramIndex}
    )`;
    params.push(collectionId);
    paramIndex++;
  }

  // Get total count
  const countQuery = `SELECT COUNT(*) as total FROM (${query}) as filtered`;
  const countResult = await sql.query(countQuery, params);
  const total = parseInt(countResult.rows[0].total, 10);

  // Apply sorting
  const sortColumn = sortBy === 'createdAt' ? 'p.created_at' :
                     sortBy === 'title' ? 'p.title' :
                     sortBy === 'price' ? 'p.price' :
                     'p.download_count';
  
  query += ` ORDER BY ${sortColumn} ${sortOrder.toUpperCase()}`;

  // Apply pagination
  const offset = (page - 1) * pageSize;
  query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(pageSize, offset);

  const result = await sql.query(query, params);
  
  return {
    products: result.rows.map(mapProductFromDb),
    total,
  };
}

/**
 * Get a single product by ID
 */
export async function getProductById(
  productId: string,
  vendorId: string
): Promise<Product | null> {
  const result = await sql`
    SELECT * FROM products
    WHERE id = ${productId} AND vendor_id = ${vendorId}
  `;

  if (result.rows.length === 0) {
    return null;
  }

  return mapProductFromDb(result.rows[0]);
}

/**
 * Create a new product
 */
export async function createProduct(
  vendorId: string,
  data: ProductFormData
): Promise<Product> {
  const result = await sql`
    INSERT INTO products (
      vendor_id, title, slug, description, short_description,
      price, currency, status, file_path, thumbnail_url,
      meta_title, meta_description
    )
    VALUES (
      ${vendorId}, ${data.title}, ${data.slug}, ${data.description || null},
      ${data.shortDescription || null}, ${data.price}, 'NPR', ${data.status},
      ${data.filePath || null}, ${data.thumbnailUrl || null},
      ${data.metaTitle || null}, ${data.metaDescription || null}
    )
    RETURNING *
  `;

  const product = mapProductFromDb(result.rows[0]);

  // Add categories if provided
  if (data.categoryIds && data.categoryIds.length > 0) {
    await addProductCategories(product.id, data.categoryIds);
  }

  // Add collections if provided
  if (data.collectionIds && data.collectionIds.length > 0) {
    await addProductCollections(product.id, data.collectionIds);
  }

  return product;
}

/**
 * Update an existing product
 */
export async function updateProduct(
  productId: string,
  vendorId: string,
  data: Partial<ProductFormData>
): Promise<Product | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  // Build dynamic update query
  if (data.title !== undefined) {
    updates.push(`title = $${paramIndex++}`);
    values.push(data.title);
  }
  if (data.slug !== undefined) {
    updates.push(`slug = $${paramIndex++}`);
    values.push(data.slug);
  }
  if (data.description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(data.description);
  }
  if (data.shortDescription !== undefined) {
    updates.push(`short_description = $${paramIndex++}`);
    values.push(data.shortDescription);
  }
  if (data.price !== undefined) {
    updates.push(`price = $${paramIndex++}`);
    values.push(data.price);
  }
  if (data.status !== undefined) {
    updates.push(`status = $${paramIndex++}`);
    values.push(data.status);
    
    // Set published_at when publishing
    if (data.status === 'published') {
      updates.push(`published_at = NOW()`);
    }
  }
  if (data.filePath !== undefined) {
    updates.push(`file_path = $${paramIndex++}`);
    values.push(data.filePath);
  }
  if (data.thumbnailUrl !== undefined) {
    updates.push(`thumbnail_url = $${paramIndex++}`);
    values.push(data.thumbnailUrl);
  }
  if (data.metaTitle !== undefined) {
    updates.push(`meta_title = $${paramIndex++}`);
    values.push(data.metaTitle);
  }
  if (data.metaDescription !== undefined) {
    updates.push(`meta_description = $${paramIndex++}`);
    values.push(data.metaDescription);
  }

  if (updates.length === 0) {
    return getProductById(productId, vendorId);
  }

  values.push(productId, vendorId);
  const query = `
    UPDATE products
    SET ${updates.join(', ')}, updated_at = NOW()
    WHERE id = $${paramIndex++} AND vendor_id = $${paramIndex++}
    RETURNING *
  `;

  const result = await sql.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  // Update categories if provided
  if (data.categoryIds !== undefined) {
    await sql`DELETE FROM product_categories WHERE product_id = ${productId}`;
    if (data.categoryIds.length > 0) {
      await addProductCategories(productId, data.categoryIds);
    }
  }

  // Update collections if provided
  if (data.collectionIds !== undefined) {
    await sql`DELETE FROM product_collections WHERE product_id = ${productId}`;
    if (data.collectionIds.length > 0) {
      await addProductCollections(productId, data.collectionIds);
    }
  }

  return mapProductFromDb(result.rows[0]);
}

/**
 * Delete a product
 */
export async function deleteProduct(
  productId: string,
  vendorId: string
): Promise<boolean> {
  const result = await sql`
    DELETE FROM products
    WHERE id = ${productId} AND vendor_id = ${vendorId}
    RETURNING id
  `;

  return result.rows.length > 0;
}

/**
 * Get draft products count for a vendor
 */
export async function getDraftCount(vendorId: string): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count
    FROM products
    WHERE vendor_id = ${vendorId} AND status = 'draft'
  `;

  return parseInt(result.rows[0].count, 10);
}

// Helper functions

function mapProductFromDb(row: any): Product {
  return {
    id: row.id,
    vendorId: row.vendor_id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    shortDescription: row.short_description,
    price: parseFloat(row.price),
    currency: row.currency,
    status: row.status,
    filePath: row.file_path,
    fileSize: row.file_size ? parseInt(row.file_size, 10) : null,
    fileType: row.file_type,
    fileName: row.file_name,
    thumbnailUrl: row.thumbnail_url,
    previewImages: row.preview_images,
    downloadCount: parseInt(row.download_count, 10),
    viewCount: parseInt(row.view_count, 10),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    publishedAt: row.published_at ? new Date(row.published_at) : null,
  };
}

async function addProductCategories(
  productId: string,
  categoryIds: string[]
): Promise<void> {
  const values = categoryIds.map(categoryId => `('${productId}', '${categoryId}')`).join(', ');
  await sql.query(`
    INSERT INTO product_categories (product_id, category_id)
    VALUES ${values}
  `);
}

async function addProductCollections(
  productId: string,
  collectionIds: string[]
): Promise<void> {
  const values = collectionIds.map(collectionId => `('${productId}', '${collectionId}')`).join(', ');
  await sql.query(`
    INSERT INTO product_collections (product_id, collection_id)
    VALUES ${values}
  `);
}
