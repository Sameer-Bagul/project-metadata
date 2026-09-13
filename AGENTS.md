# AI Agent Guidelines & Operations Manual

This repository houses the canonical schemas, project metadata files, and aggregated indexes for Sameer Bagul's Portfolio ecosystem.

All AI agents (GitHub Copilot Agent, Antigravity, custom scripts) operating in this repository **MUST** follow the guidelines and constraints documented below.

---

## 1. Operating Rules & Core Constraints

### Strict Truthfulness & Zero Hallucinations
- **DO NOT** invent tech stack items, live URLs, metrics, or contributions not present in or directly inferable from the target repository's code, `package.json`, commit logs, or documentation.
- If a value cannot be determined (e.g. `liveUrl` or `figmaUrl`), leave it as an empty string `""` or `null` as allowed by the schema.

### Privacy & Secret Safeguards
- **NEVER** include API keys, passwords, environment secrets, tokens, private emails, connection strings, or sensitive internal credentials in metadata files.
- Mask or omit internal configuration files (`.env`, credentials JSONs).

### Canonical File Naming & Location
- Individual project JSON files MUST reside in `projects/` and follow the exact naming format: `<project-slug>.json`.
- Files beginning with `_` (e.g., `projects/_example-project.json`) are templates/examples and MUST be ignored by automated index generators and schema validation tools.

---

## 2. Repository Classification System

When scanning or cataloging GitHub repositories across 200+ projects, classify each repository into one of the following categories:

| Classification | Criteria / Description |
| :--- | :--- |
| `portfolio-worthy` | High quality, complete production applications, SaaS platforms, complex full-stack web/mobile/AI projects worthy of highlighting on the public portfolio. |
| `secondary` | Working projects, utility libraries, CLI tools, or smaller completed projects that are valid technical work but not primary portfolio highlights. |
| `practice` | Exercises, tutorials, DSA problem sets, mini coding tests, and playground code. |
| `fork` | External open-source repositories cloned or forked with minor/no modifications. |
| `archived` | Deprecated, superseded, or legacy projects explicitly archived or dormant. |
| `empty` | Repositories with no code or initialized `README.md` only. |
| `unknown` | Ambiguous repositories needing manual human review before classification. |

---

## 3. Two-Step Portfolio Metadata Generation Workflow

To handle large numbers of repositories without creating bloated or low-quality JSON files:

### Step 1: Inventory & Discovery Report
Before generating `projects/*.json` files, run a discovery scan across target repositories and produce a markdown inventory report listing:
- Repository Name & GitHub URL
- Classification (using the table above)
- Primary Language & Major Frameworks
- Approximate Complexity (`Low`, `Medium`, `High`, `Enterprise`)
- Recommendation (`Include in Portfolio`, `Secondary`, `Skip`)

### Step 2: Detailed Metadata Generation
Only for repositories classified as `portfolio-worthy` or explicitly selected:
1. Generate `projects/<slug>.json` adhering strictly to `schema/project.schema.json`.
2. Run `npm run validate` to ensure zero schema errors and no duplicate slugs/URLs.
3. Update `indexes/all-projects.json`, `indexes/featured-projects.json`, and `indexes/technologies.json`.

---

## 4. Tech Stack Categorization Standard

Ensure technologies are grouped logically into the standard `techStackBreakdown` categories:

- **`frontend`**: React, Next.js, Vue, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, HTML5/CSS3, etc.
- **`backend`**: Node.js, Express.js, NestJS, Python, FastAPI, Django, Java, Spring Boot, Go, GraphQL, REST APIs.
- **`database`**: MongoDB, PostgreSQL, MySQL, Redis, Supabase, Firebase, BigQuery, Prisma, Mongoose.
- **`infrastructure`**: Docker, Kubernetes, Vercel, AWS (S3, EC2, Lambda), GCP, Render, Cloudflare, Nginx.
- **`aiMl`**: OpenAI API, Gemini API, PyTorch, TensorFlow, LangChain, LlamaIndex, Hugging Face, Scikit-learn.
- **`devops`**: GitHub Actions, CI/CD pipelines, Terraform, Docker Compose, PM2, Helm.
- **`testing`**: Jest, Vitest, Cypress, Playwright, React Testing Library, PyTest.
- **`tools`**: Vite, Webpack, ESLint, Prettier, Postman, Figma, Git, Turborepo.

---

## 5. Schema Validation & Maintenance

- Always execute `npm run validate` after creating or modifying any file in `projects/`.
- Ensure `slug` values are lowercase, kebab-case (e.g. `portfolio-cms-admin`).
- Do not bypass `schema/project.schema.json` rules.
