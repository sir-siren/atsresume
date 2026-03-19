"use client";

import * as React from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useResumeStore } from "@/stores/resume.store";
import { RESUME_SECTIONS, ICON_MAP } from "@/config/sections.config";
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
    ReferenceEntry,
    SocialPlatform,
    SkillLevel,
    LanguageProficiency,
    ConferenceRole,
    ReferenceRelationship,
    ReferenceVisibility,
    CustomSectionItem,
} from "@/types/resume.types";
import { cn } from "@/lib/cn";

// ── Shared styles ───────────────────────────────────
const INPUT =
    "flex h-10 w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors";

const TEXTAREA =
    "flex min-h-[80px] w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-y transition-colors";

const SELECT =
    "flex h-10 w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors";

const LABEL = "text-xs font-medium text-muted-grey mb-1 block";

const ADD_BTN =
    "inline-flex items-center gap-1.5 rounded-md border border-border-grey bg-surface-muted px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-border-grey hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer";

const DEL_BTN =
    "inline-flex items-center justify-center h-8 w-8 rounded-md text-red-400 hover:bg-red-900/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer";

const CARD =
    "relative border border-border-grey rounded-md p-4 space-y-3 group";

const NAV_BTN =
    "inline-flex items-center gap-1.5 rounded-md border border-border-grey bg-surface-muted px-3 py-2 text-xs font-medium text-text-muted hover:bg-border-grey hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer";

