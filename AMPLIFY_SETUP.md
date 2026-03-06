# Amplify + Cognito: Step-by-Step Setup

Use this guide to host the PromptBio wiki on AWS Amplify and restrict access with Cognito.

---

## Part 1: Deploy the site on Amplify

### Step 1 — Open Amplify and connect GitHub

1. In **AWS Console**, search for **Amplify** and open **AWS Amplify**.
2. Click **"New app"** → **"Host web app"**.
3. Under **"Get started with Amplify"**, choose **"GitHub"**.
4. Click **"Authorize use of GitHub"** and sign in / authorize AWS to access your repos.
5. Select:
   - **Repository:** `shishirhebbar1/promptbio-wiki`
   - **Branch:** `main`
6. Click **"Next"**.

### Step 2 — Set build settings

1. On **"Configure build settings"**, click **"Edit"** next to the build spec (or **"Open build settings"**).
2. In **"Build image settings"** / **"App build specification"**, set:
   - **Root directory:** `docusaurus-site`
   - **Build command:** `npm run build`
   - **Output directory:** `build`
3. If you see a YAML editor, use this (or equivalent):

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands: []
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

4. Click **"Next"**, then **"Save and deploy"**.
5. Wait for the build to finish (Provision → Build → Deploy). When it’s green, note the site URL (e.g. `https://main.xxxxx.amplifyapp.com`).

---

## Part 2: Add authentication (Cognito)

### Step 3 — Enable Auth in Amplify

1. In your Amplify app, open the left sidebar.
2. Click **"Hosting"** or **"Backend"** (or **"Build settings"** and look for backend).
3. If you see **"Set up backend"** or **"Add backend"**, click it. Otherwise go to **"App settings"** → **"General"** and see if **"Backend"** or **"Authentication"** is there.
4. Choose **"Create backend"** or **"Set up authentication"**.
5. In the auth wizard:
   - **Sign-in method:** **Email** (or **Username**).
   - **Allow users to sign up:** Turn **off** if only you should create accounts.
   - Set a **password policy** (e.g. min 8 characters).
6. Save / deploy the backend. Amplify will create a Cognito User Pool.

### Step 4 — Create users (who can sign in)

1. In **AWS Console**, open **Amazon Cognito**.
2. Click **"User pools"** → open the pool Amplify created (name often includes your app name).
3. Go to **"Users"** tab → **"Create user"**.
4. Enter:
   - **Username** (or **Email address** if you use email sign-in).
   - **Temporary password** (user will change on first login if you enable that).
5. Click **"Create user"**.
6. Share the **Amplify app URL** and **temporary password** with each user.

---

## Part 3: Restrict access (login required to view wiki)

Amplify’s static hosting does not have a “require login for every request” toggle. To make the wiki private you have two options.

### Option A — Login gate page (simplest, no Lambda)

We add a login page. Users open the site, sign in with Cognito, then are sent to the wiki.  
**Caveat:** Direct links to `/docs/...` can still be opened by anyone who has the URL. This is “soft” protection: normal entry is through the login page.

1. **Get Cognito IDs**  
   - In **AWS Console** → **Cognito** → **User pools** → your pool.  
   - **User pool ID:** on the pool overview (e.g. `us-east-1_xxxxx`).  
   - **App client ID:** App integration → App client list → your app’s Client ID.

2. **Edit the login page**  
   - In the repo, open **`docusaurus-site/static/login.html`**.  
   - Replace `REPLACE_WITH_YOUR_USER_POOL_ID` with your User pool ID.  
   - Replace `REPLACE_WITH_YOUR_APP_CLIENT_ID` with your App client ID.  
   - Commit and push so Amplify redeploys.

3. **Send users to the login page first**  
   - In Amplify app → **Hosting** → **Redirects** (or **Rewrites and redirects**).  
   - Add a **rewrite**:  
     - **Source:** `/`  
     - **Target:** `/login.html`  
     - **Type:** Rewrite.  
   - Save. Now visiting the root URL shows the login page; after sign-in, users go to `/`.

4. **Optional:** To make the login page the default for all unknown paths (so `/` and `/anything` show login unless they have a matching file), you can add more rewrites or a catch-all; for most cases, the single `/` rewrite is enough.

### Option B — Full protection (S3 + CloudFront + Lambda@Edge)

To ensure **every** request (including direct `/docs/...` links) requires a valid Cognito session:

1. Build the site: `npm run build` in `docusaurus-site`.
2. Create an S3 bucket, upload the contents of `build/` (private bucket).
3. Create a CloudFront distribution with that bucket as origin.
4. Add a **Lambda@Edge (viewer-request)** that:
   - Reads the Cognito JWT from a cookie (or `Authorization` header).
   - Validates the JWT with Cognito (e.g. JWKS).
   - If valid → allow; if not → return 403 or redirect to a login page.
5. Use a small login page (or Cognito Hosted UI) that sets the cookie after sign-in.

This requires editing the CloudFront distribution and adding the Lambda in the AWS Console (no change to Amplify’s own hosting). If you want, we can break this down into exact console steps and sample Lambda code in a follow-up.

---

## Summary

| Step | Action |
|------|--------|
| 1–2 | Deploy repo to Amplify (root: `docusaurus-site`, output: `build`). |
| 3   | Add Amplify Auth (Cognito); create User Pool. |
| 4   | Create users in Cognito. |
| 5   | Restrict access: Option A = login gate page + rewrite; Option B = S3 + CloudFront + Lambda@Edge. |

After this, only the users you create in Cognito can sign in. Option A protects the “front door”; Option B protects every page.
