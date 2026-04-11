/* 
  Lullaby Lark - Main JavaScript
  Handles: Theme toggle, Sticky Header, Scroll animations, Form validation
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initStickyHeader();
    initScrollToTop();
    initAnimations();
    initFormValidation();
    initPasswordToggle();
});

// Theme Management
const initTheme = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(themeToggle, currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(themeToggle, newTheme);
    });
};

const updateToggleIcon = (btn, theme) => {
    const icon = btn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('bi-moon', 'bi-sun');
    } else {
        icon.classList.replace('bi-sun', 'bi-moon');
    }
};

// RTL Management
const initRTL = () => {
    const rtlToggle = document.getElementById('rtl-toggle');
    const setRTLDirection = (dir) => {
        document.documentElement.setAttribute('dir', dir);
        if (dir === 'rtl') {
            document.body.classList.add('rtl-enabled');
        } else {
            document.body.classList.remove('rtl-enabled');
        }
    };

    const currentRTL = localStorage.getItem('rtl') || 'ltr';
    setRTLDirection(currentRTL);

    if (!rtlToggle) return;

    rtlToggle.addEventListener('click', (event) => {
        event.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        
        setRTLDirection(newDir);
        localStorage.setItem('rtl', newDir);
    });
};

// Sticky Header
const initStickyHeader = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
};

// Scroll To Top
const initScrollToTop = () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Simple Scroll Animations
const initAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
};

// Form Validation
const initFormValidation = () => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
};

// Skeleton Loader Removal (if any)
window.addEventListener('load', () => {
    const loaders = document.querySelectorAll('.skeleton-loader');
    loaders.forEach(loader => {
        loader.style.display = 'none';
    });
});

// Password Toggle
const initPasswordToggle = () => {
    const toggles = document.querySelectorAll('.toggle-password');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });
};
