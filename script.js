// =====================================================
// BARBERÍA APP-STYLE JAVASCRIPT
// Optimizado para móviles y UX perfecta
// =====================================================

// 🚀 SCROLL REVEAL ANIMATION
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

// Aplicar scroll reveal a elementos
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// 🎯 SMOOTH SCROLLING
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

// ⏰ COUNTDOWN TIMER PARA OFERTAS
const timer = document.querySelector('.offer-timer');
if (timer && timer.textContent.includes('Valor:')) {
    // Solo aplicar countdown si el timer tiene formato de oferta
    let timeLeft = 6 * 24 * 60 * 60; // 6 días en segundos
    
    const updateTimer = () => {
        const days = Math.floor(timeLeft / (24 * 60 * 60));
        const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        
        if (days > 0) {
            timer.innerHTML = `⏰ Oferta válida por ${days} días y ${hours} horas más`;
        } else {
            timer.innerHTML = `⏰ ¡Últimas ${hours}h ${minutes}m! No dejes pasar la oferta`;
        }
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timer.innerHTML = "¡Oferta extendida! Consulta disponibilidad";
        }
    };
    
    updateTimer();
    setInterval(updateTimer, 60000); // Actualizar cada minuto
}

// 🎨 EFECTOS HOVER MEJORADOS PARA MÓVIL
document.querySelectorAll('.benefit-card, .product-card, .testimonial').forEach(card => {
    // Efecto táctil para móviles
    card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    card.addEventListener('touchend', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Efecto 3D sutil para desktop
    if (window.innerWidth > 768) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }
});

// 🛒 EFECTOS COMPRA/RESERVA
document.querySelectorAll('.btn-primary').forEach(button => {
    // Efecto de compra para productos
    if (button.textContent.includes('Comprar')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto visual de éxito
            const originalText = this.textContent;
            const originalBg = this.style.background;
            
            this.textContent = '✓ ¡Perfecto!';
            this.style.background = '#28a745';
            this.style.transform = 'scale(0.95)';
            
            // Efecto de partículas
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                const particle = document.createElement('div');
                particle.innerHTML = '✨';
                particle.style.position = 'fixed';
                particle.style.left = rect.left + rect.width/2 + 'px';
                particle.style.top = rect.top + rect.height/2 + 'px';
                particle.style.fontSize = '18px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.transition = 'all 0.8s ease-out';
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.transform = `translate(${(Math.random() - 0.5) * 80}px, ${-30 - Math.random() * 30}px)`;
                    particle.style.opacity = '0';
                }, 100);
                
                setTimeout(() => {
                    if (document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, 900);
            }
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Redirigir a WhatsApp después del efecto
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 800);
        });
    }
});

// 📱 OPTIMIZACIÓN TÁCTIL MÓVIL
if ('ontouchstart' in window) {
    // Eliminar efectos hover en móviles
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efecto ripple en cards
    document.querySelectorAll('.benefit-card, .testimonial, .contact-item').forEach(element => {
        element.addEventListener('touchstart', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.touches[0].clientX - rect.left - size / 2;
            const y = e.touches[0].clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(212, 175, 55, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// ⚡ LAZY LOADING PARA IMÁGENES (si las hay)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// 🎯 ANIMACIÓN CONTADOR (para números importantes)
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
};

// Activar contadores cuando entren en vista
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            if (target) {
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        }
    });
});

document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// 🌟 EFECTOS ESPECÍFICOS PARA FLOATING BUTTON
const floatingBtn = document.querySelector('.floating-btn');
if (floatingBtn) {
    let isVisible = true;
    let lastScrollTop = 0;
    
    // Ocultar/mostrar en scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            if (isVisible) {
                floatingBtn.style.transform = 'translateY(100px) scale(0)';
                isVisible = false;
            }
        } else {
            // Scrolling up
            if (!isVisible) {
                floatingBtn.style.transform = 'translateY(0) scale(1)';
                isVisible = true;
            }
        }
        lastScrollTop = scrollTop;
    });
    
    // Efecto de éxito al hacer click
    floatingBtn.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        this.innerHTML = '✓';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.innerHTML = '💬';
        }, 200);
    });
}

// 🔧 MEJORAS DE RENDIMIENTO
// Throttle para eventos de scroll
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Debounce para resize
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Aplicar throttle a scroll events
window.addEventListener('scroll', throttle(() => {
    // Cualquier lógica de scroll adicional aquí
}, 16)); // ~60fps

// Aplicar debounce a resize
window.addEventListener('resize', debounce(() => {
    // Lógica de resize aquí
}, 250));

// 🎨 CSS DINÁMICO PARA ANIMACIONES
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;
document.head.appendChild(style);

// 🚀 INICIALIZACIÓN FINAL
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar fade-in inicial a elementos críticos
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🏆 Barbería Elite - JavaScript cargado correctamente');
});