import prompt from "prompt-sync";

const read = prompt();
const log = (...values) => console.log(...values);

let questionIndex = 0;

const getColoredString = (string, color) => `\x1b[${color}m${string}\x1b[0m`;

const getDifficultyLevel = () => {
  while (true) {
    const difficultyLevel = Number(read("Which difficulty level do you want? (1/2/3): "));
    
    if(difficultyLevel < 1 || difficultyLevel > 3) {
      log(getColoredString("Difficulty level must be between 1 and 3", 31));

      continue;
    };

     if(!difficultyLevel) {
      log(getColoredString("Invalid difficulty level", 31));

      continue;
    };

    return difficultyLevel;
  }
};

const getPlayerGuess = () => {
  const questions = ["Enter a guess: ", "Enter other guess: ", "Enter another guess: "];

  while (true) {
    const playerGuess = Number(read(questions[questionIndex]).trim());

    if (questionIndex < 2) {
      questionIndex++;
    }
    
    if(playerGuess < 1 || playerGuess > 10) {
      log(getColoredString("Number must be between 1 and 10", 31));

      continue;
    };

     if(!playerGuess) {
      log(getColoredString("Guess should be a number", 31));

      continue;
    };

    return playerGuess;
  }
};

const getGuessesLeft = difficultyLevel => {
  if (difficultyLevel === 1) {
    return 8;
  }

  if (difficultyLevel === 2) {
    return 6;
  }

  if (difficultyLevel === 3) {
    return 4;
  }
};

const getSingularOrPlural = (singular, plural, amount) => amount === 1 
  ? singular
  : plural;

const endGame = () => {
  log("Bye!");
  process.exit(0);
};

const checkIfUserWantsToQuit = () => {
  const wantsKeepPlaying = read("Want to keep playing? (Y/n): ").trim();

  if(wantsKeepPlaying.toLowerCase() === "n") endGame();

  questionIndex = 0;
};

const execGame = async () => {
  const numberToGuess = Math.floor(Math.random() * 10) + 1;
  const difficultyLevel = getDifficultyLevel();

  let guessesLeft = getGuessesLeft(difficultyLevel);  
  let guessesAmount = 1;

  log(`Try to ${getColoredString("guess", 32)} a number from ${getColoredString("1", 32)} to ${getColoredString("10", 32)}!`);

  while (true) {
    log(`You have ${guessesLeft} guesses left!`);
    const playerGuess = getPlayerGuess();

    if(playerGuess !== numberToGuess) {
      guessesAmount++;
      guessesLeft--;
  
      playerGuess > numberToGuess
        ? log(`The number is ${getColoredString("lower", 33)}!`)
        : log(`The number is ${getColoredString("greater", 33)}!`);
      
      if (guessesLeft === 0) {
        log(`You ${getColoredString("lost", 31)}, no guesses ${getColoredString("left", 31)}!`); 

        checkIfUserWantsToQuit();
        
        break;
      }

      continue;
    }

    const attemptSingleOrPlural = getSingularOrPlural("attempt", "attempts", guessesAmount);

    log(`You ${getColoredString("won", 32)}, it took ${getColoredString(guessesAmount, 32)} ${attemptSingleOrPlural}!`);

    checkIfUserWantsToQuit();
  }
};

while (true) {
  execGame();
}

