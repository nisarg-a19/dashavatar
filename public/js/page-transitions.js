document.addEventListener('DOMContentLoaded', function() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Create page navigation dots
    createPageNav();
    
    // Add scroll indicators to each section
    addScrollIndicators();
    
    // Initialize section visibility
    checkSectionVisibility();
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        updateScrollProgress();
        checkSectionVisibility();
        updatePageNav();
    });
});

function createPageNav() {
    const sections = document.querySelectorAll('section');
    const pageNav = document.createElement('div');
    pageNav.className = 'page-nav';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'page-nav-dot';
        dot.dataset.section = section.id;
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        pageNav.appendChild(dot);
    });
    
    document.body.appendChild(pageNav);
}

function addScrollIndicators() {
    const sections = document.querySelectorAll('section:not(:last-child)');
    
    sections.forEach(section => {
        const nextSection = section.nextElementSibling;
        if (nextSection) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = `
                <i class="fas fa-chevron-down"></i>
                <span>Scroll</span>
            `;
            indicator.addEventListener('click', () => {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            });
            section.appendChild(indicator);
        }
    });
}

function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;
    
    document.querySelector('.scroll-progress').style.width = `${progress}%`;
}

function checkSectionVisibility() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('in-view');
        }
    });
}

function updatePageNav() {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.page-nav-dot');
    
    sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.5 && sectionTop > -windowHeight * 0.5) {
            dots[index].classList.add('active');
        } else {
            dots[index].classList.remove('active');
        }
    });
}