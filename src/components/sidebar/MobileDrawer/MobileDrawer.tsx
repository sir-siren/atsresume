"use client";

import * as React from "react";
import { X } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import { cn } from "@/lib/cn";

interface MobileDrawerProps {
  children: React.ReactNode;
}

export function MobileDrawer({ children }: MobileDrawerProps) {
  const isMobileOpen = useResumeStore((s) => s.isMobileOpen);
  const setMobileOpen = useResumeStore((s) => s.setMobileOpen);
  const [mounted, setMounted] = React.useState(false);

  // Avoid SSR mismatch — only render drawer markup after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape
  React.useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, setMobileOpen]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal={isMobileOpen ? true : undefined}
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border",
          "flex flex-col lg:hidden",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center h-8 w-8 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {children}
      </div>
    </>
  );
}

