<!--
  File: flattened_repo.md
  Source Directory: c:\monorepo\portfolio-website1
  Date Generated: 2025-12-12T01:03:48.147Z
  ---
  Total Files: 30
  Approx. Tokens: 10729
-->

<!-- Top 10 Text Files by Token Count -->
1. src\Artifacts\A7-Science-Learning-App-Design.md (942 tokens)
2. src\features\science-lab\ScienceLab.tsx (874 tokens)
3. src\components\layout\Navbar.tsx (869 tokens)
4. src\Artifacts\DCE_README.md (741 tokens)
5. src\features\showcase\components\ProjectCard.tsx (690 tokens)
6. src\Artifacts\A2-Technical-Scaffolding-Plan.md (680 tokens)
7. src\Artifacts\A1-Project-Vision-and-Goals.md (671 tokens)
8. src\Artifacts\A3-Implementation-Roadmap.md (668 tokens)
9. src\features\contact\ContactPage.tsx (576 tokens)
10. src\Artifacts\A5-GitHub-Repository-Setup-Guide.md (428 tokens)

<!-- Full File List -->
1. src\App.tsx - Lines: 28 - Chars: 1052 - Tokens: 263
2. src\index.css - Lines: 26 - Chars: 497 - Tokens: 125
3. src\main.tsx - Lines: 10 - Chars: 231 - Tokens: 58
4. src\Artifacts\A1-Project-Vision-and-Goals.md - Lines: 49 - Chars: 2684 - Tokens: 671
5. src\Artifacts\A2-Technical-Scaffolding-Plan.md - Lines: 60 - Chars: 2719 - Tokens: 680
6. src\Artifacts\A3-Implementation-Roadmap.md - Lines: 53 - Chars: 2672 - Tokens: 668
7. src\Artifacts\A4-Developer-Environment-Setup-Guide.md - Lines: 55 - Chars: 1487 - Tokens: 372
8. src\Artifacts\A5-GitHub-Repository-Setup-Guide.md - Lines: 64 - Chars: 1712 - Tokens: 428
9. src\Artifacts\A6-Development-and-Testing-Guide.md - Lines: 44 - Chars: 1414 - Tokens: 354
10. src\Artifacts\A7-Science-Learning-App-Design.md - Lines: 84 - Chars: 3767 - Tokens: 942
11. src\Artifacts\DCE_README.md - Lines: 43 - Chars: 2962 - Tokens: 741
12. src\components\layout\Footer.tsx - Lines: 32 - Chars: 1657 - Tokens: 415
13. src\components\layout\Layout.tsx - Lines: 15 - Chars: 402 - Tokens: 101
14. src\components\layout\Navbar.tsx - Lines: 80 - Chars: 3475 - Tokens: 869
15. src\features\about\AboutPage.tsx - Lines: 23 - Chars: 1132 - Tokens: 283
16. src\features\contact\ContactPage.tsx - Lines: 44 - Chars: 2303 - Tokens: 576
17. src\features\home\HomePage.tsx - Lines: 29 - Chars: 1360 - Tokens: 340
18. src\features\science-lab\ScienceLab.tsx - Lines: 61 - Chars: 3493 - Tokens: 874
19. src\features\showcase\components\ProjectCard.tsx - Lines: 60 - Chars: 2757 - Tokens: 690
20. src\features\showcase\data\projectsData.ts - Lines: 23 - Chars: 1121 - Tokens: 281
21. src\features\showcase\ShowcasePage.tsx - Lines: 21 - Chars: 847 - Tokens: 212
22. src\types\index.ts - Lines: 17 - Chars: 299 - Tokens: 75
23. .gitignore - Lines: 18 - Chars: 107 - Tokens: 27
24. package.json - Lines: 28 - Chars: 709 - Tokens: 178
25. tsconfig.json - Lines: 31 - Chars: 726 - Tokens: 182
26. tsconfig.node.json - Lines: 10 - Chars: 212 - Tokens: 53
27. vite.config.ts - Lines: 13 - Chars: 269 - Tokens: 68
28. index.html - Lines: 13 - Chars: 375 - Tokens: 94
29. postcss.config.js - Lines: 6 - Chars: 79 - Tokens: 20
30. tailwind.config.js - Lines: 16 - Chars: 354 - Tokens: 89

