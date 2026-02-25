---
id: comparative-analysis
title: Comparative Analysis
sidebar_position: 1
---

# Comparative Analysis

Comparative analysis in PromptBio allows you to compare gene expression, protein levels, or other biological measurements across two or more groups.

## When to Use

Use comparative analysis when you want to:
- Identify differences between experimental conditions (e.g. treated vs. control)
- Compare multiple patient cohorts
- Benchmark results across datasets

## How to Run

1. Navigate to **Analysis → Comparative Analysis** in the PromptBio dashboard
2. Select your dataset from the dropdown
3. Define your comparison groups under **Group Settings**
4. Click **Run Analysis**

## Output

| Output File | Description |
|---|---|
| `results_table.csv` | Full results with fold change and p-values |
| `volcano_plot.png` | Volcano plot of significant hits |
| `heatmap.png` | Heatmap of top 50 differentially expressed features |

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `p_value_threshold` | 0.05 | Significance cutoff |
| `fold_change_threshold` | 1.5 | Minimum fold change |
| `correction_method` | BH | Multiple testing correction (BH, Bonferroni) |

## Notes

- Requires a minimum of 3 replicates per group for statistical reliability.
- For single-cell data, see [Single-cell Clustering](./single-cell-clustering).
