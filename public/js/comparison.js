document.addEventListener('DOMContentLoaded', function() {
    const ComparisonTool = {
        init: function() {
            this.avatar1Select = document.getElementById('avatar1');
            this.avatar2Select = document.getElementById('avatar2');
            this.compareBtn = document.getElementById('compare-btn');
            this.resultsContainer = document.getElementById('comparison-results');
            
            this.populateSelects();
            this.addEventListeners();
        },
        
        populateSelects: function() {
            // Populate dropdowns with avatar options
            avatarData.forEach((avatar, index) => {
                const option1 = document.createElement('option');
                option1.value = index;
                option1.textContent = avatar.name;
                this.avatar1Select.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = index;
                option2.textContent = avatar.name;
                this.avatar2Select.appendChild(option2);
            });
            
            // Set default selections to different avatars
            this.avatar2Select.selectedIndex = 1;
        },
        
        addEventListeners: function() {
            this.compareBtn.addEventListener('click', () => {
                this.compareAvatars();
            });
        },
        
        compareAvatars: function() {
            const avatar1Index = parseInt(this.avatar1Select.value);
            const avatar2Index = parseInt(this.avatar2Select.value);
            
            const avatar1 = avatarData[avatar1Index];
            const avatar2 = avatarData[avatar2Index];
            
            this.resultsContainer.innerHTML = `
                <div class="comparison-results-container">
                    <div class="comparison-header">
                        <h3>Comparison Results</h3>
                    </div>
                    
                    <div class="comparison-cards">
                        <div class="comparison-card">
                            <img src="images/avatars/${avatar1.name.toLowerCase()}.jpg" alt="${avatar1.name}" 
                                 onerror="this.src='images/avatars/placeholder.jpg'; this.onerror=null;">
                            <h4>${avatar1.name}</h4>
                            <p class="era">${avatar1.evolution.period}</p>
                        </div>
                        
                        <div class="comparison-vs">VS</div>
                        
                        <div class="comparison-card">
                            <img src="images/avatars/${avatar2.name.toLowerCase()}.jpg" alt="${avatar2.name}"
                                 onerror="this.src='images/avatars/placeholder.jpg'; this.onerror=null;">
                            <h4>${avatar2.name}</h4>
                            <p class="era">${avatar2.evolution.period}</p>
                        </div>
                    </div>
                    
                    <div class="comparison-details">
                        <h4>Evolutionary Progression</h4>
                        <p>Time difference: ${this.calculateTimeDifference(avatar1, avatar2)}</p>
                        
                        <h4>Key Differences</h4>
                        <div class="comparison-table">
                            <table>
                                <tr>
                                    <th>Feature</th>
                                    <th>${avatar1.name}</th>
                                    <th>${avatar2.name}</th>
                                </tr>
                                <tr>
                                    <td>Form</td>
                                    <td>${avatar1.mythology.form || 'Unknown'}</td>
                                    <td>${avatar2.mythology.form || 'Unknown'}</td>
                                </tr>
                                <tr>
                                    <td>Evolutionary Stage</td>
                                    <td>${avatar1.evolution.stage || 'Unknown'}</td>
                                    <td>${avatar2.evolution.stage || 'Unknown'}</td>
                                </tr>
                                <tr>
                                    <td>Key Features</td>
                                    <td>${avatar1.evolution.features || 'Unknown'}</td>
                                    <td>${avatar2.evolution.features || 'Unknown'}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },
        
        calculateTimeDifference: function(avatar1, avatar2) {
            // This is a simplified calculation - would need proper date parsing in a real app
            const period1 = avatar1.evolution.period;
            const period2 = avatar2.evolution.period;
            
            return `From ${period1} to ${period2}`;
        }
    };
    
    // Initialize the comparison tool if the section exists
    if (document.getElementById('compare')) {
        ComparisonTool.init();
    }
});