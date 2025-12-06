'use client';

// Create product page - Redesigned workflow
// Updated: December 6, 2025

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Upload as UploadIcon, CheckCircle2, AlertCircle } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ key: string; url: string } | null>(null);

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

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    form.setValue('slug', slug);
  };

  const handleFileUpload = (key: string, fileUrl: string) => {
    setUploadedFile({ key, url: fileUrl });
    form.setValue('filePath', key);
    toast.success('File uploaded successfully');
  };

  const onSubmit = async (data: ProductFormData) => {
    // Validate that file is uploaded
    if (!uploadedFile) {
      toast.error('Please upload a product file first');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting product data:', data);

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('API response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create product');
      }

      toast.success('Product created successfully!');
      
      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push('/dashboard/products');
        router.refresh();
      }, 500);
    } catch (error) {
      console.error('Create product error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">
            Add a new digital product to your store
          </p>
        </div>
      </div>

      {/* Upload Status Alert */}
      {uploadedFile && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            File uploaded successfully! Now fill in the product details below.
          </AlertDescription>
        </Alert>
      )}

      {!uploadedFile && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Start by uploading your product file (image or video). Then fill in the details.
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: File Upload */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${uploadedFile ? 'bg-green-100 text-green-600' : 'bg-primary text-primary-foreground'}`}>
                {uploadedFile ? <CheckCircle2 className="h-5 w-5" /> : '1'}
              </div>
              <h2 className="text-lg font-semibold">Upload Product File</h2>
            </div>
            
            <FormField
              control={form.control}
              name="filePath"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload onUploadComplete={handleFileUpload} />
                  </FormControl>
                  <FormDescription>
                    Upload images (JPG, PNG, GIF, WEBP, SVG) or videos (MP4, MOV, AVI, WEBM, MKV)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Step 2: Basic Information */}
          <div className="rounded-lg border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                2
              </div>
              <h2 className="text-lg font-semibold">Product Details</h2>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title *</FormLabel>
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
                  <FormLabel>URL Slug *</FormLabel>
                  <FormControl>
                    <Input placeholder="premium-ui-kit" {...field} />
                  </FormControl>
                  <FormDescription>
                    Auto-generated from title. Used in product URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (NPR) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="999.00"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Price in Nepali Rupees
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
                    Brief summary shown in product listings (optional)
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
                    Detailed information shown on product page (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Step 3: Publishing */}
          <div className="rounded-lg border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                3
              </div>
              <h2 className="text-lg font-semibold">Publishing Options</h2>
            </div>

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
                      <SelectItem value="draft">Draft - Not visible to customers</SelectItem>
                      <SelectItem value="published">Published - Live on store</SelectItem>
                      <SelectItem value="archived">Archived - Hidden from store</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sticky bottom-0 bg-background py-4 border-t">
            <Button 
              type="submit" 
              disabled={isSubmitting || !uploadedFile}
              size="lg"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Creating Product...' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild disabled={isSubmitting}>
              <Link href="/dashboard/products">Cancel</Link>
            </Button>
            {!uploadedFile && (
              <p className="text-sm text-muted-foreground">
                Upload a file to enable product creation
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
