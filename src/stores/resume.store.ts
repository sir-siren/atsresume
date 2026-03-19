"use client";

import { create } from "zustand";
import { DEFAULT_SECTION_CONFIGS } from "@/config/sections.config";
import type {
    SectionId,
    PersonalInfoData,
    SocialMediaData,
    EducationEntry,
    WorkExperienceEntry,
    ProjectEntry,
    SkillEntry,
    LanguageEntry,
    CertificationEntry,
    InternshipEntry,
    VolunteerEntry,
    AwardEntry,
    PublicationEntry,
    ConferenceEntry,
    CourseEntry,
    HobbyEntry,
    ResumeReferences,
    CustomSectionEntry,
    SectionConfig,
    ResumeData,
} from "@/types/resume.types";

// ── Helpers ─────────────────────────────────────────
function uid(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Store types ─────────────────────────────────────
interface ResumeStore {
    // Navigation
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;

    // Mobile drawer
    isMobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;

    // ── Section data ──────────────────────
    personalInfo: PersonalInfoData | null;
    socialMedia: SocialMediaData[];
    summary: string;
    education: EducationEntry[];
    workExperience: WorkExperienceEntry[];
    projects: ProjectEntry[];
    technicalSkills: SkillEntry[];
    softSkills: string[];
    additionalSkills: string[];
    languages: LanguageEntry[];
    certifications: CertificationEntry[];

    // New sections
    internships: InternshipEntry[];
    volunteer: VolunteerEntry[];
    awards: AwardEntry[];
    publications: PublicationEntry[];
    conferences: ConferenceEntry[];
    courses: CourseEntry[];
    hobbies: HobbyEntry[];
    references: ResumeReferences;
    customSections: CustomSectionEntry[];

    // ── Section config (order + visibility) ──
    sectionConfigs: SectionConfig[];

    // ── Section config actions ────────────
    toggleSectionVisibility: (id: string) => void;
    reorderSections: (fromIndex: number, toIndex: number) => void;
    renameSectionLabel: (id: string, label: string) => void;
    addCustomSection: () => void;
    removeCustomSection: (id: string) => void;
    getOrderedVisibleSections: () => SectionConfig[];

    // ── Data actions ──────────────────────
    loadFromJSON: (data: Partial<ResumeData>) => void;
    exportToJSON: () => ResumeData;
    getSectionCompletion: (id: string) => boolean;
    getOverallProgress: () => number;
}

// ── Store implementation ────────────────────────────
export const useResumeStore = create<ResumeStore>((set, get) => ({
    // Navigation
    activeSection: "personal-info",
    setActiveSection: (id) => set({ activeSection: id }),

    // Mobile drawer
    isMobileOpen: false,
    setMobileOpen: (open) => set({ isMobileOpen: open }),

    // ── Section data ──────────────────────
    personalInfo: null,
    socialMedia: [],
    summary: "",
    education: [],
    workExperience: [],
    projects: [],
    technicalSkills: [],
    softSkills: [],
    additionalSkills: [],
    languages: [],
    certifications: [],
    internships: [],
    volunteer: [],
    awards: [],
    publications: [],
    conferences: [],
    courses: [],
    hobbies: [],
    references: { visibility: "available-on-request", entries: [] },
    customSections: [],

    // ── Section config ────────────────────
    sectionConfigs: [...DEFAULT_SECTION_CONFIGS],

    // ── Section config actions ────────────
    toggleSectionVisibility: (id) => {
        set((state) => ({
            sectionConfigs: state.sectionConfigs.map((c) =>
                c.id === id ? { ...c, isVisible: !c.isVisible } : c,
            ),
        }));
    },

    reorderSections: (fromIndex, toIndex) => {
        set((state) => {
            const ordered = [...state.sectionConfigs].sort(
                (a, b) => a.order - b.order,
            );
            const [moved] = ordered.splice(fromIndex, 1);
            if (!moved) return state;
            ordered.splice(toIndex, 0, moved);
            return {
                sectionConfigs: ordered.map((c, i) => ({ ...c, order: i })),
            };
        });
    },

    renameSectionLabel: (id, label) => {
        set((state) => ({
            sectionConfigs: state.sectionConfigs.map((c) =>
                c.id === id ? { ...c, customLabel: label } : c,
            ),
        }));
    },

    addCustomSection: () => {
        const newId = `custom-${uid()}`;
        set((state) => ({
            customSections: [
                ...state.customSections,
                {
                    id: newId,
                    label: "Custom Section",
                    icon: "custom",
                    items: [],
                },
            ],
            sectionConfigs: [
                ...state.sectionConfigs,
                {
                    id: newId,
                    isVisible: true,
                    order: state.sectionConfigs.length,
                },
            ],
        }));
    },

    removeCustomSection: (id) => {
        set((state) => ({
            customSections: state.customSections.filter((c) => c.id !== id),
            sectionConfigs: state.sectionConfigs
                .filter((c) => c.id !== id)
                .map((c, i) => ({ ...c, order: i })),
        }));
    },

    getOrderedVisibleSections: () => {
        const state = get();
        return [...state.sectionConfigs]
            .filter((c) => c.isVisible)
            .sort((a, b) => a.order - b.order);
    },

    // ── Data actions ──────────────────────
    loadFromJSON: (data) => {
        set({
            personalInfo: data.personalInfo ?? null,
            socialMedia: data.socialMedia ?? [],
            summary: data.summary ?? "",
            education: data.education ?? [],
            workExperience: data.workExperience ?? [],
            projects: data.projects ?? [],
            technicalSkills: data.technicalSkills ?? [],
            softSkills: data.softSkills ?? [],
            additionalSkills: data.additionalSkills ?? [],
            languages: data.languages ?? [],
            certifications: data.certifications ?? [],
            internships: data.internships ?? [],
            volunteer: data.volunteer ?? [],
            awards: data.awards ?? [],
            publications: data.publications ?? [],
            conferences: data.conferences ?? [],
            courses: data.courses ?? [],
            hobbies: data.hobbies ?? [],
            references: data.references ?? {
                visibility: "available-on-request",
                entries: [],
            },
            customSections: data.customSections ?? [],
            sectionConfigs: data.sectionConfigs ?? [...DEFAULT_SECTION_CONFIGS],
        });
    },

    exportToJSON: () => {
        const s = get();
        return {
            version: "2.0",
            exportedAt: new Date().toISOString(),
            personalInfo: s.personalInfo,
            socialMedia: s.socialMedia,
            summary: s.summary,
            education: s.education,
            workExperience: s.workExperience,
            projects: s.projects,
            technicalSkills: s.technicalSkills,
            softSkills: s.softSkills,
            additionalSkills: s.additionalSkills,
            languages: s.languages,
            certifications: s.certifications,
            internships: s.internships,
            volunteer: s.volunteer,
            awards: s.awards,
            publications: s.publications,
            conferences: s.conferences,
            courses: s.courses,
            hobbies: s.hobbies,
            references: s.references,
            customSections: s.customSections,
            sectionConfigs: s.sectionConfigs,
        };
    },

    getSectionCompletion: (id) => {
        const s = get();
        switch (id) {
            case "personal-info":
                return Boolean(
                    s.personalInfo?.firstName &&
                    s.personalInfo?.lastName &&
                    s.personalInfo?.email,
                );
            case "social-media":
                return s.socialMedia.length > 0;
            case "summary":
                return s.summary.trim().length > 0;
            case "education":
                return s.education.length > 0;
            case "work-experience":
                return s.workExperience.length > 0;
            case "projects":
                return s.projects.length > 0;
            case "internships":
                return s.internships.length > 0;
            case "volunteer":
                return s.volunteer.length > 0;
            case "technical-skills":
                return s.technicalSkills.length > 0;
            case "soft-skills":
                return s.softSkills.length > 0;
            case "additional-skills":
                return s.additionalSkills.length > 0;
            case "awards":
                return s.awards.length > 0;
            case "publications":
                return s.publications.length > 0;
            case "conferences":
                return s.conferences.length > 0;
            case "courses":
                return s.courses.length > 0;
            case "certifications":
                return s.certifications.length > 0;
            case "languages":
                return s.languages.length > 0;
            case "hobbies":
                return s.hobbies.length > 0;
            case "references":
                return s.references.entries.length > 0;
            default: {
                // Custom sections
                const custom = s.customSections.find((c) => c.id === id);
                return custom ? custom.items.length > 0 : false;
            }
        }
    },

    getOverallProgress: () => {
        const s = get();
        const visibleSections = s.sectionConfigs.filter((c) => c.isVisible);
        if (visibleSections.length === 0) return 0;
        const completedCount = visibleSections.filter((c) =>
            s.getSectionCompletion(c.id),
        ).length;
        return Math.round((completedCount / visibleSections.length) * 100);
    },
}));
