# Frequently Asked Questions

> Quick answers to the most common questions about **PIIK.ME**.

---

## Table of Contents

- [General](#general)
- [Setup & Installation](#setup--installation)
- [Features](#features)
- [Contributing](#contributing)
- [Bugs & Security](#bugs--security)
- [Deployment](#deployment)
- [License](#license)
- [Self-Hosting & Privacy](#self-hosting--privacy)
- [Related Documentation](#related-documentation)

---

## General

**What is PIIK.ME?**

PIIK.ME is an open-source link intelligence platform. It lets you shorten URLs, create personalized bio link pages, and track real-time analytics — including click counts, device breakdowns, referrer sources, and more. Think of it as a self-hostable alternative to Bitly with bio links similar to Linktree.

---

**Is PIIK.ME free?**

Yes. The source code is licensed under GPL-3.0 and is free to use, modify, and self-host. You will need a free Firebase project for authentication and database storage.

---

**Do I need an account to use short links?**

You need a Google account to create and manage short links. Clicking or sharing a short link requires no account.

---

**What technologies does PIIK.ME use?**

The backend runs on Node.js with Express.js and Socket.IO. Authentication and the database are handled by Firebase (Google Auth + Firestore). The frontend is plain HTML, CSS, and Vanilla JavaScript, with Three.js and Globe.gl for visual effects. See the full stack in [DEVELOPMENT.md](./DEVELOPMENT.md).

---

## Setup & Installation

**What are the minimum requirements to run PIIK.ME locally?**

- Node.js v14 or higher
- npm (bundled with Node.js)
- A free Firebase project with Google Auth and Firestore enabled

---

**Where do I get my Firebase credentials?**

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Go to **Project Settings → Service accounts → Generate new private key**.
3. Copy `project_id`, `client_email`, and `private_key` into your `.env` file.
4. Go to **Project Settings → General → Your apps** and add a Web App to get the client-side config for `public/js/firebase-config.js`.

A full walkthrough is available in [docs/FIREBASE_SETUP.md](https://github.com/xthxr/piik.me/blob/main/docs/FIREBASE_SETUP.md).

---

**The app starts but Google Sign-In fails. What's wrong?**

Your domain is probably not in Firebase's authorized list. Go to **Firebase Console → Authentication → Settings → Authorized domains** and add `localhost` (for development) or your production domain.

---

**Why does the server crash with a Firebase private key error?**

When you paste a private key into `.env`, the literal string must use `\n` to represent newlines — not actual line breaks. The value should look like:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

---

**Can I deploy PIIK.ME on platforms other than Vercel?**

Yes. PIIK.ME is a standard Express.js application. It can run on any platform that supports Node.js — Railway, Render, Fly.io, a VPS, and so on. The `vercel.json` file is only needed for Vercel deployments.

---

## Features

**How does real-time analytics work?**

PIIK.ME uses Socket.IO to maintain a persistent WebSocket connection between the browser and the server. When someone clicks a short link, the server records the event in Firestore and immediately broadcasts an `analyticsUpdate` event to any open analytics dashboard for that link — no page refresh required.

---

**What analytics data is collected per click?**

Each click records the timestamp, device type (mobile or desktop), browser (Chrome, Firefox, Safari, Edge, or other), and the HTTP referrer (the website that sent the visitor). No personally identifiable information is stored.

---

**Can I use a custom domain for my short links?**

Custom domains are not currently supported out of the box. You can self-host PIIK.ME on your own domain and set `BASE_URL` accordingly. Full custom domain support is planned — see [ROADMAP.md](./ROADMAP.md).

---

**What is a "verified badge" on a bio page?**

Verified badges (blue checkmarks) are awarded to early adopters of the platform. They are set manually by the project maintainer using the `scripts/set-verified-badges.js` utility. There is currently no automated verification process.

---

**Is there a limit on how many short links I can create?**

There is no hard limit in the application code. Practical limits are determined by your Firestore plan (Firebase's free Spark plan has generous quotas for most personal and small-project use cases).

---

**Does PIIK.ME support link expiry or password protection?**

Not currently. Both features are on the roadmap. See [ROADMAP.md](./ROADMAP.md) for the planned timeline.

---

**Can I export my analytics data?**

There is no built-in export feature yet. As a workaround, you can access your data directly in the Firestore console or build a script that reads from the `analytics` collection using the Firebase Admin SDK.

---

## Contributing

**How do I contribute to PIIK.ME?**

Read [CONTRIBUTING.md](https://github.com/xthxr/piik.me/blob/main/CONTRIBUTING.md) for the full guide. The short version: fork the repo, create a feature branch, make your changes, and open a Pull Request.

---

**I found a bug. Where do I report it?**

Open a [GitHub Issue](https://github.com/xthxr/piik.me/issues/new/choose) using the Bug Report template. Please include steps to reproduce, expected vs. actual behavior, and your environment details.

---

**How are Pull Requests reviewed?**

The maintainer reviews all PRs. PRs with a clear description, focused scope, and no unrelated changes are merged fastest. Please make sure your code follows the style of the existing codebase and that there are no merge conflicts with `main`.

---

**Can I add a new dependency?**

Yes, but please discuss significant new dependencies in your PR description or in a GitHub Discussion first. Prefer well-maintained, minimal packages and avoid duplicating functionality already present in the stack.

---

**How do I claim an issue before working on it?**

Leave a comment on the issue saying you'd like to work on it. The maintainer will assign it to you. Please don't open a PR for an issue that is already assigned to someone else — check the Assignees panel on the right-hand side of the issue first.

---

**What branch and commit naming conventions should I follow?**

Create feature branches from `main` using the pattern `type/short-description`, for example:

```bash
feat/custom-domains
fix/firebase-key-error
docs/faq-improvements
```

Commit messages follow the same `type(scope): summary` format:

```bash
feat(analytics): add geographic breakdown chart
fix(auth): handle expired token gracefully
docs(faq): add deployment and security sections
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

---

## Bugs & Security

**How do I report a bug?**

Open a [GitHub Issue](https://github.com/xthxr/piik.me/issues/new/choose) using the **Bug Report** template. Include steps to reproduce, expected vs. actual behavior, your Node.js version, OS, and browser. Screenshots or console errors are very helpful.

---

**How do I report a security vulnerability?**

**Do not open a public GitHub issue for security vulnerabilities.** Follow the responsible disclosure process described in [docs/SECURITY.md](https://github.com/xthxr/piik.me/blob/main/docs/SECURITY.md). This allows the maintainer to assess and patch the issue before any public disclosure.

---

**What happens after I report a vulnerability?**

The maintainer will acknowledge your report, investigate the issue, and release a patch. You will be credited in the release notes unless you prefer to remain anonymous.

---

## Deployment

**How do I deploy PIIK.ME to Vercel?**

The repo ships with a `vercel.json` for zero-config deployment:

```bash
npm i -g vercel
vercel
```

Add all environment variables from your `.env` file under **Vercel Dashboard → Project → Settings → Environment Variables**. Then add your Vercel production domain to **Firebase Console → Authentication → Settings → Authorized domains**.

---

**Can I deploy on platforms other than Vercel?**

Yes — Railway, Render, Fly.io, or any VPS that supports Node.js all work. The `vercel.json` file is only needed for Vercel. Set the `PORT` and `BASE_URL` environment variables to match your hosting environment.

---

**Does PIIK.ME use Redis? Do I need to set it up?**

PIIK.ME optionally uses [Upstash Redis](https://upstash.com/) as a caching layer to reduce Firestore reads on hot redirect paths. It is not required — the app falls back to Firestore directly if Redis is not configured. To enable it, add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your `.env` file.

---

**What environment variables are required for production?**

| Variable                   | Required | Description                                |
| -------------------------- | -------- | ------------------------------------------ |
| `PORT`                     | No       | Server port (default: `3000`)              |
| `BASE_URL`                 | Yes      | Full production URL e.g. `https://piik.me` |
| `FIREBASE_PROJECT_ID`      | Yes      | Firebase project ID                        |
| `FIREBASE_CLIENT_EMAIL`    | Yes      | Service account client email               |
| `FIREBASE_PRIVATE_KEY`     | Yes      | Service account private key                |
| `UPSTASH_REDIS_REST_URL`   | No       | Redis cache URL (optional)                 |
| `UPSTASH_REDIS_REST_TOKEN` | No       | Redis cache token (optional)               |

---

## License

**What license does PIIK.ME use?**

PIIK.ME is licensed under the **GNU General Public License v3.0 (GPL-3.0)**. See the [LICENSE](https://github.com/xthxr/piik.me/blob/main/LICENSE) file for the full text.

---

**What does GPL-3.0 mean for me?**

You are free to use, modify, and distribute PIIK.ME. However, if you distribute a modified version — including as a hosted service — you must also make your source code available under the same GPL-3.0 license. You cannot incorporate PIIK.ME into proprietary closed-source software.

---

**Can I use PIIK.ME commercially?**

You can self-host and use PIIK.ME for commercial purposes as long as you comply with GPL-3.0 terms. If you build a hosted product on top of PIIK.ME, your modifications must be open-sourced under GPL-3.0 as well.

---

## Self-Hosting & Privacy

**What data does PIIK.ME store?**

PIIK.ME stores the links you create, per-click analytics (timestamp, device, browser, referrer), and bio link profiles (username, display name, bio, links). No passwords are stored — authentication is delegated entirely to Firebase/Google.

**Is data shared with third parties?**

PIIK.ME itself does not sell or share data. However, it relies on Firebase (Google) for auth and storage, which is subject to Google's privacy policy.

---

## Related Documentation

| Document                                                                                    | Description                                                    |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [CONTRIBUTING.md](https://github.com/xthxr/piik.me/blob/main/CONTRIBUTING.md)               | How to contribute code, report bugs, and open PRs              |
| [DEVELOPMENT.md](./DEVELOPMENT.md)                                                          | Local setup, architecture, API reference, and coding standards |
| [ROADMAP.md](./ROADMAP.md)                                                                  | Planned features and the future direction of the project       |
| [docs/FIREBASE_SETUP.md](https://github.com/xthxr/piik.me/blob/main/docs/FIREBASE_SETUP.md) | Step-by-step guide to configuring Firebase for PIIK.ME         |
| [docs/SECURITY.md](https://github.com/xthxr/piik.me/blob/main/docs/SECURITY.md)             | Responsible disclosure process for security vulnerabilities    |
| [LICENSE](https://github.com/xthxr/piik.me/blob/main/LICENSE)                               | Full GPL-3.0 license text                                      |

---

_Last updated: 2026 · PIIK.ME open-source project_
