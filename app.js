let randomNumberList = [];
let numberLimit = 10;
let secretNumber = generateRandomNumber();
let tries = 1;

function showTextOnScreen (tag, text) {
    let space = document.querySelector(tag);
    space.innerHTML = text;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function showInitalMsg() {
    showTextOnScreen('h1', 'Secret Number Game');
    showTextOnScreen('p',`Choose a number between 1 and ${numberLimit}`);
}

showInitalMsg();

function checkGuess() {
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber) {
        showTextOnScreen('h1', 'Correct!');
        let wordTry = tries > 1 ? 'tries' : 'try';
        let triesMsg = `You discovered the secret number with ${tries} ${wordTry}.`
        showTextOnScreen('p', triesMsg);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            showTextOnScreen('p', 'The secret number is smaller');
        } else {
            showTextOnScreen('p', 'The secret number is bigger.')
        }
        tries++;
    cleanInput();
    }
}

function generateRandomNumber() {
   let choosenNumber = parseInt(Math.random() *numberLimit + 1);
   let quantityOfElementsInTheList = randomNumberList.length;

   if(quantityOfElementsInTheList == numberLimit) {
    randomNumberList = [];
   }

   if(randomNumberList.includes(choosenNumber)) {
        return generateRandomNumber();
   } else {
    randomNumberList.push(choosenNumber);
    console.log(randomNumberList);
        return choosenNumber;
   }
}

function cleanInput() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = generateRandomNumber();
    cleanInput();
    tries = 1;
    showInitalMsg();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}