function uid(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Main Component ──────────────────────────────────
export function FormSections() {
    const store = useResumeStore();
    const activeSection = useResumeStore((s) => s.activeSection);
    const setActiveSection = useResumeStore((s) => s.setActiveSection);
    const sectionConfigs = useResumeStore((s) => s.sectionConfigs);

    // Build ordered visible section list for prev/next
    const allOrdered = [...sectionConfigs].sort((a, b) => a.order - b.order);
    const currentIndex = allOrdered.findIndex((s) => s.id === activeSection);
    const currentConfig = allOrdered[currentIndex];

    // Find prev/next considering all configs (not just visible)
    const prevConfig =
        currentIndex > 0 ? allOrdered[currentIndex - 1] : undefined;
    const nextConfig =
        currentIndex < allOrdered.length - 1
            ? allOrdered[currentIndex + 1]
            : undefined;

    const currentMeta = RESUME_SECTIONS.find((s) => s.id === activeSection);
    const currentCustom = store.customSections.find(
        (c) => c.id === activeSection,
    );
    const ActiveIcon = currentMeta?.icon ?? ICON_MAP["custom"] ?? Plus;
    const sectionLabel =
        currentConfig?.customLabel ??
        currentMeta?.label ??
        currentCustom?.label ??
        "Section";

    const prevLabel = (() => {
        if (!prevConfig) return undefined;
        const meta = RESUME_SECTIONS.find((s) => s.id === prevConfig.id);
        return prevConfig.customLabel ?? meta?.label ?? "Previous";
    })();

    const nextLabel = (() => {
        if (!nextConfig) return undefined;
        const meta = RESUME_SECTIONS.find((s) => s.id === nextConfig.id);
        return nextConfig.customLabel ?? meta?.label ?? "Next";
    })();

    // ── Handlers ──────────────────────────────────────
    const handlePersonalChange = (
        field: keyof PersonalInfoData,
        value: string,
    ) => {
        const current = store.personalInfo ?? {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            location: "",
            jobTitle: "",
        };
        useResumeStore.setState({
            personalInfo: { ...current, [field]: value },
        });
    };

    // Generic array CRUD pattern
    /* eslint-disable @typescript-eslint/no-explicit-any */
    function arrayAdd<T extends { id: string }>(
        key: string,
        defaults: Omit<T, "id">,
    ) {
        const current = (store as any)[key] as T[];
        useResumeStore.setState({
            [key]: [...current, { ...defaults, id: uid() }],
        } as any);
    }
    function arrayRemove<T extends { id: string }>(key: string, id: string) {
        const current = (store as any)[key] as T[];
        useResumeStore.setState({
            [key]: current.filter((item) => item.id !== id),
        } as any);
    }
    function arrayUpdate<T extends { id: string }>(
        key: string,
        id: string,
        field: string,
        value: unknown,
    ) {
        const current = (store as any)[key] as T[];
        useResumeStore.setState({
            [key]: current.map((item) =>
                item.id === id ? { ...item, [field]: value } : item,
            ),
        } as any);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const pi = store.personalInfo;

    function renderSection(): React.ReactNode {
        switch (activeSection) {
            // ── PERSONAL INFO ─────────────────────────────
            case "personal-info":
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={LABEL}>First Name</label>
                            <input
                                className={INPUT}
                                value={pi?.firstName ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "firstName",
                                        e.target.value,
                                    )
                                }
                                placeholder="Marcus"
                            />
                        </div>
                        <div>
                            <label className={LABEL}>Last Name</label>
                            <input
                                className={INPUT}
                                value={pi?.lastName ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "lastName",
                                        e.target.value,
                                    )
                                }
                                placeholder="Hall"
                            />
                        </div>
                        <div>
                            <label className={LABEL}>Job Title</label>
                            <input
                                className={INPUT}
                                value={pi?.jobTitle ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "jobTitle",
                                        e.target.value,
                                    )
                                }
                                placeholder="Developer"
                            />
                        </div>
                        <div>
                            <label className={LABEL}>Email</label>
                            <input
                                className={INPUT}
                                type="email"
                                value={pi?.email ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "email",
                                        e.target.value,
                                    )
                                }
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className={LABEL}>Phone</label>
                            <input
                                className={INPUT}
                                value={pi?.phone ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "phone",
                                        e.target.value,
                                    )
                                }
                                placeholder="+1-555-0100"
                            />
                        </div>
                        <div>
                            <label className={LABEL}>Location</label>
                            <input
                                className={INPUT}
                                value={pi?.location ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "location",
                                        e.target.value,
                                    )
                                }
                                placeholder="San Francisco, CA"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={LABEL}>Website (optional)</label>
                            <input
                                className={INPUT}
                                value={pi?.website ?? ""}
                                onChange={(e) =>
                                    handlePersonalChange(
                                        "website",
                                        e.target.value,
                                    )
                                }
                                placeholder="https://yoursite.com"
                            />
                        </div>
                    </div>
                );

            // ── SOCIAL MEDIA ──────────────────────────────
            case "social-media":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("socialMedia", {
                                        id: "",
                                        platform: "LinkedIn" as SocialPlatform,
                                        url: "",
                                        username: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.socialMedia.map((sm) => (
                                <div key={sm.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<SocialMediaData>(
                                                "socialMedia",
                                                sm.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Platform
                                            </label>
                                            <select
                                                className={SELECT}
                                                value={sm.platform}
                                                onChange={(e) =>
                                                    arrayUpdate<SocialMediaData>(
                                                        "socialMedia",
                                                        sm.id,
                                                        "platform",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option>LinkedIn</option>
                                                <option>GitHub</option>
                                                <option>Twitter</option>
                                                <option>Portfolio</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Username
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={sm.username}
                                                onChange={(e) =>
                                                    arrayUpdate<SocialMediaData>(
                                                        "socialMedia",
                                                        sm.id,
                                                        "username",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="@handle"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>URL</label>
                                            <input
                                                className={INPUT}
                                                value={sm.url}
                                                onChange={(e) =>
                                                    arrayUpdate<SocialMediaData>(
                                                        "socialMedia",
                                                        sm.id,
                                                        "url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.socialMedia.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No social media added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── SUMMARY ───────────────────────────────────
            case "summary":
                return (
                    <textarea
                        className={TEXTAREA}
                        value={store.summary}
                        onChange={(e) =>
                            useResumeStore.setState({ summary: e.target.value })
                        }
                        placeholder="Resourceful developer with experience building scalable web apps..."
                        rows={8}
                    />
                );

            // ── EDUCATION ─────────────────────────────────
            case "education":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("education", {
                                        id: "",
                                        institution: "",
                                        degree: "",
                                        field: "",
                                        startDate: "",
                                        endDate: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.education.map((edu) => (
                                <div key={edu.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<EducationEntry>(
                                                "education",
                                                edu.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Institution
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={edu.institution}
                                                onChange={(e) =>
                                                    arrayUpdate<EducationEntry>(
                                                        "education",
                                                        edu.id,
                                                        "institution",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="New York University"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Degree
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={edu.degree}
                                                onChange={(e) =>
                                                    arrayUpdate<EducationEntry>(
                                                        "education",
                                                        edu.id,
                                                        "degree",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Bachelor of Science"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Field
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={edu.field}
                                                onChange={(e) =>
                                                    arrayUpdate<EducationEntry>(
                                                        "education",
                                                        edu.id,
                                                        "field",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Computer Science"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Start
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={edu.startDate}
                                                onChange={(e) =>
                                                    arrayUpdate<EducationEntry>(
                                                        "education",
                                                        edu.id,
                                                        "startDate",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Aug 2020"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>End</label>
                                            <input
                                                className={INPUT}
                                                value={edu.endDate}
                                                onChange={(e) =>
                                                    arrayUpdate<EducationEntry>(
                                                        "education",
                                                        edu.id,
                                                        "endDate",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Jul 2024"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.education.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No education added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── WORK EXPERIENCE ───────────────────────────
            case "work-experience":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("workExperience", {
                                        id: "",
                                        company: "",
                                        position: "",
                                        location: "",
                                        startDate: "",
                                        endDate: "",
                                        bullets: [] as string[],
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.workExperience.map((w) => (
                                <div key={w.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<WorkExperienceEntry>(
                                                "workExperience",
                                                w.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Company
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={w.company}
                                                onChange={(e) =>
                                                    arrayUpdate<WorkExperienceEntry>(
                                                        "workExperience",
                                                        w.id,
                                                        "company",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Torph TTC"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Position
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={w.position}
                                                onChange={(e) =>
                                                    arrayUpdate<WorkExperienceEntry>(
                                                        "workExperience",
                                                        w.id,
                                                        "position",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Developer"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Location
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={w.location}
                                                onChange={(e) =>
                                                    arrayUpdate<WorkExperienceEntry>(
                                                        "workExperience",
                                                        w.id,
                                                        "location",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Remote"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className={LABEL}>
                                                    Start
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={w.startDate}
                                                    onChange={(e) =>
                                                        arrayUpdate<WorkExperienceEntry>(
                                                            "workExperience",
                                                            w.id,
                                                            "startDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Feb 2023"
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    End
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={w.endDate}
                                                    onChange={(e) =>
                                                        arrayUpdate<WorkExperienceEntry>(
                                                            "workExperience",
                                                            w.id,
                                                            "endDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Present"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={LABEL}>
                                            Bullets (one per line)
                                        </label>
                                        <textarea
                                            className={TEXTAREA}
                                            value={w.bullets.join("\n")}
                                            onChange={(e) =>
                                                arrayUpdate<WorkExperienceEntry>(
                                                    "workExperience",
                                                    w.id,
                                                    "bullets",
                                                    e.target.value.split("\n"),
                                                )
                                            }
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            ))}
                            {store.workExperience.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No work experience added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── PROJECTS ──────────────────────────────────
            case "projects":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("projects", {
                                        id: "",
                                        name: "",
                                        description: "",
                                        techStack: [] as string[],
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.projects.map((p) => (
                                <div key={p.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<ProjectEntry>(
                                                "projects",
                                                p.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Name
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={p.name}
                                                onChange={(e) =>
                                                    arrayUpdate<ProjectEntry>(
                                                        "projects",
                                                        p.id,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Cool Project"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Tech Stack (comma-sep)
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={p.techStack.join(", ")}
                                                onChange={(e) =>
                                                    arrayUpdate<ProjectEntry>(
                                                        "projects",
                                                        p.id,
                                                        "techStack",
                                                        e.target.value
                                                            .split(",")
                                                            .map((s) =>
                                                                s.trim(),
                                                            )
                                                            .filter(Boolean),
                                                    )
                                                }
                                                placeholder="React, Node"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Description
                                            </label>
                                            <textarea
                                                className={TEXTAREA}
                                                value={p.description}
                                                onChange={(e) =>
                                                    arrayUpdate<ProjectEntry>(
                                                        "projects",
                                                        p.id,
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.projects.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No projects added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── INTERNSHIPS ───────────────────────────────
            case "internships":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("internships", {
                                        id: "",
                                        company: "",
                                        position: "",
                                        location: "",
                                        startDate: "",
                                        endDate: "",
                                        bullets: [] as string[],
                                        isPaid: false,
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.internships.map((i) => (
                                <div key={i.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<InternshipEntry>(
                                                "internships",
                                                i.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Company
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={i.company}
                                                onChange={(e) =>
                                                    arrayUpdate<InternshipEntry>(
                                                        "internships",
                                                        i.id,
                                                        "company",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Google"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Position
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={i.position}
                                                onChange={(e) =>
                                                    arrayUpdate<InternshipEntry>(
                                                        "internships",
                                                        i.id,
                                                        "position",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Software Intern"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Location
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={i.location}
                                                onChange={(e) =>
                                                    arrayUpdate<InternshipEntry>(
                                                        "internships",
                                                        i.id,
                                                        "location",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Mountain View, CA"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className={LABEL}>
                                                    Start
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={i.startDate}
                                                    onChange={(e) =>
                                                        arrayUpdate<InternshipEntry>(
                                                            "internships",
                                                            i.id,
                                                            "startDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Jun 2023"
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    End
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={i.endDate}
                                                    onChange={(e) =>
                                                        arrayUpdate<InternshipEntry>(
                                                            "internships",
                                                            i.id,
                                                            "endDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Aug 2023"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:col-span-2">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-border-grey accent-brand-500"
                                                checked={i.isPaid}
                                                onChange={(e) =>
                                                    arrayUpdate<InternshipEntry>(
                                                        "internships",
                                                        i.id,
                                                        "isPaid",
                                                        e.target.checked,
                                                    )
                                                }
                                                id={`paid-${i.id}`}
                                            />
                                            <label
                                                htmlFor={`paid-${i.id}`}
                                                className="text-xs text-text-muted"
                                            >
                                                Paid internship
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={LABEL}>
                                            Bullets (one per line)
                                        </label>
                                        <textarea
                                            className={TEXTAREA}
                                            value={i.bullets.join("\n")}
                                            onChange={(e) =>
                                                arrayUpdate<InternshipEntry>(
                                                    "internships",
                                                    i.id,
                                                    "bullets",
                                                    e.target.value.split("\n"),
                                                )
                                            }
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))}
                            {store.internships.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No internships added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── VOLUNTEER ─────────────────────────────────
            case "volunteer":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("volunteer", {
                                        id: "",
                                        organization: "",
                                        role: "",
                                        startDate: "",
                                        endDate: "",
                                        bullets: [] as string[],
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.volunteer.map((v) => (
                                <div key={v.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<VolunteerEntry>(
                                                "volunteer",
                                                v.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Organization
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={v.organization}
                                                onChange={(e) =>
                                                    arrayUpdate<VolunteerEntry>(
                                                        "volunteer",
                                                        v.id,
                                                        "organization",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Red Cross"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Role
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={v.role}
                                                onChange={(e) =>
                                                    arrayUpdate<VolunteerEntry>(
                                                        "volunteer",
                                                        v.id,
                                                        "role",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Coordinator"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Cause
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={v.cause ?? ""}
                                                onChange={(e) =>
                                                    arrayUpdate<VolunteerEntry>(
                                                        "volunteer",
                                                        v.id,
                                                        "cause",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Education"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className={LABEL}>
                                                    Start
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={v.startDate}
                                                    onChange={(e) =>
                                                        arrayUpdate<VolunteerEntry>(
                                                            "volunteer",
                                                            v.id,
                                                            "startDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    End
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={v.endDate}
                                                    onChange={(e) =>
                                                        arrayUpdate<VolunteerEntry>(
                                                            "volunteer",
                                                            v.id,
                                                            "endDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={LABEL}>
                                            Bullets (one per line)
                                        </label>
                                        <textarea
                                            className={TEXTAREA}
                                            value={v.bullets.join("\n")}
                                            onChange={(e) =>
                                                arrayUpdate<VolunteerEntry>(
                                                    "volunteer",
                                                    v.id,
                                                    "bullets",
                                                    e.target.value.split("\n"),
                                                )
                                            }
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))}
                            {store.volunteer.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No volunteer experience added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── TECHNICAL SKILLS ──────────────────────────
            case "technical-skills":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("technicalSkills", {
                                        id: "",
                                        name: "",
                                        level: "Intermediate" as SkillLevel,
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {store.technicalSkills.map((sk) => (
                                <div
                                    key={sk.id}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        className={cn(INPUT, "flex-1")}
                                        value={sk.name}
                                        onChange={(e) =>
                                            arrayUpdate<SkillEntry>(
                                                "technicalSkills",
                                                sk.id,
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="JavaScript"
                                    />
                                    <select
                                        className={cn(SELECT, "w-36")}
                                        value={sk.level}
                                        onChange={(e) =>
                                            arrayUpdate<SkillEntry>(
                                                "technicalSkills",
                                                sk.id,
                                                "level",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                        <option>Expert</option>
                                    </select>
                                    <button
                                        type="button"
                                        className={DEL_BTN}
                                        onClick={() =>
                                            arrayRemove<SkillEntry>(
                                                "technicalSkills",
                                                sk.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                            {store.technicalSkills.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No skills added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── SOFT SKILLS ───────────────────────────────
            case "soft-skills":
                return (
                    <>
                        <textarea
                            className={TEXTAREA}
                            value={store.softSkills.join(", ")}
                            onChange={(e) =>
                                useResumeStore.setState({
                                    softSkills: e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                })
                            }
                            placeholder="Collaboration, Communication..."
                            rows={5}
                        />
                        <p className="text-xs text-muted-grey mt-2">
                            Comma-separated
                        </p>
                    </>
                );

            // ── ADDITIONAL SKILLS ─────────────────────────
            case "additional-skills":
                return (
                    <>
                        <textarea
                            className={TEXTAREA}
                            value={store.additionalSkills.join(", ")}
                            onChange={(e) =>
                                useResumeStore.setState({
                                    additionalSkills: e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                })
                            }
                            placeholder="Public Speaking, Research..."
                            rows={5}
                        />
                        <p className="text-xs text-muted-grey mt-2">
                            Comma-separated
                        </p>
                    </>
                );

            // ── AWARDS ────────────────────────────────────
            case "awards":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("awards", {
                                        id: "",
                                        title: "",
                                        issuer: "",
                                        date: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.awards.map((a) => (
                                <div key={a.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<AwardEntry>(
                                                "awards",
                                                a.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Title
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={a.title}
                                                onChange={(e) =>
                                                    arrayUpdate<AwardEntry>(
                                                        "awards",
                                                        a.id,
                                                        "title",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Best Developer 2024"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Issuer
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={a.issuer}
                                                onChange={(e) =>
                                                    arrayUpdate<AwardEntry>(
                                                        "awards",
                                                        a.id,
                                                        "issuer",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="ACM"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Date
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={a.date}
                                                onChange={(e) =>
                                                    arrayUpdate<AwardEntry>(
                                                        "awards",
                                                        a.id,
                                                        "date",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Mar 2024"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Description (optional)
                                            </label>
                                            <textarea
                                                className={TEXTAREA}
                                                value={a.description ?? ""}
                                                onChange={(e) =>
                                                    arrayUpdate<AwardEntry>(
                                                        "awards",
                                                        a.id,
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.awards.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No awards added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── PUBLICATIONS ──────────────────────────────
            case "publications":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("publications", {
                                        id: "",
                                        title: "",
                                        publisher: "",
                                        date: "",
                                        authors: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.publications.map((p) => (
                                <div key={p.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<PublicationEntry>(
                                                "publications",
                                                p.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Title
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={p.title}
                                                onChange={(e) =>
                                                    arrayUpdate<PublicationEntry>(
                                                        "publications",
                                                        p.id,
                                                        "title",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Machine Learning in Practice"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Publisher
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={p.publisher}
                                                onChange={(e) =>
                                                    arrayUpdate<PublicationEntry>(
                                                        "publications",
                                                        p.id,
                                                        "publisher",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="IEEE"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Date
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={p.date}
                                                onChange={(e) =>
                                                    arrayUpdate<PublicationEntry>(
                                                        "publications",
                                                        p.id,
                                                        "date",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="2024"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Authors
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={p.authors}
                                                onChange={(e) =>
                                                    arrayUpdate<PublicationEntry>(
                                                        "publications",
                                                        p.id,
                                                        "authors",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="J. Doe, M. Hall"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>URL</label>
                                            <input
                                                className={INPUT}
                                                value={p.url ?? ""}
                                                onChange={(e) =>
                                                    arrayUpdate<PublicationEntry>(
                                                        "publications",
                                                        p.id,
                                                        "url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>DOI</label>
                                            <input
                                                className={INPUT}
                                                value={p.doi ?? ""}
                                                onChange={(e) =>
                                                    arrayUpdate<PublicationEntry>(
                                                        "publications",
                                                        p.id,
                                                        "doi",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="10.xxxx/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.publications.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No publications added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── CONFERENCES ───────────────────────────────
            case "conferences":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("conferences", {
                                        id: "",
                                        name: "",
                                        role: "Attendee" as ConferenceRole,
                                        location: "",
                                        date: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.conferences.map((c) => (
                                <div key={c.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<ConferenceEntry>(
                                                "conferences",
                                                c.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Conference
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.name}
                                                onChange={(e) =>
                                                    arrayUpdate<ConferenceEntry>(
                                                        "conferences",
                                                        c.id,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="React Conf 2024"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Role
                                            </label>
                                            <select
                                                className={SELECT}
                                                value={c.role}
                                                onChange={(e) =>
                                                    arrayUpdate<ConferenceEntry>(
                                                        "conferences",
                                                        c.id,
                                                        "role",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option>Attendee</option>
                                                <option>Speaker</option>
                                                <option>Presenter</option>
                                                <option>Organizer</option>
                                                <option>Panelist</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Location
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.location}
                                                onChange={(e) =>
                                                    arrayUpdate<ConferenceEntry>(
                                                        "conferences",
                                                        c.id,
                                                        "location",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Las Vegas, NV"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Date
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.date}
                                                onChange={(e) =>
                                                    arrayUpdate<ConferenceEntry>(
                                                        "conferences",
                                                        c.id,
                                                        "date",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="May 2024"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Talk Title
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.talkTitle ?? ""}
                                                onChange={(e) =>
                                                    arrayUpdate<ConferenceEntry>(
                                                        "conferences",
                                                        c.id,
                                                        "talkTitle",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Building at Scale"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.conferences.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No conferences added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── COURSES ───────────────────────────────────
            case "courses":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("courses", {
                                        id: "",
                                        name: "",
                                        institution: "",
                                        completionDate: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.courses.map((c) => (
                                <div key={c.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<CourseEntry>(
                                                "courses",
                                                c.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Course Name
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.name}
                                                onChange={(e) =>
                                                    arrayUpdate<CourseEntry>(
                                                        "courses",
                                                        c.id,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Machine Learning"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Institution
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.institution}
                                                onChange={(e) =>
                                                    arrayUpdate<CourseEntry>(
                                                        "courses",
                                                        c.id,
                                                        "institution",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Coursera"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Completion Date
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.completionDate}
                                                onChange={(e) =>
                                                    arrayUpdate<CourseEntry>(
                                                        "courses",
                                                        c.id,
                                                        "completionDate",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Jan 2024"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Credential URL
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.credentialUrl ?? ""}
                                                onChange={(e) =>
                                                    arrayUpdate<CourseEntry>(
                                                        "courses",
                                                        c.id,
                                                        "credentialUrl",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.courses.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No courses added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── CERTIFICATIONS ────────────────────────────
            case "certifications":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("certifications", {
                                        id: "",
                                        name: "",
                                        issuer: "",
                                        date: "",
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {store.certifications.map((c) => (
                                <div key={c.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() =>
                                            arrayRemove<CertificationEntry>(
                                                "certifications",
                                                c.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Name
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.name}
                                                onChange={(e) =>
                                                    arrayUpdate<CertificationEntry>(
                                                        "certifications",
                                                        c.id,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="AWS Solutions Architect"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Issuer
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.issuer}
                                                onChange={(e) =>
                                                    arrayUpdate<CertificationEntry>(
                                                        "certifications",
                                                        c.id,
                                                        "issuer",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Amazon"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Date
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={c.date}
                                                onChange={(e) =>
                                                    arrayUpdate<CertificationEntry>(
                                                        "certifications",
                                                        c.id,
                                                        "date",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Jan 2024"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {store.certifications.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No certifications added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── LANGUAGES ─────────────────────────────────
            case "languages":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("languages", {
                                        id: "",
                                        language: "",
                                        proficiency:
                                            "Professional" as LanguageProficiency,
                                    })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {store.languages.map((l) => (
                                <div
                                    key={l.id}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        className={cn(INPUT, "flex-1")}
                                        value={l.language}
                                        onChange={(e) =>
                                            arrayUpdate<LanguageEntry>(
                                                "languages",
                                                l.id,
                                                "language",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="English"
                                    />
                                    <select
                                        className={cn(SELECT, "w-44")}
                                        value={l.proficiency}
                                        onChange={(e) =>
                                            arrayUpdate<LanguageEntry>(
                                                "languages",
                                                l.id,
                                                "proficiency",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option>Elementary</option>
                                        <option>Limited Working</option>
                                        <option>Professional</option>
                                        <option>Full Professional</option>
                                        <option>Native</option>
                                    </select>
                                    <button
                                        type="button"
                                        className={DEL_BTN}
                                        onClick={() =>
                                            arrayRemove<LanguageEntry>(
                                                "languages",
                                                l.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                            {store.languages.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No languages added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── HOBBIES ───────────────────────────────────
            case "hobbies":
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() =>
                                    arrayAdd("hobbies", { id: "", name: "" })
                                }
                            >
                                <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {store.hobbies.map((h) => (
                                <div
                                    key={h.id}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        className={cn(INPUT, "flex-1")}
                                        value={h.name}
                                        onChange={(e) =>
                                            arrayUpdate<HobbyEntry>(
                                                "hobbies",
                                                h.id,
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Photography"
                                    />
                                    <input
                                        className={cn(INPUT, "flex-1")}
                                        value={h.description ?? ""}
                                        onChange={(e) =>
                                            arrayUpdate<HobbyEntry>(
                                                "hobbies",
                                                h.id,
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Description (optional)"
                                    />
                                    <button
                                        type="button"
                                        className={DEL_BTN}
                                        onClick={() =>
                                            arrayRemove<HobbyEntry>(
                                                "hobbies",
                                                h.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                            {store.hobbies.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No hobbies added yet.
                                </p>
                            )}
                        </div>
                    </>
                );

            // ── REFERENCES ────────────────────────────────
            case "references":
                return (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <label className={LABEL}>Display</label>
                                <select
                                    className={cn(SELECT, "w-52")}
                                    value={store.references.visibility}
                                    onChange={(e) =>
                                        useResumeStore.setState({
                                            references: {
                                                ...store.references,
                                                visibility: e.target
                                                    .value as ReferenceVisibility,
                                            },
                                        })
                                    }
                                >
                                    <option value="available-on-request">
                                        Available upon request
                                    </option>
                                    <option value="listed">
                                        List references
                                    </option>
                                </select>
                            </div>
                            {store.references.visibility === "listed" && (
                                <button
                                    type="button"
                                    className={ADD_BTN}
                                    onClick={() =>
                                        useResumeStore.setState({
                                            references: {
                                                ...store.references,
                                                entries: [
                                                    ...store.references.entries,
                                                    {
                                                        id: uid(),
                                                        name: "",
                                                        position: "",
                                                        company: "",
                                                        relationship:
                                                            "Colleague" as ReferenceRelationship,
                                                    },
                                                ],
                                            },
                                        })
                                    }
                                >
                                    <Plus className="h-3.5 w-3.5" /> Add
                                </button>
                            )}
                        </div>
                        {store.references.visibility === "listed" && (
                            <div className="space-y-3">
                                {store.references.entries.map((r) => (
                                    <div key={r.id} className={CARD}>
                                        <button
                                            type="button"
                                            className={cn(
                                                DEL_BTN,
                                                "absolute top-2 right-2",
                                            )}
                                            onClick={() =>
                                                useResumeStore.setState({
                                                    references: {
                                                        ...store.references,
                                                        entries:
                                                            store.references.entries.filter(
                                                                (e) =>
                                                                    e.id !==
                                                                    r.id,
                                                            ),
                                                    },
                                                })
                                            }
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                            <div>
                                                <label className={LABEL}>
                                                    Name
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={r.name}
                                                    onChange={(e) =>
                                                        useResumeStore.setState(
                                                            {
                                                                references: {
                                                                    ...store.references,
                                                                    entries:
                                                                        store.references.entries.map(
                                                                            (
                                                                                ref,
                                                                            ) =>
                                                                                ref.id ===
                                                                                r.id
                                                                                    ? {
                                                                                          ...ref,
                                                                                          name: e
                                                                                              .target
                                                                                              .value,
                                                                                      }
                                                                                    : ref,
                                                                        ),
                                                                },
                                                            },
                                                        )
                                                    }
                                                    placeholder="John Smith"
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    Position
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={r.position}
                                                    onChange={(e) =>
                                                        useResumeStore.setState(
                                                            {
                                                                references: {
                                                                    ...store.references,
                                                                    entries:
                                                                        store.references.entries.map(
                                                                            (
                                                                                ref,
                                                                            ) =>
                                                                                ref.id ===
                                                                                r.id
                                                                                    ? {
                                                                                          ...ref,
                                                                                          position:
                                                                                              e
                                                                                                  .target
                                                                                                  .value,
                                                                                      }
                                                                                    : ref,
                                                                        ),
                                                                },
                                                            },
                                                        )
                                                    }
                                                    placeholder="Manager"
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    Company
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={r.company}
                                                    onChange={(e) =>
                                                        useResumeStore.setState(
                                                            {
                                                                references: {
                                                                    ...store.references,
                                                                    entries:
                                                                        store.references.entries.map(
                                                                            (
                                                                                ref,
                                                                            ) =>
                                                                                ref.id ===
                                                                                r.id
                                                                                    ? {
                                                                                          ...ref,
                                                                                          company:
                                                                                              e
                                                                                                  .target
                                                                                                  .value,
                                                                                      }
                                                                                    : ref,
                                                                        ),
                                                                },
                                                            },
                                                        )
                                                    }
                                                    placeholder="Acme Inc."
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    Relationship
                                                </label>
                                                <select
                                                    className={SELECT}
                                                    value={r.relationship}
                                                    onChange={(e) =>
                                                        useResumeStore.setState(
                                                            {
                                                                references: {
                                                                    ...store.references,
                                                                    entries:
                                                                        store.references.entries.map(
                                                                            (
                                                                                ref,
                                                                            ) =>
                                                                                ref.id ===
                                                                                r.id
                                                                                    ? {
                                                                                          ...ref,
                                                                                          relationship:
                                                                                              e
                                                                                                  .target
                                                                                                  .value as ReferenceRelationship,
                                                                                      }
                                                                                    : ref,
                                                                        ),
                                                                },
                                                            },
                                                        )
                                                    }
                                                >
                                                    <option>Manager</option>
                                                    <option>Colleague</option>
                                                    <option>Professor</option>
                                                    <option>Mentor</option>
                                                    <option>Client</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    Email
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={r.email ?? ""}
                                                    onChange={(e) =>
                                                        useResumeStore.setState(
                                                            {
                                                                references: {
                                                                    ...store.references,
                                                                    entries:
                                                                        store.references.entries.map(
                                                                            (
                                                                                ref,
                                                                            ) =>
                                                                                ref.id ===
                                                                                r.id
                                                                                    ? {
                                                                                          ...ref,
                                                                                          email: e
                                                                                              .target
                                                                                              .value,
                                                                                      }
                                                                                    : ref,
                                                                        ),
                                                                },
                                                            },
                                                        )
                                                    }
                                                    placeholder="john@acme.com"
                                                />
                                            </div>
                                            <div>
                                                <label className={LABEL}>
                                                    Phone
                                                </label>
                                                <input
                                                    className={INPUT}
                                                    value={r.phone ?? ""}
                                                    onChange={(e) =>
                                                        useResumeStore.setState(
                                                            {
                                                                references: {
                                                                    ...store.references,
                                                                    entries:
                                                                        store.references.entries.map(
                                                                            (
                                                                                ref,
                                                                            ) =>
                                                                                ref.id ===
                                                                                r.id
                                                                                    ? {
                                                                                          ...ref,
                                                                                          phone: e
                                                                                              .target
                                                                                              .value,
                                                                                      }
                                                                                    : ref,
                                                                        ),
                                                                },
                                                            },
                                                        )
                                                    }
                                                    placeholder="+1-555-0200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {store.references.entries.length === 0 && (
                                    <p className="text-sm text-muted-grey">
                                        No references added yet.
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                );

            // ── CUSTOM SECTIONS ───────────────────────────
            default: {
                const customSection = store.customSections.find(
                    (c) => c.id === activeSection,
                );
                if (!customSection)
                    return (
                        <p className="text-sm text-muted-grey">
                            Section not found.
                        </p>
                    );
                return (
                    <>
                        <div className="flex justify-end mb-3">
                            <button
                                type="button"
                                className={ADD_BTN}
                                onClick={() => {
                                    useResumeStore.setState({
                                        customSections:
                                            store.customSections.map((cs) =>
                                                cs.id === activeSection
                                                    ? {
                                                          ...cs,
                                                          items: [
                                                              ...cs.items,
                                                              {
                                                                  id: uid(),
                                                                  title: "",
                                                              },
                                                          ],
                                                      }
                                                    : cs,
                                            ),
                                    });
                                }}
                            >
                                <Plus className="h-3.5 w-3.5" /> Add Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {customSection.items.map((item) => (
                                <div key={item.id} className={CARD}>
                                    <button
                                        type="button"
                                        className={cn(
                                            DEL_BTN,
                                            "absolute top-2 right-2",
                                        )}
                                        onClick={() => {
                                            useResumeStore.setState({
                                                customSections:
                                                    store.customSections.map(
                                                        (cs) =>
                                                            cs.id ===
                                                            activeSection
                                                                ? {
                                                                      ...cs,
                                                                      items: cs.items.filter(
                                                                          (i) =>
                                                                              i.id !==
                                                                              item.id,
                                                                      ),
                                                                  }
                                                                : cs,
                                                    ),
                                            });
                                        }}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                        <div>
                                            <label className={LABEL}>
                                                Title
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={item.title}
                                                onChange={(e) => {
                                                    useResumeStore.setState({
                                                        customSections:
                                                            store.customSections.map(
                                                                (cs) =>
                                                                    cs.id ===
                                                                    activeSection
                                                                        ? {
                                                                              ...cs,
                                                                              items: cs.items.map(
                                                                                  (
                                                                                      i,
                                                                                  ) =>
                                                                                      i.id ===
                                                                                      item.id
                                                                                          ? {
                                                                                                ...i,
                                                                                                title: e
                                                                                                    .target
                                                                                                    .value,
                                                                                            }
                                                                                          : i,
                                                                              ),
                                                                          }
                                                                        : cs,
                                                            ),
                                                    });
                                                }}
                                                placeholder="Item title"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Subtitle
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={item.subtitle ?? ""}
                                                onChange={(e) => {
                                                    useResumeStore.setState({
                                                        customSections:
                                                            store.customSections.map(
                                                                (cs) =>
                                                                    cs.id ===
                                                                    activeSection
                                                                        ? {
                                                                              ...cs,
                                                                              items: cs.items.map(
                                                                                  (
                                                                                      i,
                                                                                  ) =>
                                                                                      i.id ===
                                                                                      item.id
                                                                                          ? {
                                                                                                ...i,
                                                                                                subtitle:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            }
                                                                                          : i,
                                                                              ),
                                                                          }
                                                                        : cs,
                                                            ),
                                                    });
                                                }}
                                                placeholder="Subtitle"
                                            />
                                        </div>
                                        <div>
                                            <label className={LABEL}>
                                                Date
                                            </label>
                                            <input
                                                className={INPUT}
                                                value={item.date ?? ""}
                                                onChange={(e) => {
                                                    useResumeStore.setState({
                                                        customSections:
                                                            store.customSections.map(
                                                                (cs) =>
                                                                    cs.id ===
                                                                    activeSection
                                                                        ? {
                                                                              ...cs,
                                                                              items: cs.items.map(
                                                                                  (
                                                                                      i,
                                                                                  ) =>
                                                                                      i.id ===
                                                                                      item.id
                                                                                          ? {
                                                                                                ...i,
                                                                                                date: e
                                                                                                    .target
                                                                                                    .value,
                                                                                            }
                                                                                          : i,
                                                                              ),
                                                                          }
                                                                        : cs,
                                                            ),
                                                    });
                                                }}
                                                placeholder="2024"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className={LABEL}>
                                                Description
                                            </label>
                                            <textarea
                                                className={TEXTAREA}
                                                value={item.description ?? ""}
                                                onChange={(e) => {
                                                    useResumeStore.setState({
                                                        customSections:
                                                            store.customSections.map(
                                                                (cs) =>
                                                                    cs.id ===
                                                                    activeSection
                                                                        ? {
                                                                              ...cs,
                                                                              items: cs.items.map(
                                                                                  (
                                                                                      i,
                                                                                  ) =>
                                                                                      i.id ===
                                                                                      item.id
                                                                                          ? {
                                                                                                ...i,
                                                                                                description:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            }
                                                                                          : i,
                                                                              ),
                                                                          }
                                                                        : cs,
                                                            ),
                                                    });
                                                }}
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {customSection.items.length === 0 && (
                                <p className="text-sm text-muted-grey">
                                    No items in this section yet.
                                </p>
                            )}
                        </div>
                    </>
                );
            }
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
                    <h2 className="text-xl font-bold text-text-primary">
                        {sectionLabel}
                    </h2>
                    <p className="text-xs text-muted-grey">
                        Section {currentIndex + 1} of {allOrdered.length}
                    </p>
                </div>
            </div>

            {/* Section content */}
            <div className="flex-1">{renderSection()}</div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border-grey">
                {prevConfig ? (
                    <button
                        type="button"
                        className={NAV_BTN}
                        onClick={() =>
                            setActiveSection(prevConfig.id as SectionId)
                        }
                    >
                        <ChevronLeft className="h-4 w-4" /> {prevLabel}
                    </button>
                ) : (
                    <div />
                )}
                {nextConfig ? (
                    <button
                        type="button"
                        className={NAV_BTN}
                        onClick={() =>
                            setActiveSection(nextConfig.id as SectionId)
                        }
                    >
                        {nextLabel} <ChevronRight className="h-4 w-4" />
                    </button>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}
