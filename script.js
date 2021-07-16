const cards = document.querySelectorAll('.memory-card')
const doneButton = document.querySelector('.done-button')
const resetButton = document.querySelector('.reset-button')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard
let numSteps = 0
let numPairs = 0

function flipCard() {
    if (lockBoard) return
    if(this === firstCard) return

    this.classList.add('flip')

    if(!hasFlippedCard){
        //first click on cards
        hasFlippedCard = true
        firstCard = this
        return
    } 
    //second click on cards
    secondCard = this
    numSteps++

    //matching cards????
    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework===secondCard.dataset.framework
    if (isMatch)    numPairs++
    isMatch ? disableCards() : unFlipCards()
}

function disableCards() {
    firstCard.removeEventListener('click',flipCard)
    secondCard.removeEventListener('click',flipCard)
    resetBoard()
}
function unFlipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 800)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12)
        card.style.order = randomPos
    })
})()

function donePrompt() {
    if(numPairs===cards.length/2){
    alert("You have completed the matching puzzle of " + numPairs + " pairs in " + numSteps + " steps")
    } else {
        alert("Please finish the puzzle before submission")
    }
}
function reload() {
    reload = location.reload();
}

cards.forEach(card => card.addEventListener('click', flipCard))
doneButton.addEventListener('click', donePrompt)
resetButton.addEventListener("click", reload, false);
