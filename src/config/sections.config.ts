import {
    User,
    Share2,
    AlignLeft,
    GraduationCap,
    Briefcase,
    FolderOpen,
    BookOpen,
    Heart,
    Code2,
    Sparkles,
    Plus,
    Trophy,
    BookMarked,
    Presentation,
    Globe,
    Smile,
    Users,
    LayoutList,
    Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SectionDefinition {
    id: string;
    label: string;
    icon: LucideIcon;
    group: SectionGroup;
    isCustom?: boolean;
}

export type SectionGroup =
    | "Core"
    | "Background"
    | "Experience"
    | "Skills"
    | "Achievements"
    | "Learning"
    | "Extra"
    | "Personal"
    | "Custom";

export const RESUME_SECTIONS: SectionDefinition[] = [
    {
        id: "personal-info",
        label: "Personal Information",
        icon: User,
        group: "Core",
    },
    { id: "social-media", label: "Social Media", icon: Share2, group: "Core" },
    { id: "summary", label: "Summary", icon: AlignLeft, group: "Core" },
    {
        id: "education",
        label: "Education",
        icon: GraduationCap,
        group: "Background",
    },
    {
        id: "work-experience",
        label: "Work Experience",
        icon: Briefcase,
        group: "Background",
    },
    {
        id: "projects",
        label: "Projects",
        icon: FolderOpen,
        group: "Background",
    },
    {
        id: "internships",
        label: "Internships",
        icon: BookOpen,
        group: "Experience",
    },
    {
        id: "volunteer",
        label: "Volunteer Experience",
        icon: Heart,
        group: "Experience",
    },
    {
        id: "technical-skills",
        label: "Technical Skills",
        icon: Code2,
        group: "Skills",
    },
    {
        id: "soft-skills",
        label: "Soft Skills",
        icon: Sparkles,
        group: "Skills",
    },
    {
        id: "additional-skills",
        label: "Additional Skills",
        icon: Plus,
        group: "Skills",
    },
    {
        id: "awards",
        label: "Awards & Honors",
        icon: Trophy,
        group: "Achievements",
    },
    {
        id: "publications",
        label: "Publications",
        icon: BookMarked,
        group: "Achievements",
    },
    {
        id: "conferences",
        label: "Conferences",
        icon: Presentation,
        group: "Achievements",
    },
    { id: "courses", label: "Courses", icon: GraduationCap, group: "Learning" },
    {
        id: "certifications",
        label: "Tests & Certifications",
        icon: Award,
        group: "Learning",
    },
    { id: "languages", label: "Languages", icon: Globe, group: "Extra" },
    {
        id: "hobbies",
        label: "Hobbies & Interests",
        icon: Smile,
        group: "Personal",
    },
    { id: "references", label: "References", icon: Users, group: "Personal" },
];

export const SECTION_GROUPS: SectionGroup[] = [
    "Core",
    "Background",
    "Experience",
    "Skills",
    "Achievements",
    "Learning",
    "Extra",
    "Personal",
    "Custom",
];

/** Icon map for dynamic lookups (custom sections store icon name as string) */
export const ICON_MAP: Record<string, LucideIcon> = {
    "personal-info": User,
    "social-media": Share2,
    summary: AlignLeft,
    education: GraduationCap,
    "work-experience": Briefcase,
    projects: FolderOpen,
    internships: BookOpen,
    volunteer: Heart,
    "technical-skills": Code2,
    "soft-skills": Sparkles,
    "additional-skills": Plus,
    awards: Trophy,
    publications: BookMarked,
    conferences: Presentation,
    courses: GraduationCap,
    certifications: Award,
    languages: Globe,
    hobbies: Smile,
    references: Users,
    custom: LayoutList,
};

/** Default section ordering */
export const DEFAULT_SECTION_CONFIGS = RESUME_SECTIONS.map((s, i) => ({
    id: s.id,
    isVisible: true,
    order: i,
}));
