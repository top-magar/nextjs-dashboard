/**
 * Navigation Context
 * 
 * Provides global state management for navigation UI elements
 * (sidebar, mobile menu, etc.)
 */

'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { NavigationContextType } from '@/types/navigation';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

type NavigationProviderProps = {
  children: ReactNode;
  defaultCollapsed?: boolean;
};

export function NavigationProvider({ 
  children, 
  defaultCollapsed = false 
}: NavigationProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(defaultCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) {
      setIsSidebarCollapsed(stored === 'true');
    }
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsSidebarCollapsed(true);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsSidebarCollapsed(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        isSidebarCollapsed,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
        isMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Hook to access navigation context
 * Must be used within NavigationProvider
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
