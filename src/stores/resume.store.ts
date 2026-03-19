import { create } from "zustand";
import type {
  SectionId,
  ResumeData,
  PersonalInfoData,
  SocialMediaData,
  EducationEntry,
  WorkExperienceEntry,
  ProjectEntry,
  SkillEntry,
  LanguageEntry,
  CertificationEntry,
} from "@/types/resume.types";

interface ResumeStore {
  // ── Navigation ─────────────────────────────
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;

  // ── Mobile ─────────────────────────────────
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;

  // ── Resume Data ────────────────────────────
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

  // ── Actions ────────────────────────────────
  loadFromJSON: (data: ResumeData) => void;
  exportToJSON: () => ResumeData;
  getSectionCompletion: (id: SectionId) => boolean;
  getOverallProgress: () => number;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  // ── Navigation ─────────────────────────────
  activeSection: "personal-info",
  setActiveSection: (id) => set({ activeSection: id }),

  // ── Mobile ─────────────────────────────────
  isMobileOpen: false,
  setMobileOpen: (open) => set({ isMobileOpen: open }),

  // ── Resume Data ────────────────────────────
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

  // ── Actions ────────────────────────────────
  loadFromJSON: (data) =>
    set({
      personalInfo: data.personalInfo,
      socialMedia: data.socialMedia,
      summary: data.summary,
      education: data.education,
      workExperience: data.workExperience,
      projects: data.projects,
      technicalSkills: data.technicalSkills,
      softSkills: data.softSkills,
      additionalSkills: data.additionalSkills,
      languages: data.languages,
      certifications: data.certifications,
    }),

  exportToJSON: (): ResumeData => {
    const s = get();
    return {
      version: "1.0",
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
    };
  },

  getSectionCompletion: (id) => {
    const s = get();
    const checks: Record<SectionId, () => boolean> = {
      "personal-info": () =>
        s.personalInfo !== null &&
        s.personalInfo.firstName.trim().length > 0,
      "social-media": () => s.socialMedia.length > 0,
      "summary": () => s.summary.trim().length > 0,
      "education": () => s.education.length > 0,
      "work-experience": () => s.workExperience.length > 0,
      "projects": () => s.projects.length > 0,
      "technical-skills": () => s.technicalSkills.length > 0,
      "soft-skills": () => s.softSkills.length > 0,
      "additional-skills": () => s.additionalSkills.length > 0,
      "languages": () => s.languages.length > 0,
      "certifications": () => s.certifications.length > 0,
    };
    const check = checks[id];
    return check ? check() : false;
  },

  getOverallProgress: () => {
    const s = get();
    const sections: SectionId[] = [
      "personal-info",
      "social-media",
      "summary",
      "education",
      "work-experience",
      "projects",
      "technical-skills",
      "soft-skills",
      "additional-skills",
      "languages",
      "certifications",
    ];
    const completed = sections.filter((id) => s.getSectionCompletion(id)).length;
    return Math.round((completed / sections.length) * 100);
  },
}));
