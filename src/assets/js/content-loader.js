document.addEventListener('DOMContentLoaded', async () => {
    const basePath = 'assets/data/';

    // Helper to fetch JSON
    async function loadData(filename) {
        try {
            const response = await fetch(`${basePath}${filename}`);
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    // Load Global Data
    const globalData = await loadData('global.json');
    if (globalData) {
        document.title = globalData.siteTitle;
        
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.textContent = globalData.logoText;
            logo.setAttribute('data-text', globalData.logoText);
        }

        const footer = document.querySelector('footer p');
        if (footer) footer.innerHTML = globalData.footerText;

        // Update Nav Text
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const key = link.getAttribute('data-key');
            if (key && globalData.nav[key]) {
                link.textContent = globalData.nav[key];
                link.setAttribute('data-text', globalData.nav[key]);
            }
        });
    }

    // Load Home Data
    if (document.getElementById('home-hero')) {
        const homeData = await loadData('home.json');
        if (homeData) {
            const title = document.querySelector('#home-hero h1');
            if (title) {
                title.textContent = homeData.heroTitle;
                title.setAttribute('data-text', homeData.heroTitle);
            }
            const subtitle = document.querySelector('#home-hero .subtitle');
            if (subtitle) subtitle.textContent = homeData.heroSubtitle;
            const btn = document.querySelector('#home-hero .cyber-btn');
            if (btn) btn.textContent = homeData.heroButton;
        }
    }

    // Load About Data
    if (document.getElementById('about-section')) {
        const aboutData = await loadData('about.json');
        if (aboutData) {
            const title = document.querySelector('#about-section .section-title');
            if (title) {
                title.textContent = aboutData.title;
                title.setAttribute('data-text', aboutData.title);
            }
            const desc = document.querySelector('#about-section .card-content p');
            if (desc) desc.textContent = aboutData.description;

            const statsList = document.querySelector('#about-section .stats');
            if (statsList && aboutData.stats) {
                statsList.innerHTML = aboutData.stats.map(stat => 
                    `<li><span>${stat.label}:</span> ${stat.value}</li>`
                ).join('');
            }
        }
    }

    // Load Projects Data
    if (document.getElementById('projects-section')) {
        const projectsData = await loadData('projects.json');
        if (projectsData) {
            const title = document.querySelector('#projects-section .section-title');
            if (title) {
                title.textContent = projectsData.title;
                title.setAttribute('data-text', projectsData.title);
            }
            
            const grid = document.querySelector('#projects-section .grid');
            if (grid && projectsData.items) {
                grid.innerHTML = projectsData.items.map(project => `
                    <div class="card project-card">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    // Load Contact Data
    if (document.getElementById('contact-section')) {
        const contactData = await loadData('contact.json');
        if (contactData) {
            const title = document.querySelector('#contact-section .section-title');
            if (title) {
                title.textContent = contactData.title;
                title.setAttribute('data-text', contactData.title);
            }
            const msg = document.querySelector('#contact-section p');
            if (msg) msg.textContent = contactData.message;

            const socialLinks = document.querySelector('#contact-section .social-links');
            if (socialLinks && contactData.links) {
                socialLinks.innerHTML = contactData.links.map(link => 
                    `<a href="${link.url}" class="cyber-link">${link.name}</a>`
                ).join('');
            }
        }
    }
});