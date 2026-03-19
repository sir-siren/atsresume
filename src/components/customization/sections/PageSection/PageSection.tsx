"use client";

import { useCustomizationStore } from "@/stores/customization.store";
import { SegmentedControl } from "@/components/customization/ui/SegmentedControl";
import type {
    PageSize,
    DateFormat,
    TextDirection,
} from "@/types/customization.types";

const PAGE_SIZE_OPTIONS: { value: PageSize; label: string }[] = [
    { value: "A4", label: "A4  (210×297mm)" },
    { value: "Letter", label: "Letter  (8.5×11in)" },
    { value: "Legal", label: "Legal  (8.5×14in)" },
];

const DATE_FORMAT_OPTIONS: { value: DateFormat; label: string }[] = [
    { value: "MMM YYYY", label: "Jan 2024" },
    { value: "MM/YYYY", label: "01/2024" },
    { value: "YYYY-MM", label: "2024-01" },
    { value: "MMMM YYYY", label: "January 2024" },
    { value: "MMM DD, YYYY", label: "Jan 15, 2024" },
    { value: "YYYY", label: "2024" },
    { value: "MM/DD/YYYY", label: "01/15/2024" },
];

const DIR_OPTIONS: { value: TextDirection; label: string }[] = [
    { value: "ltr", label: "LTR" },
    { value: "rtl", label: "RTL" },
];

export function PageSection() {
    const page = useCustomizationStore((s) => s.page);
    const setPage = useCustomizationStore((s) => s.setPage);

    return (
        <div className="space-y-4">
            {/* Paper Size */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Paper Size
                </span>
                <SegmentedControl
                    options={PAGE_SIZE_OPTIONS}
                    value={page.size}
                    onChange={(v) => setPage({ size: v })}
                    size="sm"
                />
            </div>

            {/* Date Format */}
            <div className="space-y-2">
                <label
                    htmlFor="date-format-select"
                    className="text-xs font-medium text-text-muted"
                >
                    Date Format
                </label>
                <select
                    id="date-format-select"
                    value={page.dateFormat}
                    onChange={(e) =>
                        setPage({ dateFormat: e.target.value as DateFormat })
                    }
                    className="w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-xs text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                    {DATE_FORMAT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label} ({o.value})
                        </option>
                    ))}
                </select>
            </div>

            {/* Present Label */}
            <div className="space-y-2">
                <label
                    htmlFor="present-label"
                    className="text-xs font-medium text-text-muted"
                >
                    &ldquo;Present&rdquo; Label
                </label>
                <input
                    id="present-label"
                    type="text"
                    value={page.presentLabel}
                    onChange={(e) => setPage({ presentLabel: e.target.value })}
                    className="w-full rounded-md border border-border-grey bg-input-bg px-3 py-1.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                />
            </div>

            {/* Text Direction */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Text Direction
                </span>
                <SegmentedControl
                    options={DIR_OPTIONS}
                    value={page.textDirection}
                    onChange={(v) => setPage({ textDirection: v })}
                    size="sm"
                />
            </div>

            {/* Page Numbers */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Page Numbers
                </span>
                <SegmentedControl
                    options={[
                        { value: "off", label: "Off" },
                        { value: "on", label: "On" },
                    ]}
                    value={page.showPageNumber ? "on" : "off"}
                    onChange={(v) => setPage({ showPageNumber: v === "on" })}
                    size="sm"
                />
            </div>
        </div>
    );
}
