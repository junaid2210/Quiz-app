let questions;
let currentQuestionIndex = 0;
let score = 0;
const nextBtn = document.getElementById('next-btn');

const showQuestion = function () {
    const questionObj = questions[currentQuestionIndex];

    const questionContainer = document.getElementById('question-container');
    const optionContainer = document.getElementById('option-container');

    questionContainer.innerHTML = decodeURIComponent(questionObj.question);

    let options = [...questionObj.incorrect_answers, questionObj.correct_answer];
    nextBtn.style.display = "inline-block";
    nextBtn.disabled = true;

    optionContainer.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = decodeURIComponent(option);
        btn.addEventListener('click', () => {
            checkAnswer(option, questionObj.correct_answer);
        })
        optionContainer.appendChild(btn);
    });
}

const checkAnswer = function (selectedOption, correctAnswer) {

    if (selectedOption === correctAnswer) {
        score++;
    }

    nextBtn.disabled = false;

}

nextBtn.addEventListener('click', () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

    nextBtn.disabled = true;
})

const showResult = function(){
    const quizSection = document.getElementById('quiz-section');

    quizSection.innerHTML = `
    <h2>Quiz Completed</h2>
    <p>Your Score: ${score}/${questions.length}</p>
    <button onclick = "location.reload()">Try Again</button>
    `;
}

document.getElementById('start-btn').addEventListener('click' , () => {
    const amount = document.getElementById('NoQues').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    let baseURL = `https://opentdb.com/api.php?amount=${amount}`

    if(category) baseURL += `&category=${category}`;
    if(difficulty) baseURL += `&difficulty=${difficulty}`;
    if(type) baseURL += `&type=${type}`;

    baseURL += `&encode=url3986`;

    fetch(baseURL)
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        currentQuestionIndex = 0;
        score = 0;

        document.getElementById('setup-section').style.display = "none";
        document.getElementById('quiz-section').style.display = "block";

        showQuestion();
    })
    .catch(error => {
        console.error('Error fetching the quiz data',error);
    })
})