const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.querySelector('.next-button');
const timerBar = document.getElementById('timer-bar');

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimitPerQuestion = 60; // Time limit for each question in seconds
const totalQuestions = questions.length;
const totalQuizTime = timeLimitPerQuestion * totalQuestions; // Total time for the entire quiz in seconds


function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
    setTimeout(() => endQuiz(), totalQuizTime * 1000); // Set timeout to end the quiz after totalQuizTime milliseconds
}

function showQuestion(question) {
    resetTimer();
    updateTimer();

    questionContainer.innerHTML = question.question;
    answerButtons.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });

    startTimer();
    updateTimerBar();
    // Initially hide the Next button
    nextButton.style.display = 'none';
}

function startTimer() {
    let timeRemaining = timeLimitPerQuestion;
    timer = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining === 0) {
            selectAnswer({ correct: false });
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

// function updateTimer() {
//     timerBar.textContent = `Time Remaining: ${timeLimitPerQuestion}s`;
// }
// function updateTimer() {
//     const timeRemaining = timeLimitPerQuestion;
//     const minutes = Math.floor(timeRemaining / 60);
//     const seconds = timeRemaining % 60;
//     timerBar.textContent = `Time Remaining: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// }
// function updateTimer() {
//     const timeRemaining = timeLimitPerQuestion;
//     const minutes = Math.floor(timeRemaining / 60);
//     const seconds = timeRemaining % 60;
//     timerBar.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// }
function updateTimer() {
    const timeRemaining = timeLimitPerQuestion;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerBar.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}




function updateTimerBar() {
    let timeRemaining = timeLimitPerQuestion;
    const interval = 1000;

    const timerBarInterval = setInterval(() => {
        timeRemaining -= interval / 1000;
        const progress = (1 - timeRemaining / timeLimitPerQuestion) * 100;
        timerBar.style.width = `${progress}%`;

        if (timeRemaining <= 0) {
            clearInterval(timerBarInterval);
        }
    }, interval);
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    }

    // Disable answer buttons after selection
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Highlight correct and incorrect answers
    if (correct) {
        answerButtons.classList.add('correct');
    } else {
        answerButtons.classList.add('incorrect');
    }

    // Show next button after a brief delay
    setTimeout(() => {
        answerButtons.classList.remove('correct', 'incorrect');
        nextButton.style.display = 'block';
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        // Hide the Next button for the next question
        nextButton.style.display = 'none';
    } else {
        endQuiz();
    }
}

function endQuiz() {
    resetTimer();
    questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} out of ${questions.length}</p>`;
    answerButtons.innerHTML = '';
    // Hide the Next button at the end of the quiz
    nextButton.style.display = 'none';
}

// Start the quiz
startQuiz()