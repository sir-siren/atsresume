"use client";

import { useCustomizationStore } from "@/stores/customization.store";
import { SegmentedControl } from "@/components/customization/ui/SegmentedControl";
import { SliderInput } from "@/components/customization/ui/SliderInput";
import type {
    DividerStyle,
    DividerPosition,
} from "@/types/customization.types";

const STYLE_OPTIONS: { value: DividerStyle; label: string }[] = [
    { value: "solid", label: "━━ Solid" },
    { value: "dashed", label: "- - Dashed" },
    { value: "dotted", label: "··· Dotted" },
    { value: "double", label: "═══ Double" },
    { value: "none", label: "None" },
];

const POSITION_OPTIONS: { value: DividerPosition; label: string }[] = [
    { value: "below-title", label: "Below" },
    { value: "above-title", label: "Above" },
    { value: "both", label: "Both" },
    { value: "none", label: "None" },
];

export function DividersSection() {
    const dividers = useCustomizationStore((s) => s.dividers);
    const setDividers = useCustomizationStore((s) => s.setDividers);

    return (
        <div className="space-y-4">
            {/* Show / Hide */}
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={dividers.showSectionDividers}
                    onChange={(e) =>
                        setDividers({ showSectionDividers: e.target.checked })
                    }
                    className="h-3.5 w-3.5 rounded border-border-grey bg-input-bg accent-brand-500 cursor-pointer"
                />
                <span className="text-xs text-foreground">
                    Show section dividers
                </span>
            </label>

            {dividers.showSectionDividers && (
                <>
                    <div className="space-y-2">
                        <span className="text-xs font-medium text-text-muted">
                            Style
                        </span>
                        <SegmentedControl
                            options={STYLE_OPTIONS}
                            value={dividers.style}
                            onChange={(v) => setDividers({ style: v })}
                            size="sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-medium text-text-muted">
                            Position
                        </span>
                        <SegmentedControl
                            options={POSITION_OPTIONS}
                            value={dividers.position}
                            onChange={(v) => setDividers({ position: v })}
                            size="sm"
                        />
                    </div>

                    <SliderInput
                        label="Thickness"
                        value={dividers.thickness}
                        min={0.5}
                        max={3}
                        step={0.5}
                        unit="px"
                        onChange={(v) => setDividers({ thickness: v })}
                    />

                    <SliderInput
                        label="Opacity"
                        value={dividers.opacity}
                        min={0}
                        max={100}
                        step={5}
                        unit="%"
                        onChange={(v) => setDividers({ opacity: v })}
                    />
                </>
            )}
        </div>
    );
}
