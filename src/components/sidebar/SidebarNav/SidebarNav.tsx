"use client";

import * as React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LayoutList, Plus } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import {
    RESUME_SECTIONS,
    SECTION_GROUPS,
    ICON_MAP,
} from "@/config/sections.config";
import type { SectionGroup } from "@/config/sections.config";
import { SortableSidebarNavItem } from "@/components/sidebar/SidebarNav/SortableSidebarNavItem";
import { SidebarNavItem } from "@/components/sidebar/SidebarNav/SidebarNavItem";

export function SidebarNav() {
    const [mounted, setMounted] = React.useState(false);
    const sectionConfigs = useResumeStore((s) => s.sectionConfigs);
    const reorderSections = useResumeStore((s) => s.reorderSections);
    const toggleSectionVisibility = useResumeStore(
        (s) => s.toggleSectionVisibility,
    );
    const addCustomSection = useResumeStore((s) => s.addCustomSection);
    const removeCustomSection = useResumeStore((s) => s.removeCustomSection);
    const customSections = useResumeStore((s) => s.customSections);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const orderedConfigs = [...sectionConfigs].sort(
        (a, b) => a.order - b.order,
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const fromIndex = orderedConfigs.findIndex((s) => s.id === active.id);
        const toIndex = orderedConfigs.findIndex((s) => s.id === over.id);
        if (fromIndex === -1 || toIndex === -1) return;
        reorderSections(fromIndex, toIndex);
    }

    // Build lookup for fixed sections
    const fixedSectionMap = new Map(RESUME_SECTIONS.map((s) => [s.id, s]));

    // Group sections for display
    const groupedSections: {
        group: SectionGroup;
        configs: typeof orderedConfigs;
    }[] = [];
    const usedGroups = new Set<SectionGroup>();

    for (const config of orderedConfigs) {
        const fixed = fixedSectionMap.get(config.id);
        const group: SectionGroup = fixed?.group ?? "Custom";
        if (!usedGroups.has(group)) {
            usedGroups.add(group);
            groupedSections.push({
                group,
                configs: orderedConfigs.filter((c) => {
                    const f = fixedSectionMap.get(c.id);
                    return (f?.group ?? "Custom") === group;
                }),
            });
        }
    }

    function renderItems(useDnd: boolean) {
        return SECTION_GROUPS.filter((g) => usedGroups.has(g)).map(
            (groupName) => {
                const groupConfigs =
                    groupedSections.find((gs) => gs.group === groupName)
                        ?.configs ?? [];
                if (groupConfigs.length === 0) return null;

                return (
                    <div key={groupName} className="mb-3">
                        <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted/60">
                            {groupName}
                        </p>
                        <ul className="space-y-0.5">
                            {groupConfigs.map((config) => {
                                const fixed = fixedSectionMap.get(config.id);
                                const isCustom = !fixed;
                                const customEntry = isCustom
                                    ? customSections.find(
                                          (cs) => cs.id === config.id,
                                      )
                                    : undefined;

                                const icon =
                                    fixed?.icon ??
                                    ICON_MAP["custom"] ??
                                    LayoutList;
                                const label =
                                    fixed?.label ??
                                    customEntry?.label ??
                                    "Custom Section";

                                if (useDnd) {
                                    return (
                                        <SortableSidebarNavItem
                                            key={config.id}
                                            id={config.id}
                                            label={label}
                                            customLabel={config.customLabel}
                                            icon={icon}
                                            isCustom={isCustom}
                                            isVisible={config.isVisible}
                                            onToggleVisibility={() =>
                                                toggleSectionVisibility(
                                                    config.id,
                                                )
                                            }
                                            onRemoveCustom={
                                                isCustom
                                                    ? () =>
                                                          removeCustomSection(
                                                              config.id,
                                                          )
                                                    : undefined
                                            }
                                        />
                                    );
                                }

                                return (
                                    <SidebarNavItem
                                        key={config.id}
                                        id={config.id}
                                        label={label}
                                        customLabel={config.customLabel}
                                        icon={icon}
                                        isCustom={isCustom}
                                        isVisible={config.isVisible}
                                        onToggleVisibility={() =>
                                            toggleSectionVisibility(config.id)
                                        }
                                        onRemoveCustom={
                                            isCustom
                                                ? () =>
                                                      removeCustomSection(
                                                          config.id,
                                                      )
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </ul>
                    </div>
                );
            },
        );
    }

    return (
        <nav
            aria-label="Resume sections"
            className="flex-1 overflow-y-auto px-2 py-3"
        >
            {mounted ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={orderedConfigs.map((c) => c.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {renderItems(true)}
                    </SortableContext>
                </DndContext>
            ) : (
                renderItems(false)
            )}

            {/* Add Custom Section button */}
            <div className="mt-2 px-3">
                <button
                    type="button"
                    onClick={addCustomSection}
                    className="flex w-full items-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-muted transition-colors hover:border-brand-500 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Add Custom Section
                </button>
            </div>
        </nav>
    );
}
