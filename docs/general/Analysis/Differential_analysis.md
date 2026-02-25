---
id: differential-analysis
title: Differential Analysis
sidebar_position: 2
---

# Differential Analysis

Differential analysis identifies features (genes, proteins, metabolites) that are statistically significantly different between two conditions.

## Supported Methods

- **DESeq2** — for RNA-seq count data
- **limma** — for microarray and normalized expression data
- **edgeR** — for count-based data with overdispersion

## Input Requirements

- A count matrix (genes × samples)
- A metadata file with sample group labels
- Both files must be uploaded under **Data → Upload**

## Step-by-Step

1. Go to **Analysis → Differential Analysis**
2. Select your count matrix and metadata file
3. Choose your analysis method (DESeq2 recommended for RNA-seq)
4. Set the reference group (e.g. `control`)
5. Click **Run**

## Interpreting Results

- **log2FoldChange** — positive = upregulated in test group, negative = downregulated
- **padj** — adjusted p-value (use this, not raw p-value)
- **baseMean** — average expression across all samples

## Example Output

```
gene_id         baseMean  log2FoldChange  padj
BRCA1           245.3     2.14            0.0003
TP53            189.7     -1.87           0.0011
EGFR            402.1     3.05            0.00001
```
