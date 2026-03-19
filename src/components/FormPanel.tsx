import * as React from "react";
import { ResumeData, Experience, Education } from "@/types/resume";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";

interface FormPanelProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onLoad: () => void;
  onSave: () => void;
}

export function FormPanel({ data, onChange, onLoad, onSave }: FormPanelProps) {

  const updatePersonalInfo = (field: keyof ResumeData["personalInfo"], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateSocialMedia = (field: keyof ResumeData["socialMedia"], value: string) => {
    onChange({
      ...data,
      socialMedia: { ...data.socialMedia, [field]: value }
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: Date.now().toString(), companyName: "", role: "", startDate: "", endDate: "", description: [] }
      ]
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: Date.now().toString(), institution: "", degree: "", startDate: "", endDate: "" }
      ]
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-black border-r border-border-grey p-6 gap-8">
      
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="secondary" onClick={onLoad} className="flex-1">Load Data</Button>
        <Button variant="primary" onClick={onSave} className="flex-1">Save Data</Button>
      </div>

      {/* Personal Information */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold border-b border-border-grey pb-2">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Full Name" 
            value={data.personalInfo.name} 
            onChange={(e) => updatePersonalInfo("name", e.target.value)} 
          />
          <Input 
            label="Job Title" 
            value={data.personalInfo.title} 
            onChange={(e) => updatePersonalInfo("title", e.target.value)} 
          />
          <Input 
            label="Phone" 
            value={data.personalInfo.phone} 
            onChange={(e) => updatePersonalInfo("phone", e.target.value)} 
          />
          <Input 
            label="Email" 
            type="email"
            value={data.personalInfo.email} 
            onChange={(e) => updatePersonalInfo("email", e.target.value)} 
          />
          <Input 
            label="Location" 
            value={data.personalInfo.location} 
            onChange={(e) => updatePersonalInfo("location", e.target.value)} 
          />
        </div>
      </section>

      {/* Social Media */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold border-b border-border-grey pb-2">Social Media</h2>
        <div className="flex flex-col gap-4">
          <Input 
            label="GitHub" 
            value={data.socialMedia.github || ""} 
            onChange={(e) => updateSocialMedia("github", e.target.value)} 
          />
          <Input 
            label="LinkedIn" 
            value={data.socialMedia.linkedin || ""} 
            onChange={(e) => updateSocialMedia("linkedin", e.target.value)} 
          />
          <Input 
            label="Website" 
            value={data.socialMedia.website || ""} 
            onChange={(e) => updateSocialMedia("website", e.target.value)} 
          />
        </div>
      </section>

      {/* Summary */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold border-b border-border-grey pb-2">Professional Summary</h2>
        <TextArea 
          label="Summary" 
          value={data.summary} 
          onChange={(e) => onChange({...data, summary: e.target.value})} 
        />
      </section>

      {/* Work Experience */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border-grey pb-2">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <Button variant="ghost" size="sm" onClick={addExperience}>+ Add</Button>
        </div>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="flex flex-col gap-4 p-4 border border-border-grey rounded-md relative group">
            <Button 
              variant="danger" 
              size="icon" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
              onClick={() => removeExperience(exp.id)}
            >
              ×
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Company Name" 
                value={exp.companyName} 
                onChange={(e) => updateExperience(exp.id, "companyName", e.target.value)} 
              />
              <Input 
                label="Role" 
                value={exp.role} 
                onChange={(e) => updateExperience(exp.id, "role", e.target.value)} 
              />
              <Input 
                label="Start Date" 
                value={exp.startDate} 
                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} 
              />
              <Input 
                label="End Date" 
                value={exp.endDate} 
                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} 
              />
            </div>
            <TextArea 
              label="Description (one per line)" 
              value={exp.description.join("\n")} 
              onChange={(e) => updateExperience(exp.id, "description", e.target.value.split("\n"))} 
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border-grey pb-2">
          <h2 className="text-xl font-bold">Education</h2>
          <Button variant="ghost" size="sm" onClick={addEducation}>+ Add</Button>
        </div>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="flex flex-col gap-4 p-4 border border-border-grey rounded-md relative group">
            <Button 
              variant="danger" 
              size="icon" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
              onClick={() => removeEducation(edu.id)}
            >
              ×
            </Button>
            <div className="grid grid-cols-1 gap-4">
              <Input 
                label="Institution" 
                value={edu.institution} 
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} 
              />
              <Input 
                label="Degree" 
                value={edu.degree} 
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} 
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Start Date" 
                  value={edu.startDate} 
                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} 
                />
                <Input 
                  label="End Date" 
                  value={edu.endDate} 
                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} 
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold border-b border-border-grey pb-2">Skills</h2>
        <div className="flex flex-col gap-4">
          <TextArea 
            label="Technical Skills (comma separated)" 
            value={data.technicalSkills.join(", ")} 
            onChange={(e) => onChange({...data, technicalSkills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})} 
          />
          <TextArea 
            label="Soft Skills (comma separated)" 
            value={data.softSkills.join(", ")} 
            onChange={(e) => onChange({...data, softSkills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})} 
          />
          <TextArea 
            label="Additional Skills (comma separated)" 
            value={data.additionalSkills.join(", ")} 
            onChange={(e) => onChange({...data, additionalSkills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})} 
          />
        </div>
      </section>

    </div>
  );
}
