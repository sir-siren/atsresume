"use client";

import { cn } from "@/lib/cn";

interface SegmentOption<T extends string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
    ariaLabel?: string;
}

interface SegmentedControlProps<T extends string> {
    options: SegmentOption<T>[];
    value: T;
    onChange: (value: T) => void;
    size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
    size = "md",
}: SegmentedControlProps<T>) {
    return (
        <div
            className="inline-flex rounded-md border border-border-grey bg-input-bg p-0.5"
            role="radiogroup"
        >
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={value === opt.value}
                    aria-label={opt.ariaLabel ?? opt.label}
                    onClick={() => onChange(opt.value)}
                    className={cn(
                        "inline-flex items-center justify-center gap-1.5 rounded-[5px] font-medium transition-colors cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        size === "sm"
                            ? "px-2 py-1 text-[10px]"
                            : "px-3 py-1.5 text-xs",
                        value === opt.value
                            ? "bg-brand-500 text-background shadow-sm"
                            : "text-text-muted hover:text-text-primary",
                    )}
                >
                    {opt.icon}
                    <span>{opt.label}</span>
                </button>
            ))}
        </div>
    );
}
