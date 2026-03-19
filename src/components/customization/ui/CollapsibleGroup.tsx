"use client";

import * as React from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface CollapsibleGroupProps {
    title: string;
    icon: LucideIcon;
    defaultOpen?: boolean;
    onReset?: () => void;
    children: React.ReactNode;
}

export function CollapsibleGroup({
    title,
    icon: Icon,
    defaultOpen = true,
    onReset,
    children,
}: CollapsibleGroupProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="border-b border-border-grey last:border-b-0">
            <div className="flex items-center justify-between px-4 py-3">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-1 items-center gap-2.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                    <ChevronDown
                        className={cn(
                            "h-3.5 w-3.5 text-text-muted transition-transform duration-200",
                            !isOpen && "-rotate-90",
                        )}
                    />
                    <Icon className="h-4 w-4 text-text-muted" />
                    <span className="text-sm font-medium text-text-primary">
                        {title}
                    </span>
                </button>
                {onReset && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="rounded p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        title="Reset to defaults"
                        aria-label={`Reset ${title}`}
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
            {isOpen && <div className="px-4 pb-4 space-y-4">{children}</div>}
        </div>
    );
}
