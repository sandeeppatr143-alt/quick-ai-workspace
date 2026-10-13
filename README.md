# Quick AI — Generative AI Workspace

** Sandeep Patra** · React · Tailwind CSS · Node.js · Express · Neon PostgreSQL · Cloudinary · Clerk

Quick AI brings text generation, image creation and image-editing workflows into one authenticated workspace. This repository is a customized portfolio/learning version: it adds personal branding, a natural-language command router, honest workflow-focused landing content, setup templates, tests for command parsing, and safer configuration defaults.

## What it does

- Draft articles and generate blog-title ideas.
- Generate images and request background/object removal through configured providers.
- Upload a resume for AI-assisted feedback.
- Browse saved creations and published community items.
- Use the **Quick command** box on the dashboard (for example, “review my resume” or “remove background”) to navigate to a relevant tool. This command router is deterministic keyword/phrase matching in the browser, not an LLM.

AI-provider calls are dependent on external API credentials, plan limits and provider availability. No latency, request-volume or cost-reduction figures are claimed by this repository without measured deployment data.

## Stack and structure

- `frontend/`: React, Vite, Clerk React, Tailwind, Motion and Axios.
- `backend/`: Express, Clerk middleware, Neon serverless PostgreSQL, Cloudinary and provider APIs.
- `frontend/src/lib/assistantCommands.js`: task-intent routing with unit tests.

## Run locally

Requirements: Node.js 18+ and npm, a Neon PostgreSQL database, Clerk application keys, and credentials for the AI/media providers used by the selected tools.

1. Create environment files from the templates:
   - Copy `backend/.env.example` to `backend/.env` and fill in your own provider keys.
   - Copy `frontend/.env.example` to `frontend/.env.local` and fill in your Clerk publishable key and backend URL.
2. Install and start the backend:
   ```bash
   cd backend
   npm install
   npm run server
   ```
3. In a second terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open the local Vite URL printed in the terminal.

The database controller expects a `creations` table; apply the schema below in your Neon SQL editor before using persistence:

```sql
CREATE TABLE IF NOT EXISTS creations (
  id serial PRIMARY KEY,
  user_id text NOT NULL,
  prompt text,
  content text,
  type text,
  publish boolean DEFAULT false,
  likes text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);
```

## Environment variables

Backend: `DATABASE_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLIPDROP_API_KEY`, `GEMINI_API_KEY`, and optional `PORT`.

Frontend: `VITE_BASE_URL` and `VITE_CLERK_PUBLISHABLE_KEY`.

Never commit `.env` files or put secret keys in Vite variables. Anything prefixed with `VITE_` is exposed in the browser bundle. Use only the Clerk publishable key on the frontend.

## Tests

```bash
cd frontend
npm test
```

The tests cover command-to-route matching and graceful handling of unsupported commands. They do not test provider APIs or database connectivity.

## Personal project note

Sandeep Patra has a B.Tech background in Electronics and Telecommunication Engineering from Parala Maharaja Engineering College, with interests in full-stack development and AI-powered applications. This codebase is intended to demonstrate iterative engineering work, not to imply that third-party starter code or external APIs were authored from scratch.