<file path="src/App.tsx">
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/features/home/HomePage';
import { AboutPage } from '@/features/about/AboutPage';
import { ShowcasePage } from '@/features/showcase/ShowcasePage';
import { ContactPage } from '@/features/contact/ContactPage';
import { ScienceLab } from '@/features/science-lab/ScienceLab';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Portfolio Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="showcase" element={<ShowcasePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Standalone Project Routes (No Header/Footer from Portfolio to allow immersive experience) */}
        <Route path="/projects/science-lab" element={<ScienceLab />} />
      </Routes>
    </Router>
  );
}

export default App;
</file_artifact>

<file path="src/index.css">
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Default to dark mode color scheme preferences */
  color-scheme: dark;
}

body {
  /* Dark-mode-first defaults: Slate-900 background, Slate-50 text */
  @apply bg-slate-950 text-slate-100 antialiased;
}

/* Custom scrollbar for a polished feel */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-slate-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-700 rounded-full hover:bg-slate-600;
}
</file_artifact>

<file path="src/main.tsx">
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
</file_artifact>

<file path="src/Artifacts/A1-Project-Vision-and-Goals.md">
# Artifact A1: Project Vision and Goals
# Date Created: C0
# Author: AI Model & Curator
# Updated on: C2 (Included Science App details)

- **Key/Value for A0:**
- **Description:** Defines the core vision and phased goals for the Citizen Architect Portfolio.
- **Tags:** documentation, vision, planning, cycle 0

## 1. Project Vision

The vision of the **Citizen Architect Portfolio** is to create a distinguished digital presence that serves as the primary public-facing hub for a "Citizen Architect." It aims to provide a **professional, dark-mode-first, and highly responsive website** that will **showcase technical capabilities, design philosophy, and a curated list of built projects**.

The site will act not just as a resume, but as a living testament to the architect's skills, featuring an interactive and visually engaging user experience.

## 2. High-Level Goals & Phases

The project will be executed in distinct phases to ensure steady progress and high-quality output.

### Phase 1: Foundation & Identity

The goal of this phase is to establish the technical groundwork and the primary static content.
-   **Core Functionality:**
    -   Setup React + TypeScript + Vite scaffolding.
    -   Implement the "Dark-Mode-First" design system using Tailwind CSS.
    -   Build the **Home** page with a compelling headline and introduction.
    -   Build the **About Me** page detailing professional summary and skills.
-   **Outcome:** A deployable, responsive website with navigation and core identity pages.

### Phase 2: The Showcase & "The Inquiry Engine"

This phase focuses on the heart of the portfolio: the projects.
-   **Core Functionality:**
    -   Design and implement the **Project Showcase** component.
    -   Create a data structure to manage project metadata (title, description, tech stack, links).
    -   **Flagship Project: "The Inquiry Engine":** A science learning environment.
        -   Implement a Socratic questioning engine.
        -   Create a "Lab" interface within the portfolio.
        -   Demonstrate complex state management and interactive logic.
-   **Outcome:** Users can browse projects and interact deeply with the embedded Science App.

### Phase 3: Connection & Polish

This phase rounds out the user experience and provides means for engagement.
-   **Core Functionality:**
    -   Build the **Contact** page with social links (GitHub, LinkedIn) and a contact form (or direct email link).
    -   Implement subtle animations and transitions to enhance the "modern" feel.
    -   Conduct accessibility (a11y) and performance audits.
-   **Outcome:** A polished, professional, and fully functional portfolio ready for public launch.
</file_artifact>

<file path="src/Artifacts/A2-Technical-Scaffolding-Plan.md">
# Artifact A2: Technical Scaffolding Plan
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Outlines the technology stack and file structure for the project.
- **Tags:** documentation, architecture, technical, cycle 0

## 1. Overview

This document outlines the proposed technical scaffolding for the **Citizen Architect Portfolio**. The architecture prioritizes performance, type safety, and a modern developer experience, utilizing the Vite build tool and React ecosystem.

## 2. Technology Stack

