# SyncSpace

SyncSpace is a real-time collaborative workspace built for shared writing, planning, and idea organization. It brings together a modern editor experience with live collaboration, authentication, and AI-enhanced productivity workflows.

## Purpose

The project was created to help teams and individuals work together in a live environment where updates feel instant, structured, and easy to track. It combines real-time collaboration with a polished notes and workspace experience.

## Tech stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Liveblocks
- LiveKit
- Google Generative AI
- Resend
- PostgreSQL / Prisma
- Zustand for client state

## Features

- Real-time collaborative editing
- Shared notes and workspace experience
- Authentication and user management
- AI-assisted productivity support
- Modern responsive UI for team collaboration
- Built for multi-user workflows and live communication

## Run locally

```bash
npm install
npm run dev
```

Create the required environment variables before running locally, including authentication and AI/service keys.

## Environment variables

Typical configuration includes keys for:

- Clerk auth
- Google AI / GenAI
- Liveblocks
- LiveKit
- Resend
- Database connection

## Project structure

- `src/` — app logic, pages, and UI
- `public/` — static assets
- `prisma/` — database schema and Prisma configuration
- `src/app` — application routes and real-time interface

## Notes

This is a collaborative product app designed for modern team workflows, making it ideal for portfolio and product demos where AI + collaboration are central to the experience.
