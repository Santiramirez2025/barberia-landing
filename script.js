// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit-card, .testimonial, .product-card, .step').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Magnetic button effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.add('magnetic-btn');
    
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
});

// Cursor trail effect
const cursor = document.createElement('div');
cursor.className = 'cursor-trail';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced add to cart functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Añadir al Carrito')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create success particle effect
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.innerHTML = '✨';
                particle.style.position = 'fixed';
                particle.style.left = rect.left + rect.width/2 + 'px';
                particle.style.top = rect.top + rect.height/2 + 'px';
                particle.style.fontSize = '20px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.transition = 'all 1s ease-out';
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-50 - Math.random() * 50}px)`;
                    particle.style.opacity = '0';
                }, 100);
                
                setTimeout(() => {
                    document.body.removeChild(particle);
                }, 1100);
            }
            
            this.textContent = '✓ Añadido';
            this.style.background = '#28a745';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            setTimeout(() => {
                this.textContent = 'Añadir al Carrito';
                this.style.background = '';
            }, 2000);
        });
    }
});

// Typewriter effect for hero text
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid #d4af37';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Blinking cursor effect
            setInterval(() => {
                heroTitle.style.borderColor = heroTitle.style.borderColor === 'transparent' ? '#d4af37' : 'transparent';
            }, 500);
        }
    };
    
    setTimeout(typeWriter, 1500);
}

// Countdown timer for offer
const timer = document.querySelector('.offer-timer');
if (timer) {
    let timeLeft = 24 * 60 * 60; // 24 hours in seconds
    
    const updateTimer = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timer.innerHTML = `⏰ Termina en: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 24 * 60 * 60; // Reset to 24 hours
        }
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// 3D tilt effect for cards
document.querySelectorAll('.benefit-card, .product-card, .testimonial').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Floating elements animation
const createFloatingElement = () => {
    const element = document.createElement('div');
    element.innerHTML = ['✂️', '💈', '🥃', '👔'][Math.floor(Math.random() * 4)];
    element.style.position = 'fixed';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = '20px';
    element.style.opacity = '0.1';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    element.style.transition = 'all 15s linear';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.style.top = '-100px';
        element.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(360deg)`;
    }, 100);
    
    setTimeout(() => {
        document.body.removeChild(element);
    }, 15000);
};

// Create floating elements periodically
setInterval(createFloatingElement, 3000);

// Dynamic background patterns
const hero = document.querySelector('.hero');
if (hero) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.05';
    canvas.style.pointerEvents = 'none';
    hero.appendChild(canvas);
    
    const resizeCanvas = () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#d4af37';
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Performance optimization: Intersection Observer for heavy animations
const heavyAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-heavy');
        } else {
            entry.target.classList.remove('animate-heavy');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item, .offer').forEach(el => {
    heavyAnimationObserver.observe(el);
});