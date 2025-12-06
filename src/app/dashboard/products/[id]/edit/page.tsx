'use client';

// Edit product page
// Created: December 5, 2025

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '@/components/products/file-upload';
import { productFormSchema, type ProductFormData } from '@/lib/validations/product';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string>('');

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      shortDescription: '',
      price: 0,
      status: 'draft',
      filePath: '',
      thumbnailUrl: '',
    },
  });

  useEffect(() => {
    params.then(({ id }) => {
      setProductId(id);
      fetchProduct(id);
    });
  }, []);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }

      const data = await response.json();
      const product = data.product;
      setProduct(product);

      // Populate form
      form.reset({
        title: product.title,
        slug: product.slug,
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        price: product.price,
        status: product.status,
        filePath: product.filePath || '',
        thumbnailUrl: product.thumbnailUrl || '',
        metaTitle: product.metaTitle || '',
        metaDescription: product.metaDescription || '',
      });
    } catch (error) {
      toast.error('Failed to load product');
      router.push('/dashboard/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    form.setValue('slug', slug);
  };

  const handleFileUpload = (key: string, fileUrl: string) => {
    form.setValue('filePath', key);
    toast.success('File uploaded successfully');
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }

      toast.success('Product updated successfully');
      router.push('/dashboard/products');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully');
      router.push('/dashboard/products');
    } catch (error) {
      toast.error('Failed to delete product');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            <p className="text-muted-foreground">
              Update product information
            </p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border bg-card p-6 space-y-6">
            <h2 className="text-lg font-semibold">Basic Information</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Premium UI Kit"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTitleChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="premium-ui-kit" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used in the product URL. Auto-generated from title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description for product cards..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Max 500 characters. Shown in product listings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed product description..."
                      className="resize-none"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Full product details shown on product page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing */}
          <div className="rounded-lg border bg-card p-6 space-y-6">
            <h2 className="text-lg font-semibold">Pricing</h2>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (NPR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="999.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Price in Nepali Rupees (NPR)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* File Upload */}
          <div className="rounded-lg border bg-card p-6 space-y-6">
            <h2 className="text-lg font-semibold">Product File</h2>
            {product?.filePath && (
              <div className="text-sm text-muted-foreground">
                Current file: {product.fileName || 'Uploaded'}
              </div>
            )}
            <FormField
              control={form.control}
              name="filePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload New File (Optional)</FormLabel>
                  <FormControl>
                    <FileUpload onUploadComplete={handleFileUpload} />
                  </FormControl>
                  <FormDescription>
                    Upload a new file to replace the existing one
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Status */}
          <div className="rounded-lg border bg-card p-6 space-y-6">
            <h2 className="text-lg font-semibold">Publishing</h2>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Draft products are not visible to customers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/products">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
