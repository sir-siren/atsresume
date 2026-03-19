"use client";

import * as React from "react";
import { Eye, EyeOff, GripVertical, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import { cn } from "@/lib/cn";
import type { SectionId } from "@/types/resume.types";

interface SidebarNavItemProps {
    id: string;
    label: string;
    customLabel?: string;
    icon: LucideIcon;
    isCustom?: boolean;
    isVisible: boolean;
    dragHandleProps?: Record<string, unknown>;
    onToggleVisibility: () => void;
    onRemoveCustom?: () => void;
}

export function SidebarNavItem({
    id,
    label,
    customLabel,
    icon: Icon,
    isCustom,
    isVisible,
    dragHandleProps,
    onToggleVisibility,
    onRemoveCustom,
}: SidebarNavItemProps) {
    const activeSection = useResumeStore((s) => s.activeSection);
    const setActiveSection = useResumeStore((s) => s.setActiveSection);
    const setMobileOpen = useResumeStore((s) => s.setMobileOpen);
    const getSectionCompletion = useResumeStore((s) => s.getSectionCompletion);
    const renameSectionLabel = useResumeStore((s) => s.renameSectionLabel);

    const isActive = activeSection === id;
    const isComplete = getSectionCompletion(id);
    const displayLabel = customLabel ?? label;

    const handleClick = () => {
        setActiveSection(id as SectionId);
        setMobileOpen(false);
    };

    return (
        <li className="group relative">
            <div className="flex items-center gap-0.5">
                {/* Drag handle */}
                <button
                    type="button"
                    className="shrink-0 cursor-grab opacity-0 group-hover:opacity-100 text-text-muted hover:text-text-primary p-1 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                    aria-label="Drag to reorder"
                    {...dragHandleProps}
                >
                    <GripVertical className="h-3 w-3" />
                </button>

                {/* Main nav button */}
                <button
                    type="button"
                    onClick={handleClick}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                        "flex flex-1 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        isActive
                            ? "bg-brand-500/10 text-brand-600"
                            : "text-text-muted hover:bg-surface-muted hover:text-text-primary",
                        !isVisible && "opacity-40",
                    )}
                >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />

                    {isCustom ? (
                        <input
                            type="text"
                            value={displayLabel}
                            onChange={(e) =>
                                renameSectionLabel(id, e.target.value)
                            }
                            onBlur={(e) => {
                                if (!e.target.value.trim())
                                    renameSectionLabel(id, "Custom Section");
                            }}
                            className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-text-muted/60 min-w-0"
                            placeholder="Section name"
                            aria-label="Edit section name"
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <span
                            className={cn(
                                "flex-1 truncate text-left",
                                !isVisible && "line-through",
                            )}
                        >
                            {displayLabel}
                        </span>
                    )}

                    {/* Completion dot */}
                    <span
                        className={cn(
                            "h-2 w-2 shrink-0 rounded-full",
                            isComplete
                                ? "bg-green-500"
                                : "border border-text-muted/30 bg-transparent",
                        )}
                        aria-label={
                            isComplete ? "Section complete" : "Section empty"
                        }
                    />
                </button>

                {/* Visibility toggle */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility();
                    }}
                    className="shrink-0 rounded p-1 text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors"
                    aria-label={
                        isVisible
                            ? "Hide section from resume"
                            : "Show section on resume"
                    }
                    title={isVisible ? "Hide from resume" : "Show on resume"}
                >
                    {isVisible ? (
                        <Eye className="h-3.5 w-3.5" />
                    ) : (
                        <EyeOff className="h-3.5 w-3.5 text-text-muted/50" />
                    )}
                </button>

                {/* Remove custom section */}
                {isCustom && onRemoveCustom && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemoveCustom();
                        }}
                        className="shrink-0 hidden group-hover:flex rounded p-1 text-text-muted hover:text-red-400 focus-visible:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                        aria-label="Remove custom section"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        </li>
    );
}
