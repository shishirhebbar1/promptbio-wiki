---
id: notebookgenie-overview
title: NotebookGenie Overview
sidebar_position: 1
---

# NotebookGenie

NotebookGenie generates ready-to-run Jupyter notebooks from your PromptBio analyses. It lets bioinformaticians take any analysis run inside PromptBio and export it as reproducible, annotated Python code.

## Why Use NotebookGenie?

- Get fully working Python code for every analysis you run
- Notebooks include markdown explanations alongside the code
- Modify and extend the analysis beyond what the UI offers
- Share with collaborators who prefer to work in code

## How It Works

1. Run any analysis in PromptBio (e.g. Differential Analysis, Single-cell Clustering)
2. In the Results panel, click **Export → Generate Notebook**
3. NotebookGenie builds a `.ipynb` file with:
   - Data loading steps
   - The exact parameters you used
   - All analysis steps as executable code
   - Output plots regenerated inline
4. Download and open in JupyterLab or VS Code

## Supported Analysis Types

- ✅ Differential Analysis (DESeq2, limma, edgeR)
- ✅ Single-cell Clustering (Scanpy pipeline)
- ✅ Functional Enrichment (gseapy)
- ✅ MLGenie models (scikit-learn)
- 🚧 MarkerGenie (coming soon)

## Requirements

Your local environment needs Python 3.9+ and the `promptbio-sdk` package:

```bash
pip install promptbio-sdk
jupyter lab
```
