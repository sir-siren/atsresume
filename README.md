# ATS Resume Builder

A lightning-fast, client-side, ATS-friendly resume builder built with modern web technologies. This application allows users to create, customize, and arrange professional resumes with a real-time preview and drag-and-drop capabilities.

## ✨ Features

- **Real-Time Preview:** See your resume update instantly as you type.
- **Drag and Drop Sections:** Fully customizable layout powered by `@dnd-kit` to reorder sections effortlessly.
- **Extensive Resume Sections:** Choose from a comprehensive list of categorized sections to build the perfect resume:
    - **Core:** Personal Information, Social Media, Summary
    - **Background & Experience:** Education, Work Experience, Projects, Internships, Volunteer Experience
    - **Skills:** Technical Skills, Soft Skills, Additional Skills
    - **Achievements:** Awards & Honors, Publications, Conferences
    - **Learning:** Courses, Tests & Certifications
    - **Extra & Personal:** Languages, Hobbies & Interests, References
- **Client-Side State Management:** Lightning-fast local state management using Zustand, ensuring your data is handled securely and efficiently in the browser.
- **Modern UI:** Styled with Tailwind CSS and enhanced with Lucide React icons for a clean, professional aesthetic.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS, `clsx`, `tailwind-merge`
- **State Management:** Zustand
- **Drag & Drop:** `@dnd-kit`
- **Icons:** Lucide React
- **Package Manager / Runtime:** [Bun](https://bun.sh/)

## 🚀 Getting Started

First, ensure you have [Bun](https://bun.sh/) installed on your machine.

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd atsresume
    ```

2. **Install dependencies:**

    ```bash
    bun install
    ```

3. **Run the development server:**

    ```bash
    bun run dev
    ```

4. **Open your browser:**
   Navigate to [localhost](http://localhost:3000) to see the application in action.

## 📂 Project Structure

- `src/app/` - Next.js App Router pages and layouts.
- `src/components/` - Reusable UI components (Buttons, Inputs, etc.) and specific feature panels (Sidebar, Preview, Customization).
- `src/config/` - Configuration files, including the core `sections.config.ts` which defines all available resume sections and their metadata.
- `src/stores/` - Zustand store definitions for managing resume data and visual customization state.
- `src/types/` - TypeScript interface definitions for strict typing across the app.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
