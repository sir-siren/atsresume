import { FormSections } from "@/components/FormSections";
import { PreviewPanel } from "@/components/PreviewPanel";

export default function Home() {
    return (
        <div className="flex flex-col xl:flex-row min-h-svh">
            {/* Form Panel (scrollable, hidden when printing) */}
            <div className="flex-1 overflow-y-auto bg-background print-hide">
                <FormSections />
            </div>

            {/* Preview Panel (scrollable, hidden on small screens) */}
            <div className="hidden xl:block xl:flex-1 overflow-y-auto border-l border-border-grey resume-preview">
                <PreviewPanel />
            </div>
        </div>
    );
}
