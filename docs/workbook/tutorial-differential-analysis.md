---
id: tutorial-differential-analysis
title: "Tutorial 1: Your First Differential Analysis"
sidebar_position: 2
---

# Tutorial 1: Your First Differential Analysis

In this tutorial you will analyze a bulk RNA-seq dataset comparing **cancer vs. normal tissue** samples and identify differentially expressed genes.

**Time required:** ~15 minutes  
**Difficulty:** Beginner

## Dataset

We'll use a publicly available colorectal cancer dataset with:
- 10 tumor samples
- 10 normal adjacent tissue samples
- ~20,000 genes

Download the example files from the PromptBio example data library:
- `colorectal_counts.csv` — raw count matrix
- `colorectal_metadata.csv` — sample group labels

## Step 1 — Create a Project

1. Log into PromptBio
2. Click **New Project** → name it `Colorectal DE Tutorial`
3. Set organism to **Human**
4. Click **Create**

## Step 2 — Upload Data

1. Go to **Data → Upload**
2. Upload `colorectal_counts.csv` as type **Count Matrix**
3. Upload `colorectal_metadata.csv` as type **Metadata**

## Step 3 — Run Differential Analysis

1. Go to **Analysis → Differential Analysis**
2. Select:
   - Count matrix: `colorectal_counts.csv`
   - Metadata: `colorectal_metadata.csv`
   - Method: **DESeq2**
   - Reference group: `normal`
3. Click **Run**

The analysis takes about 2-3 minutes.

## Step 4 — Explore Results

When complete, open the Results panel. You should see:
- A **volcano plot** showing upregulated and downregulated genes
- A **results table** with ~1,200 significant genes (padj < 0.05)

Top upregulated gene: **MMP7** (log2FC = 4.2, padj = 0.000001)  
Top downregulated gene: **CLCA4** (log2FC = -3.8, padj = 0.000003)

## Step 5 — Export Results

Click **Download → Full Results CSV** to save the full results table.

## Next Steps

Continue to Tutorial 2: Functional Enrichment *(coming soon)* to find out which biological pathways these genes belong to.
