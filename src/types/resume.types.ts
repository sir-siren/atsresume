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
export type SocialPlatform =
    | "LinkedIn"
    | "GitHub"
    | "Twitter"
    | "Portfolio"
    | "Other";

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

// ── Internships ─────────────────────────────────
export interface InternshipEntry {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string | "Present";
    bullets: string[];
    isPaid: boolean;
}

// ── Volunteer Experience ────────────────────────
export interface VolunteerEntry {
    id: string;
    organization: string;
    role: string;
    location?: string;
    startDate: string;
    endDate: string | "Present";
    cause?: string;
    bullets: string[];
}

// ── Awards & Honors ─────────────────────────────
export interface AwardEntry {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
}

// ── Publications ────────────────────────────────
export interface PublicationEntry {
    id: string;
    title: string;
    publisher: string;
    date: string;
    authors: string;
    url?: string;
    doi?: string;
    description?: string;
}

// ── Conferences ─────────────────────────────────
export type ConferenceRole =
    | "Attendee"
    | "Speaker"
    | "Presenter"
    | "Organizer"
    | "Panelist";

export interface ConferenceEntry {
    id: string;
    name: string;
    role: ConferenceRole;
    location: string;
    date: string;
    talkTitle?: string;
    description?: string;
}

// ── Courses ─────────────────────────────────────
export interface CourseEntry {
    id: string;
    name: string;
    institution: string;
    completionDate: string;
    credentialUrl?: string;
    credentialId?: string;
    description?: string;
}

// ── Hobbies & Interests ────────────────────────
export interface HobbyEntry {
    id: string;
    name: string;
    description?: string;
}

// ── References ──────────────────────────────────
export type ReferenceVisibility = "available-on-request" | "listed";
export type ReferenceRelationship =
    | "Manager"
    | "Colleague"
    | "Professor"
    | "Mentor"
    | "Client"
    | "Other";

export interface ReferenceEntry {
    id: string;
    name: string;
    position: string;
    company: string;
    email?: string;
    phone?: string;
    relationship: ReferenceRelationship;
}

export interface ResumeReferences {
    visibility: ReferenceVisibility;
    entries: ReferenceEntry[];
}

// ── Custom Section ──────────────────────────────
export interface CustomSectionItem {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    description?: string;
    bullets?: string[];
    url?: string;
}

export interface CustomSectionEntry {
    id: string;
    label: string;
    icon: string;
    items: CustomSectionItem[];
}

// ── Section Config (order + visibility) ─────────
export interface SectionConfig {
    id: string;
    isVisible: boolean;
    order: number;
    customLabel?: string;
}

// ── Full Resume Data (JSON export/import) ───────
export interface ResumeData {
    version: "2.0";
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
    internships: InternshipEntry[];
    volunteer: VolunteerEntry[];
    awards: AwardEntry[];
    publications: PublicationEntry[];
    conferences: ConferenceEntry[];
    courses: CourseEntry[];
    hobbies: HobbyEntry[];
    references: ResumeReferences;
    customSections: CustomSectionEntry[];
    sectionConfigs: SectionConfig[];
}

// ── Section IDs ─────────────────────────────────
export type SectionId =
    | "personal-info"
    | "social-media"
    | "summary"
    | "education"
    | "work-experience"
    | "projects"
    | "internships"
    | "volunteer"
    | "technical-skills"
    | "soft-skills"
    | "additional-skills"
    | "awards"
    | "publications"
    | "conferences"
    | "courses"
    | "certifications"
    | "languages"
    | "hobbies"
    | "references";
