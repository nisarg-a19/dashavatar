document.addEventListener('DOMContentLoaded', () => {
    // Initialize quiz when DOM is loaded
    new Quiz();
});

class Quiz {
    constructor() {
        this.container = document.getElementById('quiz-content');
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [];
        this.difficulty = 'easy'; // Default difficulty
        
        // Initialize difficulty buttons
        this.initDifficultyButtons();
        
        // Load questions based on default difficulty
        this.loadQuestions();
    }
    
    initDifficultyButtons() {
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        
        // Set default active button
        document.querySelector('[data-level="easy"]').classList.add('active');
        
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                difficultyBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Set difficulty and reload questions
                this.difficulty = btn.dataset.level;
                this.resetQuiz();
                this.loadQuestions();
            });
        });
    }
    
    loadQuestions() {
        // Filter questions based on difficulty
        this.questions = this.getQuestionsByDifficulty(this.difficulty);
        
        // Start the quiz
        this.showQuestion(); // Changed from renderQuestion() to showQuestion()
    }
    
    getQuestionsByDifficulty(difficulty) {
        // This is where you would filter questions by difficulty
        // For now, we'll just return different sets based on difficulty
        
        const easyQuestions = [
            {
                question: "Which avatar is associated with fish?",
                options: ["Matsya", "Kurma", "Varaha", "Narasimha"],
                answer: 0
            },
            {
                question: "Which avatar came chronologically first?",
                options: ["Rama", "Krishna", "Matsya", "Buddha"],
                answer: 2
            },
            {
                question: "Which evolutionary period is associated with Matsya avatar?",
                options: ["Cambrian Period", "Jurassic Period", "Pleistocene", "Modern Era"],
                answer: 0
            },
            {
                question: "What form did Lord Vishnu take in his second avatar?",
                options: ["Lion", "Turtle", "Boar", "Human-Lion"],
                answer: 1
            },
            {
                question: "Which avatar is depicted as half-man, half-lion?",
                options: ["Varaha", "Narasimha", "Vamana", "Parashurama"],
                answer: 1
            }
        ];
        
        const mediumQuestions = [
            {
                question: "Which avatar represents the transition from aquatic to amphibian life?",
                options: ["Matsya", "Kurma", "Varaha", "Vamana"],
                answer: 1
            },
            {
                question: "During which geological period did the Varaha avatar appear?",
                options: ["Cambrian", "Paleocene-Eocene", "Pleistocene", "Holocene"],
                answer: 1
            },
            {
                question: "Which avatar is associated with the development of mammalian features?",
                options: ["Kurma", "Varaha", "Narasimha", "Vamana"],
                answer: 2
            },
            {
                question: "Which avatar is associated with the development of early human civilization?",
                options: ["Parashurama", "Rama", "Krishna", "Vamana"],
                answer: 0
            },
            {
                question: "What evolutionary advancement does Vamana represent?",
                options: ["Aquatic life", "Reptilian features", "Bipedalism", "Tool use"],
                answer: 2
            }
        ];
        
        const hardQuestions = [
            {
                question: "Which avatar corresponds to the evolutionary development of bipedalism?",
                options: ["Narasimha", "Vamana", "Parashurama", "Rama"],
                answer: 1
            },
            {
                question: "What evolutionary advancement is represented by the Kalki avatar?",
                options: ["Tool use", "Agriculture", "Future human evolution", "Consciousness"],
                answer: 2
            },
            {
                question: "Which avatar represents the transition from hunter-gatherer to agricultural society?",
                options: ["Parashurama", "Rama", "Krishna", "Buddha"],
                answer: 0
            },
            {
                question: "Which geological era is associated with the appearance of Rama avatar?",
                options: ["Paleolithic", "Mesolithic", "Neolithic", "Bronze Age"],
                answer: 3
            },
            {
                question: "What aspect of human evolution does Buddha avatar represent?",
                options: ["Physical strength", "Intellectual development", "Spiritual consciousness", "Technological advancement"],
                answer: 2
            }
        ];
        
        switch(difficulty) {
            case 'medium':
                return mediumQuestions;
            case 'hard':
                return hardQuestions;
            default:
                return easyQuestions;
        }
    }
    
    resetQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.container.innerHTML = '';
    }
    
    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        
        this.container.innerHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-bar" style="width: ${progress}%"></div>
                <div class="quiz-progress-text">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
            </div>
            <div class="quiz-question">
                <h3>Question ${this.currentQuestion + 1}</h3>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;

        this.addOptionListeners();
    }

    addOptionListeners() {
        const options = this.container.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.checkAnswer(parseInt(option.dataset.index));
            });
        });
    }

    checkAnswer(selectedIndex) {
        const correct = this.questions[this.currentQuestion].answer === selectedIndex; // Changed from correct to answer
        if (correct) this.score++;
        
        this.currentQuestion++;
        this.showQuestion();
    }

    showResults() {
        this.container.innerHTML = `
            <div class="quiz-results">
                <h2>Quiz Complete!</h2>
                <p>Your score: ${this.score} out of ${this.questions.length}</p>
                <button class="restart-quiz">Try Again</button>
            </div>
        `;

        this.container.querySelector('.restart-quiz').addEventListener('click', () => {
            this.currentQuestion = 0;
            this.score = 0;
            this.showQuestion();
        });
    }
}