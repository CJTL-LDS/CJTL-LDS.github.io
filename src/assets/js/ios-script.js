document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    initMouseEffects();
});

function loadContent() {
    fetch('assets/data/content.json')
        .then(response => response.json())
        .then(data => {
            // Load About Preview
            if (data.about) {
                fetch(data.about.path)
                    .then(res => res.text())
                    .then(text => {
                        // Strip markdown syntax for preview
                        const plainText = text.replace(/[#*`]/g, '').substring(0, 300) + '...';
                        const previewEl = document.getElementById('about-preview');
                        if (previewEl) previewEl.innerText = plainText;
                    });
            }

            // Load Lists
            loadList('tech', data.tech);
            loadList('life', data.life);
            loadList('projects', data.projects);
        })
        .catch(err => console.error('Error loading content:', err));
}

function loadList(category, items) {
    const listEl = document.getElementById(`${category}-list`);
    if (!listEl) return;

    // Show only first 3 items
    const displayItems = items.slice(0, 3);
    
    displayItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `article.html?path=${item.path}`;
        a.textContent = item.title;
        li.appendChild(a);
        listEl.appendChild(li);
    });
}

function initMouseEffects() {
    // Trail Effect
    const trailColors = ['#007aff', '#5ac8fa', '#4cd964'];
    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Only create trail if moved enough distance
        if (Math.abs(x - lastX) > 5 || Math.abs(y - lastY) > 5) {
            createTrail(x, y);
            lastX = x;
            lastY = y;
        }
    });

    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        // Randomize slightly
        trail.style.backgroundColor = trailColors[Math.floor(Math.random() * trailColors.length)];
        
        document.body.appendChild(trail);

        // Animate out
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0.5)';
        }, 50);

        setTimeout(() => {
            trail.remove();
        }, 500);
    }

    // Ripple Effect on Click
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        // Center the ripple
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}
