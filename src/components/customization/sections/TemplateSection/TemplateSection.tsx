"use client";

import * as React from "react";
import { useCustomizationStore } from "@/stores/customization.store";
import { SegmentedControl } from "@/components/customization/ui/SegmentedControl";
import { TemplateCard } from "@/components/customization/sections/TemplateSection/TemplateCard";
import type {
    TemplateDefinition,
    TemplateId,
} from "@/types/customization.types";

const TEMPLATES: TemplateDefinition[] = [
    {
        id: "classic",
        name: "Classic",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "modern",
        name: "Modern",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "executive",
        name: "Executive",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "corporate",
        name: "Corporate",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "mercury",
        name: "Mercury",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "minimal",
        name: "Minimal",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "elegant",
        name: "Elegant",
        category: "one-column",
        isAtsOptimized: false,
    },
    {
        id: "two-column",
        name: "Two Column",
        category: "two-column",
        isAtsOptimized: true,
    },
    {
        id: "professional",
        name: "Professional",
        category: "two-column",
        isAtsOptimized: true,
    },
    { id: "bold", name: "Bold", category: "two-column", isAtsOptimized: false },
    {
        id: "sidebar-left",
        name: "Sidebar Left",
        category: "sidebar",
        isAtsOptimized: true,
    },
    {
        id: "sidebar-right",
        name: "Sidebar Right",
        category: "sidebar",
        isAtsOptimized: true,
    },
    {
        id: "academic",
        name: "Academic",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "creative",
        name: "Creative",
        category: "two-column",
        isAtsOptimized: false,
    },
    {
        id: "compact",
        name: "Compact",
        category: "one-column",
        isAtsOptimized: true,
    },
    {
        id: "technical",
        name: "Technical",
        category: "one-column",
        isAtsOptimized: true,
    },
];

type FilterCategory = "all" | "one-column" | "two-column" | "sidebar";

const FILTER_OPTIONS: { value: FilterCategory; label: string }[] = [
    { value: "all", label: "All" },
    { value: "one-column", label: "One Column" },
    { value: "two-column", label: "Two Column" },
    { value: "sidebar", label: "Sidebar" },
];

export function TemplateSection() {
    const templateId = useCustomizationStore((s) => s.templateId);
    const setTemplate = useCustomizationStore((s) => s.setTemplate);
    const setColumnLayout = useCustomizationStore((s) => s.setColumnLayout);
    const [filter, setFilter] = React.useState<FilterCategory>("all");

    const filtered =
        filter === "all"
            ? TEMPLATES
            : TEMPLATES.filter((t) => t.category === filter);

    const handleSelect = (id: TemplateId) => {
        setTemplate(id);
        const tpl = TEMPLATES.find((t) => t.id === id);
        if (tpl) {
            const layoutMap: Record<
                string,
                "one-column" | "two-column" | "sidebar-left" | "sidebar-right"
            > = {
                "one-column": "one-column",
                "two-column": "two-column",
                sidebar: "sidebar-left",
            };
            setColumnLayout(layoutMap[tpl.category] ?? "one-column");
        }
    };

    return (
        <div className="space-y-3">
            <SegmentedControl
                options={FILTER_OPTIONS}
                value={filter}
                onChange={setFilter}
                size="sm"
            />
            <div className="grid grid-cols-3 gap-2">
                {filtered.map((t) => (
                    <TemplateCard
                        key={t.id}
                        template={t}
                        isActive={templateId === t.id}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
