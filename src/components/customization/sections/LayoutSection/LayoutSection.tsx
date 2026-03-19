"use client";

import { useCustomizationStore } from "@/stores/customization.store";
import { SegmentedControl } from "@/components/customization/ui/SegmentedControl";
import type { ColumnLayout, HeaderLayout } from "@/types/customization.types";
import { Columns2, Columns3, PanelLeft, PanelRight } from "lucide-react";

const COLUMN_OPTIONS: {
    value: ColumnLayout;
    label: string;
    icon: React.ReactNode;
}[] = [
    {
        value: "one-column",
        label: "One",
        icon: <Columns2 className="h-3 w-3" />,
    },
    {
        value: "two-column",
        label: "Two",
        icon: <Columns3 className="h-3 w-3" />,
    },
    {
        value: "sidebar-left",
        label: "Left",
        icon: <PanelLeft className="h-3 w-3" />,
    },
    {
        value: "sidebar-right",
        label: "Right",
        icon: <PanelRight className="h-3 w-3" />,
    },
];

const HEADER_OPTIONS: { value: HeaderLayout; label: string }[] = [
    { value: "name-left-contact-right", label: "Name Left · Contact Right" },
    { value: "name-center-contact-center", label: "Centered" },
    { value: "name-top-contact-below", label: "Stacked" },
    { value: "name-left-contact-below", label: "Name Left · Contact Below" },
];

export function LayoutSection() {
    const columnLayout = useCustomizationStore((s) => s.columnLayout);
    const headerLayout = useCustomizationStore((s) => s.header.layout);
    const setColumnLayout = useCustomizationStore((s) => s.setColumnLayout);
    const setHeader = useCustomizationStore((s) => s.setHeader);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Column Layout
                </span>
                <SegmentedControl
                    options={COLUMN_OPTIONS}
                    value={columnLayout}
                    onChange={setColumnLayout}
                    size="sm"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="header-layout-select"
                    className="text-xs font-medium text-text-muted"
                >
                    Header Style
                </label>
                <select
                    id="header-layout-select"
                    value={headerLayout}
                    onChange={(e) =>
                        setHeader({ layout: e.target.value as HeaderLayout })
                    }
                    className="w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-xs text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                    {HEADER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
