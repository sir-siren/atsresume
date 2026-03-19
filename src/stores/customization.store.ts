"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
    CustomizationSettings,
    TemplateId,
    ColorPresetId,
    FontFamily,
    ColumnLayout,
} from "@/types/customization.types";

// ── Defaults ────────────────────────────────────────────
export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
    templateId: "classic",
    columnLayout: "one-column",
    font: {
        family: "Inter",
        sizes: { base: 10, name: 26, sectionTitle: 12, jobTitle: 11 },
    },
    colors: {
        accent: "#2563eb",
        nameText: "#111827",
        bodyText: "#374151",
        mutedText: "#6b7280",
        background: "#ffffff",
        divider: "#e5e7eb",
    },
    activeColorPreset: "navy-blue",
    spacing: {
        marginTop: 0.75,
        marginBottom: 0.75,
        marginLeft: 0.75,
        marginRight: 0.75,
        lineHeightBody: 1.5,
        lineHeightCompact: 1.3,
        sectionGap: 14,
        entryGap: 8,
        bulletIndent: 12,
    },
    header: {
        showPhoto: false,
        photoShape: "circle",
        photoSize: "md",
        nameCase: "as-typed",
        showJobTitle: true,
        showLocation: true,
        showEmail: true,
        showPhone: true,
        showWebsite: true,
        showLinkedIn: true,
        showGitHub: false,
        layout: "name-left-contact-right",
        contactIconStyle: "icon-and-text",
    },
    dividers: {
        showSectionDividers: true,
        style: "solid",
        position: "below-title",
        thickness: 1,
        opacity: 100,
    },
    page: {
        size: "Letter",
        dateFormat: "MMM YYYY",
        textDirection: "ltr",
        language: "en",
        showPageNumber: false,
        presentLabel: "Present",
    },
};

// ── CSS Variable Sync ───────────────────────────────────
export function applyCustomizationToCSS(s: CustomizationSettings) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--resume-accent", s.colors.accent);
    root.style.setProperty("--resume-name-color", s.colors.nameText);
    root.style.setProperty("--resume-body-text", s.colors.bodyText);
    root.style.setProperty("--resume-muted-text", s.colors.mutedText);
    root.style.setProperty("--resume-background", s.colors.background);
    root.style.setProperty("--resume-divider-color", s.colors.divider);
    root.style.setProperty(
        "--resume-font-family",
        `"${s.font.family}", sans-serif`,
    );
    root.style.setProperty(
        "--resume-font-base",
        `${String(s.font.sizes.base)}pt`,
    );
    root.style.setProperty(
        "--resume-font-name",
        `${String(s.font.sizes.name)}pt`,
    );
    root.style.setProperty(
        "--resume-font-section",
        `${String(s.font.sizes.sectionTitle)}pt`,
    );
    root.style.setProperty(
        "--resume-font-job",
        `${String(s.font.sizes.jobTitle)}pt`,
    );
    root.style.setProperty(
        "--resume-line-height",
        String(s.spacing.lineHeightBody),
    );
    root.style.setProperty(
        "--resume-section-gap",
        `${String(s.spacing.sectionGap)}pt`,
    );
    root.style.setProperty(
        "--resume-entry-gap",
        `${String(s.spacing.entryGap)}pt`,
    );
    root.style.setProperty(
        "--resume-margin-top",
        `${String(s.spacing.marginTop)}in`,
    );
    root.style.setProperty(
        "--resume-margin-bottom",
        `${String(s.spacing.marginBottom)}in`,
    );
    root.style.setProperty(
        "--resume-margin-left",
        `${String(s.spacing.marginLeft)}in`,
    );
    root.style.setProperty(
        "--resume-margin-right",
        `${String(s.spacing.marginRight)}in`,
    );
}

// ── Store Interface ─────────────────────────────────────
interface CustomizationStore extends CustomizationSettings {
    setTemplate: (id: TemplateId) => void;
    setFontFamily: (family: FontFamily) => void;
    setFontSizes: (
        sizes: Partial<CustomizationSettings["font"]["sizes"]>,
    ) => void;
    setAccentColor: (hex: string) => void;
    setColorPreset: (presetId: ColorPresetId) => void;
    setColors: (colors: Partial<CustomizationSettings["colors"]>) => void;
    setSpacing: (spacing: Partial<CustomizationSettings["spacing"]>) => void;
    setHeader: (header: Partial<CustomizationSettings["header"]>) => void;
    setDividers: (dividers: Partial<CustomizationSettings["dividers"]>) => void;
    setPage: (page: Partial<CustomizationSettings["page"]>) => void;
    setColumnLayout: (layout: ColumnLayout) => void;
    resetSection: (section: keyof CustomizationSettings) => void;
    resetAll: () => void;
}

// ── Store ───────────────────────────────────────────────
export const useCustomizationStore = create<CustomizationStore>()(
    persist(
        (set, get) => ({
            ...DEFAULT_CUSTOMIZATION,

            setTemplate: (id) => {
                set({ templateId: id });
                applyCustomizationToCSS({ ...get(), templateId: id });
            },

            setFontFamily: (family) => {
                const next = { ...get(), font: { ...get().font, family } };
                set({ font: next.font });
                applyCustomizationToCSS(next);
            },

            setFontSizes: (sizes) => {
                const next = {
                    ...get(),
                    font: {
                        ...get().font,
                        sizes: { ...get().font.sizes, ...sizes },
                    },
                };
                set({ font: next.font });
                applyCustomizationToCSS(next);
            },

            setAccentColor: (hex) => {
                const next = {
                    ...get(),
                    colors: { ...get().colors, accent: hex },
                    activeColorPreset: "custom" as ColorPresetId,
                };
                set({ colors: next.colors, activeColorPreset: "custom" });
                applyCustomizationToCSS(next);
            },

            setColorPreset: (presetId) => {
                set({ activeColorPreset: presetId });
            },

            setColors: (colors) => {
                const next = {
                    ...get(),
                    colors: { ...get().colors, ...colors },
                    activeColorPreset: "custom" as ColorPresetId,
                };
                set({ colors: next.colors, activeColorPreset: "custom" });
                applyCustomizationToCSS(next);
            },

            setSpacing: (spacing) => {
                const next = {
                    ...get(),
                    spacing: { ...get().spacing, ...spacing },
                };
                set({ spacing: next.spacing });
                applyCustomizationToCSS(next);
            },

            setHeader: (header) => {
                set({ header: { ...get().header, ...header } });
            },

            setDividers: (dividers) => {
                set({ dividers: { ...get().dividers, ...dividers } });
            },

            setPage: (page) => {
                set({ page: { ...get().page, ...page } });
            },

            setColumnLayout: (layout) => {
                set({ columnLayout: layout });
            },

            resetSection: (section) => {
                set({ [section]: DEFAULT_CUSTOMIZATION[section] });
                applyCustomizationToCSS({
                    ...get(),
                    [section]: DEFAULT_CUSTOMIZATION[section],
                });
            },

            resetAll: () => {
                set({ ...DEFAULT_CUSTOMIZATION });
                applyCustomizationToCSS(DEFAULT_CUSTOMIZATION);
            },
        }),
        {
            name: "resume-customization",
            version: 1,
        },
    ),
);
