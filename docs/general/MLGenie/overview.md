---
id: mlgenie-overview
title: MLGenie Overview
sidebar_position: 1
---

# MLGenie

MLGenie is PromptBio's machine learning module that enables you to build, train, and evaluate predictive models on biological datasets — no coding required.

## What You Can Do

- **Classification** — predict sample class (e.g. disease vs. healthy)
- **Regression** — predict continuous outcomes (e.g. drug response score)
- **Feature importance** — identify which genes/proteins drive predictions

## Supported Algorithms

| Algorithm | Type | Best For |
|---|---|---|
| Random Forest | Classification / Regression | High-dimensional data |
| XGBoost | Classification / Regression | Tabular data with complex patterns |
| Logistic Regression | Classification | Interpretable baseline models |
| ElasticNet | Regression | Sparse feature selection |

## How to Run

1. Go to **MLGenie** from the sidebar
2. Select your dataset
3. Choose your target variable (the column you want to predict)
4. Select features to include or use **Auto Feature Selection**
5. Choose your algorithm
6. Click **Train Model**

## Output

- **Model performance report** — accuracy, AUC, RMSE depending on task
- **Confusion matrix** (for classification)
- **Feature importance plot** — top contributing features
- Trained model available for download as `.pkl`
