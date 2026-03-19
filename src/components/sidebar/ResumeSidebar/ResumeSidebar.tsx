"use client";

import { Menu } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import { SidebarHeader } from "@/components/sidebar/SidebarHeader";
import { SidebarActions } from "@/components/sidebar/SidebarActions";
import { SidebarNav } from "@/components/sidebar/SidebarNav";
import { SidebarProgress } from "@/components/sidebar/SidebarProgress";
import { MobileDrawer } from "@/components/sidebar/MobileDrawer";

/** Sidebar content shared between desktop and mobile */
function SidebarContent() {
  return (
    <>
      <SidebarHeader />
      <SidebarActions />
      <SidebarNav />
      <SidebarProgress />
    </>
  );
}

export function ResumeSidebar() {
  const setMobileOpen = useResumeStore((s) => s.setMobileOpen);

  return (
    <>
      {/* ── Desktop sidebar ────────────────── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:h-svh lg:sticky lg:top-0 bg-surface border-r border-border">
        <SidebarContent />
      </aside>

      {/* ── Mobile hamburger trigger ───────── */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-border shadow-lg lg:hidden transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5 text-text-primary" />
      </button>

      {/* ── Mobile drawer ──────────────────── */}
      <MobileDrawer>
        <SidebarContent />
      </MobileDrawer>
    </>
  );
}