-   **Language:** TypeScript (Strict Mode)
-   **Framework:** React
-   **Bundler:** Vite (Fast HMR and optimized builds)
-   **Styling:** Tailwind CSS (Utility-first CSS for rapid, responsive design)
-   **Routing:** React Router DOM (v6+)
-   **Icons:** Lucide React or Heroicons
-   **Deployment Target:** Vercel / Netlify / GitHub Pages (Static hosting)

## 3. Proposed File Structure

The project will adhere to a feature-driven structure where possible, keeping related assets close to the components that use them.

```
src/
├── assets/               # Static assets (images, global fonts)
│
├── components/           # Shared/Reusable UI components
│   ├── ui/               # Atomic components (Button, Card, Badge)
│   └── layout/           # Layout components (Navbar, Footer, LayoutWrapper)
│
├── features/             # Specific site sections
│   ├── home/             # Home page components
│   ├── about/            # About page components
│   ├── showcase/         # Project showcase logic and components
│   │   ├── components/
│   │   └── data/         # projects.ts (Mock database of projects)
│   └── contact/          # Contact page components
│
├── hooks/                # Custom React hooks (e.g., useTheme)
│
├── styles/               # Global styles and Tailwind configuration
│   └── index.css
│
├── types/                # Shared TypeScript type definitions
│   └── index.ts
│
├── App.tsx               # Main application component & Routing
└── main.tsx              # Entry point
```

## 4. Key Architectural Concepts

-   **Component Composition:** The UI will be built from small, atomic components (buttons, cards) composed into larger feature blocks.
-   **Data-Driven UI:** The "Showcase" section will be driven by a structured data file (JSON or TS object), making it easy to add new projects without altering the UI code.
-   **Responsive Design:** Tailwind's responsive prefixes (`md:`, `lg:`) will be used extensively to ensure the site looks great on mobile and desktop.
-   **Dark Mode Native:** The color palette will be defined in Tailwind config with a focus on dark mode as the default, but supporting light mode toggling if desired.
</file_artifact>

<file path="src/Artifacts/A3-Implementation-Roadmap.md">
# Artifact A3: Implementation Roadmap
# Date Created: C0
# Author: AI Model & Curator
# Updated on: C2 (Add Science App steps)

- **Key/Value for A0:**
- **Description:** A step-by-step roadmap for implementing the portfolio.
- **Tags:** documentation, roadmap, planning, cycle 0, cycle 1, cycle 2

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of the **Citizen Architect Portfolio**. The goal is to build the application incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational Setup & Theme (Completed C1)

-   **Goal:** Initialize the project and establish the visual language.
-   **Tasks:**
    1.  **Scaffolding:** Initialize Vite + React + TypeScript project. (Completed)
    2.  **Tailwind Setup:** Configure Tailwind CSS with the specific color palette (Dark Mode focus). (Completed)
    3.  **Routing:** Set up React Router with placeholders for Home, About, Showcase, and Contact. (Completed)
    4.  **Layout:** Create the global `Layout` component containing the Navigation Bar and Footer. (Completed)
-   **Outcome:** A navigating skeleton of the website with the correct styling foundation.

### Step 2: Content Pages & Showcase Data (Active C2)

-   **Goal:** Implement the informational sections and the project data layer.
-   **Tasks:**
    1.  **Home & About:** (Completed C1)
    2.  **Project Data:** Create `projectsData.ts` to store portfolio entries.
    3.  **Project Card:** Refactor the Showcase page to use reusable card components.
    4.  **Routing:** Add a sub-route for the Science App (`/projects/science-lab`).
-   **Outcome:** The portfolio is data-driven and ready to host the new app.

### Step 3: "The Inquiry Engine" (Science App)

-   **Goal:** Build the interactive science learning environment.
-   **Tasks:**
    1.  **Layout:** Create the "Lab Dashboard" layout (sidebar, main view, console).
    2.  **Engine:** Build the State Machine hook to handle Question -> Response -> Branching logic.
    3.  **Content:** Write the JSON scenario for "The Cell Lab".
    4.  **UI:** Implement the visual components for the "Inquiry Terminal".
-   **Outcome:** A fully functional, embedded educational app within the portfolio.

### Step 4: Contact & Polish

