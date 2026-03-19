"use client";

import * as React from "react";
import { useCustomizationStore } from "@/stores/customization.store";
import { SliderInput } from "@/components/customization/ui/SliderInput";
import { Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/cn";

export function SpacingSection() {
    const spacing = useCustomizationStore((s) => s.spacing);
    const setSpacing = useCustomizationStore((s) => s.setSpacing);
    const [locked, setLocked] = React.useState(true);

    const handleMargin = (
        key: "marginTop" | "marginBottom" | "marginLeft" | "marginRight",
        value: number,
    ) => {
        if (locked) {
            setSpacing({
                marginTop: value,
                marginBottom: value,
                marginLeft: value,
                marginRight: value,
            });
        } else {
            setSpacing({ [key]: value });
        }
    };

    return (
        <div className="space-y-5">
            {/* Margins */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-muted">
                        Page Margins
                    </span>
                    <button
                        type="button"
                        onClick={() => setLocked(!locked)}
                        className={cn(
                            "inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                            locked
                                ? "text-brand-500 bg-brand-500/10"
                                : "text-text-muted hover:text-text-primary",
                        )}
                    >
                        {locked ? (
                            <Lock className="h-3 w-3" />
                        ) : (
                            <Unlock className="h-3 w-3" />
                        )}
                        {locked ? "Locked" : "Unlocked"}
                    </button>
                </div>
                <SliderInput
                    label="Top"
                    value={spacing.marginTop}
                    min={0.25}
                    max={1.5}
                    step={0.05}
                    unit="in"
                    onChange={(v) => handleMargin("marginTop", v)}
                />
                <SliderInput
                    label="Bottom"
                    value={spacing.marginBottom}
                    min={0.25}
                    max={1.5}
                    step={0.05}
                    unit="in"
                    onChange={(v) => handleMargin("marginBottom", v)}
                />
                <SliderInput
                    label="Left"
                    value={spacing.marginLeft}
                    min={0.25}
                    max={1.5}
                    step={0.05}
                    unit="in"
                    onChange={(v) => handleMargin("marginLeft", v)}
                />
                <SliderInput
                    label="Right"
                    value={spacing.marginRight}
                    min={0.25}
                    max={1.5}
                    step={0.05}
                    unit="in"
                    onChange={(v) => handleMargin("marginRight", v)}
                />
            </div>

            {/* Line Height */}
            <div className="space-y-3">
                <span className="text-xs font-medium text-text-muted">
                    Line Height
                </span>
                <SliderInput
                    label="Body text"
                    value={spacing.lineHeightBody}
                    min={1.0}
                    max={2.0}
                    step={0.05}
                    onChange={(v) => setSpacing({ lineHeightBody: v })}
                />
                <SliderInput
                    label="Compact list"
                    value={spacing.lineHeightCompact}
                    min={1.0}
                    max={2.0}
                    step={0.05}
                    onChange={(v) => setSpacing({ lineHeightCompact: v })}
                />
            </div>

            {/* Section Spacing */}
            <div className="space-y-3">
                <span className="text-xs font-medium text-text-muted">
                    Section Spacing
                </span>
                <SliderInput
                    label="Between sections"
                    value={spacing.sectionGap}
                    min={0}
                    max={24}
                    step={2}
                    unit="pt"
                    onChange={(v) => setSpacing({ sectionGap: v })}
                />
                <SliderInput
                    label="Between entries"
                    value={spacing.entryGap}
                    min={0}
                    max={16}
                    step={2}
                    unit="pt"
                    onChange={(v) => setSpacing({ entryGap: v })}
                />
                <SliderInput
                    label="Bullet indent"
                    value={spacing.bulletIndent}
                    min={0}
                    max={24}
                    step={2}
                    unit="pt"
                    onChange={(v) => setSpacing({ bulletIndent: v })}
                />
            </div>
        </div>
    );
}
