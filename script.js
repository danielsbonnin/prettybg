const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const dotSpacing = 40;
const dots = [];
const mouse = { x: -9999, y: -9999 };

function createDots() {
    for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
        for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
            dots.push({
                x, y,
                baseX: x,
                baseY: y,
                vx: 0,
                vy: 0
            });
        }
    }
}

canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        const force = Math.min(100 / dist, 3);

        dot.vx += force * (dx / dist);
        dot.vy += force * (dy / dist);

        // apply some friction
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // gently pull back to base
        let homeDX = dot.baseX - dot.x;
        let homeDY = dot.baseY - dot.y;
        dot.vx += 0.01 * homeDX;
        dot.vy += 0.01 * homeDY;

        // draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#666';
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    dots.length = 0;
    createDots();
});

createDots();
animate();
