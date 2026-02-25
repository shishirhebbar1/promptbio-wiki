---
id: markergenie-overview
title: MarkerGenie Overview
sidebar_position: 1
---

# MarkerGenie

MarkerGenie automates biomarker discovery by combining statistical testing, machine learning, and biological database lookups to identify the most meaningful features in your dataset.

## Key Features

- Automated candidate biomarker ranking
- Cross-validation to reduce false positives
- Automatic annotation against UniProt, OMIM, and DisGeNET
- Export-ready marker panels

## Workflow

```
Input data → Statistical filtering → ML ranking → Database annotation → Marker panel report
```

## How to Run

1. Go to **MarkerGenie** from the sidebar
2. Select your dataset and define your groups
3. Set your discovery criteria:
   - Minimum fold change
   - Maximum adjusted p-value
   - Minimum prevalence across samples
4. Click **Discover Markers**

## Output

| File | Description |
|---|---|
| `marker_panel.csv` | Ranked list of candidate biomarkers |
| `annotation_report.csv` | Database annotations for each marker |
| `marker_heatmap.png` | Expression heatmap of top markers |

## Validation

MarkerGenie uses **k-fold cross-validation** internally to ensure markers are not overfit to your specific samples. The validation score is reported alongside each marker.
