// ── Templates ─────────────────────────────────────────────
export type TemplateId =
    | "classic"
    | "modern"
    | "executive"
    | "corporate"
    | "mercury"
    | "minimal"
    | "elegant"
    | "creative"
    | "professional"
    | "compact"
    | "sidebar-left"
    | "sidebar-right"
    | "two-column"
    | "academic"
    | "technical"
    | "bold";

export interface TemplateDefinition {
    id: TemplateId;
    name: string;
    category: "one-column" | "two-column" | "sidebar";
    isAtsOptimized: boolean;
}

// ── Layout ─────────────────────────────────────────────────
export type ColumnLayout =
    | "one-column"
    | "two-column"
    | "sidebar-left"
    | "sidebar-right";

export type HeaderLayout =
    | "name-left-contact-right"
    | "name-center-contact-center"
    | "name-top-contact-below"
    | "name-left-contact-below";

// ── Fonts ──────────────────────────────────────────────────
export type FontFamily =
    | "Inter"
    | "Roboto"
    | "Open Sans"
    | "Lato"
    | "Poppins"
    | "Montserrat"
    | "Raleway"
    | "Nunito"
    | "Source Sans Pro"
    | "PT Sans"
    | "Merriweather"
    | "Georgia"
    | "Playfair Display"
    | "Lora"
    | "EB Garamond"
    | "Times New Roman"
    | "Courier Prime"
    | "Fira Code"
    | "JetBrains Mono";

export type FontCategory = "sans-serif" | "serif" | "monospace";

export interface FontOption {
    family: FontFamily;
    category: FontCategory;
    googleFontName: string;
}

export interface FontSizes {
    base: number;
    name: number;
    sectionTitle: number;
    jobTitle: number;
}

// ── Colors ─────────────────────────────────────────────────
export interface ResumeColorScheme {
    accent: string;
    nameText: string;
    bodyText: string;
    mutedText: string;
    background: string;
    sidebarBackground?: string;
    sidebarText?: string;
    divider: string;
}

export type ColorPresetId =
    | "classic-black"
    | "navy-blue"
    | "forest-green"
    | "burgundy"
    | "slate-gray"
    | "deep-purple"
    | "terracotta"
    | "ocean-teal"
    | "charcoal"
    | "rose-gold"
    | "midnight"
    | "custom";

export interface ColorPreset {
    id: ColorPresetId;
    label: string;
    colors: Pick<ResumeColorScheme, "accent" | "nameText">;
    swatch: string;
}

// ── Spacing ────────────────────────────────────────────────
export interface ResumeSpacing {
    marginTop: number;
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
    lineHeightBody: number;
    lineHeightCompact: number;
    sectionGap: number;
    entryGap: number;
    bulletIndent: number;
}

// ── Header / Profile ──────────────────────────────────────
export type NameCase = "as-typed" | "uppercase" | "capitalize" | "lowercase";
export type PhotoShape = "circle" | "square" | "rounded";
export type PhotoSize = "sm" | "md" | "lg";

export interface HeaderSettings {
    showPhoto: boolean;
    photoShape: PhotoShape;
    photoSize: PhotoSize;
    nameCase: NameCase;
    showJobTitle: boolean;
    showLocation: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showWebsite: boolean;
    showLinkedIn: boolean;
    showGitHub: boolean;
    layout: HeaderLayout;
    contactIconStyle: "icon-and-text" | "text-only" | "icon-only";
}

// ── Dividers ──────────────────────────────────────────────
export type DividerStyle = "solid" | "dashed" | "dotted" | "double" | "none";
export type DividerPosition = "below-title" | "above-title" | "both" | "none";

export interface DividerSettings {
    showSectionDividers: boolean;
    style: DividerStyle;
    position: DividerPosition;
    thickness: number;
    opacity: number;
}

// ── Page / Document ───────────────────────────────────────
export type PageSize = "A4" | "Letter" | "Legal";

export type DateFormat =
    | "MMM YYYY"
    | "MM/YYYY"
    | "YYYY-MM"
    | "MMMM YYYY"
    | "MMM DD, YYYY"
    | "YYYY"
    | "MM/DD/YYYY";

export type TextDirection = "ltr" | "rtl";

export interface PageSettings {
    size: PageSize;
    dateFormat: DateFormat;
    textDirection: TextDirection;
    language: string;
    showPageNumber: boolean;
    presentLabel: string;
}

// ── Top-level customization state ─────────────────────────
export interface CustomizationSettings {
    templateId: TemplateId;
    columnLayout: ColumnLayout;
    font: {
        family: FontFamily;
        sizes: FontSizes;
    };
    colors: ResumeColorScheme;
    activeColorPreset: ColorPresetId;
    spacing: ResumeSpacing;
    header: HeaderSettings;
    dividers: DividerSettings;
    page: PageSettings;
}
