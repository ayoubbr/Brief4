// Array of questions with the options
const questions = [
    {
        question: "Dans quel balise HTML plaçons-nous le code JavaScript?",
        answers: [
            { text: 'La balise js', correct: false },
            { text: 'La balise javascript', correct: false },
            { text: 'La balise script', correct: true },
            { text: 'La balise rel', correct: false },
        ]
    },
    {
        question: "Comment faire appelle à une fonction nommée « msg » en JavaScript?",
        answers: [
            { text: 'msg()', correct: true },
            { text: 'call function msg()', correct: false },
            { text: 'call msg()', correct: false },
            { text: 'Aucune de ces réponses n’est vraie.', correct: false },
        ]
    },
    {
        question: "Comment créer une fonction en JavaScript?",
        answers: [
            { text: 'function f()', correct: false },
            { text: 'function = f()', correct: false },
            { text: 'function:f()', correct: true },
            { text: 'Aucune de ces réponses n’est vraie.', correct: false },
        ]
    },
    {
        question: "Quel est l’objet qui se trouve dans TOP de la racine en JavaScript ?",
        answers: [
            { text: 'url', correct: false },
            { text: 'top', correct: false },
            { text: 'window', correct: true },
            { text: 'document', correct: false }
        ]
    },
    {
        question: "Quel est le bon endroit pour insérer un code JavaScript?",
        answers: [
            { text: 'La section <head>', correct: false },
            { text: 'Les deux sections <head> et <body> sont correctes', correct: true },
            { text: 'La section <body>', correct: false },
            { text: 'Aucune de ces réponses n’est vraie.', correct: false },
        ]
    }
];

//////////////////////////////////////////////////////////////
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("option-buttons");
const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("previous-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer = 0;
let intervalID;
const chrono = document.getElementById("chrono");

function manageChrono() {
    timer = 15;
    chrono.innerText = timer;
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        timer--;
        chrono.innerText = timer;

        if (timer === 0) {
            clearInterval(intervalID);
            Array.from(answerButtons.children).forEach((button) => {
                button.disabled = true;
            });
            handleNextButton();
        }
    }, 1000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    ShowQuestion();
}

function ShowQuestion() {
    resetState();
    manageChrono();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("option");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });
    if (currentQuestionIndex + 1 == questions.length) {
        nextButton.innerHTML = "Terminer";
    }
}

function resetState() {
    clearInterval(intervalID);
    accordionExample.style.display = "none";

    chrono.innerText = "";

    nextButton.innerHTML = "Skip";
    if (currentQuestionIndex === 0 || currentQuestionIndex == questions.length) {
        previousButton.style.display = "none";
    }
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    clearInterval(intervalID);
    if (currentQuestionIndex + 1 < questions.length) {
        nextButton.innerHTML = "Next";
    }
    const selectedBtn = e.target;
    selectedBtn.classList.add("selected");
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function ShowScore() {
    resetState();
    questionElement.innerHTML = ` `;
    chrono.innerHTML = `Your score is  ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    accordionExample.style.display = "block";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        ShowQuestion();

        previousButton.style.display = "block";
    } else {
        ShowScore();
    }
}

function handlePreviousButton() {
    --currentQuestionIndex;
    ShowQuestion();
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

previousButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        handlePreviousButton();
    } else {
        startQuiz();
    }
});


//////////////////////////////////////////////////////////


const accordionExample = document.getElementById("accordionExample");


function showQuestion() {

    for (let i = 0; i < questions.length; i++) {
        accordionExample.appendChild(document.createElement("div")).classList.add("accordion-item");
    }

    const elements = document.getElementsByClassName("accordion-item");
    let myText;

    for (let index = 0; index < questions.length; index++) {
        questions[index].answers.filter((item) => {
            if (item.correct == true) {

                myText = item.text;
            }
        });
        elements[index].innerHTML =
            `<h2 class="accordion-header">
                 <button class="accordion-button question-label" type="button" data-bs-toggle="collapse"
                     data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                     ${questions[index].question}
                 </button>
             </h2>
             <div id="collapse${index}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                 <div class="accordion-body answer-label">
                 Reponse correct : 
                     <strong>${myText}
                     </strong> 
                 </div>
             </div>`;
    }
}

startQuiz();
showQuestion();