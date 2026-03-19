"use client";

import Image from "next/image";
import { useResumeStore } from "@/stores/resume.store";
import CallIcon from "@/assets/svg/call.svg";
import MailIcon from "@/assets/svg/mail.svg";
import LocationIcon from "@/assets/svg/location.svg";

export function PreviewPanel() {
    const personalInfo = useResumeStore((s) => s.personalInfo);
    const socialMedia = useResumeStore((s) => s.socialMedia);
    const summary = useResumeStore((s) => s.summary);
    const education = useResumeStore((s) => s.education);
    const workExperience = useResumeStore((s) => s.workExperience);
    const projects = useResumeStore((s) => s.projects);
    const technicalSkills = useResumeStore((s) => s.technicalSkills);
    const softSkills = useResumeStore((s) => s.softSkills);
    const additionalSkills = useResumeStore((s) => s.additionalSkills);
    const languages = useResumeStore((s) => s.languages);
    const certifications = useResumeStore((s) => s.certifications);

    const fullName = personalInfo
        ? `${personalInfo.firstName} ${personalInfo.lastName}`.trim()
        : "";

    const hasNoData =
        !personalInfo &&
        socialMedia.length === 0 &&
        !summary &&
        education.length === 0 &&
        workExperience.length === 0;

    return (
        <div className="min-h-full bg-black p-4 sm:p-8">
            <div className="max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] shadow-lg p-8 sm:p-12 print:shadow-none print:p-0 print:m-0">
                {hasNoData ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-50 text-gray-400">
                        <p className="text-lg font-medium">
                            Your resume preview will appear here
                        </p>
                        <p className="text-sm mt-2">
                            Load data or start filling in sections from the
                            sidebar
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <header
                            id="section-personal-info"
                            className="flex flex-col items-center justify-center border-b-2 border-black pb-6 mb-6"
                        >
                            {fullName && (
                                <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest text-black">
                                    {fullName}
                                </h1>
                            )}
                            {personalInfo?.jobTitle && (
                                <p className="text-xl sm:text-2xl mt-2 text-gray-700">
                                    {personalInfo.jobTitle}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4 text-sm font-medium text-gray-600">
                                {personalInfo?.phone && (
                                    <span className="inline-flex items-center gap-1">
                                        <Image
                                            src={CallIcon}
                                            alt="Phone"
                                            width={14}
                                            height={14}
                                        />
                                        {personalInfo.phone}
                                    </span>
                                )}
                                {personalInfo?.email && (
                                    <span className="inline-flex items-center gap-1">
                                        <Image
                                            src={MailIcon}
                                            alt="Email"
                                            width={14}
                                            height={14}
                                        />
                                        {personalInfo.email}
                                    </span>
                                )}
                                {personalInfo?.location && (
                                    <span className="inline-flex items-center gap-1">
                                        <Image
                                            src={LocationIcon}
                                            alt="Location"
                                            width={14}
                                            height={14}
                                        />
                                        {personalInfo.location}
                                    </span>
                                )}
                            </div>
                            {socialMedia.length > 0 && (
                                <div
                                    id="section-social-media"
                                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600"
                                >
                                    {socialMedia.map((sm) => (
                                        <span key={sm.id}>
                                            {sm.platform}:{" "}
                                            {sm.username || sm.url}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="md:col-span-1 flex flex-col gap-6">
                                {/* Summary */}
                                {summary && (
                                    <section id="section-summary">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">
                                            Summary
                                        </h2>
                                        <p className="text-sm text-gray-800 leading-relaxed">
                                            {summary}
                                        </p>
                                    </section>
                                )}

                                {/* Education */}
                                {education.length > 0 && (
                                    <section id="section-education">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">
                                            Education
                                        </h2>
                                        <div className="flex flex-col gap-4">
                                            {education.map((edu) => (
                                                <div key={edu.id}>
                                                    <h3 className="font-bold text-sm">
                                                        {edu.institution}
                                                    </h3>
                                                    <p className="text-sm italic text-gray-700">
                                                        {edu.degree}
                                                        {edu.field
                                                            ? ` in ${edu.field}`
                                                            : ""}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {edu.startDate} —{" "}
                                                        {edu.endDate}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Technical Skills */}
                                {technicalSkills.length > 0 && (
                                    <section id="section-technical-skills">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">
                                            Technical Skills
                                        </h2>
                                        <p className="text-sm leading-relaxed text-gray-800">
                                            {technicalSkills
                                                .map((s) => s.name)
                                                .join(", ")}
                                        </p>
                                    </section>
                                )}

                                {/* Soft Skills */}
                                {softSkills.length > 0 && (
                                    <section id="section-soft-skills">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">
                                            Soft Skills
                                        </h2>
                                        <p className="text-sm leading-relaxed text-gray-800">
                                            {softSkills.join(", ")}
                                        </p>
                                    </section>
                                )}

                                {/* Additional Skills */}
                                {additionalSkills.length > 0 && (
                                    <section id="section-additional-skills">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">
                                            Additional Skills
                                        </h2>
                                        <p className="text-sm leading-relaxed text-gray-800">
                                            {additionalSkills.join(", ")}
                                        </p>
                                    </section>
                                )}

                                {/* Languages */}
                                {languages.length > 0 && (
                                    <section id="section-languages">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">
                                            Languages
                                        </h2>
                                        <div className="flex flex-col gap-1">
                                            {languages.map((lang) => (
                                                <p
                                                    key={lang.id}
                                                    className="text-sm text-gray-800"
                                                >
                                                    {lang.language} —{" "}
                                                    <span className="text-gray-500">
                                                        {lang.proficiency}
                                                    </span>
                                                </p>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Column */}
                            <div className="md:col-span-2 flex flex-col gap-6">
                                {/* Work Experience */}
                                {workExperience.length > 0 && (
                                    <section id="section-work-experience">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-4">
                                            Work Experience
                                        </h2>
                                        <div className="flex flex-col gap-6">
                                            {workExperience.map((exp) => (
                                                <div
                                                    key={exp.id}
                                                    className="flex flex-col gap-2"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-base text-black">
                                                                {exp.company}
                                                            </h3>
                                                            <p className="text-sm font-medium text-gray-800">
                                                                {exp.position}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-600 whitespace-nowrap ml-4">
                                                            {exp.startDate} —{" "}
                                                            {exp.endDate}
                                                        </span>
                                                    </div>
                                                    {exp.bullets.length > 0 && (
                                                        <ul className="list-disc leading-relaxed list-outside ml-4 mt-1 text-sm text-gray-800 space-y-1">
                                                            {exp.bullets.map(
                                                                (bullet, i) => (
                                                                    <li key={i}>
                                                                        {bullet}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Projects */}
                                {projects.length > 0 && (
                                    <section id="section-projects">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-4">
                                            Projects
                                        </h2>
                                        <div className="flex flex-col gap-4">
                                            {projects.map((proj) => (
                                                <div
                                                    key={proj.id}
                                                    className="flex flex-col gap-1"
                                                >
                                                    <h3 className="font-bold text-sm text-black">
                                                        {proj.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-800">
                                                        {proj.description}
                                                    </p>
                                                    {proj.techStack.length >
                                                        0 && (
                                                        <p className="text-xs text-gray-500">
                                                            Tech:{" "}
                                                            {proj.techStack.join(
                                                                ", ",
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Certifications */}
                                {certifications.length > 0 && (
                                    <section id="section-certifications">
                                        <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-4">
                                            Certifications
                                        </h2>
                                        <div className="flex flex-col gap-3">
                                            {certifications.map((cert) => (
                                                <div key={cert.id}>
                                                    <h3 className="font-bold text-sm text-black">
                                                        {cert.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        {cert.issuer} —{" "}
                                                        {cert.date}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
