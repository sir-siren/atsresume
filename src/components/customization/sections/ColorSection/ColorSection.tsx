"use client";

import { useCustomizationStore } from "@/stores/customization.store";
import { ColorPicker } from "@/components/customization/ui/ColorPicker";
import { cn } from "@/lib/cn";
import type { ColorPreset, ColorPresetId } from "@/types/customization.types";

const COLOR_PRESETS: ColorPreset[] = [
    {
        id: "classic-black",
        label: "Classic",
        swatch: "#111827",
        colors: { accent: "#111827", nameText: "#111827" },
    },
    {
        id: "navy-blue",
        label: "Navy",
        swatch: "#1e3a5f",
        colors: { accent: "#2563eb", nameText: "#1e3a5f" },
    },
    {
        id: "forest-green",
        label: "Forest",
        swatch: "#166534",
        colors: { accent: "#16a34a", nameText: "#166534" },
    },
    {
        id: "burgundy",
        label: "Burgundy",
        swatch: "#9f1239",
        colors: { accent: "#e11d48", nameText: "#9f1239" },
    },
    {
        id: "slate-gray",
        label: "Slate",
        swatch: "#475569",
        colors: { accent: "#64748b", nameText: "#334155" },
    },
    {
        id: "deep-purple",
        label: "Purple",
        swatch: "#4c1d95",
        colors: { accent: "#7c3aed", nameText: "#4c1d95" },
    },
    {
        id: "terracotta",
        label: "Terra",
        swatch: "#9a3412",
        colors: { accent: "#ea580c", nameText: "#7c2d12" },
    },
    {
        id: "ocean-teal",
        label: "Teal",
        swatch: "#0f766e",
        colors: { accent: "#0d9488", nameText: "#0f766e" },
    },
    {
        id: "charcoal",
        label: "Charcoal",
        swatch: "#27272a",
        colors: { accent: "#52525b", nameText: "#18181b" },
    },
    {
        id: "rose-gold",
        label: "Rose",
        swatch: "#9f1239",
        colors: { accent: "#f43f5e", nameText: "#881337" },
    },
    {
        id: "midnight",
        label: "Midnight",
        swatch: "#1e1b4b",
        colors: { accent: "#4f46e5", nameText: "#1e1b4b" },
    },
];

export function ColorSection() {
    const colors = useCustomizationStore((s) => s.colors);
    const activePreset = useCustomizationStore((s) => s.activeColorPreset);
    const setColors = useCustomizationStore((s) => s.setColors);
    const setColorPreset = useCustomizationStore((s) => s.setColorPreset);

    const handlePreset = (preset: ColorPreset) => {
        setColors({
            accent: preset.colors.accent,
            nameText: preset.colors.nameText,
        });
        setColorPreset(preset.id);
    };

    return (
        <div className="space-y-4">
            {/* Color Presets */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Color Presets
                </span>
                <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => handlePreset(p)}
                            title={p.label}
                            className={cn(
                                "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                activePreset === p.id
                                    ? "border-brand-500 scale-110"
                                    : "border-border-grey",
                            )}
                            style={{ backgroundColor: p.swatch }}
                            aria-label={p.label}
                        />
                    ))}
                </div>
            </div>

            {/* Individual Color Pickers */}
            <div className="space-y-3">
                <ColorPicker
                    label="Accent Color"
                    value={colors.accent}
                    onChange={(v) => setColors({ accent: v })}
                />
                <ColorPicker
                    label="Name Color"
                    value={colors.nameText}
                    onChange={(v) => setColors({ nameText: v })}
                />
                <ColorPicker
                    label="Body Text"
                    value={colors.bodyText}
                    onChange={(v) => setColors({ bodyText: v })}
                />
                <ColorPicker
                    label="Muted Text"
                    value={colors.mutedText}
                    onChange={(v) => setColors({ mutedText: v })}
                />
                <ColorPicker
                    label="Background"
                    value={colors.background}
                    onChange={(v) => setColors({ background: v })}
                />
                <ColorPicker
                    label="Section Divider"
                    value={colors.divider}
                    onChange={(v) => setColors({ divider: v })}
                />
            </div>
        </div>
    );
}
