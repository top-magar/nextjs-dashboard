// Collections management page (placeholder)
// Created: December 5, 2025

import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
          <p className="text-muted-foreground">
            Create curated collections of products
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Collection
        </Button>
      </div>

      {/* Coming Soon */}
      <div className="rounded-lg border bg-card p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground">
            Collections management is currently under development. You'll be able to create
            featured collections and group related products together.
          </p>
          <div className="pt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/products">
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
