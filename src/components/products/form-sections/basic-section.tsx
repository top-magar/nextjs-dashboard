'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ProductFormData } from '@/lib/validations/product';

interface ProductBasicSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function ProductBasicSection({ form }: ProductBasicSectionProps) {
  const handleTitleChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    form.setValue('slug', slug);
  };

  return (
    <div className="space-y-4 bg-card border rounded-lg p-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Premium UI Kit"
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
              Auto-generated from title
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
                placeholder="Brief description..."
                rows={2}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Shown in product listings
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Detailed description..."
                rows={6}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Full product details
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
