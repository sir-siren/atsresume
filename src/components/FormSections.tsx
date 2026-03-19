"use client";

import * as React from "react";
import {
  User,
  Share2,
  AlignLeft,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Code2,
  Sparkles,
  Plus,
  Globe,
  Award,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import { RESUME_SECTIONS } from "@/types/resume.types";
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
  SocialPlatform,
  SkillLevel,
  LanguageProficiency,
} from "@/types/resume.types";
import { cn } from "@/lib/cn";

// ── Shared styles ───────────────────────────────────
const INPUT_CLASS =
  "flex h-10 w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors";

const TEXTAREA_CLASS =
  "flex min-h-[80px] w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-y transition-colors";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors";

const LABEL_CLASS = "text-xs font-medium text-muted-grey mb-1 block";

const ADD_BTN_CLASS =
  "inline-flex items-center gap-1.5 rounded-md border border-border-grey bg-surface-muted px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-border-grey hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer";

const DELETE_BTN_CLASS =
  "inline-flex items-center justify-center h-8 w-8 rounded-md text-red-400 hover:bg-red-900/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer";

const CARD_CLASS =
  "relative border border-border-grey rounded-md p-4 space-y-3 group";

const NAV_BTN_CLASS =
  "inline-flex items-center gap-1.5 rounded-md border border-border-grey bg-surface-muted px-3 py-2 text-xs font-medium text-text-muted hover:bg-border-grey hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer";

// ── Icon map ────────────────────────────────────────
const ICON_MAP: Record<SectionId, LucideIcon> = {
  "personal-info": User,
  "social-media": Share2,
  "summary": AlignLeft,
  "education": GraduationCap,
  "work-experience": Briefcase,
  "projects": FolderOpen,
  "technical-skills": Code2,
  "soft-skills": Sparkles,
  "additional-skills": Plus,
  "languages": Globe,
  "certifications": Award,
};

