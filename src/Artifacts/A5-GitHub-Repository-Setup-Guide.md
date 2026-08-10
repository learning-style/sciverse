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