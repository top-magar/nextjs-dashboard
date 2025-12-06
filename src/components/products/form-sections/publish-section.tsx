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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProductFormData } from '@/lib/validations/product';

interface ProductPublishSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function ProductPublishSection({ form }: ProductPublishSectionProps) {
  return (
    <div className="space-y-4 bg-card border rounded-lg p-4">
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
                <SelectItem value="draft">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Draft</span>
                    <span className="text-xs text-muted-foreground">Not visible to customers</span>
                  </div>
                </SelectItem>
                <SelectItem value="published">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Published</span>
                    <span className="text-xs text-muted-foreground">Live on store</span>
                  </div>
                </SelectItem>
                <SelectItem value="archived">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Archived</span>
                    <span className="text-xs text-muted-foreground">Hidden from store</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
