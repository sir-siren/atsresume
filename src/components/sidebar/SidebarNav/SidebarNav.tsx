"use client";

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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RESUME_SECTIONS, type SectionId, type SectionGroup } from "@/types/resume.types";
import { SidebarNavItem } from "./SidebarNavItem";

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

const GROUP_ORDER: SectionGroup[] = ["Core", "Background", "Skills", "Extra"];

export function SidebarNav() {
  // Group sections
  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: RESUME_SECTIONS.filter((s) => s.group === group),
  }));

  return (
    <nav aria-label="Resume sections" className="flex-1 overflow-y-auto px-3 py-2">
      {grouped.map(({ group, items }) => (
        <div key={group} className="mb-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted px-3 mt-4 mb-1 select-none">
            {group}
          </p>
          <ul className="flex flex-col gap-0.5">
            {items.map((section) => (
              <li key={section.id}>
                <SidebarNavItem
                  id={section.id}
                  label={section.label}
                  icon={ICON_MAP[section.id]}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
