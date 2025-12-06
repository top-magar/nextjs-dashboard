'use client';

// Shopify-style product form with auto-save and sections
// Created: December 6, 2025

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Save, 
  ChevronDown, 
  ChevronUp,
  Image as ImageIcon,
  DollarSign,
  FileText,
  Settings,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { productFormSchema, type ProductFormData } from '@/lib/validations/product';
import { toast } from 'sonner';
import type { Product } from '@/types/product';
import { ProductBasicSection } from './form-sections/basic-section';
import { ProductMediaSection } from './form-sections/media-section';
import { ProductPricingSection } from './form-sections/pricing-section';
import { ProductPublishSection } from './form-sections/publish-section';
import { cn } from '@/lib/utils';
import { useDebounce } from 'use-debounce';

interface ProductFormContentProps {
  product?: Product;
  mode: 'create' | 'edit';
  onSuccess: () => void;
  onCancel: () => void;
}

type Section = 'basic' | 'media' | 'pricing' | 'publish';

export function ProductFormContent({
  product,
  mode,
  onSuccess,
  onCancel,
}: ProductFormContentProps) {
  const [activeSection, setActiveSection] = useState<Section>('basic');
  const [expandedSections, setExpandedSections] = useState<Set<Section>>(
    new Set(['basic', 'media', 'pricing', 'publish'])
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product ? {
      title: product.title,
      slug: product.slug,
      description: product.description || '',
      shortDescription: product.shortDescription || '',
      price: product.price,
      status: product.status,
      filePath: product.filePath || '',
      thumbnailUrl: product.thumbnailUrl || '',
    } : {
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

  const formValues = form.watch();
  const [debouncedValues] = useDebounce(formValues, 2000);

  // Auto-save draft
  useEffect(() => {
    if (mode === 'create' && debouncedValues.title) {
      autoSaveDraft(debouncedValues);
    }
  }, [debouncedValues, mode]);

  const autoSaveDraft = async (data: ProductFormData) => {
    if (isSaving || isSubmitting) return;
    
    setIsSaving(true);
    try {
      // Save to localStorage for now
      localStorage.setItem('product-draft', JSON.stringify(data));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Load draft on mount
  useEffect(() => {
    if (mode === 'create') {
      const draft = localStorage.getItem('product-draft');
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          Object.keys(parsed).forEach((key) => {
            form.setValue(key as any, parsed[key]);
          });
          toast.info('Draft restored');
        } catch (error) {
          console.error('Failed to load draft:', error);
        }
      }
    }
  }, [mode, form]);

  const toggleSection = (section: Section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      const url = mode === 'create' 
        ? '/api/products' 
        : `/api/products/${product?.id}`;
      
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save product');
      }

      toast.success(mode === 'create' ? 'Product created!' : 'Product updated!');
      
      // Clear draft
      if (mode === 'create') {
        localStorage.removeItem('product-draft');
      }
      
      onSuccess();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: 'basic' as Section, label: 'Basic Info', icon: FileText },
    { id: 'media' as Section, label: 'Media', icon: ImageIcon },
    { id: 'pricing' as Section, label: 'Pricing', icon: DollarSign },
    { id: 'publish' as Section, label: 'Publish', icon: Settings },
  ];

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-48 border-r flex-col">
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </ScrollArea>
        
        {/* Save status */}
        <div className="p-4 border-t text-xs text-muted-foreground">
          {isSaving && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </div>
          )}
          {lastSaved && !isSaving && (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              Saved {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-6 max-w-3xl mx-auto space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <section id="section-basic">
                <SectionHeader
                  title="Basic Information"
                  icon={FileText}
                  expanded={expandedSections.has('basic')}
                  onToggle={() => toggleSection('basic')}
                />
                {expandedSections.has('basic') && (
                  <div className="mt-4">
                    <ProductBasicSection form={form} />
                  </div>
                )}
              </section>

              {/* Media */}
              <section id="section-media">
                <SectionHeader
                  title="Media"
                  icon={ImageIcon}
                  expanded={expandedSections.has('media')}
                  onToggle={() => toggleSection('media')}
                />
                {expandedSections.has('media') && (
                  <div className="mt-4">
                    <ProductMediaSection form={form} />
                  </div>
                )}
              </section>

              {/* Pricing */}
              <section id="section-pricing">
                <SectionHeader
                  title="Pricing"
                  icon={DollarSign}
                  expanded={expandedSections.has('pricing')}
                  onToggle={() => toggleSection('pricing')}
                />
                {expandedSections.has('pricing') && (
                  <div className="mt-4">
                    <ProductPricingSection form={form} />
                  </div>
                )}
              </section>

              {/* Publishing */}
              <section id="section-publish">
                <SectionHeader
                  title="Publishing"
                  icon={Settings}
                  expanded={expandedSections.has('publish')}
                  onToggle={() => toggleSection('publish')}
                />
                {expandedSections.has('publish') && (
                  <div className="mt-4">
                    <ProductPublishSection form={form} />
                  </div>
                )}
              </section>
            </form>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="border-t p-4 flex items-center justify-between bg-background">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <div className="flex items-center gap-2">
            {isSaving && (
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving draft...
              </span>
            )}
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === 'create' ? 'Create Product' : 'Save Changes'}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden border-t p-2 bg-background">
          <div className="flex items-center justify-around">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 text-xs rounded-md transition-colors',
                    activeSection === section.id
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  icon: Icon,
  expanded,
  onToggle,
}: {
  title: string;
  icon: any;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-card border rounded-lg hover:bg-accent transition-colors"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      {expanded ? (
        <ChevronUp className="h-5 w-5" />
      ) : (
        <ChevronDown className="h-5 w-5" />
      )}
    </button>
  );
}
