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
                
                content[category].push({
                    title: title,
                    path: `docs-content/${dirName}/${file}`,
                    filename: file,
                    type: 'md'
                });
            } else if (file.endsWith('.pdf')) {
                const title = path.basename(file, '.pdf');
                content[category].push({
                    title: title,
                    path: `docs-content/${dirName}/${file}`,
                    filename: file,
                    type: 'pdf'
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
