//Declare Constants
const chancesTotal = 10;
let chancesLeft = chancesTotal;
let incorrectGuessedLetters = [];
const randomWordArray = ["TECHCareers", "Computer", "Programming", "Software", "Developer"];
let randomWordIndex = -1;
let randomWordDisplay = "";

//Declare Functions
const resetHangman = () => {
    //Reset Guess Form
    const guessForm = document.querySelector("section:nth-of-type(1) > form");
    guessForm.reset();

    //Reset Chances Left
    chancesLeft = chancesTotal;
    const chancesLeftText = document.querySelector("section:nth-of-type(1) > p");
    chancesLeftText.textContent = `${chancesLeft} Chances Left`;

    //Reset Incorrect Guessed Letters
    incorrectGuessedLetters = [];
    const incorrectGuessedLettersDD = document.querySelectorAll("section:nth-of-type(1) > dl > dd");
    for (const incorrectGuessedLetterDD of incorrectGuessedLettersDD) {
        incorrectGuessedLetterDD.remove();
    }

    //Reset randomWordIndex and randomWordDisplay
    if (randomWordIndex < randomWordArray.length - 1) {
        randomWordIndex++;
    }
    else {
        randomWordIndex = 0;
    }
    randomWordDisplay = "";
    for (const randomWordLetters of randomWordArray[randomWordIndex]) {
        randomWordDisplay += "_";
    }
    const randomWordDisplayText = document.querySelector("section:nth-of-type(2) > p");
    randomWordDisplayText.textContent = `${randomWordDisplay}`;

    //Reset Hangman Image
    const hangmanImage = document.querySelector("section:nth-of-type(2) > img");
    if (hangmanImage.classList.contains("show")) {
        hangmanImage.classList.remove("show");
        hangmanImage.classList.add("hide");
    }
}

const guessHangmanWord = (event) => {
    event.preventDefault(); //Prevent Form Refresh

    const guessLetter = document.querySelector("section:nth-of-type(1) > form > input[type=text]").value; //Get the input guessLetter
    
    //Check if guessLetter is in randomWord
    let randomWordDisplayNow = "";
    for (let i = 0; i < randomWordArray[randomWordIndex].length; i++) {
        if (guessLetter.toLowerCase() == randomWordArray[randomWordIndex][i].toLowerCase()) {
            randomWordDisplayNow += `${randomWordArray[randomWordIndex][i]}`;
        }
        else {
            randomWordDisplayNow += `${randomWordDisplay.charAt(i)}`;
        }
    }

    //Check if the guess was incorrect
    if (randomWordDisplay == randomWordDisplayNow) {
        chancesLeft--; //Reduce chancesLeft
        incorrectGuessedLetters[incorrectGuessedLetters.length] = guessLetter; //Add guessLetter to incorrectGuessedLetters

        //Display chancesLeft
        const chancesLeftText = document.querySelector("section:nth-of-type(1) > p");
        chancesLeftText.textContent = `${chancesLeft} Chances Left`;

        //Display incorrectGuessedLetters
        const incorrectGuessedLettersDL = document.querySelector("section:nth-of-type(1) > dl");
        const incorrectGuessedLettersDD = document.createElement("dd");
        incorrectGuessedLettersDD.textContent = guessLetter;
        incorrectGuessedLettersDL.appendChild(incorrectGuessedLettersDD);
    }

    randomWordDisplay = randomWordDisplayNow; //Update the randomWordDisplay

    //Display the randomWordDisplay
    const randomWordDisplayText = document.querySelector("section:nth-of-type(2) > p");
    randomWordDisplayText.textContent = `${randomWordDisplay}`;

    guessForm.reset(); //Reset Guess Form
    checkHangman(); //Run checkHangman
}

const checkHangman = () => {
    //Check for chancesLeft
    if (chancesLeft <= 0) {
        //Display the Hangman Image Section
        const hangmanImage = document.querySelector("section:nth-of-type(2) > img");
        hangmanImage.classList.add("show");

        alert("You Lose! Play Again!");
        resetHangman(); //Reset Hangman to Start Game
    }

    //Check if randomWordDisplay is complete
    if (randomWordDisplay.toLowerCase() == randomWordArray[randomWordIndex].toLowerCase()) {
        alert("You Win! Play Again!");
        resetHangman(); //Reset Hangman to Start Game
    }
}

//Reset Hangman to Start Game
resetHangman();

//Add Event Listener to Form
const guessForm = document.querySelector("section:nth-of-type(1) > form");
guessForm.addEventListener("submit", guessHangmanWord);