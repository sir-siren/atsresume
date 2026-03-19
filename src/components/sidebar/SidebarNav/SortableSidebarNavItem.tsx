"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SidebarNavItem } from "@/components/sidebar/SidebarNav/SidebarNavItem";
import type { LucideIcon } from "lucide-react";

interface SortableSidebarNavItemProps {
    id: string;
    label: string;
    customLabel?: string;
    icon: LucideIcon;
    isCustom?: boolean;
    isVisible: boolean;
    onToggleVisibility: () => void;
    onRemoveCustom?: () => void;
}

export function SortableSidebarNavItem({
    id,
    label,
    customLabel,
    icon,
    isCustom,
    isVisible,
    onToggleVisibility,
    onRemoveCustom,
}: SortableSidebarNavItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
        position: "relative" as const,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <SidebarNavItem
                id={id}
                label={label}
                customLabel={customLabel}
                icon={icon}
                isCustom={isCustom}
                isVisible={isVisible}
                dragHandleProps={{ ...attributes, ...listeners }}
                onToggleVisibility={onToggleVisibility}
                onRemoveCustom={onRemoveCustom}
            />
        </div>
    );
}
