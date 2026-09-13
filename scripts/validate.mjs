import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const schemaPath = path.join(rootDir, 'schema', 'project.schema.json');
const projectsDir = path.join(rootDir, 'projects');

// 1. Load schema
if (!fs.existsSync(schemaPath)) {
  console.error(`❌ Error: Schema file not found at ${schemaPath}`);
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// 2. Discover project JSON files
if (!fs.existsSync(projectsDir)) {
  console.error(`❌ Error: Projects directory not found at ${projectsDir}`);
  process.exit(1);
}

const files = fs.readdirSync(projectsDir);
let projectFiles = files.filter(f => f.endsWith('.json') && !f.startsWith('_'));

// If no user projects exist yet, include template _example-project.json for test verification
if (projectFiles.length === 0 && files.includes('_example-project.json')) {
  console.log('ℹ️  No custom project files found. Validating template file: _example-project.json');
  projectFiles = ['_example-project.json'];
}

if (projectFiles.length === 0) {
  console.log('⚠️  No JSON files found to validate in projects/ directory.');
  process.exit(0);
}

// Try loading Ajv validator
let validateFn = null;
try {
  const AjvModule = await import('ajv');
  const addFormatsModule = await import('ajv-formats');
  const Ajv = AjvModule.default || AjvModule;
  const addFormats = addFormatsModule.default || addFormatsModule;
  
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  validateFn = ajv.compile(schema);
  console.log('✅ Loaded Ajv schema validator.');
} catch (e) {
  console.log('ℹ️  Ajv not found in node_modules. Using built-in structural validator fallback.');
}

let hasErrors = false;
const seenSlugs = new Map();
const seenGithubUrls = new Map();

console.log(`\n🔍 Validating ${projectFiles.length} project file(s)...\n`);

for (const fileName of projectFiles) {
  const filePath = path.join(projectsDir, fileName);
  let projectData;

  try {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    projectData = JSON.parse(rawContent);
  } catch (err) {
    console.error(`❌ [${fileName}] JSON Parse Error: ${err.message}`);
    hasErrors = true;
    continue;
  }

  let fileErrors = [];

  // Validation with Ajv if available
  if (validateFn) {
    const valid = validateFn(projectData);
    if (!valid && validateFn.errors) {
      for (const err of validateFn.errors) {
        fileErrors.push(`${err.instancePath || 'root'} ${err.message}`);
      }
    }
  } else {
    // Structural Fallback Validator
    const requiredFields = [
      '_id', 'title', 'slug', 'shortDescription', 'description', 
      'category', 'isFeatured', 'status', 'role', 'techStackBreakdown', 
      'myContributions', 'githubUrl'
    ];

    for (const field of requiredFields) {
      if (projectData[field] === undefined || projectData[field] === null) {
        fileErrors.push(`Missing required field: '${field}'`);
      }
    }

    if (projectData.slug) {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(projectData.slug)) {
        fileErrors.push(`Invalid slug format '${projectData.slug}'. Must be lowercase kebab-case.`);
      }

      const expectedFileName = `${projectData.slug}.json`;
      if (!fileName.startsWith('_') && fileName !== expectedFileName) {
        fileErrors.push(`Filename mismatch: file is '${fileName}' but slug dictates '${expectedFileName}'`);
      }
    }
  }

  // Duplicate checks
  if (projectData.slug) {
    if (seenSlugs.has(projectData.slug)) {
      fileErrors.push(`Duplicate slug '${projectData.slug}' already used in ${seenSlugs.get(projectData.slug)}`);
    } else {
      seenSlugs.set(projectData.slug, fileName);
    }
  }

  if (projectData.githubUrl && projectData.githubUrl.trim() !== '') {
    if (seenGithubUrls.has(projectData.githubUrl)) {
      fileErrors.push(`Duplicate githubUrl '${projectData.githubUrl}' already used in ${seenGithubUrls.get(projectData.githubUrl)}`);
    } else {
      seenGithubUrls.set(projectData.githubUrl, fileName);
    }
  }

  if (fileErrors.length > 0) {
    hasErrors = true;
    console.error(`❌ [${fileName}] Validation failed with ${fileErrors.length} error(s):`);
    fileErrors.forEach(err => console.error(`   - ${err}`));
  } else {
    console.log(`✅ [${fileName}] Validated successfully.`);
  }
}

console.log('\n----------------------------------------');
if (hasErrors) {
  console.error('💥 Schema validation failed for one or more files.\n');
  process.exit(1);
} else {
  console.log('🎉 All project metadata files passed schema validation successfully!\n');
  process.exit(0);
}
