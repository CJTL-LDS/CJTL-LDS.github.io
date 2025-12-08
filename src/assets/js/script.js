const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Default characters while loading
let alphabet = '01'; 

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
    rainDrops[x] = 1;
}

// Fetch custom characters from JSON
fetch('assets/data/matrix.json')
    .then(response => response.json())
    .then(data => {
        if (data && data.chars) {
            alphabet = data.chars.join('');
        }
    })
    .catch(err => console.error('Error loading matrix chars:', err));

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f3ff'; // Cyan text
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++)
    {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);

        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Glitch Text Effect on Hover
const glitchTexts = document.querySelectorAll('[data-text]');

glitchTexts.forEach(text => {
    text.addEventListener('mouseover', () => {
        text.classList.add('glitching');
    });
    text.addEventListener('mouseout', () => {
        text.classList.remove('glitching');
    });
});