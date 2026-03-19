"use client";

import { FileText } from "lucide-react";

export function SidebarHeader() {
    return (
        <div className="flex items-center gap-3 border-b border-border px-4 h-16 shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-surface-muted">
                <FileText className="h-4 w-4 text-brand-500" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary leading-tight">
                    Resume Builder
                </span>
                <span className="text-xs text-text-muted leading-tight">
                    ATS-Optimized
                </span>
            </div>
        </div>
    );
}
