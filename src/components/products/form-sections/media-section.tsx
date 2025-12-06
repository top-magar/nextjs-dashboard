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
import { FileUpload } from '../file-upload';
import type { ProductFormData } from '@/lib/validations/product';
import { toast } from 'sonner';

interface ProductMediaSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function ProductMediaSection({ form }: ProductMediaSectionProps) {
  const handleFileUpload = (key: string, fileUrl: string) => {
    form.setValue('filePath', key);
    toast.success('File uploaded');
  };

  return (
    <div className="space-y-4 bg-card border rounded-lg p-4">
      <FormField
        control={form.control}
        name="filePath"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product File</FormLabel>
            <FormControl>
              <FileUpload onUploadComplete={handleFileUpload} />
            </FormControl>
            <FormDescription>
              Upload images or videos
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