// ── Helpers ─────────────────────────────────────────
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Main Component ──────────────────────────────────
export function FormSections() {
  const store = useResumeStore();
  const activeSection = useResumeStore((s) => s.activeSection);
  const setActiveSection = useResumeStore((s) => s.setActiveSection);

  // Find current index for prev/next navigation
  const currentIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeSection);
  const currentMeta = RESUME_SECTIONS[currentIndex];
  const prevSection = currentIndex > 0 ? RESUME_SECTIONS[currentIndex - 1] : undefined;
  const nextSection = currentIndex < RESUME_SECTIONS.length - 1 ? RESUME_SECTIONS[currentIndex + 1] : undefined;

  const ActiveIcon = currentMeta ? ICON_MAP[currentMeta.id] : User;

  // ── Personal Info handlers ────────────────────────
  const handlePersonalChange = (field: keyof PersonalInfoData, value: string) => {
    const current = store.personalInfo ?? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      jobTitle: "",
    };
    useResumeStore.setState({ personalInfo: { ...current, [field]: value } });
  };

  // ── Social Media handlers ─────────────────────────
  const addSocial = () => {
    useResumeStore.setState({
      socialMedia: [
        ...store.socialMedia,
        { id: uid(), platform: "LinkedIn", url: "", username: "" },
      ],
    });
  };
  const removeSocial = (id: string) => {
    useResumeStore.setState({
      socialMedia: store.socialMedia.filter((s) => s.id !== id),
    });
  };
  const updateSocial = (id: string, field: keyof SocialMediaData, value: string) => {
    useResumeStore.setState({
      socialMedia: store.socialMedia.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  // ── Education handlers ────────────────────────────
  const addEducation = () => {
    useResumeStore.setState({
      education: [
        ...store.education,
        { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "" },
      ],
    });
  };
  const removeEducation = (id: string) => {
    useResumeStore.setState({
      education: store.education.filter((e) => e.id !== id),
    });
  };
  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    useResumeStore.setState({
      education: store.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  // ── Work Experience handlers ──────────────────────
  const addWork = () => {
    useResumeStore.setState({
      workExperience: [
        ...store.workExperience,
        { id: uid(), company: "", position: "", location: "", startDate: "", endDate: "", bullets: [] },
      ],
    });
  };
  const removeWork = (id: string) => {
    useResumeStore.setState({
      workExperience: store.workExperience.filter((w) => w.id !== id),
    });
  };
  const updateWork = (id: string, field: keyof WorkExperienceEntry, value: string | string[]) => {
    useResumeStore.setState({
      workExperience: store.workExperience.map((w) =>
        w.id === id ? { ...w, [field]: value } : w
      ),
    });
  };

  // ── Projects handlers ─────────────────────────────
  const addProject = () => {
    useResumeStore.setState({
      projects: [
        ...store.projects,
        { id: uid(), name: "", description: "", techStack: [] },
      ],
    });
  };
  const removeProject = (id: string) => {
    useResumeStore.setState({
      projects: store.projects.filter((p) => p.id !== id),
    });
  };
  const updateProject = (id: string, field: keyof ProjectEntry, value: string | string[]) => {
    useResumeStore.setState({
      projects: store.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  // ── Technical Skills handlers ─────────────────────
  const addSkill = () => {
    useResumeStore.setState({
      technicalSkills: [
        ...store.technicalSkills,
        { id: uid(), name: "", level: "Intermediate" },
      ],
    });
  };
  const removeSkill = (id: string) => {
    useResumeStore.setState({
      technicalSkills: store.technicalSkills.filter((s) => s.id !== id),
    });
  };
  const updateSkill = (id: string, field: keyof SkillEntry, value: string) => {
    useResumeStore.setState({
      technicalSkills: store.technicalSkills.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  // ── Languages handlers ────────────────────────────
  const addLanguage = () => {
    useResumeStore.setState({
      languages: [
        ...store.languages,
        { id: uid(), language: "", proficiency: "Professional" },
      ],
    });
  };
  const removeLanguage = (id: string) => {
    useResumeStore.setState({
      languages: store.languages.filter((l) => l.id !== id),
    });
  };
  const updateLanguage = (id: string, field: keyof LanguageEntry, value: string) => {
    useResumeStore.setState({
      languages: store.languages.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    });
  };

  // ── Certifications handlers ───────────────────────
  const addCert = () => {
    useResumeStore.setState({
      certifications: [
        ...store.certifications,
        { id: uid(), name: "", issuer: "", date: "" },
      ],
    });
  };
  const removeCert = (id: string) => {
    useResumeStore.setState({
      certifications: store.certifications.filter((c) => c.id !== id),
    });
  };
  const updateCert = (id: string, field: keyof CertificationEntry, value: string) => {
    useResumeStore.setState({
      certifications: store.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  const pi = store.personalInfo;

  // ── Section content renderer ──────────────────────
  function renderSection(): React.ReactNode {
    switch (activeSection) {
      case "personal-info":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>First Name</label>
              <input className={INPUT_CLASS} value={pi?.firstName ?? ""} onChange={(e) => handlePersonalChange("firstName", e.target.value)} placeholder="Marcus" />
            </div>
            <div>
              <label className={LABEL_CLASS}>Last Name</label>
              <input className={INPUT_CLASS} value={pi?.lastName ?? ""} onChange={(e) => handlePersonalChange("lastName", e.target.value)} placeholder="Hall" />
            </div>
            <div>
              <label className={LABEL_CLASS}>Job Title</label>
              <input className={INPUT_CLASS} value={pi?.jobTitle ?? ""} onChange={(e) => handlePersonalChange("jobTitle", e.target.value)} placeholder="Developer" />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email</label>
              <input className={INPUT_CLASS} type="email" value={pi?.email ?? ""} onChange={(e) => handlePersonalChange("email", e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className={LABEL_CLASS}>Phone</label>
              <input className={INPUT_CLASS} value={pi?.phone ?? ""} onChange={(e) => handlePersonalChange("phone", e.target.value)} placeholder="+1-555-0100" />
            </div>
            <div>
              <label className={LABEL_CLASS}>Location</label>
              <input className={INPUT_CLASS} value={pi?.location ?? ""} onChange={(e) => handlePersonalChange("location", e.target.value)} placeholder="San Francisco, CA" />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL_CLASS}>Website (optional)</label>
              <input className={INPUT_CLASS} value={pi?.website ?? ""} onChange={(e) => handlePersonalChange("website", e.target.value)} placeholder="https://yoursite.com" />
            </div>
          </div>
        );

      case "social-media":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addSocial}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {store.socialMedia.map((sm) => (
                <div key={sm.id} className={CARD_CLASS}>
                  <button type="button" className={cn(DELETE_BTN_CLASS, "absolute top-2 right-2")} onClick={() => removeSocial(sm.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-10">
                    <div>
                      <label className={LABEL_CLASS}>Platform</label>
                      <select className={SELECT_CLASS} value={sm.platform} onChange={(e) => updateSocial(sm.id, "platform", e.target.value as SocialPlatform)}>
                        <option>LinkedIn</option>
                        <option>GitHub</option>
                        <option>Twitter</option>
                        <option>Portfolio</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Username</label>
                      <input className={INPUT_CLASS} value={sm.username} onChange={(e) => updateSocial(sm.id, "username", e.target.value)} placeholder="@handle" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>URL</label>
                      <input className={INPUT_CLASS} value={sm.url} onChange={(e) => updateSocial(sm.id, "url", e.target.value)} placeholder="https://..." />
                    </div>
                  </div>
                </div>
              ))}
              {store.socialMedia.length === 0 && <p className="text-sm text-muted-grey">No social media added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      case "summary":
        return (
          <textarea className={TEXTAREA_CLASS} value={store.summary} onChange={(e) => useResumeStore.setState({ summary: e.target.value })} placeholder="Resourceful developer with 11 years of experience building scalable web applications..." rows={8} />
        );

      case "education":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addEducation}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {store.education.map((edu) => (
                <div key={edu.id} className={CARD_CLASS}>
                  <button type="button" className={cn(DELETE_BTN_CLASS, "absolute top-2 right-2")} onClick={() => removeEducation(edu.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                    <div className="sm:col-span-2">
                      <label className={LABEL_CLASS}>Institution</label>
                      <input className={INPUT_CLASS} value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="New York University" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Degree</label>
                      <input className={INPUT_CLASS} value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Bachelor of Science" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Field of Study</label>
                      <input className={INPUT_CLASS} value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} placeholder="Computer Science" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Start Date</label>
                      <input className={INPUT_CLASS} value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} placeholder="Aug 2020" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>End Date</label>
                      <input className={INPUT_CLASS} value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} placeholder="Jul 2024" />
                    </div>
                  </div>
                </div>
              ))}
              {store.education.length === 0 && <p className="text-sm text-muted-grey">No education added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      case "work-experience":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addWork}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {store.workExperience.map((work) => (
                <div key={work.id} className={CARD_CLASS}>
                  <button type="button" className={cn(DELETE_BTN_CLASS, "absolute top-2 right-2")} onClick={() => removeWork(work.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                    <div>
                      <label className={LABEL_CLASS}>Company</label>
                      <input className={INPUT_CLASS} value={work.company} onChange={(e) => updateWork(work.id, "company", e.target.value)} placeholder="Torph TTC" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Position</label>
                      <input className={INPUT_CLASS} value={work.position} onChange={(e) => updateWork(work.id, "position", e.target.value)} placeholder="Developer" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Location</label>
                      <input className={INPUT_CLASS} value={work.location} onChange={(e) => updateWork(work.id, "location", e.target.value)} placeholder="Remote" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={LABEL_CLASS}>Start</label>
                        <input className={INPUT_CLASS} value={work.startDate} onChange={(e) => updateWork(work.id, "startDate", e.target.value)} placeholder="Feb 2023" />
                      </div>
                      <div>
                        <label className={LABEL_CLASS}>End</label>
                        <input className={INPUT_CLASS} value={work.endDate} onChange={(e) => updateWork(work.id, "endDate", e.target.value)} placeholder="Present" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Bullet Points (one per line)</label>
                    <textarea className={TEXTAREA_CLASS} value={work.bullets.join("\n")} onChange={(e) => updateWork(work.id, "bullets", e.target.value.split("\n"))} placeholder="Created and maintained 10 web apps..." rows={4} />
                  </div>
                </div>
              ))}
              {store.workExperience.length === 0 && <p className="text-sm text-muted-grey">No work experience added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      case "projects":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addProject}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {store.projects.map((proj) => (
                <div key={proj.id} className={CARD_CLASS}>
                  <button type="button" className={cn(DELETE_BTN_CLASS, "absolute top-2 right-2")} onClick={() => removeProject(proj.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                    <div>
                      <label className={LABEL_CLASS}>Project Name</label>
                      <input className={INPUT_CLASS} value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} placeholder="My Cool Project" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Tech Stack (comma-separated)</label>
                      <input className={INPUT_CLASS} value={proj.techStack.join(", ")} onChange={(e) => updateProject(proj.id, "techStack", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="React, Node, PostgreSQL" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={LABEL_CLASS}>Description</label>
                      <textarea className={TEXTAREA_CLASS} value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} placeholder="A brief description..." rows={3} />
                    </div>
                  </div>
                </div>
              ))}
              {store.projects.length === 0 && <p className="text-sm text-muted-grey">No projects added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      case "technical-skills":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addSkill}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {store.technicalSkills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-3">
                  <input className={cn(INPUT_CLASS, "flex-1")} value={skill.name} onChange={(e) => updateSkill(skill.id, "name", e.target.value)} placeholder="JavaScript" />
                  <select className={cn(SELECT_CLASS, "w-36")} value={skill.level} onChange={(e) => updateSkill(skill.id, "level", e.target.value as SkillLevel)}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                  <button type="button" className={DELETE_BTN_CLASS} onClick={() => removeSkill(skill.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {store.technicalSkills.length === 0 && <p className="text-sm text-muted-grey">No technical skills added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      case "soft-skills":
        return (
          <>
            <textarea
              className={TEXTAREA_CLASS}
              value={store.softSkills.join(", ")}
              onChange={(e) => useResumeStore.setState({ softSkills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
              placeholder="Collaboration, Problem-solving, Communication..."
              rows={5}
            />
            <p className="text-xs text-muted-grey mt-2">Comma-separated list</p>
          </>
        );

      case "additional-skills":
        return (
          <>
            <textarea
              className={TEXTAREA_CLASS}
              value={store.additionalSkills.join(", ")}
              onChange={(e) => useResumeStore.setState({ additionalSkills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
              placeholder="Public Speaking, Writing, Research..."
              rows={5}
            />
            <p className="text-xs text-muted-grey mt-2">Comma-separated list</p>
          </>
        );

      case "languages":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addLanguage}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {store.languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-3">
                  <input className={cn(INPUT_CLASS, "flex-1")} value={lang.language} onChange={(e) => updateLanguage(lang.id, "language", e.target.value)} placeholder="English" />
                  <select className={cn(SELECT_CLASS, "w-44")} value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value as LanguageProficiency)}>
                    <option>Elementary</option>
                    <option>Limited Working</option>
                    <option>Professional</option>
                    <option>Full Professional</option>
                    <option>Native</option>
                  </select>
                  <button type="button" className={DELETE_BTN_CLASS} onClick={() => removeLanguage(lang.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {store.languages.length === 0 && <p className="text-sm text-muted-grey">No languages added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      case "certifications":
        return (
          <>
            <div className="flex justify-end mb-3">
              <button type="button" className={ADD_BTN_CLASS} onClick={addCert}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {store.certifications.map((cert) => (
                <div key={cert.id} className={CARD_CLASS}>
                  <button type="button" className={cn(DELETE_BTN_CLASS, "absolute top-2 right-2")} onClick={() => removeCert(cert.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                    <div>
                      <label className={LABEL_CLASS}>Certificate Name</label>
                      <input className={INPUT_CLASS} value={cert.name} onChange={(e) => updateCert(cert.id, "name", e.target.value)} placeholder="AWS Solutions Architect" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Issuer</label>
                      <input className={INPUT_CLASS} value={cert.issuer} onChange={(e) => updateCert(cert.id, "issuer", e.target.value)} placeholder="Amazon" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Date</label>
                      <input className={INPUT_CLASS} value={cert.date} onChange={(e) => updateCert(cert.id, "date", e.target.value)} placeholder="Jan 2024" />
                    </div>
                  </div>
                </div>
              ))}
              {store.certifications.length === 0 && <p className="text-sm text-muted-grey">No certifications added yet. Click &quot;Add&quot; to get started.</p>}
            </div>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col h-full p-6 max-w-2xl mx-auto">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 border-b border-border-grey pb-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-surface-muted border border-border-grey">
          <ActiveIcon className="h-5 w-5 text-brand-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">{currentMeta?.label}</h2>
          <p className="text-xs text-muted-grey">{currentMeta?.group} · Section {currentIndex + 1} of {RESUME_SECTIONS.length}</p>
        </div>
      </div>

      {/* Section content */}
      <div className="flex-1">
        {renderSection()}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-border-grey">
        {prevSection ? (
          <button type="button" className={NAV_BTN_CLASS} onClick={() => setActiveSection(prevSection.id)}>
            <ChevronLeft className="h-4 w-4" />
            {prevSection.label}
          </button>
        ) : (
          <div />
        )}
        {nextSection ? (
          <button type="button" className={NAV_BTN_CLASS} onClick={() => setActiveSection(nextSection.id)}>
            {nextSection.label}
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
