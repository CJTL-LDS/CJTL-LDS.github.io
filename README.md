# Deshan Liu - iOS Style Portfolio

This is a personal portfolio website with an iOS-inspired design.

## Project Structure

- `src/`: The source code for the website (HTML, CSS, JS).
- `docs/`: The content folder where you write your Markdown files.
- `scripts/`: Helper scripts for building the site.

## How to Update Content

1.  **Write Content**:
    *   Add Markdown (`.md`) files to `docs/tech/`, `docs/life/`, or `docs/projects/`.
    *   Edit `docs/about/index.md` to update your bio.
    *   Place images in `docs/images/` and reference them in markdown like `![Alt Text](../../images/my-image.jpg)`.

2.  **Update Avatar**:
    *   Replace the image at `docs/images/avatar.jpg` with your own photo.

3.  **Generate Content Index**:
    *   **Crucial Step**: After adding or removing files in `docs/`, you must run the generation script so the website knows about the new files.
    *   Run the following command in your terminal:
        `ash
        node scripts/generate-index.js
        ` 
    *   This script does two things:
        1.  Scans `docs/` and creates `src/assets/data/content.json`.
        2.  Copies `docs/` content into `src/docs-content/` so it can be deployed.

## Deployment

The site is deployed via GitHub Actions from the `src` folder.
Ensure your GitHub Pages settings are set to use **GitHub Actions**.

When you push to `main`, the workflow will deploy the `src` folder.
**Note**: Since the `docs` folder is outside `src`, the `generate-index.js` script copies it into `src/docs-content`. Make sure you commit the generated `src/assets/data/content.json` and `src/docs-content/` folder changes!

## Development

To preview locally:
1.  Run `node scripts/generate-index.js` 
2.  Open `src/index.html` in your browser (or use a local server like Live Server).
