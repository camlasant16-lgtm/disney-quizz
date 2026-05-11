const questions = [
  {
    level: 1,
    question: "Quel animal accompagne généralement la princesse Jasmine ?",
    choices: ["Rajah", "Abu", "Iago", "Genie"],
    answer: "Rajah"
  },
  {
    level: 1,
    question: "Dans quel film apparaît le personnage de Woody ?",
    choices: ["Toy Story", "Cendrillon", "La Petite Sirène", "Vaiana"],
    answer: "Toy Story"
  },
  {
    level: 2,
    question: "Quel est le nom du méchant dans 'La Belle et la Bête' ?",
    choices: ["Gaston", "Jafar", "Scar", "Hans"],
    answer: "Gaston"
  },
  {
    level: 2,
    question: "Quel est le souhait d'Ariel dans 'La Petite Sirène' ?",
    choices: ["Avoir des jambes", "Être une sirène", "Trouver un trésor", "Voyager sur la terre"],
    answer: "Avoir des jambes"
  },
  {
    level: 3,
    question: "Quel est le nom de la mère de Simba dans 'Le Roi Lion' ?",
    choices: ["Sarabi", "Nala", "Zira", "Shenzi"],
    answer: "Sarabi"
  },
  {
    level: 3,
    question: "Quel objet magique Aladdin utilise-t-il pour voyager ?",
    choices: ["Tapis volant", "Baguette magique", "Anneau enchanté", "La lampe"],
    answer: "Tapis volant"
  },
  {
    level: 4,
    question: "Comment s'appelle la fée qui aide Cendrillon ?",
    choices: ["Fée Marraine", "Perla", "Morgana", "Ariel"],
    answer: "Fée Marraine"
  },
  {
    level: 4,
    question: "Qui chante 'Un jour mon prince viendra' ?",
    choices: ["Blanche-Neige", "Aurore", "Cendrillon", "Belle"],
    answer: "Blanche-Neige"
  },
  {
    level: 5,
    question: "Quel est le métier de Belle dans 'La Belle et la Bête' ?",
    choices: ["Bibliothécaire", "Couturière", "Serveuse", "Danseuse"],
    answer: "Bibliothécaire"
  },
  {
    level: 5,
    question: "Quel personnage dit 'L'aventure, c'est l'aventure' dans 'La Reine des Neiges' ?",
    choices: ["Olaf", "Kristoff", "Sven", "Hans"],
    answer: "Olaf"
  }
];

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  scoreDisplay.textContent = `Score : ${score}`;
  startBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  feedback.textContent = '';
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  levelDisplay.textContent = `Niveau ${question.level}`;
  questionText.textContent = question.question;
  answersContainer.innerHTML = '';
  answered = false;
  nextBtn.classList.add('hidden');

  question.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = choice;
    button.addEventListener('click', () => selectAnswer(button, question.answer));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  if (answered) return;
  answered = true;
  const isCorrect = button.textContent === correctAnswer;

  if (isCorrect) {
    button.classList.add('correct');
    feedback.textContent = 'Bonne réponse !';
    score += 10;
  } else {
    button.classList.add('wrong');
    feedback.textContent = `Mauvaise réponse. La bonne réponse était : ${correctAnswer}.`;
  }

  Array.from(answersContainer.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    }
  });

  scoreDisplay.textContent = `Score : ${score}`;
  nextBtn.classList.remove('hidden');
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = 'Voir le résultat';
  } else {
    nextBtn.textContent = 'Question suivante';
  }
}

function showFinalScore() {
  questionText.textContent = `Quiz terminé ! Ton score final est ${score} / ${questions.length * 10}.`;
  answersContainer.innerHTML = '';
  feedback.textContent = score >= 70 ? 'Félicitations ! Tu connais bien Disney.' : 'Continue à t\'entrainer, tu peux faire mieux !';
  levelDisplay.textContent = 'Terminé';
  nextBtn.classList.add('hidden');
  startBtn.textContent = 'Rejouer';
  startBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex += 1;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

startBtn.addEventListener('click', startQuiz);
