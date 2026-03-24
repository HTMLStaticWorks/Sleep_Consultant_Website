/* 
  Lullaby Lark - Dashboard JS
  Handles: Charts (Analytics), Sleep Log Table, Tab Switching
*/

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initSleepChart();
    initTabSwitching();
    initNewLogModal();
});

// Mobile Sidebar
const initSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const toggles = document.querySelectorAll('.sidebar-toggle');
    if (toggles.length > 0 && sidebar) {
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        });
    }
};

// Analytics Chart (Simple Mockup)
let sleepChart = null;
const initSleepChart = () => {
    const canvas = document.getElementById('sleepChart');
    if (!canvas) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#B2BEC3' : '#636E72';

    if (typeof Chart !== 'undefined') {
        if (sleepChart) sleepChart.destroy();
        
        sleepChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Sleep Hours',
                    data: [10, 11, 10.5, 9, 11.5, 12, 11],
                    borderColor: '#6C9BCF',
                    backgroundColor: 'rgba(108, 155, 207, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        grid: { display: false },
                        ticks: { color: textColor }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { color: textColor }
                    }
                }
            }
        });
    }
};

// Listen for theme changes to update the chart
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
            initSleepChart();
        }
    });
});
observer.observe(document.documentElement, { attributes: true });

// Simple Dashboard Tab Switching
const initTabSwitching = () => {
    const links = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');

    const switchTab = (targetId) => {
        if (!targetId) return;
        
        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`.sidebar-nav .nav-link[href="#${targetId}"]`);
        
        if (targetSection) {
            links.forEach(l => l.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            targetSection.classList.add('active');
            if (targetLink) targetLink.classList.add('active');
            
            // Re-init chart if switching back to overview
            if (targetId === 'overview') {
                setTimeout(initSleepChart, 100);
            }
        }
    };

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Update Hash and Switch
                window.location.hash = targetId;
                switchTab(targetId);

                // Auto-close sidebar on mobile
                const sidebar = document.querySelector('.sidebar');
                if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // Load initial tab from hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        switchTab(initialHash);
    }
};

// New Log Modal Mockup
const initNewLogModal = () => {
    const btn = document.querySelector('.btn-new-log');
    if (btn) {
        btn.addEventListener('click', () => {
            alert('Opening Sleep Log Form...');
        });
    }
};
