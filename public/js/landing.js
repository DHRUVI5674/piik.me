// ================================
// PIIK.ME - LANDING INTERACTIVITY (Cleaned)
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initWorkerGlobe();
    initMobileMenu();
    initScrollAnimations();
});

// 1. GLOBE WORKER
function initWorkerGlobe() {
    const canvas = document.getElementById('globeViz');
    if (!canvas) return;
    if (!('transferControlToOffscreen' in canvas)) return;

    const offscreenCanvas = canvas.transferControlToOffscreen();
    const worker = new Worker('js/globe-worker.js');
    worker.postMessage({ 
        type: 'INIT', 
        canvas: offscreenCanvas,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 1.2)
    }, [offscreenCanvas]); 

    window.addEventListener('resize', () => {
        worker.postMessage({ type: 'RESIZE', width: window.innerWidth, height: window.innerHeight });
    });
}

// 2. MOBILE MENU
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    
    if (!toggle || !menu) return;

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        if (isOpen) {
            menu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            // Assuming your toggle button has an icon inside
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fas fa-times text-xl';
        } else {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars text-xl';
        }
    }

    toggle.addEventListener('click', toggleMenu);
    
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) toggleMenu();
        });
    });
}

// 3. SCROLL ANIMATIONS (Updated for Tailwind)
function initScrollAnimations() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        // Simply add a shadow when scrolling down; background colors are handled by the HTML classes
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
}