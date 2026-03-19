"use client";

import { useResumeStore } from "@/stores/resume.store";

export function SidebarProgress() {
    const progress = useResumeStore((s) => s.getOverallProgress());

    return (
        <div className="px-4 py-3 border-t border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted font-medium">Progress</span>
                <span className="text-text-primary font-semibold">
                    {progress}%
                </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
                <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-500 ease-out"
                    style={{ width: `${String(progress)}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Resume ${String(progress)}% complete`}
                />
            </div>
        </div>
    );
}
