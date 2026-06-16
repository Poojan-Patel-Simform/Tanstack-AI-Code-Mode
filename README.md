# TanStack — AI Code Mode

A Next.js app that provides an interactive code-mode chat experience for exploring and executing code (part of TanStack AI experiments).

## Quick Start

Prerequisites: Node.js 18+ and a package manager (npm, pnpm, or yarn).

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm run start
```

## What's Included

- App built with the Next.js App Router.
- Components for chat, message list, and code execution are under `src/components`.
- Tools and schemas live in `src/tools` and `src/schemas`.

## Project Structure (high level)

- `app/` — Next.js entry, routes and layouts
- `src/components/` — UI components and chat/code panels
- `src/lib/` — helper utilities
- `src/tools/` — tool adapters and integrations

## Development Notes

- Edit `app/page.tsx` to change the main UI.
- API routes live under `app/api/`.
- Follow existing patterns in `src/ui/` for shared UI primitives.

## Contributing

PRs welcome — open issues or pull requests with bug fixes or improvements. Add tests where appropriate.

## License

This repository does not include a license file. Add one if you plan to share the project publicly.

---

If you'd like a different README layout, or want me to include badges, examples, or deploy instructions for Vercel/GitHub Actions, tell me what to add and I'll update `README.md`.
