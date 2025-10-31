// Animations and Effects JavaScript for Protein Goblin.com

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupParticleEffects();
        this.setupSmoothScrolling();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        this.observeElements();
    }

    observeElements() {
        const elementsToAnimate = document.querySelectorAll(`
            .recipe-card,
            .blog-card,
            .affiliate-card,
            .fact-card,
            .cookbook-category,
            .product-category,
            .hero-stat,
            .section-title,
            .section-subtitle
        `);

        elementsToAnimate.forEach((element, index) => {
            element.classList.add('scroll-reveal');
            element.style.animationDelay = `${index * 0.1}s`;
            this.scrollObserver.observe(element);
        });
    }

    animateElement(element) {
        if (element.classList.contains('revealed')) return;

        element.classList.add('revealed');
        
        // Add specific animation based on element type
        if (element.classList.contains('recipe-card')) {
            this.animateRecipeCard(element);
        } else if (element.classList.contains('blog-card')) {
            this.animateBlogCard(element);
        } else if (element.classList.contains('hero-stat')) {
            this.animateCounter(element);
        }
    }

    animateRecipeCard(card) {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        // Animate image
        const image = card.querySelector('.recipe-image');
        if (image) {
            setTimeout(() => {
                image.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    image.style.transform = 'scale(1)';
                }, 200);
            }, 100);
        }
    }

    animateBlogCard(card) {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        // Animate category badge
        const badge = card.querySelector('.blog-category');
        if (badge) {
            setTimeout(() => {
                badge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 150);
            }, 200);
        }
    }

    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;

        const finalValue = numberElement.textContent;
        const isNumber = /^\d+/.test(finalValue);
        
        if (isNumber) {
            const targetNumber = parseInt(finalValue);
            this.animateNumber(numberElement, 0, targetNumber, 1000);
        } else {
            // For non-numeric values, just fade in
            numberElement.style.opacity = '0';
            setTimeout(() => {
                numberElement.style.transition = 'opacity 0.5s ease';
                numberElement.style.opacity = '1';
            }, 200);
        }
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end;
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    setupHoverEffects() {
        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll(`
            .btn,
            .recipe-card,
            .blog-card,
            .affiliate-card,
            .fact-card,
            .cookbook-category,
            .product-category,
            .nav-link,
            .category-tab
        `);

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.handleHoverEnter(element));
            element.addEventListener('mouseleave', () => this.handleHoverLeave(element));
        });
    }

    handleHoverEnter(element) {
        element.classList.add('hover-lift');
        
        // Add ripple effect for buttons
        if (element.classList.contains('btn')) {
            this.createRippleEffect(element);
        }
    }

    handleHoverLeave(element) {
        element.classList.remove('hover-lift');
    }

    createRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupLoadingAnimations() {
        // Show loading animation for form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.showFormLoading(e));
        });

        // Show loading for buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.showButtonLoading(e));
        });
    }

    showFormLoading(event) {
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (submitBtn) {
            this.showButtonLoading({ target: submitBtn });
        }
    }

    showButtonLoading(event) {
        const button = event.target;
        if (button.classList.contains('loading')) return;

        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading-spinner"></span> Loading...';
        button.classList.add('loading');
        button.disabled = true;

        // Reset after 3 seconds (or when operation completes)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('loading');
            button.disabled = false;
        }, 3000);
    }

    setupParticleEffects() {
        // Create floating particles in hero section
        this.createFloatingParticles();
        
        // Create confetti effect for successful actions
        this.setupConfettiEffect();
    }

    createFloatingParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;

        hero.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: 0.6;
            animation: particleFloat ${6 + Math.random() * 4}s infinite linear;
        `;

        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            // Create new particle
            this.createParticle(container);
        }, (6 + Math.random() * 4) * 1000);
    }

    setupConfettiEffect() {
        // Add confetti to successful actions
        window.showConfetti = (x = 0.5, y = 0.5) => {
            this.createConfetti(x, y);
        };
    }

    createConfetti(x, y) {
        const colors = ['#00ff88', '#00cc6a', '#33ff99', '#66ffaa'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${x * window.innerWidth}px;
                    top: ${y * window.innerHeight}px;
                    pointer-events: none;
                    z-index: 10000;
                    animation: confettiFall 3s ease-out forwards;
                `;

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 10);
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Public methods for triggering animations
    fadeIn(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    fadeOut(element, duration = 600) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }

    slideIn(element, direction = 'up', duration = 600) {
        const directions = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };

        element.style.transform = directions[direction] || directions.up;
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.transform = 'translate(0)';
            element.style.opacity = '1';
        });
    }

    bounce(element, duration = 600) {
        element.style.animation = `bounceIn ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    shake(element, duration = 500) {
        element.style.animation = `shake ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    pulse(element, duration = 1000) {
        element.style.animation = `pulse ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // Cleanup method
    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        
        this.observers.clear();
        this.animations.clear();
    }
}

// Initialize animation controller
let animationController;
document.addEventListener('DOMContentLoaded', function() {
    animationController = new AnimationController();
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hover-lift {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 255, 136, 0.2);
    }
    
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid var(--border-color);
        border-top: 2px solid var(--accent-color);
        border-radius: 50%;
        animation: rotate 1s linear infinite;
        display: inline-block;
        margin-right: 0.5rem;
    }
    
    .btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .btn.loading:hover {
        transform: none;
    }
    
    .particle-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent-color);
        border-radius: 50%;
        opacity: 0.6;
        animation: particleFloat 6s infinite linear;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .scroll-reveal,
        .particle,
        .loading-spinner {
            animation: none;
        }
        
        .scroll-reveal {
            opacity: 1;
            transform: none;
        }
    }
`;
document.head.appendChild(animationStyles);
