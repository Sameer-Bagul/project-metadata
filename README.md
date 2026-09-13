# Project Metadata Repository & Tooling

Centralized JSON schemas, project metadata catalog, validation scripts, and AI Agent workflows for Sameer Bagul's Portfolio CMS ecosystem.

---

## 📁 Repository Structure

```text
project-metadata/
├── .github/
│   └── agents/
│       └── portfolio-metadata.agent.md   # Specialized GitHub Copilot Agent configuration
│
├── schema/
│   └── project.schema.json              # Canonical JSON Schema for all project metadata
│
├── projects/
│   ├── _example-project.json            # Reference template project JSON
│   └── README.md                        # Project naming and file guidelines
│
├── indexes/
│   ├── all-projects.json                # Compact index summary of all projects
│   ├── featured-projects.json           # Compact index summary of featured projects
│   └── technologies.json               # Technology breakdown & project counts index
│
├── scripts/
│   └── validate.mjs                     # Validation script checking schema compliance & duplicates
│
├── AGENTS.md                            # Comprehensive AI Agent instruction manual
├── package.json                         # NPM script definitions and dependencies
├── .gitignore                           # Git ignore rules
└── README.md                            # Main repository documentation
```

---

## 🚀 Quick Start

### 1. Install Validation Dependencies
```bash
npm install
```

### 2. Run Validation Script
Validate all project files in `projects/` against `schema/project.schema.json` and check for duplicate slugs or GitHub URLs:
```bash
npm run validate
```

---

## 🤖 Working with AI Agents (Copilot & Antigravity)

### First Discovery Task
When analyzing 200+ repositories, ask your agent:

```text
Read AGENTS.md, .github/agents/portfolio-metadata.agent.md, and schema/project.schema.json.

First analyze my GitHub repositories and create a complete inventory of my repositories.

Classify every repository as:
- portfolio-worthy
- secondary
- practice
- fork
- archived
- empty
- unknown

Create a temporary discovery report so I can review which repositories should receive detailed metadata.
Do not modify project metadata files yet.
```

### Second Generation Task
Once you review the inventory, instruct your agent:

```text
Now take the portfolio-worthy repositories and generate complete project metadata files for them in projects/<slug>.json adhering strictly to schema/project.schema.json.

Then run npm run validate to confirm all files pass validation.
```

---

## 🛠️ Schema Overview

Every project JSON file contains:
- **Core Info**: `_id`, `title`, `slug`, `shortDescription`, `description`, `category`, `isFeatured`, `status`, `role`
- **Tech Stack**: Categorized into `frontend`, `backend`, `infrastructure`, `database`, `aiMl`, `devops`, `testing`, `tools`
- **Repository Details**: `repository`, `classification`, `githubUrl`, `liveUrl`, `apiDocsUrl`
- **Case Study Assets**: `myContributions`, `image`, `gallery`, `architectureDiagram`, `features`, `challenges`, `learnings`, `metrics`, `clientTestimonial`, `futureRoadmap`

---

## 📄 License
MIT © Sameer Bagul
