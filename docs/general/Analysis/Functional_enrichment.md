---
id: functional-enrichment
title: Functional Enrichment
sidebar_position: 3
---

# Functional Enrichment

Functional enrichment analysis helps you understand the biological meaning behind a list of significant genes or proteins by mapping them to known pathways and gene ontology (GO) terms.

## Supported Databases

- **Gene Ontology (GO)** — Biological Process, Molecular Function, Cellular Component
- **KEGG Pathways**
- **Reactome**
- **MSigDB Hallmarks**

## How to Run

1. Complete a [Differential Analysis](./Differential_analysis.md) first
2. Go to **Analysis → Functional Enrichment**
3. Select the differential analysis result as your input
4. Choose your database(s)
5. Set the gene list filter (e.g. padj < 0.05, log2FC > 1)
6. Click **Run Enrichment**

## Output

- **Dot plot** — top enriched terms by p-value and gene ratio
- **Bar chart** — enriched pathway counts
- `enrichment_results.csv` — full table with all terms, p-values, and gene lists

## Tips

- Use **GO Biological Process** for a broad overview
- Use **KEGG** when you want to map results to specific metabolic or signaling pathways
- Filter to `padj < 0.05` in the enrichment results for high-confidence terms
