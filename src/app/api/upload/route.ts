// File upload API route
// Created: December 5, 2025

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generateUploadUrl, isFileTypeAllowed, isFileSizeAllowed } from '@/lib/s3';
import { fileUploadSchema } from '@/lib/validations/product';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validation = fileUploadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { fileName, fileType, fileSize } = validation.data;

    // Validate file type
    if (!isFileTypeAllowed(fileType)) {
      return NextResponse.json(
        { error: 'File type not allowed. Supported types: JPG, JPEG, PNG, GIF, WEBP, SVG, MP4, MOV, AVI, WEBM, MKV' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!isFileSizeAllowed(fileSize)) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed size (100MB)' },
        { status: 400 }
      );
    }

    // TODO: Get vendor ID from session
    // For now, use user ID as vendor ID (temporary)
    const vendorId = session.user.id || 'default-vendor';

    // Generate pre-signed upload URL
    const { uploadUrl, key, fileUrl } = await generateUploadUrl(
      fileName,
      fileType,
      vendorId
    );

    return NextResponse.json({
      uploadUrl,
      key,
      fileUrl,
      message: 'Upload URL generated successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
