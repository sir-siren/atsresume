"use client";

import * as React from "react";
import { useCustomizationStore } from "@/stores/customization.store";
import { SliderInput } from "@/components/customization/ui/SliderInput";
import { SegmentedControl } from "@/components/customization/ui/SegmentedControl";
import type { FontOption, FontCategory } from "@/types/customization.types";
import { cn } from "@/lib/cn";

const FONT_OPTIONS: FontOption[] = [
    { family: "Inter", category: "sans-serif", googleFontName: "Inter" },
    { family: "Roboto", category: "sans-serif", googleFontName: "Roboto" },
    {
        family: "Open Sans",
        category: "sans-serif",
        googleFontName: "Open+Sans",
    },
    { family: "Lato", category: "sans-serif", googleFontName: "Lato" },
    { family: "Poppins", category: "sans-serif", googleFontName: "Poppins" },
    {
        family: "Montserrat",
        category: "sans-serif",
        googleFontName: "Montserrat",
    },
    { family: "Raleway", category: "sans-serif", googleFontName: "Raleway" },
    { family: "Nunito", category: "sans-serif", googleFontName: "Nunito" },
    {
        family: "Source Sans Pro",
        category: "sans-serif",
        googleFontName: "Source+Sans+3",
    },
    { family: "PT Sans", category: "sans-serif", googleFontName: "PT+Sans" },
    {
        family: "Merriweather",
        category: "serif",
        googleFontName: "Merriweather",
    },
    { family: "Georgia", category: "serif", googleFontName: "Georgia" },
    {
        family: "Playfair Display",
        category: "serif",
        googleFontName: "Playfair+Display",
    },
    { family: "Lora", category: "serif", googleFontName: "Lora" },
    { family: "EB Garamond", category: "serif", googleFontName: "EB+Garamond" },
    { family: "Times New Roman", category: "serif", googleFontName: "Tinos" },
    {
        family: "Courier Prime",
        category: "monospace",
        googleFontName: "Courier+Prime",
    },
    { family: "Fira Code", category: "monospace", googleFontName: "Fira+Code" },
    {
        family: "JetBrains Mono",
        category: "monospace",
        googleFontName: "JetBrains+Mono",
    },
];

type FilterCat = "all" | FontCategory;

const CATEGORY_OPTIONS: { value: FilterCat; label: string }[] = [
    { value: "all", label: "All" },
    { value: "sans-serif", label: "Sans" },
    { value: "serif", label: "Serif" },
    { value: "monospace", label: "Mono" },
];

export function FontSection() {
    const fontFamily = useCustomizationStore((s) => s.font.family);
    const fontSizes = useCustomizationStore((s) => s.font.sizes);
    const setFontFamily = useCustomizationStore((s) => s.setFontFamily);
    const setFontSizes = useCustomizationStore((s) => s.setFontSizes);

    const [search, setSearch] = React.useState("");
    const [catFilter, setCatFilter] = React.useState<FilterCat>("all");

    const filtered = FONT_OPTIONS.filter((f) => {
        if (catFilter !== "all" && f.category !== catFilter) return false;
        if (search && !f.family.toLowerCase().includes(search.toLowerCase()))
            return false;
        return true;
    });

    return (
        <div className="space-y-4">
            {/* Font Family */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Font Family
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search fonts..."
                    className="w-full rounded-md border border-border-grey bg-input-bg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                />
                <SegmentedControl
                    options={CATEGORY_OPTIONS}
                    value={catFilter}
                    onChange={setCatFilter}
                    size="sm"
                />
                <div className="max-h-40 overflow-y-auto rounded-md border border-border-grey bg-input-bg scrollbar-thin">
                    {filtered.map((f) => (
                        <button
                            key={f.family}
                            type="button"
                            onClick={() => setFontFamily(f.family)}
                            className={cn(
                                "flex w-full items-center justify-between px-3 py-1.5 text-xs transition-colors cursor-pointer",
                                "hover:bg-surface-muted focus-visible:outline-none focus-visible:bg-surface-muted",
                                fontFamily === f.family
                                    ? "text-brand-500 font-medium bg-brand-500/5"
                                    : "text-foreground",
                            )}
                        >
                            <span style={{ fontFamily: f.family }}>
                                {f.family}
                            </span>
                            <span className="text-[10px] text-muted-grey capitalize">
                                {f.category}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Font Sizes */}
            <div className="space-y-3">
                <span className="text-xs font-medium text-text-muted">
                    Font Sizes
                </span>
                <SliderInput
                    label="Body text"
                    value={fontSizes.base}
                    min={9}
                    max={13}
                    step={0.5}
                    unit="pt"
                    onChange={(v) => setFontSizes({ base: v })}
                />
                <SliderInput
                    label="Full name"
                    value={fontSizes.name}
                    min={18}
                    max={36}
                    step={1}
                    unit="pt"
                    onChange={(v) => setFontSizes({ name: v })}
                />
                <SliderInput
                    label="Section title"
                    value={fontSizes.sectionTitle}
                    min={11}
                    max={16}
                    step={0.5}
                    unit="pt"
                    onChange={(v) => setFontSizes({ sectionTitle: v })}
                />
                <SliderInput
                    label="Job title"
                    value={fontSizes.jobTitle}
                    min={10}
                    max={14}
                    step={0.5}
                    unit="pt"
                    onChange={(v) => setFontSizes({ jobTitle: v })}
                />
            </div>
        </div>
    );
}
