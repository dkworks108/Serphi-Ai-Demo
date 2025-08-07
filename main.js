// --- JavaScript Functionality ---

document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Typing effect for the search bar placeholder
     */
    const searchInput = document.getElementById('search-input');
    const placeholderText = [
        "Generate a blog post about AI...",
        "Find SEO keywords for 'digital marketing'...",
        "Analyze my website's content...",
        "Write a product description..."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = placeholderText[textIndex];
        if (isDeleting) {
            // Deleting text
            searchInput.placeholder = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % placeholderText.length;
            }
        } else {
            // Typing text
            searchInput.placeholder = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                // Pause before deleting
                setTimeout(typeEffect, 2000); 
                return;
            }
        }
        const typeSpeed = isDeleting ? 50 : 150;
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();


    /**
     * Canvas animation for the AI network effect
     */
    const canvas = document.getElementById('ai-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size to match its container
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        init(); // Re-initialize particles on resize for better distribution
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0, 191, 255, 0.5)';
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = '#00BFFF';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(0, 191, 255, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    animate();

    /**
     * Set current year in the footer
     */
    document.getElementById('year').textContent = new Date().getFullYear();

});
