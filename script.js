const NOTIFICATION_DURATION_MILLIS = 1000;

const domElements = {
  question: document.querySelector('#question'),
  answerInput: document.querySelector('#answer-input'),
  guesses: document.querySelector('#guesses'),
  correct: document.querySelector('#correct'),
  incorrect: document.querySelector('#incorrect'),
  accuracy: document.querySelector('#accuracy'),
  correctMsg: document.querySelector('#correct-msg'),
  incorrectMsg: document.querySelector('#incorrect-msg')
};

const state = {
  currentCard: undefined,
  guessCount: undefined,
  correctGuessCount: undefined,
  incorrectGuessCount: undefined,
  currentGuessAccuracy: undefined
};

const flashCards = [
  { q: '0', a: '0' },
  { q: '1', a: '1' },
  { q: '2', a: '2' },
  { q: '3', a: '3' },
  { q: '4', a: '4' },
  { q: '5', a: '5' },
  { q: '6', a: '6' },
  { q: '7', a: '7' },
  { q: '8', a: '8' },
  { q: '9', a: '9' },
  { q: '10', a: '10' }
];

function main() {
  reset();
}

function reset() {
  state.guessCount = 0;
  state.correctGuessCount = 0;
  state.incorrectGuessCount = 0;
  state.currentGuessAccuracy = 1;
  domElements.answerInput.value = null;

  hideNotifications();

  state.currentCard = getRandomCard();
  renderState();
}

function getRandomCard() {
  const randomIndex = getRandomInt(0, flashCards.length);
  console.log(`Random Index: ${randomIndex}`);

  return flashCards[randomIndex];
}

function renderState() {
  domElements.question.innerHTML = state.currentCard.q;
  domElements.guesses.innerHTML = state.guessCount;
  domElements.correct.innerHTML = state.correctGuessCount;
  domElements.incorrect.innerHTML = state.incorrectGuessCount;
  domElements.accuracy.innerHTML = Math.round(state.currentGuessAccuracy * 100);
}

function guess() {
  hideNotifications();

  state.guessCount += 1;

  if (!answerIsCorrect()) {
    handleIncorrectGuess()

    return;
  }

  handleCorrectGuess();
}

function handleCorrectGuess() {
  state.correctGuessCount += 1;

  domElements.answerInput.value = null;

  domElements.correctMsg.hidden = false;
  setTimeout(hideNotifications, NOTIFICATION_DURATION_MILLIS);

  state.currentGuessAccuracy = (state.correctGuessCount / state.guessCount);

  state.currentCard = getRandomCard();

  renderState();
}

function handleIncorrectGuess() {
  state.incorrectGuessCount += 1;

  domElements.answerInput.value = null;

  domElements.incorrectMsg.hidden = false;

  setTimeout(hideNotifications, NOTIFICATION_DURATION_MILLIS);

  state.currentGuessAccuracy = (state.correctGuessCount / state.guessCount);

  renderState();
}

function answerIsCorrect() {
  console.log(`question=${state.currentCard.q}, answer=${state.currentCard.a}, userInput=${domElements.answerInput.value}`);

  if (!domElements.answerInput.value) return false;

  const sanitizedInput = domElements.answerInput.value.toLowerCase();

  return (sanitizedInput == state.currentCard.a);
}

function hideNotifications() {
  domElements.correctMsg.hidden = true;
  domElements.incorrectMsg.hidden = true;
}

function getRandomInt(min, max) {
  // min = inclusive, max = exclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  // min = inclusive, max = inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();
