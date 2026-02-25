---
id: project-overview
title: Project Management
sidebar_position: 1
---

# Project Management

Projects are the top-level workspace in PromptBio. All your data, analyses, and results are organized within a project.

## Creating a Project

1. From the dashboard, click **New Project**
2. Fill in:
   - **Name** — a short descriptive name
   - **Description** — optional but recommended
   - **Organism** — select the reference organism
   - **Data Type** — Bulk RNA-seq, Single-cell, Proteomics, etc.
3. Click **Create Project**

## Project Structure

```
My Project/
├── Data/          ← uploaded raw files
├── Analysis/      ← all analysis runs
├── Results/       ← output files and plots
└── Notebooks/     ← exported NotebookGenie files
```

## Collaborating on a Project

To invite collaborators:
1. Open your project
2. Click **Settings → Team**
3. Enter the email address of your collaborator
4. Set their role: **Viewer**, **Editor**, or **Admin**
5. Click **Invite**

Collaborators receive an email invite. They can access the project once they accept.

## Archiving and Deleting

- **Archive** — hides the project from the dashboard but preserves all data
- **Delete** — permanently removes the project and all associated data (cannot be undone)

Both options are available under **Project Settings → Danger Zone**.
