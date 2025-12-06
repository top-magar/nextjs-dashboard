// Products API routes - List and Create
// Created: December 5, 2025

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getProducts, createProduct, getDraftCount } from '@/lib/products';
import { productFormSchema, productFiltersSchema } from '@/lib/validations/product';

/**
 * GET /api/products - List products with filters
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Get vendor ID from session
    const vendorId = session.user.id || 'default-vendor';

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      status: searchParams.get('status') || undefined,
      categoryId: searchParams.get('categoryId') || undefined,
      collectionId: searchParams.get('collectionId') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      page: parseInt(searchParams.get('page') || '1', 10),
      pageSize: parseInt(searchParams.get('pageSize') || '20', 10),
    };

    // Validate filters
    const validation = productFiltersSchema.safeParse(filters);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid filters', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Get products
    const { products, total } = await getProducts(vendorId, validation.data);

    return NextResponse.json({
      products,
      total,
      page: filters.page,
      pageSize: filters.pageSize,
      totalPages: Math.ceil(total / filters.pageSize),
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products - Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Get vendor ID from session
    const vendorId = session.user.id || 'default-vendor';

    // Parse request body
    const body = await request.json();

    // Validate input
    const validation = productFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Create product
    const product = await createProduct(vendorId, validation.data);

    return NextResponse.json(
      { product, message: 'Product created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
