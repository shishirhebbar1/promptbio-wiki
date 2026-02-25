---
id: single-cell-clustering
title: Single-Cell Clustering
sidebar_position: 5
---

# Single-Cell Clustering

Single-cell clustering groups individual cells by their expression profiles to identify distinct cell populations within your dataset.

## Pipeline Overview

```
Raw counts → QC filtering → Normalization → Feature selection → Dimensionality reduction → Clustering → Annotation
```

## Step-by-Step

### 1. Quality Control
- Filter cells with fewer than **200 genes** detected
- Remove cells where **>20% of counts** come from mitochondrial genes
- These thresholds are configurable under **QC Settings**

### 2. Normalization
PromptBio uses **scran normalization** by default. You can switch to log-normalization under Advanced Settings.

### 3. Clustering
Clustering is performed using the **Leiden algorithm** on a k-nearest neighbor graph. The resolution parameter controls the number of clusters:

| Resolution | Expected Result |
|---|---|
| 0.2 | Fewer, broader clusters |
| 0.5 | Balanced (recommended default) |
| 1.0 | Many fine-grained clusters |

### 4. Visualization
Results are displayed as a **UMAP** plot. Each dot is a cell, colored by cluster.

## Output Files

- `umap_plot.png` — UMAP colored by cluster
- `cluster_markers.csv` — Top marker genes per cluster
- `cell_metadata.csv` — Cluster assignment per cell barcode