-   **Goal:** Finalize the user journey and prepare for launch.
-   **Tasks:**
    1.  **Contact Page:** Implement links and/or a functional form.
    2.  **Animations:** Add subtle hover effects and page transitions.
    3.  **Review:** Check for broken links, spelling errors, and visual bugs.
-   **Outcome:** A complete, professional portfolio ready for deployment.
</file_artifact>

<file path="src/Artifacts/A4-Developer-Environment-Setup-Guide.md">
# Artifact A4: Developer Environment Setup Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Instructions for setting up the local development environment.
- **Tags:** documentation, setup, environment, cycle 0

## 1. Overview

This document provides a step-by-step guide for setting up the local development environment required to build and run the **Citizen Architect Portfolio**.

## 2. System Requirements

-   **Operating System:** Windows, macOS, or Linux
-   **Package Manager:** npm (comes with Node.js)
-   **Node.js Version:** v18.0.0 or later (Recommended for Vite)
-   **Code Editor:** Visual Studio Code (Recommended)

## 3. Required Tools

Please install the following if you do not already have them:

1.  **Node.js:** [https://nodejs.org/](https://nodejs.org/)
2.  **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

## 4. Step-by-Step Setup

### Step 1: Clone the Repository

(If the repository already exists on GitHub)
```bash
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_FOLDER>
```

### Step 2: Install Dependencies

Install the project dependencies defined in `package.json`.

```bash
npm install
```

### Step 3: Run the Development Server

Start the local server. Vite will compile the code and watch for changes.

```bash
npm run dev
```

### Step 4: Verify the Setup

Open your browser to the URL shown in the terminal (usually `http://localhost:5173`). You should see the application running.
</file_artifact>

<file path="src/Artifacts/A5-GitHub-Repository-Setup-Guide.md">
# Artifact A5: GitHub Repository Setup Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Guide on setting up the project with Git and GitHub.
- **Tags:** documentation, git, github, setup, cycle 0

## 1. Overview

This guide provides the necessary commands to turn your local project folder into a Git repository and link it to GitHub.

## 2. Step-by-Step Setup

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  Click **"New repository"**.
3.  **Repository name:** `citizen-architect-portfolio` (or similar).
4.  **Public/Private:** Choose your preference.
5.  **IMPORTANT:** Do **not** initialize with README, .gitignore, or License.
6.  Click **"Create repository"**.

### Step 2: Initialize Git Locally

Open a terminal in your project's root directory:

1.  **Initialize:**
    ```bash
    git init
    ```

2.  **Add Files:**
    ```bash
    git add .
    ```

3.  **Commit:**
    ```bash
    git commit -m "Initial commit: Project structure and documentation"
    ```

4.  **Branch:**
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push

1.  **Add Remote:** (Replace URL with your GitHub repo URL)
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/citizen-architect-portfolio.git
    ```

2.  **Push:**
    ```bash
    git push -u origin main
    ```

## 3. DCE Workflow with Git

1.  **Clean State:** Always start a new cycle with a clean working tree (`git status` should be clean).
2.  **Restore:** If an AI response breaks the code, use `git restore .` to revert to the last commit.
3.  **Commit:** When a cycle is successful, commit the changes immediately.
</file_artifact>

<file path="src/Artifacts/A6-Development-and-Testing-Guide.md">
# Artifact A6: Development and Testing Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Standard procedure for running, debugging, and testing the application.
- **Tags:** documentation, testing, workflow, cycle 0

## 1. Purpose

This guide documents how to run and test the **Citizen Architect Portfolio** locally.

## 2. Development Workflow

### Start the Server
```bash
npm run dev
```
This starts the Vite development server. It is extremely fast and supports Hot Module Replacement (HMR). Changes to files will be reflected in the browser almost instantly.

### Build for Production
To test a production-like build locally:
```bash
npm run build
npm run preview
```
This compiles the TypeScript and assets into the `dist/` folder and starts a local server to preview that static build.

## 3. Debugging

### Browser Console
-   Use `console.log` in your React components to trace data.
-   React Developer Tools (Browser Extension) is highly recommended for inspecting the component tree and state.

### VS Code Debugging
-   You can debug directly in VS Code by setting breakpoints in the source files if you configure a `.vscode/launch.json` for Chrome/Edge debugging.

## 4. Testing

(Note: Initial setup may not include a comprehensive test suite, but as the project grows, Vitest or Jest can be added.)

To run tests (if configured):
```bash
npm run test
</file_artifact>

<file path="src/Artifacts/A7-Science-Learning-App-Design.md">
# Artifact A7: Science Learning App Design - "The Inquiry Engine"
# Date Created: C2
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Design and architecture for the science learning environment project.
- **Tags:** documentation, design, science-app, cycle 2

## 1. Project Overview

**Project Name:** The Inquiry Engine
**Concept:** A gamified, interactive science learning environment that moves beyond rote memorization. It focuses on **directional thinking**—guiding the learner from observation to hypothesis to conclusion using a digital Socratic method.

## 2. Educational Mechanics (Ways to "Prompt Directional Thinking")

To address your goal of prompting directional thinking, we will implement the following mechanics:

### Mechanic A: The Socratic Branching Logic
Instead of a simple "Correct/Incorrect" feedback loop, the app uses a decision tree.
-   **Scenario:** A plant is wilting.
-   **User Action:** User selects "Add more water."
-   **System Response:** (If incorrect) "The soil is already damp. If the roots are wet but the leaves are dry, what part of the plant might be blocked?"
-   **Directional Gain:** Forces the user to trace the path of water transport (Xylem) rather than guessing inputs.

### Mechanic B: Predict-Observe-Explain (POE)
This is a classic science education model adapted for the web.
1.  **Predict:** The user adjusts sliders on a simulation (e.g., "Gravity: 2x") and predicts the trajectory of a ball.
2.  **Observe:** The user hits "Run Experiment". The simulation plays out.
3.  **Explain:** The user must select the principle that explains the difference between their prediction and the observation.

### Mechanic C: Concept Mapping (The "Knowledge Node" System)
Users build the logic themselves.
-   **Interface:** A canvas with drifting nodes (terms like "Photosynthesis", "Sunlight", "Glucose").
-   **Action:** User connects nodes with directional arrows.
-   **Validation:** The system validates the *relationship* (e.g., "Sunlight" -> [provides energy for] -> "Photosynthesis").

## 3. Selected MVP Feature: "The Cell Lab"

For the initial build, we will focus on **Mechanic A (Socratic Logic)** within a **Cell Biology** context.

-   **Goal:** Diagnose why a virtual cell is failing to produce energy.
-   **Environment:** A dark-mode dashboard representing a microscope view and a data hud.
-   **Interaction:**
    1.  **Alert:** "Energy levels dropping."
    2.  **Inquiry:** User clicks on organelles to inspect.
    3.  **Dialogue:** "Mitochondria inspection: Structure looks folded, but raw materials are missing."
    4.  **Decision:** User must direct "Glucose" or "Oxygen" to the organelle.

## 4. Technical Architecture

### State Management (The Game Loop)
We will use a finite state machine (using `useReducer` or similar) to manage the learning flow.

```typescript
type GameState = 'OBSERVING' | 'HYPOTHESIZING' | 'EXPERIMENTING' | 'ANALYZING' | 'COMPLETE';
```

### Data Structure (The Scenario)
Scenarios will be defined as JSON objects to allow easy creation of new "levels".

```typescript
interface Scenario {
    id: string;
    title: string;
    initialState: string; // Description of the problem
    nodes: {
        id: string;
        prompt: string;
        options: {
            label: string;
            nextNodeId: string;
            feedback: string; // The "directional thinking" hint
        }[];
    }[];
}
```

## 5. UI/UX Design

-   **Aesthetic:** "Futuristic Lab Interface." Dark slate backgrounds, neon blue/green accents (Tailwind `cyan-500`, `emerald-500`).
-   **Layout:**
    -   **Left Panel:** Visual simulation / Image.
    -   **Right Panel:** The "Inquiry Terminal" (Chat/Prompt interface).
    -   **Bottom Bar:** Inventory/Tools.
</file_artifact>

<file path="src/Artifacts/DCE_README.md">
# Artifact A72: DCE - README for Artifacts
# Date Created: C158
# Author: AI Model & Curator
# Updated on: C129 (Move Git Init to Step 3 and automate .gitignore)

- **Key/Value for A0:**
- **Description:** The content for the `README.md` file that is automatically created in a new project's `src/Artifacts` directory, explaining the purpose of the extension and the artifact-driven workflow.
- **Tags:** documentation, onboarding, readme, source of truth

## 1. Welcome to the Data Curation Environment (DCE)

This directory (`src/Artifacts/`) is the heart of your project's planning and documentation. It's managed by the **Data Curation Environment (DCE)**, a VS Code extension designed to streamline AI-assisted development.

This `README.md` file was automatically generated to provide context for you (the developer) and for the AI assistants you will be working with.

## 2. What is an "Artifact"?

In the context of this workflow, an **Artifact** is a formal, written document that serves as a "source of truth" for a specific part of your project. Think of these files as the official blueprints, plans, and records.

The core principle of the DCE workflow is **"Documentation First."** Before writing code, you and your AI partner should first create or update an artifact that describes the plan.

## 3. The Iterative Cycle Workflow

Development in the DCE is organized into **Cycles**. You have just completed the initial setup.

### Your Next Steps

1.  **Generate Responses:** The `prompt.md` file has been automatically opened for you. This file contains your project plan and instructions for the AI. Copy its entire contents and paste it into your preferred AI chat interface (like Google's AI Studio, ChatGPT, etc.).

2.  **Review and Accept:** Paste the AI's responses back into the "Resp 1", "Resp 2", etc. tabs in the Parallel Co-Pilot panel. The UI will guide you through parsing the responses, selecting the best one, and accepting its changes into your workspace.

3.  **Baseline & Secure (Git Initialization):**
    Once you have accepted your first set of files (Cycle 1), you should initialize your Git repository to enable the DCE's powerful testing features ("Baseline" and "Restore").
    
    *   In the DCE panel, click the **"Baseline (Commit)"** button.
    *   If your repository is not yet initialized, the DCE will prompt you to initialize it.
    *   Click **"Initialize Repository"**. This will automatically run `git init` and create a `.gitignore` file that correctly excludes DCE system files (`.vscode/`), preventing UI issues.
    
    This creates a safe "restore point" for your project.

4.  **Repeat:** This completes a cycle. You then start the next cycle, building upon the newly accepted code and documentation.

This structured, iterative process helps maintain project quality and ensures that both human and AI developers are always aligned with the project's goals.
</file_artifact>

<file path="src/components/layout/Footer.tsx">
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-slate-400 text-sm">
                            © {new Date().getFullYear()} Citizen Architect. All rights reserved.
                        </p>
                    </div>
                    
                    <div className="flex space-x-6">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Github size={20} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Linkedin size={20} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="mailto:contact@example.com" className="text-slate-400 hover:text-white transition-colors">
                            <Mail size={20} />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
</file_artifact>

<file path="src/components/layout/Layout.tsx">
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
</file_artifact>

<file path="src/components/layout/Navbar.tsx">
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'Contact', path: '/contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold tracking-tight text-white">
                            Citizen<span className="text-blue-500">Architect</span>
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        location.pathname === item.path
                                            ? 'text-blue-400'
                                            : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === item.path
                                        ? 'text-blue-400 bg-slate-800'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
</file_artifact>

<file path="src/features/about/AboutPage.tsx">
export const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-400">
                    [Placeholder] I am a Citizen Architect, dedicated to crafting software that bridges the gap between technical complexity and human utility.
                </p>
                <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-800">
                    <h3 className="text-xl font-semibold mb-4 text-white">Core Skills</h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-300">
                        <li>• React & TypeScript</li>
                        <li>• Modern CSS (Tailwind)</li>
                        <li>• Node.js</li>
                        <li>• System Architecture</li>
                        <li>• UX/UI Design</li>
                        <li>• Git & CI/CD</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
</file_artifact>

<file path="src/features/contact/ContactPage.tsx">
export const ContactPage = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                        <textarea 
                            id="message"
                            rows={5}
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                            placeholder="How can I help you?"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};
</file_artifact>

<file path="src/features/home/HomePage.tsx">
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Citizen Architect
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-10">
                Building digital experiences with the precision of an architect and the heart of a maker.
            </p>
            <div className="flex gap-4">
                <Link 
                    to="/showcase" 
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                >
                    View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                    to="/about" 
                    className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium transition-colors"
                >
                    About Me
                </Link>
            </div>
        </div>
    );
};
</file_artifact>

