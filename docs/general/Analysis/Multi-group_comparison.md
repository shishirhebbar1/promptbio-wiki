---
id: multi-group-comparison
title: Multi-Group Comparison
sidebar_position: 4
---

# Multi-Group Comparison

Multi-group comparison extends differential analysis to handle **three or more groups** simultaneously, using ANOVA-like approaches for biological data.

## When to Use

- You have more than 2 experimental conditions (e.g. low dose, high dose, control)
- You want to find features that vary across a time series
- You are comparing multiple patient subtypes

## Methods Available

| Method | Best For |
|---|---|
| One-way ANOVA | Bulk expression, normally distributed data |
| Kruskal-Wallis | Non-parametric, smaller sample sizes |
| MANOVA | Multiple response variables simultaneously |

## How to Run

1. Go to **Analysis → Multi-Group Comparison**
2. Upload or select your dataset
3. Define all groups under **Group Settings** (minimum 3 groups)
4. Choose statistical method
5. Set post-hoc correction method (Tukey recommended)
6. Click **Run**

## Post-Hoc Analysis

After identifying significant features, PromptBio automatically runs pairwise post-hoc tests so you can see **which specific pairs of groups** differ.

Results are shown in a pairwise comparison matrix in the output panel.
