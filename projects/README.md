# Projects Metadata Directory

This directory contains individual JSON files for each portfolio project.

## Naming Conventions & Rules

1. **Filename Format**: `<project-slug>.json`
   - Example: `sold-com.json`, `noteforge-ai.json`, `portfolio-cms-admin.json`
   - Must match the `slug` property inside the file.
   - Must be lowercase kebab-case.

2. **Ignored Files**:
   - Files starting with an underscore `_` (such as `_example-project.json`) are templates or draft examples and will be **ignored** by `npm run validate` and index generators.

3. **Schema Compliance**:
   - Every `.json` file must validate against `../schema/project.schema.json`.
   - Run `npm run validate` from the root of `project-metadata/` to verify all project JSON files.
