import { CustomizationPanel } from "@/components/customization/CustomizationPanel";
import { PreviewPanel } from "@/components/PreviewPanel";

export default function CustomizePage() {
    return (
        <div className="flex flex-col xl:flex-row min-h-svh">
            {/* Customization Panel (scrollable, hidden when printing) */}
            <div className="flex-1 overflow-y-auto bg-background print-hide">
                <CustomizationPanel />
            </div>

            {/* Preview Panel (scrollable, hidden on small screens) */}
            <div className="hidden xl:block xl:flex-1 overflow-y-auto border-l border-border-grey resume-preview">
                <PreviewPanel />
            </div>
        </div>
    );
}
