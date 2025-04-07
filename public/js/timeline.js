document.addEventListener('DOMContentLoaded', () => {
    // Initialize timeline when DOM is loaded
    new Timeline();
});

class Timeline {
    constructor() {
        this.container = document.getElementById('timeline-container');
        this.init();
    }

    init() {
        this.createTimeline();
        this.addEventListeners();
    }

    createTimeline() {
        // Only create section title if it doesn't exist
        if (!this.container.querySelector('.section-title')) {
            const title = document.createElement('h2');
            title.className = 'section-title';
            title.textContent = 'Evolutionary Timeline';
            this.container.appendChild(title);
        }
        
        // Then create the timeline
        const timeline = document.createElement('div');
        timeline.className = 'timeline';
        
        avatarData.forEach((avatar, index) => {
            const pointContainer = document.createElement('div');
            pointContainer.className = 'timeline-point-container';
            pointContainer.style.setProperty('--i', index);
            
            // Create the point
            const point = document.createElement('div');
            point.className = 'timeline-point';
            point.dataset.avatar = index;
            
            // Create label with image, name and time period
            const label = document.createElement('div');
            label.className = index % 2 === 0 ? 'timeline-label timeline-label-top' : 'timeline-label timeline-label-bottom';
            label.innerHTML = `
                <img src="images/avatars/${avatar.name.toLowerCase()}.jpg" alt="${avatar.name}" 
                     onerror="this.src='images/avatars/placeholder.jpg'; this.onerror=null;" 
                     class="timeline-image">
                <div class="timeline-label-text">
                    <h4>${avatar.name}</h4>
                    <p>${avatar.evolution.period}</p>
                </div>
            `;
            
            pointContainer.appendChild(point);
            pointContainer.appendChild(label);
            timeline.appendChild(pointContainer);
        });
        
        this.container.appendChild(timeline);
    }

    addEventListeners() {
        const points = document.querySelectorAll('.timeline-point');
        points.forEach(point => {
            point.addEventListener('click', () => {
                const avatar = avatarData[point.dataset.avatar];
                this.showAvatarDetails(avatar);
            });
        });
    }

    showAvatarDetails(avatar) {
        const modal = document.createElement('div');
        modal.className = 'timeline-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="avatar-header">
                    <img src="images/avatars/${avatar.name.toLowerCase()}.jpg" alt="${avatar.name}" 
                         onerror="this.src='images/avatars/placeholder.jpg'; this.onerror=null;" 
                         class="avatar-image">
                    <div>
                        <h2>${avatar.name} <span class="sanskrit">${avatar.sanskrit}</span></h2>
                        <h3>Era: ${avatar.era}</h3>
                    </div>
                </div>
                
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
                
                <button class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
}