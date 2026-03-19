"use client";

import type { LucideIcon } from "lucide-react";
import type { SectionId } from "@/types/resume.types";
import { useResumeStore } from "@/stores/resume.store";
import { cn } from "@/lib/cn";

interface SidebarNavItemProps {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

export function SidebarNavItem({ id, label, icon: Icon }: SidebarNavItemProps) {
  const activeSection = useResumeStore((s) => s.activeSection);
  const setActiveSection = useResumeStore((s) => s.setActiveSection);
  const setMobileOpen = useResumeStore((s) => s.setMobileOpen);
  const isComplete = useResumeStore((s) => s.getSectionCompletion(id));
  const isActive = activeSection === id;

  const handleClick = () => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
        "text-text-muted hover:bg-surface-muted hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        isActive && "bg-brand-500/10 text-brand-600 font-semibold"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left truncate">{label}</span>
      <span
        className={cn(
          "h-2 w-2 rounded-full shrink-0",
          isComplete
            ? "bg-green-500"
            : "bg-text-muted/30 border border-text-muted/40"
        )}
      />
    </button>
  );
}
