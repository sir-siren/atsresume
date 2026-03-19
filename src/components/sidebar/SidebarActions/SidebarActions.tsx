"use client";

import * as React from "react";
import { Upload, Download, FileDown } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import type { ResumeData } from "@/types/resume.types";
import { cn } from "@/lib/cn";

const ACTION_BUTTON_CLASS =
  "flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface-muted px-2 py-2 text-xs font-medium text-text-muted transition-colors hover:bg-border hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer";

export function SidebarActions() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const loadFromJSON = useResumeStore((s) => s.loadFromJSON);
  const exportToJSON = useResumeStore((s) => s.exportToJSON);

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as ResumeData;
        loadFromJSON(parsed);
      } catch {
        // silently fail for invalid JSON
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSave = () => {
    const data = exportToJSON();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-3 border-b border-border">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
        <button type="button" className={cn(ACTION_BUTTON_CLASS)} onClick={handleLoad}>
          <Upload className="h-3.5 w-3.5" />
          Load
        </button>
        <button type="button" className={cn(ACTION_BUTTON_CLASS)} onClick={handleSave}>
          <Download className="h-3.5 w-3.5" />
          Save
        </button>
      </div>
      <button
        type="button"
        className={cn(
          ACTION_BUTTON_CLASS,
          "bg-brand-500/10 text-brand-600 border-brand-600/30 hover:bg-brand-500/20 hover:text-brand-500"
        )}
        onClick={handleDownloadPDF}
      >
        <FileDown className="h-3.5 w-3.5" />
        Download PDF
      </button>
    </div>
  );
}

