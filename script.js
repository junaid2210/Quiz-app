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
    shuffleOptions(options);

    nextBtn.style.display = "inline-block";
    nextBtn.disabled = true;

    optionContainer.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = decodeURIComponent(option);
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => {
            checkAnswer(option, questionObj.correct_answer,btn);
        })
        optionContainer.appendChild(btn);
    });
}

const checkAnswer = function (selectedOption, correctAnswer, selectedButton) {

    const allButtons = document.querySelectorAll('.option-btn');

    allButtons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === decodeURIComponent(correctAnswer)) {
            btn.style.backgroundColor = 'green';
        }
        else if (btn === selectedButton) {
            btn.style.backgroundColor = 'red';
        }
    });

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

const shuffleOptions = function(array){
    for(let i = array.length - 1 ; i > 0 ; i--){
        let j = Math.floor(Math.random() * (i+1));

        [array[i],array[j]] = [array[j],array[i]];
    }
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