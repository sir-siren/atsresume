"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface SliderInputProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    onChange: (value: number) => void;
}

export function SliderInput({
    label,
    value,
    min,
    max,
    step,
    unit,
    onChange,
}: SliderInputProps) {
    const [localValue, setLocalValue] = React.useState(String(value));

    React.useEffect(() => {
        setLocalValue(String(value));
    }, [value]);

    const handleBlur = () => {
        const n = parseFloat(localValue);
        if (Number.isNaN(n)) {
            setLocalValue(String(value));
            return;
        }
        const clamped = Math.min(max, Math.max(min, n));
        onChange(clamped);
        setLocalValue(String(clamped));
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted w-28 shrink-0 truncate">
                {label}
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className={cn(
                    "flex-1 h-1.5 appearance-none rounded-full bg-border-grey cursor-pointer",
                    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5",
                    "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:cursor-grab",
                    "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full",
                    "[&::-moz-range-thumb]:bg-brand-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-grab",
                )}
            />
            <div className="flex items-center gap-0.5 shrink-0">
                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleBlur();
                    }}
                    className="w-12 h-7 rounded border border-border-grey bg-input-bg px-1.5 text-xs text-center text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
                />
                {unit && (
                    <span className="text-[10px] text-muted-grey">{unit}</span>
                )}
            </div>
        </div>
    );
}
