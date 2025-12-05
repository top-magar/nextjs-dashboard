/**
 * Mobile Bottom Navigation Component
 * 
 * Features:
 * - Bottom tab bar for mobile devices
 * - Active state highlighting
 * - Badge indicators
 * - Touch-friendly (48px targets)
 * - Safe area support
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/navigation';
import { Badge } from '@/components/ui/badge';

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 pb-safe md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors min-w-[64px] min-h-[48px] relative',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className={cn('transition-transform', isActive && 'scale-110')}>
              {item.icon}
            </div>
            <span className="truncate max-w-full">{item.title}</span>
            {item.badge && (
              <Badge 
                variant="destructive" 
                className="absolute top-0 right-1/4 h-4 min-w-[16px] px-1 text-[10px] flex items-center justify-center"
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
