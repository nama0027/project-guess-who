// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const filter = document.getElementById('filter')
const playAgain = document.getElementById("playAgain")
const winOrLose = document.getElementById("winOrLose")
const winOrLoseText = document.getElementById("winOrLoseText")
const startGame = document.getElementById("play-game")
const helloPage = document.getElementById("hello-page")
const playerName = document.getElementById("player-name")

// for question counter display
const qCounter = document.getElementById("question-counter")

//for timer display
const secondsDisplay = document.getElementById("seconds")
const minutesDisplay = document.getElementById("minutes")

//for flip and background sound file
const flipSound = document.getElementById("flip")
const backSound = document.getElementById("back")

//for turning on and off background sound
const volumeUP = document.getElementById("volume-up")
const volumeOff = document.getElementById("volume-off")

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses','necklace'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses','necklace', 'earrings'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses','earrings'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat', 'necklace'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: ['earrings'],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'black',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret  
let charactersInPlay
let characterCard
let questionCounter=0 // for counting the questions asked by player
let backgroundMusic = true //background music playing at the stat of game
let reset = false   //for resetting the question counter
let timeInSeconds = 0 // for timer counter
let gamePlayerName   //for player name
let currentQuestion = {  
  category: 'hair',  //giving the default value for the start of game as this value is pr selected and eventlistner is working on change event
  value: 'brown'
}

//Defining all functions here

//this function is for card flipping sound
const playFlipSound = () => {
  flipSound.play()
}

//this function is for playing or pausing background sound
const playBackSound = () => {

  // start playing the background sound
  if (backgroundMusic) {
    backSound.play()
    backgroundMusic = false
    //toggling the display of sound icon
    volumeUP.style.display = "block"    
    volumeOff.style.display = "none"
  } else {                // pause the background sound
    backSound.pause()
    backgroundMusic = true
    //toggling the display of sound icon
    volumeUP.style.display = "none" 
    volumeOff.style.display = "block"
  }
}

