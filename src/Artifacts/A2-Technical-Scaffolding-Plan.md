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