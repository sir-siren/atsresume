import { ResumeSidebar } from "@/components/sidebar/ResumeSidebar";

export default function BuilderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-svh bg-background text-foreground">
            <ResumeSidebar />
            <main className="flex-1 overflow-y-auto resume-preview">
                {children}
            </main>
        </div>
    );
}
