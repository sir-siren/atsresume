// ── Personal Info ───────────────────────────────
export interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  website?: string;
}

// ── Social Media ────────────────────────────────
export type SocialPlatform = "LinkedIn" | "GitHub" | "Twitter" | "Portfolio" | "Other";

export interface SocialMediaData {
  id: string;
  platform: SocialPlatform;
  url: string;
  username: string;
}

// ── Education ───────────────────────────────────
export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | "Present";
  gpa?: string;
  achievements?: string[];
}

// ── Work Experience ─────────────────────────────
export interface WorkExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  bullets: string[];
}

// ── Projects ────────────────────────────────────
export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

// ── Skills ──────────────────────────────────────
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface SkillEntry {
  id: string;
  name: string;
  level: SkillLevel;
}

// ── Languages ───────────────────────────────────
export type LanguageProficiency =
  | "Elementary"
  | "Limited Working"
  | "Professional"
  | "Full Professional"
  | "Native";

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
}

// ── Certifications ──────────────────────────────
export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

// ── Full Resume Data (for JSON export/import) ───
export interface ResumeData {
  version: "1.0";
  exportedAt: string;
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
}

// ── Section IDs ─────────────────────────────────
export const RESUME_SECTIONS = [
  { id: "personal-info",    label: "Personal Information",   group: "Core" },
  { id: "social-media",     label: "Social Media",           group: "Core" },
  { id: "summary",          label: "Summary",                group: "Core" },
  { id: "education",        label: "Education",              group: "Background" },
  { id: "work-experience",  label: "Work Experience",        group: "Background" },
  { id: "projects",         label: "Projects",               group: "Background" },
  { id: "technical-skills", label: "Technical Skills",        group: "Skills" },
  { id: "soft-skills",      label: "Soft Skills",            group: "Skills" },
  { id: "additional-skills",label: "Additional Skills",      group: "Skills" },
  { id: "languages",        label: "Languages",              group: "Extra" },
  { id: "certifications",   label: "Tests & Certifications", group: "Extra" },
] as const;

export type SectionId = (typeof RESUME_SECTIONS)[number]["id"];
export type SectionGroup = (typeof RESUME_SECTIONS)[number]["group"];
