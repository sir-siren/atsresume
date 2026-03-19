"use client";

import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
    onClick: () => void;
    label?: string;
}

export function ResetButton({
    onClick,
    label = "Reset All",
}: ResetButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 rounded-md border border-border-grey px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
            <RotateCcw className="h-3 w-3" />
            {label}
        </button>
    );
}
