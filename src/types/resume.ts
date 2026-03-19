export interface PersonalInfo {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    photoUrl?: string; // Optional user photo
}

export interface SocialMedia {
    github?: string;
    linkedin?: string;
    website?: string;
}

export interface Experience {
    id: string;
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string[];
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    socialMedia: SocialMedia;
    summary: string;
    experience: Experience[];
    education: Education[];
    technicalSkills: string[];
    softSkills: string[];
    additionalSkills: string[];
}

export const INITIAL_RESUME_DATA: ResumeData = {
    personalInfo: {
        name: "MARCUS HALL",
        title: "Developer",
        phone: "+1-555-0100",
        email: "beddylea@gmail.com",
        location: "San Francisco, CA",
    },
    socialMedia: {
        github: "github.com/bedivere-lea",
        linkedin: "linkedin.com/in/bedivere-lea",
        website: "bedivere-lea.github.io",
    },
    summary:
        "Resourceful Developer with 11 years of experience in designing and developing user interfaces, testing and training employees. Skilled at utilizing a wide variety of tools and programs to provide effective applications.",
    experience: [
        {
            id: "1",
            companyName: "Torph TTC",
            role: "Developer",
            startDate: "Feb 2023",
            endDate: "Feb 2023", // Wait, image says Feb 2023 - Feb 2023, maybe just mock data
            description: [
                "Torph TTC is a global software company that offers user interface UI development tools and components for a range of developer applications across all platforms.",
                "Created and maintained 10 web applications for numerous national and foreign clients.",
                "Ensured that the user interfaces and user experience of the software applications developed by the team met at least 80% of users expectations.",
                "Created and analyzed 500 unit test cases.",
                "Developed python scripts to automate image's noise-reduction process which helped improve research analysis time by 40%.",
                "Established and lead a team of 10 people; covering every key role in the early stages.",
            ],
        },
        {
            id: "2",
            companyName: "Reilty Group",
            role: "Front End Web Developer",
            startDate: "Feb 2023",
            endDate: "Mar 2023",
            description: [
                "Reilty Group is an industry-leading provider of online gambling software and solutions.",
                "Increased by 35% the reach of users to the platform, over the installation of the web platform in mobile devices.",
                "Delivered 30 web solutions.",
            ],
        },
    ],
    education: [
        {
            id: "1",
            institution: "New York University",
            degree: "Bachelor of Computer Science",
            startDate: "Aug 2020",
            endDate: "Jul 2024",
        },
    ],
    technicalSkills: [
        "JavaScript",
        "Python",
        "Web Services",
        "C++",
        "HTML5",
        "CSS",
        "SQL",
        "User Interface",
        "Creativity",
    ],
    softSkills: [
        "Collaboration",
        "Problem-solving",
        "Communication",
        "Time management",
        "Result-oriented",
    ],
    additionalSkills: ["Public Speaking", "Writing", "Research"],
};