//update and display question counter
const updateQuestionCounter = () => {
  if (reset) {
    questionCounter= 0
    qCounter.textContent = `Question asked:  ${ questionCounter}`
    reset= false
  } else {
    qCounter.textContent = `Question asked:  ${questionCounter}`
    questionCounter++
  }
}

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card" id="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess" id="guess" onmouseover= "playFlipSound()" >
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
          </div>
      </div>
    `
  })
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// This function to start the game
const start = () => {

  //storing player name
  if (playerName.value === "") {
    gamePlayerName = "Player"
  }
  else {
    gamePlayerName = playerName.value
  }
  
  board.style.display = "flex"  //displaying the game page
  helloPage.style.display = "none"  //hiding hello page
  
  //setting variables value
  backgroundMusic = true
  timeInSeconds = 0
  // starting the background music
  playBackSound()

  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  // generating the game board by calling generateBoard function 
  generateBoard()
  
  //calling  function for question counter
  updateQuestionCounter() 
  
  // selecting a secret person to guess by calling setSecret function
  setSecret()
}


//function for play again
const startAgain = () => {
 
  //toggling the display of game board and 'winOrlose' page and clear the h1 text
  board.style.display="flex"
  winOrLose.style.display = "none"
  winOrLoseText.textContent = ""
  
//calling the function to restart the question counter
  reset = true // for resetting the question counter
  updateQuestionCounter() 
//calling the start function again to start the game 
  start ()
}

//function for restarting game
const reStart = () => {
  
// pausing the background music
  backgroundMusic = false
  playBackSound()
  board.innerHTML = ''
  
//calling the function to restart the question counter
  reset = true // for resetting the question counter
  updateQuestionCounter() 
//calling the start function with some interval to re-start the game 
  setTimeout(start, 1000)
}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = (event) => {
  
  event.preventDefault()
  event.stopPropagation()

  // This variable stores what option group (category) the question belongs to.

  const category = event.target[questions.selectedIndex].parentNode.label
 
  // this variable stores the actual value of the question player has  selected.
  const value = event.target.value
  
//storing the category and value in the currentQuestion object
  currentQuestion = {
    category: category,
    value: value
  }
}

// This function invokes when player click on 'Find Out' button.

const checkQuestion = () => {
  
  updateQuestionCounter() // call of function to update the question counter 

  const { category, value } = currentQuestion

  // Compare the currentQuestion details with the secret person details in a different manner based on category (hair/eyes or accessories/others).
  // See if we should keep or remove people based on that
  // Then invoke filterCharacters
  if (category === 'hair' || category === 'eyes') {
    if (category === 'hair' && secret[category] === value) {
       filterCharacters (true)
    } else if (category === 'eyes' && secret[category] === value) {
      filterCharacters (true)
    } else {
      filterCharacters (false)
    }

  } else if (category === 'accessories' || category === 'other') {
    if (secret[category].includes(value) ) {
      filterCharacters (true)
    } else {
      filterCharacters (false)
    } 
   
  }
}

// It'll filter the characters array and redraw the game board.

const filterCharacters = (keep) => {
  const { category, value } = currentQuestion
  // Show the correct alert message for different categories
  if (category === 'accessories') {
    if (keep) {
      alert(
        `Yes, the person wears ${value}! So, keeping all those that wear ${value}.`
      )
    } else {
      alert(
        `No, the person doesn't wear ${value}! So, removing all those that wear ${value}.`
      )
    }
  } else if (category === 'other') {
    // Similar to the one above
    if (keep) {
      alert(
        `Yes, the person is ${value}! So, keeping all those that are ${value}s.`
      )
    } else {
      alert(
        `No, the person is not a ${value}! So, removing all those that are ${value}s.`
      )
    }
  } else {
    if (keep) {
     alert (`Yes, the person has ${value} ${category}! So, keeping all those with ${value} ${category}.`)
    } else {
      alert (`No, the person doesn't have ${value} ${category}! So, removing all those with ${value} ${category}.`)
    }
  }
 
  // filter by category to keep or remove based on the keep variable.
  if (category === 'hair' || category === 'eyes') {
    if (keep) {
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
    } else {
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    }
  }else if (category === 'accessories' || category === 'other') {
    if (keep) {
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
        
    } else {
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
        
    }
 }

  // Invoke a function to redraw the board with the remaining people.
  
  if (charactersInPlay.length > 1) { //check if it is more than 1 person remaining and if it is last person than show win screen after a slight delay
    generateBoard()

  }else if (charactersInPlay.length === 1) {
    generateBoard()
    setTimeout(() => { checkMyGuess(charactersInPlay[0].name) }, 1000) 
  }
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (personToConfirm) => {
  
  const guessNow = confirm(`${gamePlayerName}! are you sure that you want to make a guess on ${personToConfirm}?`)
  if (guessNow) {
    checkMyGuess (personToConfirm) // If the player wants to guess, invoke the checkMyGuess function.
  }

  
}

// this function invokes when player wants to make a guess
const checkMyGuess = (personToCheck) => {
  
  if (secret.name === personToCheck) {
    backgroundMusic = false
    playBackSound()
    board.style.display="none"
    winOrLose.style.display = "block"
    winOrLoseText.textContent= `Congrats ${gamePlayerName}! You won! It is ${personToCheck}.`
  } else {
    backgroundMusic = false
    playBackSound()
    board.style.display="none"
    winOrLose.style.display = "block"
    winOrLoseText.textContent= `Oops! ${gamePlayerName}, You lost! It was not ${personToCheck} but ${secret.name}. `
  }
}


// function for count-up timer
setInterval(() => {
  ++timeInSeconds
  secondsDisplay.textContent = timerDisplay(timeInSeconds % 60)
  minutesDisplay.textContent = timerDisplay(parseInt(timeInSeconds / 60))
  
},1000)

// function to generate the time label
const timerDisplay = (val) => {

 let valString = val + ""
  if (valString.length < 2) {
    return "0"+ valString
  } else {
    return valString
  }

}   

// All the event listeners
startGame.addEventListener ('click', start) // calling  start function when player click play button
restartButton.addEventListener('click', reStart)
questions.addEventListener('change', selectQuestion)
filter.addEventListener('click', checkQuestion)
playAgain.addEventListener('click', startAgain)

//for sound effects
volumeUP.addEventListener('click', playBackSound )
volumeOff.addEventListener('click', playBackSound)