const Questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Shark", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
            { text: "Gobi", correct: false },
        ]
    },
    // Tech Questions
    {
        question: "Who is known as the father of the computer?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Alan Turing", correct: false },
            { text: "John von Neumann", correct: false },
            { text: "Steve Jobs", correct: false },
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HomeTool Markup Language", correct: false },
            { text: "Hyperlink Text Markup Language", correct: false },
            { text: "HyperTransfer Markup Language", correct: false },
        ]
    },
    {
        question: "Which JavaScript framework is maintained by Facebook?",
        answers: [
            { text: "Vue.js", correct: false },
            { text: "React", correct: true },
            { text: "Angular", correct: false },
            { text: "Svelte", correct: false },
        ]
    },
    {
        question: "In which year was Python released?",
        answers: [
            { text: "1991", correct: true },
            { text: "1989", correct: false },
            { text: "2000", correct: false },
            { text: "1995", correct: false },
        ]
    },
    // General Knowledge Questions
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who wrote the novel '1984'?",
        answers: [
            { text: "George Orwell", correct: true },
            { text: "Aldous Huxley", correct: false },
            { text: "J.R.R. Tolkien", correct: false },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Tokyo", correct: true },
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false },
        ]
    }
];
let currentQuestionIndex = 0;
let score = 0; // Initialize score

const questionsElement = document.querySelector("#questions");
const optionsElement = document.querySelector(".options");
const nextButton = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const startAgain = document.querySelector("#start");

// Function to load a question
function loadQuestion() {
    optionsElement.innerHTML = "";
    nextButton.style.display = "none"; 

    const currentQuestion = Questions[currentQuestionIndex];
    questionsElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let button = document.createElement("button");
        button.textContent = answer.text;
        
        button.addEventListener('click', () => {
            let allButtons = optionsElement.querySelectorAll("button");
            allButtons.forEach(btn => btn.disabled = true); 
            
            // Increment score correctly
            if (answer.correct) {
                button.style.backgroundColor = '#72fa93';
                button.style.color = "#000";  
                score += 1; // Correctly increment score
                scoreElement.innerHTML = `Score: ${score}`; // Update score display
            } else {
                button.style.backgroundColor = "#e45f2b"; 
                button.style.color = "#fff";  
            }

            allButtons.forEach(btn => {
                const answerText = btn.textContent;
                const correctAnswer = currentQuestion.answers.find(a => a.correct).text;
                
                if (answerText === correctAnswer) {
                    btn.style.backgroundColor = '#72fa93';
                    btn.style.color = "#000"; 
                }
            });

            nextButton.style.display = "block";
        });

        optionsElement.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= Questions.length) {
        nextButton.disabled = true;
        optionsElement.innerHTML = "";
        questionsElement.innerHTML = `Game over! Your final score is ${score}.`;
        nextButton.style.display = 'none';
        startAgain.style.display = 'block';
        return;
    }

    // Load the next question
    loadQuestion();
}

// Load the first question on page load
loadQuestion();

// Add event listener to the "Next" button
nextButton.addEventListener("click", nextQuestion);

// Add event listener to the "Start Again" button
startAgain.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    if (startAgain.style.display === 'block') {
        startAgain.style.display = 'none';
        scoreElement.innerHTML = ""; // Reset score display
    }
});