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
import type { ProductFormData } from '@/lib/validations/product';

interface ProductPricingSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function ProductPricingSection({ form }: ProductPricingSectionProps) {
  return (
    <div className="space-y-4 bg-card border rounded-lg p-4">
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
    </div>
  );
}
