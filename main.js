// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navbarLinks = document.querySelectorAll('.navbar-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle mobile menu
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('.section');
const navObserverOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -66%'
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// ==================== SIDEBAR TOGGLE ====================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mainContent = document.querySelector('.main-content');

if (sidebarToggle && sidebar && mainContent) {
    // Initialize sidebar state based on screen size
    function initSidebar() {
        if (window.innerWidth > 768) {
            // Desktop: sidebar open by default
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        } else {
            // Mobile: sidebar closed by default
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        }
    }
    
    // Initialize on load
    initSidebar();
    
    // Re-initialize on window resize
    window.addEventListener('resize', initSidebar);
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        sidebarToggle.classList.toggle('active');
        
        // Toggle overlay in mobile
        if (sidebarOverlay) {
            sidebarOverlay.classList.toggle('active');
        }
    });
    
    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.add('collapsed');
            mainContent.classList.remove('expanded');
            sidebarToggle.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
}

// ==================== SMOOTH SCROLL ==================== 
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

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ==================== SKILL ITEMS ANIMATION ====================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-list').forEach(list => {
    list.querySelectorAll('.skill-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
    skillObserver.observe(list);
});

// ==================== PROJECT CARDS ANIMATION ====================
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
    projectsGrid.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    projectObserver.observe(projectsGrid);
}

// ==================== FORM VALIDATION ====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            alert('¡Gracias por tu mensaje! Te contactaré pronto.');
            this.reset();
        } else {
            alert('Por favor completa todos los campos.');
        }
    });
}

// ==================== DYNAMIC YEAR ====================
const yearElements = document.querySelectorAll('.current-year');
if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== SCROLL TO TOP ====================
let scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: var(--bg-dark);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.3)';
});

// ==================== PROJECTS MODAL ====================
const projectsBtn = document.getElementById('projectsBtn');
const projectsModal = document.getElementById('projectsModal');
const closeModal = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal-overlay');

if (projectsBtn && projectsModal) {
    // Abrir modal
    projectsBtn.addEventListener('click', () => {
        projectsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal con botón X
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            projectsModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cerrar modal al hacer clic en el overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            projectsModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectsModal.classList.contains('active')) {
            projectsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c👨‍💻 Portfolio de Juan David Uscamayta Ramos', 'color: #ffd700; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollador Full Stack | Docente de Sistemas', 'color: #b0b0b0; font-size: 14px;');