<file path="src/features/science-lab/ScienceLab.tsx">
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScienceLab = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Custom Header for the App */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/showcase" className="text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-emerald-400 tracking-wider">
                            INQUIRY<span className="text-white">ENGINE</span>
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                        V1.0.0 // STATUS: INITIALIZING
                    </div>
                </div>
            </header>

            {/* Main Workspace Area */}
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="max-w-2xl w-full text-center space-y-8">
                    <div className="inline-block p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold">Lab Environment Loading...</h2>
                    
                    <p className="text-slate-400 text-lg">
                        You have entered the "Inquiry Engine" prototype. 
                        This environment will facilitate directional thinking through Socratic dialogue and interactive experimentation.
                    </p>

                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-left max-w-md mx-auto">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Current Module</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Subject:</span>
                                <span className="text-emerald-400 font-mono">Cell Biology</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Mode:</span>
                                <span className="text-blue-400 font-mono">Socratic Diagnostic</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Status:</span>
                                <span className="text-orange-400 font-mono">Design Phase</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
</file_artifact>

<file path="src/features/showcase/components/ProjectCard.tsx">
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-colors group flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-600 relative overflow-hidden">
                <span className="z-10">{project.title} Preview</span>
                <div className="absolute inset-0 bg-slate-800 group-hover:bg-slate-700 transition-colors" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-slate-800 text-xs rounded-md text-slate-300 border border-slate-700">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                    {project.demoUrl && (
                        <Link 
                            to={project.demoUrl}
                            className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                        >
                            Launch <ArrowRight size={16} className="ml-2" />
                        </Link>
                    )}
                    
                    {project.repoUrl && (
                        <a 
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center p-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            aria-label="View Source Code"
                        >
                            <Github size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
</file_artifact>

<file path="src/features/showcase/data/projectsData.ts">
import { Project } from '@/types';

export const projectsData: Project[] = [
    {
        id: 'science-lab',
        title: 'The Inquiry Engine',
        description: 'An interactive science learning environment that uses Socratic branching logic to guide learners through complex biological concepts. Features directional thinking prompts and a gamified "Lab" interface.',
        imageUrl: '/api/placeholder/400/300', // We will replace this with a real screenshot later
        technologies: ['React', 'TypeScript', 'State Machines', 'Tailwind CSS'],
        demoUrl: '/projects/science-lab', // Internal route
        repoUrl: 'https://github.com/rkpingali-stack',
        featured: true
    },
    {
        id: 'portfolio-v1',
        title: 'Citizen Architect Portfolio',
        description: 'The website you are currently looking at. A dark-mode-first, responsive personal portfolio built with modern web technologies.',
        imageUrl: '/api/placeholder/400/300',
        technologies: ['Vite', 'React', 'Tailwind CSS'],
        repoUrl: 'https://github.com/rkpingali-stack',
        featured: false
    }
];
</file_artifact>

<file path="src/features/showcase/ShowcasePage.tsx">
import { projectsData } from './data/projectsData';
import { ProjectCard } from './components/ProjectCard';

export const ShowcasePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Showcase</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    A collection of projects demonstrating my journey and capabilities in software engineering.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};
</file_artifact>

<file path="src/types/index.ts">
// Core type definitions

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    featured: boolean;
}

export interface NavItem {
    label: string;
    path: string;
}
</file_artifact>

<file path=".gitignore">
node_modules

package-lock.json

dist

out

*.vsix

.vscode-test/

.vscode/

prompt.md

.vscode/dce_cache/
</file_artifact>

<file path="package.json">
{
  "name": "citizen-architect-portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.300.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
</file_artifact>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path Aliases (Optional but good practice) */
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
</file_artifact>

<file path="tsconfig.node.json">
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
</file_artifact>

<file path="vite.config.ts">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
</file_artifact>

<file path="index.html">
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Citizen Architect Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
</file_artifact>

<file path="postcss.config.js">
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
</file_artifact>

<file path="tailwind.config.js">
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We can define custom brand colors here later
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Manual toggling enabled, but we will style for dark by default
}
</file_artifact>

