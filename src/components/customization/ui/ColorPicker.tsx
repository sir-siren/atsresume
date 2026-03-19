"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

const QUICK_COLORS = [
    "#111827",
    "#374151",
    "#6b7280",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#1e3a5f",
    "#166534",
    "#9f1239",
    "#ffffff",
];

interface ColorPickerProps {
    value: string;
    onChange: (hex: string) => void;
    label: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
    const [open, setOpen] = React.useState(false);
    const [localHex, setLocalHex] = React.useState(value);
    const ref = React.useRef<HTMLDivElement>(null);
    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );

    React.useEffect(() => {
        setLocalHex(value);
    }, [value]);

    React.useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
        }
        if (open) document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [open]);

    const handleHexInput = (hex: string) => {
        setLocalHex(hex);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (/^#[0-9a-fA-F]{6}$/.test(hex)) onChange(hex);
        }, 300);
    };

    return (
        <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">{label}</span>
            <div className="relative" ref={ref}>
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 rounded border border-border-grey bg-input-bg px-2 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                    <span
                        className="h-4 w-4 rounded border border-border-grey shrink-0"
                        style={{ backgroundColor: value }}
                    />
                    <span className="text-[10px] text-muted-grey font-mono">
                        {value}
                    </span>
                </button>

                {open && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-lg border border-border-grey bg-surface p-3 shadow-xl space-y-3">
                        {/* Quick swatches */}
                        <div className="grid grid-cols-8 gap-1.5">
                            {QUICK_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => {
                                        onChange(c);
                                        setLocalHex(c);
                                    }}
                                    className={cn(
                                        "h-5 w-5 rounded border cursor-pointer transition-transform hover:scale-110",
                                        value === c
                                            ? "border-brand-500 ring-1 ring-brand-500"
                                            : "border-border-grey",
                                    )}
                                    style={{ backgroundColor: c }}
                                    aria-label={c}
                                />
                            ))}
                        </div>
                        {/* Native color picker */}
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    setLocalHex(e.target.value);
                                }}
                                className="h-7 w-7 rounded border-0 bg-transparent cursor-pointer p-0"
                            />
                            <input
                                type="text"
                                value={localHex}
                                onChange={(e) => handleHexInput(e.target.value)}
                                className="flex-1 h-7 rounded border border-border-grey bg-input-bg px-2 text-xs font-mono text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
                                placeholder="#000000"
                                maxLength={7}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
