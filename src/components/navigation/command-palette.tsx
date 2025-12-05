/**
 * Command Palette Component
 * 
 * Features:
 * - Quick actions (⌘K to open)
 * - Fuzzy search
 * - Keyboard navigation
 * - Recent pages
 * - Quick navigation
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3,
  Plus,
  Search,
  FileText,
  Store,
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle command palette with ⌘K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/products/create'))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Product</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>N
            </kbd>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/orders'))}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>View Orders</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>O
            </kbd>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/analytics'))}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>View Analytics</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>A
            </kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/products'))}>
            <Package className="mr-2 h-4 w-4" />
            <span>Products</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/orders'))}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/customers'))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Customers</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/analytics'))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/store'))}>
            <Store className="mr-2 h-4 w-4" />
            <span>Store Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Help">
          <CommandItem onSelect={() => runCommand(() => router.push('/help'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Documentation</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open('https://support.pasaal.com', '_blank'))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search Help</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

/**
 * Hook to programmatically open command palette
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  const openCommandPalette = useCallback(() => {
    setOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    openCommandPalette,
    closeCommandPalette,
  };
}
