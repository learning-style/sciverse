<!--
  File: flattened_repo.md
  Source Directory: c:\monorepo\portfolio-website1
  Date Generated: 2025-12-12T00:37:25.679Z
  ---
  Total Files: 8
  Approx. Tokens: 3836
-->

<!-- Top 10 Text Files by Token Count -->
1. src\Artifacts\DCE_README.md (741 tokens)
2. src\Artifacts\A2-Technical-Scaffolding-Plan.md (680 tokens)
3. src\Artifacts\A3-Implementation-Roadmap.md (626 tokens)
4. src\Artifacts\A1-Project-Vision-and-Goals.md (608 tokens)
5. src\Artifacts\A5-GitHub-Repository-Setup-Guide.md (428 tokens)
6. src\Artifacts\A4-Developer-Environment-Setup-Guide.md (372 tokens)
7. src\Artifacts\A6-Development-and-Testing-Guide.md (354 tokens)
8. .gitignore (27 tokens)

<!-- Full File List -->
1. src\Artifacts\A1-Project-Vision-and-Goals.md - Lines: 45 - Chars: 2429 - Tokens: 608
2. src\Artifacts\A2-Technical-Scaffolding-Plan.md - Lines: 60 - Chars: 2719 - Tokens: 680
3. src\Artifacts\A3-Implementation-Roadmap.md - Lines: 51 - Chars: 2503 - Tokens: 626
4. src\Artifacts\A4-Developer-Environment-Setup-Guide.md - Lines: 55 - Chars: 1487 - Tokens: 372
5. src\Artifacts\A5-GitHub-Repository-Setup-Guide.md - Lines: 64 - Chars: 1712 - Tokens: 428
6. src\Artifacts\A6-Development-and-Testing-Guide.md - Lines: 44 - Chars: 1414 - Tokens: 354
7. src\Artifacts\DCE_README.md - Lines: 43 - Chars: 2962 - Tokens: 741
8. .gitignore - Lines: 18 - Chars: 107 - Tokens: 27

<file path="src/Artifacts/A1-Project-Vision-and-Goals.md">
# Artifact A1: Project Vision and Goals
# Date Created: C0
# Author: AI Model & Curator

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

### Phase 2: The Showcase

This phase focuses on the heart of the portfolio: the projects.
-   **Core Functionality:**
    -   Design and implement the **Project Showcase** component.
    -   Create a data structure to manage project metadata (title, description, tech stack, links).
    -   Implement interactive cards or grid layouts to display projects.
-   **Outcome:** Users can browse, filter, or view details of specific projects the architect has built.

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

- **Key/Value for A0:**
- **Description:** A step-by-step roadmap for implementing the portfolio.
- **Tags:** documentation, roadmap, planning, cycle 0

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of the **Citizen Architect Portfolio**. The goal is to build the application incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational Setup & Theme

-   **Goal:** Initialize the project and establish the visual language.
-   **Tasks:**
    1.  **Scaffolding:** Initialize Vite + React + TypeScript project.
    2.  **Tailwind Setup:** Configure Tailwind CSS with the specific color palette (Dark Mode focus).
    3.  **Routing:** Set up React Router with placeholders for Home, About, Showcase, and Contact.
    4.  **Layout:** Create the global `Layout` component containing the Navigation Bar and Footer.
-   **Outcome:** A navigating skeleton of the website with the correct styling foundation.

### Step 2: Content Pages (Home & About)

-   **Goal:** Implement the informational sections of the site.
-   **Tasks:**
    1.  **Home Page:** Design the "Hero" section with a headline, subheadline, and Call-to-Action (CTA).
    2.  **About Page:** Create the layout for the bio and skills list.
    3.  **Responsiveness:** Ensure these pages stack correctly on mobile devices.
-   **Outcome:** The primary identity pages are complete and readable.

### Step 3: The Project Showcase

-   **Goal:** Build the core feature: the interactive project gallery.
-   **Tasks:**
    1.  **Data Structure:** Define the `Project` interface and create a `projectsData.ts` file.
    2.  **Project Card:** Design a reusable component to display a single project's preview.
    3.  **Grid Layout:** Implement a responsive grid to display the cards.
    4.  **Tags/Filters:** Add visual tags for technologies used (e.g., "React", "Node").
-   **Outcome:** Users can view the architect's work in a structured, visual format.

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

