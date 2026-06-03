# Roadmap

> The planned direction for **PIIK.ME** — The Ultimate Link Intelligence Toolkit.

This roadmap reflects the current thinking of the maintainer and the community. Priorities may shift based on contributor interest, user feedback, and available time. Items are not tied to fixed release dates.

Want to help ship something on this list? Check [CONTRIBUTING.md](https://github.com/xthxr/piik.me/blob/main/CONTRIBUTING.md) and [open issues](https://github.com/xthxr/piik.me/issues).

---

## Vision

PIIK.ME aims to become a complete open-source link intelligence platform that combines URL shortening, bio links, analytics, and developer tooling into a single self-hostable solution.

The long-term goal is to provide an alternative to proprietary platforms while remaining lightweight, privacy-conscious, and easy to deploy.

---

## Status Legend

| Symbol | Meaning         |
| ------ | --------------- |
| ✅     | Shipped         |
| 🔄     | In progress     |
| 🔥     | High Priority   |
| ⭐     | Medium Priority |
| 💡     | Nice to Have    |

---

## Recently Shipped

| Feature                                             | Version   |
| --------------------------------------------------- | --------- |
| ✅ URL shortening with custom short codes           | v0.1      |
| ✅ Real-time analytics via Socket.IO                | v0.1      |
| ✅ QR code generation and download                  | v0.1      |
| ✅ UTM parameter builder and tracking               | v0.1      |
| ✅ Device and browser breakdown charts              | v0.1      |
| ✅ Referrer tracking                                | v0.1      |
| ✅ Bio link pages (`piik.me/<username>`)            | v0.2-beta |
| ✅ Drag-and-drop link ordering on bio pages         | v0.2-beta |
| ✅ Verified badge system                            | v0.2-beta |
| ✅ Animated background styles (mesh, glassmorphism) | v0.2-beta |
| ✅ Rate limiting with `express-rate-limit`          | v0.2-beta |
| ✅ Security headers with `helmet`                   | v0.2-beta |
| ✅ Redis caching layer (`@upstash/redis`)           | v0.2-beta |

---

## In Progress

| Feature                                   | Notes                                           |
| ----------------------------------------- | ----------------------------------------------- |
| 🔄 Automated test suite                   | Unit and integration tests using Jest           |
| 🔄 Improved error handling and logging    | Structured logs via morgan + Sentry integration |
| 🔄 Contributor documentation improvements | This set of documents                           |

---

## Planned

### Core Features

| Priority | Feature                  | Description                                                      |
| -------- | ------------------------ | ---------------------------------------------------------------- |
| 🔥       | Custom domain support    | Map your own domain to your short links                          |
| 🔥       | Link expiry / TTL        | Set a short link to auto-expire after a date or number of clicks |
| 🔥       | Link editing             | Update the destination URL of an existing short link             |
| 🔥       | Link deletion            | Delete a short link and its analytics data                       |
| ⭐       | Password-protected links | Require a password before redirecting                            |
| ⭐       | Bulk link creation       | Upload a CSV to shorten multiple URLs at once                    |
| ⭐       | Click-fraud filtering    | Detect and exclude bot/spam traffic from analytics               |

### Analytics

| Priority | Feature               | Description                                  |
| -------- | --------------------- | -------------------------------------------- |
| 🔥       | Dashboard overview    | Aggregate stats across all links in one view |
| 🔥       | Analytics data export | Download analytics as CSV or JSON            |
| ⭐       | Geographic analytics  | Country and region breakdown of clicks       |
| ⭐       | Time-series charts    | Clicks over time (hourly, daily, weekly)     |

### Bio Links

| Priority | Feature                          | Description                                              |
| -------- | -------------------------------- | -------------------------------------------------------- |
| 🔥       | Profile picture upload           | Upload a profile image directly instead of pasting a URL |
| ⭐       | Link click tracking on bio pages | Per-link click counts on bio pages                       |
| ⭐       | Custom bio page themes           | More background and color theme options                  |
| 💡       | Schedule links                   | Show or hide bio links on a schedule                     |

### Developer & Platform

| Priority | Feature                  | Description                                      |
| -------- | ------------------------ | ------------------------------------------------ |
| 🔥       | Public API documentation | OpenAPI / Swagger spec for the REST API          |
| ⭐       | API key authentication   | Token-based API access without Firebase tokens   |
| ⭐       | Webhooks                 | Send a POST request to a URL on each click event |
| ⭐       | Docker support           | Official `Dockerfile` and `docker-compose.yml`   |
| 💡       | CLI tool                 | Create and manage short links from the terminal  |

### Infrastructure & DX

| Priority | Feature                     | Description                                  |
| -------- | --------------------------- | -------------------------------------------- |
| 🔥       | GitHub Actions CI           | Automated linting and tests on every PR      |
| ⭐       | Automated releases          | `CHANGELOG.md` generated from commit history |
| 💡       | Internationalization (i18n) | Multi-language support for the frontend      |

---

## Under Consideration

These ideas have community interest but have not been prioritized yet:

| Priority | Idea                              | Notes                                                           |
| -------- | --------------------------------- | --------------------------------------------------------------- |
| 💡       | Team / workspace support          | Multiple users sharing a link workspace                         |
| 💡       | Branded QR codes                  | QR codes with logo overlays                                     |
| 💡       | A/B link testing                  | Split traffic between two destination URLs                      |
| 💡       | Mobile app                        | React Native or PWA for managing links on the go                |
| 💡       | Self-hosted analytics alternative | Option to replace Firestore analytics with a local SQLite store |
| 💡       | Zapier / Make integration         | Connect link events to external automation workflows            |

---

## Good First Contributions

New to the project? These are great places to start — no deep codebase knowledge required:

- **Documentation improvements** — fix typos, clarify explanations, add missing details
- **UI polish** — improve spacing, alignment, or visual consistency
- **Bug fixes** — pick up a [bug-labeled issue](https://github.com/xthxr/piik.me/issues?q=is%3Aissue+label%3Abug) and submit a fix
- **Test coverage** — add manual or automated test cases for existing features
- **Accessibility improvements** — keyboard navigation, ARIA labels, contrast fixes

Look for issues tagged [`good first issue`](https://github.com/xthxr/piik.me/issues?q=is%3Aissue+label%3A%22good+first+issue%22) on GitHub. These are ideal for GSSoC and Hacktoberfest contributors.

---

## Technical Debt & Maintenance

These areas need ongoing attention and are great opportunities for experienced contributors:

- **Test coverage** — no automated test suite exists yet; Jest-based unit and integration tests are in progress
- **Code refactoring** — some route handlers contain business logic that should move into `src/services/`
- **Documentation** — inline code comments are sparse in several modules
- **Performance optimization** — analytics queries could benefit from caching and indexing improvements
- **Accessibility compliance** — the frontend has not been fully audited against WCAG AA standards

If you're tackling any of these, please open an issue first so efforts aren't duplicated.

---

## How to Influence the Roadmap

- **Vote** on existing issues with a 👍 reaction.
- **Open a feature request** on [GitHub Issues](https://github.com/xthxr/piik.me/issues/new/choose).
- **Start a discussion** in [GitHub Discussions](https://github.com/xthxr/piik.me/discussions).
- **Submit a PR** — shipped code speaks louder than requests.

---

## Roadmap Disclaimer

This roadmap is intended as a guide rather than a promisse. Priorities may change based on community feedback, contributor availability, and project needs.

---

_Last updated: June 2026 · PIIK.ME open-source project_
"" 
