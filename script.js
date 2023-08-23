const questions = [
    {
        question: "Qual é o principal rio que corta a cidade de São Paulo?",
        options: ["Rio Tietê", "Rio Pinheiros", "Rio Amazonas", "Rio São Francisco"],
        correctAnswer: "Rio Tietê"
    },
    // Adicione mais perguntas aqui
    {
        question: "Qual é o bairro conhecido por abrigar muitos imigrantes japoneses em São Paulo?",
        options: ["Pinheiros", "Moema", "Liberdade", "Vila Olímpia"],
        correctAnswer: "Liberdade"
    },
    {
        question: "Qual é o estádio de futebol mais famoso de São Paulo?",
        options: ["Estádio Allianz Parque", "Arena Corinthians", "Estádio do Pacaembu", "Estádio do Morumbi"],
        correctAnswer: "Estádio do Morumbi"
    },
    {
        question: "Em qual ano ocorreu a inauguração da Avenida Paulista?",
        options: ["1891", "1922", "1954", "1969"],
        correctAnswer: "1891"
    },
    {
        question: "Qual é o nome do famoso parque que fica localizado na zona sul de São Paulo?",
        options: ["Parque Ibirapuera", "Parque da Luz", "Parque Villa-Lobos", "Parque Burle Marx"],
        correctAnswer: "Parque Ibirapuera"
    },
    {
        question: "Quem nasce na cidade de São Paulo é chamado de?",
        options: ["Paulista", "Paulistano", "Vascaíno", "Carioca"],
        correctAnswer: "Paulistano"
    },
    {
        question: "Qual é o maior museu de arte do Brasil, localizado em São Paulo?",
        options: ["Museu do Ipiranga", "Museu de Arte Moderna de São Paulo (MAM)", "Museu de Arte Contemporânea (MAC)", "Museu de Arte de São Paulo (MASP)"],
        correctAnswer: "Museu de Arte de São Paulo (MASP)"
    },
    {
        question: "Qual é a data comemorada como o aniversário da cidade de São Paulo?",
        options: ["25 de janeiro", "7 de setembro", "12 de outubro", "20 de novembro"],
        correctAnswer: "25 de janeiro"
    },
    {
        question: "São Paulo é conhecida como:",
        options: ["Cidade Maravilhosa", "Cidade dos Anjos", "Terra da Garoa", "Cidade das Praias"],
        correctAnswer: "Terra da Garoa"
    },
    {
        question: "Quantos municípios fazem parte da Região Metropolitana de São Paulo?",
        options: ["18", "27", "39", "42"],
        correctAnswer: "39"
    },
    {
        question: "Qual é a praça mais famosa de São Paulo, conhecida por ser um importante ponto de encontro?",
        options: ["Praça da Sé", "Praça da Liberdade", "Praça da República", "Praça Charles Miller"],
        correctAnswer: "Praça da República"
    },
    {
        question: "Qual é o nome do tradicional teatro localizado no bairro da República em São Paulo?",
        options: ["Teatro Amazonas", "Teatro Municipal", "Teatro Alfa", "Teatro Sérgio Cardoso"],
        correctAnswer: "Teatro Municipal"
    },
    {
        question: "Qual destes times de futebol foi fundado mais antigamente?",
        options: ["Corinthians", "Palmeiras", "SPFC", "Portuguesa"],
        correctAnswer: "Corinthians"
    },
    {
        question: "Qual é o nome do famoso mercado municipal de São Paulo, conhecido por vender uma grande variedade de produtos?",
        options: ["Mercado Central", "Mercado Público", "Mercado de São Paulo", "Mercado Municipal Paulistano"],
        correctAnswer: "Mercado Municipal Paulistano"
    },
    // Adicione mais perguntas aqui
];


let currentQuestionIndex = 0;
let score = 0;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const scoreDisplay = document.getElementById("score");
const optionsContainer = document.querySelector(".options");
const endImage = document.getElementById("end-image");

const startButton = document.getElementById("start-button");
const startScreen = document.querySelector(".start-screen");
const gameContainer = document.querySelector(".game-container");

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    displayQuestion();
});

function displayQuestion() {
    questionNumber.textContent = currentQuestionIndex + 1;
    questionText.textContent = questions[currentQuestionIndex].question;

    optionsContainer.innerHTML = "";

    questions[currentQuestionIndex].options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.addEventListener("click", checkAnswer);
        optionsContainer.appendChild(button);
    });
}

function highlightCorrectAnswer(correctOptionIndex) {
    const options = document.querySelectorAll(".option");

    options.forEach((option, index) => {
        if (index === correctOptionIndex) {
            option.style.backgroundColor = "#4CAF50"; // Alternativa correta em verde
        } else {
            option.style.backgroundColor = "#FF5733"; // Alternativas erradas em vermelho
        }
    });

    setTimeout(() => {
        options.forEach(option => {
            option.style.backgroundColor = "#3498db"; // Retorna à cor original após um curto período
        });
        displayNextQuestion(); // Continua para a próxima pergunta após o destaque
    }, 500); // 1500ms (1.5 segundos)
}

function highlightWrongAnswer() {
    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        option.style.backgroundColor = "#FF5733"; // Alternativas erradas em vermelho
    });

    setTimeout(() => {
        options.forEach(option => {
            option.style.backgroundColor = "#3498db"; // Retorna à cor original após um curto período
        });
        displayNextQuestion(); // Continua para a próxima pergunta após o destaque
    }, 500); // 1500ms (1.5 segundos)
}

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    const correctOptionIndex = questions[currentQuestionIndex].options.indexOf(correctAnswer);
    const selectedOptionIndex = questions[currentQuestionIndex].options.indexOf(selectedOption);

    if (selectedOptionIndex === correctOptionIndex) {
        score += 10;
        scoreDisplay.textContent = score;
        highlightCorrectAnswer(correctOptionIndex);
    } else {
        highlightWrongAnswer();
    }
}
function displayNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        questionText.textContent = ""; // Clear question text
        optionsContainer.innerHTML = ""; // Clear options

        if (score === 140) {
            const endMessageWin = document.getElementById("end-message-win");
            const easterEggVideo = document.getElementById("easter-egg-video");

            endMessageWin.textContent = "Você acertou todas as perguntas e encontrou um EASTER EGG! PARABÉNS!!!";
            easterEggVideo.style.display = "block";
            endImage.style.display = "none";
        } else if (score >= 100) {
            questionText.textContent = "Você fez 100 pontos ou mais, e ganhou um bombom! PARABÉNS!";
            endImage.src = "finalbom.jpg"; // Imagem de vitória
            endImage.style.display = "block";
        } else {
            questionText.textContent = "Você fez menos de 100 pontos. TENTE NOVAMENTE!";
            endImage.src = "finalruim.jpg"; // Imagem de derrota
            endImage.style.display = "block";
        }
    }
}
displayQuestion();
