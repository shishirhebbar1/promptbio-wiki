---
id: omics-overview
title: Omics Overview
sidebar_position: 1
---

# Omics Integration

The Omics module in PromptBio allows you to integrate and analyze data across multiple biological layers — genomics, transcriptomics, proteomics, and metabolomics — in a single workflow.

## Supported Data Types

| Layer | Data Type | Example |
|---|---|---|
| Genomics | Variant calls, CNV | `.vcf`, `.seg` |
| Transcriptomics | RNA-seq counts | `.csv`, `.h5ad` |
| Proteomics | Protein abundance | `.csv`, `.xlsx` |
| Metabolomics | Metabolite levels | `.csv`, `.mzML` |

## Integration Approaches

### Concatenation
Simple horizontal merging of feature matrices across layers. Good for exploratory analysis.

### MOFA+ (Multi-Omics Factor Analysis)
Identifies latent factors that explain variance across multiple omics layers. Best for finding shared and layer-specific patterns.

### SNF (Similarity Network Fusion)
Builds a patient similarity network from each omics layer and fuses them. Best for patient stratification and subtype discovery.

## How to Run

1. Upload all your omics datasets under **Data → Upload**
2. Go to **Omics → Integration**
3. Select datasets for each layer
4. Choose integration method
5. Define samples (make sure sample IDs match across all files)
6. Click **Run Integration**

## Output

- **Factor plot** (MOFA+) — variance explained per factor per layer
- **Fused network** (SNF) — patient clusters visualized as a network
- `integrated_results.csv` — combined feature scores
