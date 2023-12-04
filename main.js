import prompt from "prompt-sync";

const read = prompt();
const log = (...values) => console.log(...values);

let questionIndex = 0;

const getColoredString = (string, color) => `\x1b[${color}m${string}\x1b[0m`;

const getPlayerGuess = () => {
  const questions = ["Enter a guess: ", "Enter other guess: ", "Enter another guess: "];
  
  let isPlayerGuessValid = false;

  while (!isPlayerGuessValid) {
    const playerGuess = Number(read(questions[questionIndex]).trim());

    if (questionIndex < 2) {
      questionIndex++;
    }
    
    if(!playerGuess) {
      log(getColoredString("Guess should be a number", 31));

      continue;
    };

    if(playerGuess < 1 || playerGuess > 10) {
      log(getColoredString("Number must be between 1 and 10", 31));

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

  log(`Try to ${getColoredString("guess", 32)} a number from ${getColoredString("1", 32)} to ${getColoredString("10", 32)}!`);

  while(shouldContinueGame) {
    const playerGuess = getPlayerGuess();

    if(playerGuess !== numberToGuess) {
      guessesAmount += 1;
  
      playerGuess > numberToGuess
        ? log(`The number is ${getColoredString("lower", 33)}!`)
        : log(`The number is ${getColoredString("greater", 33)}!`);

      continue;
    }

    const attemptSingleOrPlural = getSingleOrPlural("attempt", "attempts", guessesAmount);

    log(`You ${getColoredString("won", 32)}, it took ${getColoredString(guessesAmount, 32)} ${attemptSingleOrPlural}!`);

    const wantsKeepPlaying = read("Want to keep playing? (Y/n): ").trim();

    if(wantsKeepPlaying.toLowerCase() === "n") {
      log("Bye!");
      process.exit(0);
    }

    questionIndex = 0;
    execGame();
  }
};

execGame();

