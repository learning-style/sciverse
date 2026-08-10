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