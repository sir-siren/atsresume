"use client";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import type {
    TemplateDefinition,
    TemplateId,
} from "@/types/customization.types";

interface TemplateCardProps {
    template: TemplateDefinition;
    isActive: boolean;
    onSelect: (id: TemplateId) => void;
}

export function TemplateCard({
    template,
    isActive,
    onSelect,
}: TemplateCardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
                "group relative flex flex-col items-center gap-1.5 rounded-lg border-2 p-1.5 transition-all cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                isActive
                    ? "border-brand-500 bg-brand-500/10"
                    : "border-border-grey hover:border-text-muted",
            )}
        >
            {/* Template preview placeholder */}
            <div className="relative w-full aspect-3/4 rounded bg-surface-muted flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 flex flex-col gap-1">
                    {/* Mini template wireframe */}
                    <div className="h-2 w-3/4 rounded-sm bg-text-muted/30" />
                    <div className="h-1 w-1/2 rounded-sm bg-text-muted/20" />
                    <div className="mt-1 h-0.5 w-full rounded-sm bg-text-muted/10" />
                    <div className="flex-1 space-y-0.5">
                        <div className="h-0.5 w-full rounded-sm bg-text-muted/10" />
                        <div className="h-0.5 w-4/5 rounded-sm bg-text-muted/10" />
                        <div className="h-0.5 w-3/4 rounded-sm bg-text-muted/10" />
                    </div>
                </div>

                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-500/20">
                        <div className="rounded-full bg-brand-500 p-1">
                            <Check className="h-3 w-3 text-background" />
                        </div>
                    </div>
                )}

                {template.isAtsOptimized && (
                    <span className="absolute top-1 right-1 rounded px-1 py-0.5 text-[8px] font-bold bg-green-600/90 text-white">
                        ATS
                    </span>
                )}
            </div>

            <span
                className={cn(
                    "text-[10px] font-medium truncate w-full text-center",
                    isActive ? "text-brand-500" : "text-text-muted",
                )}
            >
                {template.name}
            </span>
        </button>
    );
}
