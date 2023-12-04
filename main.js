import prompt from "prompt-sync";

const read = prompt();
const log = (...values) => console.log(...values);

let questionIndex = 0;

const getPlayerGuess = () => {
  const questions = ["Enter a guess: ", "Enter other guess: ", "Enter another guess: "];
  
  let isPlayerGuessValid = false;

  while (!isPlayerGuessValid) {
    const playerGuess = Number(read(questions[questionIndex]).trim());

    if (questionIndex < 2) {
      questionIndex++;
    }
    
    if(!playerGuess) {
      log("Guess should be a number");

      continue;
    };

    if(playerGuess < 1 || playerGuess > 10) {
      log("Number must be between 1 and 10");

      continue;
    };

    return playerGuess;
  }
}

const getSingleOrPlural = (singular, plural, amount) => amount === 1 
  ? singular
  : plural;

const execGame = async () => {
  const numberToGuess = Math.floor(Math.random() * 10) + 1;

  let guessesAmount = 1;
  let shouldContinueGame = true;

  log("Try to guess a number from 1 to 10!");

  while(shouldContinueGame) {
    const playerGuess = getPlayerGuess();

    if(playerGuess !== numberToGuess) {
      guessesAmount += 1;
  
      playerGuess > numberToGuess
        ? log("The number is lower!")
        : log("The number is greater!");

      continue;
    }

    const attemptSingleOrPlural = getSingleOrPlural("attempt", "attempts", guessesAmount);

    log(`You won, it took ${guessesAmount} ${attemptSingleOrPlural}!`);

    const wantsKeepPlaying = read("Want to keep playing? (Y/n): ").trim();

    if(wantsKeepPlaying.toLowerCase() === "n") {
      process.exit(0);
    }

    questionIndex = 0;
    execGame();
  }
};

execGame();

