# Deshan Liu - Cyberpunk Portfolio

This is a cyberpunk-themed personal portfolio website.

## Project Structure

The project source code is located in the `src` folder.

``nsrc/
 index.html          # Home page
 about.html          # About page
 projects.html       # Projects page
 contact.html        # Contact page
 assets/
     css/            # Stylesheets
     js/             # JavaScript files
     data/           # Content JSON files (EDIT THESE)
``n
## How to Edit Content

You don't need to touch the HTML code to update your information. All content is stored in JSON files located in `src/assets/data/`.

1.  **Global Info** (`src/assets/data/global.json`):
    *   Edit `siteTitle`, `logoText`, `footerText`.
    *   Update navigation link text if needed.

2.  **Home Page** (`src/assets/data/home.json`):
    *   Edit the hero title, subtitle, and button text.

3.  **About Page** (`src/assets/data/about.json`):
    *   Update your bio description.
    *   Add or remove stats in the `stats` list.

4.  **Projects** (`src/assets/data/projects.json`):
    *   Add new projects to the `items` list.
    *   Each project has a `name`, `description`, and `tags`.

5.  **Contact** (`src/assets/data/contact.json`):
    *   Update the contact message.
    *   Add or remove social links in the `links` list.

## Deployment

This project uses **GitHub Actions** to deploy the website from the `src` folder.

1.  Go to your GitHub repository settings.
2.  Navigate to **Pages**.
3.  Under **Build and deployment** > **Source**, select **GitHub Actions**.
4.  The workflow defined in `.github/workflows/deploy.yml` will automatically deploy your site whenever you push changes to the `main` branch.
