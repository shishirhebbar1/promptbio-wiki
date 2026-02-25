---
id: api-reference
title: API Reference
sidebar_position: 2
---

# API Reference

The PromptBio REST API lets you programmatically interact with projects, data, and analyses.

## Authentication

All API requests require a Bearer token in the header:

```http
Authorization: Bearer YOUR_API_TOKEN
```

Get your API token from **Settings → API Keys**.

## Base URL

```
https://api.promptbio.com/v1
```

## Endpoints

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/projects` | List all projects |
| POST | `/projects` | Create a new project |
| GET | `/projects/{id}` | Get project details |
| DELETE | `/projects/{id}` | Delete a project |

### Data

| Method | Endpoint | Description |
|---|---|---|
| POST | `/projects/{id}/data/upload` | Upload a file |
| GET | `/projects/{id}/data` | List uploaded files |

### Analysis

| Method | Endpoint | Description |
|---|---|---|
| POST | `/projects/{id}/analysis/run` | Start an analysis |
| GET | `/projects/{id}/analysis/{run_id}` | Get run status |
| GET | `/projects/{id}/analysis/{run_id}/results` | Download results |

## Example Request

```bash
curl -X GET https://api.promptbio.com/v1/projects \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```
