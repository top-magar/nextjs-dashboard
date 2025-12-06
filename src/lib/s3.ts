// AWS S3 utilities for file upload/download
// Created: December 5, 2025

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Generate a pre-signed URL for uploading a file to S3
 * @param fileName - Original file name
 * @param fileType - MIME type of the file
 * @param vendorId - Vendor ID for organizing files
 * @returns Upload URL and S3 key
 */
export async function generateUploadUrl(
  fileName: string,
  fileType: string,
  vendorId: string
): Promise<{ uploadUrl: string; key: string; fileUrl: string }> {
  // Generate unique key with timestamp
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `vendors/${vendorId}/products/${timestamp}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const fileUrl = `${process.env.AWS_S3_BUCKET_URL}/${key}`;

  return { uploadUrl, key, fileUrl };
}

/**
 * Generate a pre-signed URL for downloading a file from S3
 * @param key - S3 object key
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 * @returns Download URL
 */
export async function generateDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from S3
 * @param key - S3 object key
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Validate file type against allowed types
 * @param fileType - MIME type to validate
 * @returns true if allowed, false otherwise
 */
export function isFileTypeAllowed(fileType: string): boolean {
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    
    // Video
    'video/mp4',
    'video/quicktime', // .mov files
    'video/x-msvideo', // .avi files
    'video/webm',
    'video/x-matroska', // .mkv files
  ];

  return allowedTypes.includes(fileType);
}

/**
 * Validate file size against maximum allowed size
 * @param fileSize - File size in bytes
 * @returns true if within limit, false otherwise
 */
export function isFileSizeAllowed(fileSize: number): boolean {
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '104857600', 10); // 100MB default
  return fileSize <= maxSize;
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "10.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
