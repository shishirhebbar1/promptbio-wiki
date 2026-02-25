---
id: workflow-overview
title: Workflow Overview
sidebar_position: 1
---

# Workflows

Workflows let you chain multiple PromptBio analyses together into a single automated pipeline. Instead of running each step manually, you define the steps once and run them end-to-end.

## Example Workflow

A typical RNA-seq workflow might look like:

```
Upload raw counts → QC → Normalization → Differential Analysis → Functional Enrichment → Report
```

## Building a Workflow

1. Go to **Workflow → New Workflow**
2. Give it a name
3. Click **Add Step** and choose an analysis module
4. Configure the step's parameters
5. Add the next step — the output of each step automatically feeds into the next
6. Click **Save Workflow**

## Running a Workflow

1. Open a saved workflow
2. Click **Run**
3. Select the input dataset
4. Click **Start**

You can monitor progress in the **Workflow Runs** panel. Each step shows a status indicator (queued, running, complete, failed).

## Reusable Workflows

Workflows can be saved as **templates** and reused across projects. To save as template:
- Open a workflow → click **Save as Template**

Templates appear in **Workflow → Templates** and can be applied to any project.

## Notifications

When a workflow finishes (or fails), PromptBio sends an email notification to the project owner. You can configure notification preferences under **Settings → Notifications**.
