---
id: data-overview
title: Data Management
sidebar_position: 1
---

# Data Management

This section explains how to upload, format, and manage your biological data in PromptBio.

## Supported File Formats

| Format | Extension | Use Case |
|---|---|---|
| CSV / TSV | `.csv`, `.tsv` | Expression matrices, metadata |
| Excel | `.xlsx` | Sample sheets |
| HDF5 | `.h5`, `.h5ad` | Single-cell data (AnnData) |
| FASTQ | `.fastq.gz` | Raw sequencing reads |
| BAM | `.bam` | Aligned reads |

## Uploading Data

1. Go to **Data → Upload**
2. Drag and drop your file or click **Browse**
3. Select the data type from the dropdown
4. Click **Upload**

Files under **500MB** upload instantly. Larger files may take a few minutes.

## Data Formatting Requirements

Your expression matrix should be formatted as:
- **Rows** = genes or features
- **Columns** = samples or cells
- **First column** = feature IDs (gene names or Ensembl IDs)
- **First row** = sample/cell IDs

## Storage

All uploaded data is stored securely in your project workspace. Data is not shared between projects unless explicitly exported. hi
