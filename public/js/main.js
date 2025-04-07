// Add this to your existing main.js file

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Check if avatarData is available
    if (typeof avatarData === 'undefined') {
        console.error('Avatar data not loaded');
        return;
    }

    // Navigation handling
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Explore button
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('avatars').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initialize Avatar Display
    initializeAvatarDisplay();

    // Initialize theme toggle
    initThemeToggle();
});

function initializeAvatarDisplay() {
    let currentAvatarIndex = 0;
    const avatarContent = document.querySelector('.avatar-content');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');

    if (!avatarContent || !prevBtn || !nextBtn) {
        console.error('Avatar navigation elements not found');
        return;
    }

    function displayAvatar(index) {
        const avatar = avatarData[index];
        avatarContent.innerHTML = `
            <div class="avatar-card">
                <div class="avatar-card-inner">
                    <div class="avatar-card-front">
                        <img src="images/avatars/${avatar.name.toLowerCase()}.jpg" alt="${avatar.name}" 
                             onerror="this.src='images/avatars/placeholder.jpg'; this.onerror=null;" 
                             class="avatar-card-image">
                        <h2>${avatar.name} <span class="sanskrit">${avatar.sanskrit}</span></h2>
                        <h3>Era: ${avatar.era}</h3>
                        <button class="flip-btn">Learn More</button>
                    </div>
                    <div class="avatar-card-back">
                        <div class="avatar-story">
                            <h3>Mythology</h3>
                            <p>${avatar.mythology.story}</p>
                            <p><strong>Significance:</strong> ${avatar.mythology.significance}</p>
                        </div>

                        <div class="avatar-evolution">
                            <h3>Evolution Connection</h3>
                            <p><strong>Period:</strong> ${avatar.evolution.period}</p>
                            <p>${avatar.evolution.connection}</p>
                            <p><strong>Key Features:</strong> ${avatar.evolution.features}</p>
                        </div>
                        <button class="flip-btn">Back to Avatar</button>
                    </div>
                </div>
            </div>
        `;
    
        // Add flip functionality
        const flipBtns = document.querySelectorAll('.flip-btn');
        flipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.avatar-card-inner').classList.toggle('flipped');
            });
        });
    }

    prevBtn.addEventListener('click', () => {
        currentAvatarIndex = (currentAvatarIndex - 1 + avatarData.length) % avatarData.length;
        displayAvatar(currentAvatarIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentAvatarIndex = (currentAvatarIndex + 1) % avatarData.length;
        displayAvatar(currentAvatarIndex);
    });

    // Initialize first avatar
    displayAvatar(0);
}