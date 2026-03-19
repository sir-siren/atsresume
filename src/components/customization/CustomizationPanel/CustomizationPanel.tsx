"use client";

import { useCustomizationStore } from "@/stores/customization.store";
import { CollapsibleGroup } from "@/components/customization/ui/CollapsibleGroup";
import { ResetButton } from "@/components/customization/ui/ResetButton";
import { TemplateSection } from "@/components/customization/sections/TemplateSection";
import { LayoutSection } from "@/components/customization/sections/LayoutSection";
import { FontSection } from "@/components/customization/sections/FontSection";
import { ColorSection } from "@/components/customization/sections/ColorSection";
import { SpacingSection } from "@/components/customization/sections/SpacingSection";
import { HeaderSection } from "@/components/customization/sections/HeaderSection";
import { DividersSection } from "@/components/customization/sections/DividersSection";
import { PageSection } from "@/components/customization/sections/PageSection";
import {
    LayoutTemplate,
    Columns3,
    Type,
    Palette,
    Space,
    User,
    SeparatorHorizontal,
    FileText,
} from "lucide-react";

export function CustomizationPanel() {
    const resetSection = useCustomizationStore((s) => s.resetSection);
    const resetAll = useCustomizationStore((s) => s.resetAll);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-grey px-4 py-3">
                <h2 className="text-sm font-semibold text-text-primary">
                    Customization
                </h2>
                <ResetButton onClick={resetAll} />
            </div>

            {/* Scrollable sections */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <CollapsibleGroup
                    title="Template"
                    icon={LayoutTemplate}
                    onReset={() => resetSection("templateId")}
                >
                    <TemplateSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Layout"
                    icon={Columns3}
                    onReset={() => resetSection("columnLayout")}
                >
                    <LayoutSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Font"
                    icon={Type}
                    onReset={() => resetSection("font")}
                >
                    <FontSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Colors"
                    icon={Palette}
                    onReset={() => resetSection("colors")}
                >
                    <ColorSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Spacing"
                    icon={Space}
                    onReset={() => resetSection("spacing")}
                >
                    <SpacingSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Header & Photo"
                    icon={User}
                    onReset={() => resetSection("header")}
                >
                    <HeaderSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Section Dividers"
                    icon={SeparatorHorizontal}
                    onReset={() => resetSection("dividers")}
                >
                    <DividersSection />
                </CollapsibleGroup>

                <CollapsibleGroup
                    title="Page & Document"
                    icon={FileText}
                    defaultOpen={false}
                    onReset={() => resetSection("page")}
                >
                    <PageSection />
                </CollapsibleGroup>
            </div>
        </div>
    );
}
