"use client";

import * as React from "react";
import Image from "next/image";
import { useCustomizationStore } from "@/stores/customization.store";
import { SegmentedControl } from "@/components/customization/ui/SegmentedControl";
import { Upload, X, Circle, Square, RectangleHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import type {
    NameCase,
    PhotoShape,
    PhotoSize,
} from "@/types/customization.types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const SHAPE_OPTIONS: {
    value: PhotoShape;
    label: string;
    icon: React.ReactNode;
}[] = [
    { value: "circle", label: "Circle", icon: <Circle className="h-3 w-3" /> },
    { value: "square", label: "Square", icon: <Square className="h-3 w-3" /> },
    {
        value: "rounded",
        label: "Rounded",
        icon: <RectangleHorizontal className="h-3 w-3" />,
    },
];

const SIZE_OPTIONS: { value: PhotoSize; label: string }[] = [
    { value: "sm", label: "S" },
    { value: "md", label: "M" },
    { value: "lg", label: "L" },
];

const NAME_CASE_OPTIONS: { value: NameCase; label: string }[] = [
    { value: "as-typed", label: "As typed" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "capitalize", label: "Title Case" },
    { value: "lowercase", label: "lowercase" },
];

const ICON_STYLE_OPTIONS: {
    value: "icon-and-text" | "text-only" | "icon-only";
    label: string;
}[] = [
    { value: "icon-and-text", label: "Icon + Text" },
    { value: "text-only", label: "Text Only" },
    { value: "icon-only", label: "Icon Only" },
];

export function HeaderSection() {
    const header = useCustomizationStore((s) => s.header);
    const setHeader = useCustomizationStore((s) => s.setHeader);
    const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
    const fileRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_FILE_SIZE) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setPhotoPreview(result);
        };
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        setPhotoPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="space-y-5">
            {/* Photo */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-text-muted">
                        Profile Photo
                    </span>
                    <SegmentedControl
                        options={[
                            { value: "show", label: "Show" },
                            { value: "hide", label: "Hide" },
                        ]}
                        value={header.showPhoto ? "show" : "hide"}
                        onChange={(v) => setHeader({ showPhoto: v === "show" })}
                        size="sm"
                    />
                </div>

                {header.showPhoto && (
                    <div className="space-y-3 pl-1">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-muted-grey w-12">
                                Shape
                            </span>
                            <SegmentedControl
                                options={SHAPE_OPTIONS}
                                value={header.photoShape}
                                onChange={(v) => setHeader({ photoShape: v })}
                                size="sm"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-muted-grey w-12">
                                Size
                            </span>
                            <SegmentedControl
                                options={SIZE_OPTIONS}
                                value={header.photoSize}
                                onChange={(v) => setHeader({ photoSize: v })}
                                size="sm"
                            />
                        </div>

                        {/* Upload */}
                        <div className="flex items-center gap-2">
                            {photoPreview && (
                                <div className="relative">
                                    <Image
                                        src={photoPreview as string}
                                        alt="Profile"
                                        width={40}
                                        height={40}
                                        className={cn(
                                            "h-10 w-10 object-cover border border-border-grey",
                                            header.photoShape === "circle" &&
                                                "rounded-full",
                                            header.photoShape === "square" &&
                                                "rounded-none",
                                            header.photoShape === "rounded" &&
                                                "rounded-md",
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="absolute -top-1 -right-1 rounded-full bg-red-600 p-0.5 cursor-pointer"
                                        aria-label="Remove photo"
                                    >
                                        <X className="h-2.5 w-2.5 text-white" />
                                    </button>
                                </div>
                            )}
                            <label className="inline-flex items-center gap-1.5 rounded border border-dashed border-border-grey px-3 py-1.5 text-xs text-text-muted cursor-pointer hover:border-brand-500 hover:text-brand-500 transition-colors">
                                <Upload className="h-3 w-3" />
                                Upload Photo
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Name Display */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Name Display
                </span>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-grey w-24">
                        Capitalization
                    </span>
                    <select
                        value={header.nameCase}
                        onChange={(e) =>
                            setHeader({ nameCase: e.target.value as NameCase })
                        }
                        className="flex-1 rounded-md border border-border-grey bg-input-bg px-2 py-1.5 text-xs text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                        {NAME_CASE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Contact Items */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Contact Items
                </span>
                <div className="grid grid-cols-2 gap-2">
                    {(
                        [
                            "showJobTitle",
                            "showLocation",
                            "showEmail",
                            "showPhone",
                            "showWebsite",
                            "showLinkedIn",
                            "showGitHub",
                        ] as const
                    ).map((key) => {
                        const labels: Record<string, string> = {
                            showJobTitle: "Job Title",
                            showLocation: "Location",
                            showEmail: "Email",
                            showPhone: "Phone",
                            showWebsite: "Website",
                            showLinkedIn: "LinkedIn",
                            showGitHub: "GitHub",
                        };
                        return (
                            <label
                                key={key}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={header[key]}
                                    onChange={(e) =>
                                        setHeader({ [key]: e.target.checked })
                                    }
                                    className="h-3.5 w-3.5 rounded border-border-grey bg-input-bg accent-brand-500 cursor-pointer"
                                />
                                <span className="text-xs text-foreground">
                                    {labels[key]}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Contact Icon Style */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-text-muted">
                    Contact Icon Style
                </span>
                <SegmentedControl
                    options={ICON_STYLE_OPTIONS}
                    value={header.contactIconStyle}
                    onChange={(v) => setHeader({ contactIconStyle: v })}
                    size="sm"
                />
            </div>
        </div>
    );
}
