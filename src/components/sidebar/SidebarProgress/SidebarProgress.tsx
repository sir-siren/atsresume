"use client";

import { useResumeStore } from "@/stores/resume.store";

export function SidebarProgress() {
  const progress = useResumeStore((s) => s.getOverallProgress());

  return (
    <div className="shrink-0 border-t border-border px-4 py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-text-muted">Resume Completion</span>
        <span className="text-xs font-bold text-text-primary">{progress}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
