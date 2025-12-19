const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const outputDir = path.join(__dirname, '../src/assets/data');
const outputFile = path.join(outputDir, 'content.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = {
    about: null,
    tech: [],
    life: [],
    projects: []
};

function getFirstLine(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('# ')) {
                return trimmed.substring(2);
            }
        }
        return path.basename(filePath, '.md');
    } catch (err) {
        return path.basename(filePath, '.md');
    }
}

function scanDirectory(dirName, category) {
    const dirPath = path.join(docsDir, dirName);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const filePath = path.join(dirPath, file);
                const title = getFirstLine(filePath);
                // We store the path relative to the root of the repo so fetch can find it
                // Assuming the site is served from root, and docs is accessible.
                // If deployed via GH Pages from 'src', 'docs' might not be accessible if it's outside 'src'.
                // Wait, if we deploy 'src', 'docs' is outside.
                // We need to copy 'docs' into 'src' during build or deployment?
                // OR, we should put 'docs' INSIDE 'src' if we want it to be deployed.
                // The user said "I still need to use docs folder...".
                // If I deploy 'src', 'docs' won't be there.
                // I will modify this script to ALSO copy docs to src/docs-content for deployment.
                
                content[category].push({
                    title: title,
                    path: `docs-content/${dirName}/${file}`,
                    filename: file
                });
            }
        });
    }
}

// Special handling for About
const aboutPath = path.join(docsDir, 'about/index.md');
if (fs.existsSync(aboutPath)) {
    content.about = {
        title: getFirstLine(aboutPath),
        path: 'docs-content/about/index.md'
    };
}

scanDirectory('tech', 'tech');
scanDirectory('life', 'life');
scanDirectory('projects', 'projects');

// Write JSON
fs.writeFileSync(outputFile, JSON.stringify(content, null, 2));
console.log('Content index generated at:', outputFile);

// Copy docs to src/docs-content
const targetDocsDir = path.join(__dirname, '../src/docs-content');
if (fs.existsSync(targetDocsDir)) {
    fs.rmSync(targetDocsDir, { recursive: true, force: true });
}
fs.cpSync(docsDir, targetDocsDir, { recursive: true });
console.log('Docs copied to src/docs-content');
